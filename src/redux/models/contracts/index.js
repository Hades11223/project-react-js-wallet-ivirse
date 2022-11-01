import contractProvider from "@data-access/contract-provider";
import { IvirseIntegrationOwner } from "@ivirse-tovchain/integration-services/lib/integration-client";
import { getState } from "@redux";
import { applyDecimals } from "@utils";
import { ethers } from "ethers";
import moment from "moment";
import { ownerStorageConfig, ROOT_PEM } from "../datasharing/config";
import config from "./config";
import { SWITCH_NETWORK } from "./switchNetwork";

const { createNewWalletConnectProvider, networkHasCoin } = config;

const contracts = {
  state: {
    provider: null,
    balances: [],
    erc20: null,
    transfers: [],
    currentNetworkName: "",
    type: "",
    updateBalance: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    connect: ({ type = "metamask" }) => {
      const reconnect = async ({ provider }) => {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const network = await web3Provider.getNetwork();
        const currentNetworkName = network?.name.toLowerCase();
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        if (
          networkHasCoin
            .map((item) => item.name.toLowerCase())
            .includes(currentNetworkName)
        ) {
          const currentContractProperties = networkHasCoin.find(
            (item) => item.name.toLowerCase() === currentNetworkName
          );
          let newAbi = currentContractProperties.ABI;

          const contract = new ethers.Contract(
            currentContractProperties.address,
            newAbi,
            web3Provider
          );

          const erc20 = contract.connect(signer);
          erc20.on("Transfer", async (owner, to, amount) => {
            if (to == address || owner == address) {
              dispatch.contracts.getTokenBalance();
              dispatch.contracts.getBalances();
              dispatch.contracts.getTransfers({});
            }
          });
          const symbol = await erc20.symbol();
          const name = await erc20.name();
          const balance = await erc20.balanceOf(address);
          let coinBalance = await web3Provider.getBalance(address);
          let owner = await erc20.owner();
          let isOwner = owner == address;

          dispatch.contracts.updateData({
            web3Provider,
            address,
            erc20,
            provider,
            symbol,
            name,
            type,
            currentNetworkName,
            currentContractProperties,
            signer,
            contract,
            balance: balance?.hexToDecimal(),
            coinBalance: coinBalance?.hexToDecimal(),
            isOwner,
          });
        } else {
          dispatch.contracts.updateData({
            address,
            provider,
            type,
            balance: 0,
            currentNetworkName,
          });
        }
      };
      return new Promise(async (resolve, reject) => {
        try {
          let provider = null;

          if (type == "metamask") {
            provider = window.ethereum;
            await provider.request({
              method: "eth_requestAccounts",
              // params: [{ chainId: "0x61" }],
            });
            // .then(async (res) => {
            //   await dispatch.contracts.changeNetwork("0x38");
            // });
          } else if (type == "wallet-connect") {
            provider = createNewWalletConnectProvider();
            if (
              provider?.disconnect &&
              typeof provider.disconnect === "function"
            ) {
              await provider.disconnect();
              localStorage?.clear();
            }
            await provider.enable();
          }
          provider.on("chainChanged", async function (networkId) {
            await reconnect({ provider });
            dispatch.vesting.initTimeLockOwnership();
            dispatch.community.initVestingCommunity();
          });
          provider.on("accountsChanged", async function (accounts) {
            await reconnect({ provider });
            dispatch.vesting.initTimeLockOwnership();
            dispatch.community.initVestingCommunity();
          });
          dispatch.global.setLoading(true);

          await reconnect({ provider });
          resolve(true);
        } catch (err) {
          console.log(err);
          reject(false);
        } finally {
          dispatch.datasharing.setupConnectOwner();
          dispatch.datasharing.setupConnectBuyer();
          dispatch.global.setLoading(false);
        }
      });
    },
    setUpOwner: ({ type = "wallet-connect" }) => {
      return new Promise(async (resolve, reject) => {
        try {
          let provider = null;

          if (type == "metamask") {
            provider = window.ethereum;
            await provider.request({
              method: "eth_requestAccounts",
            });
          } else if (type == "wallet-connect") {
            provider = createNewWalletConnectProvider();
            if (
              provider?.disconnect &&
              typeof provider.disconnect === "function"
            ) {
              await provider.disconnect();
              localStorage?.clear();
            }
            await provider.enable();
            // .then((res) => {
            //   console.log(res);
            // })
            // .catch((err) => {
            //   console.log(err);
            // });
          }

          dispatch.global.setLoading(true);

          const web3Provider = new ethers.providers.Web3Provider(provider);
          const network = await web3Provider.getNetwork();
          const currentNetworkName = network?.name.toLowerCase();

          const currentContractProperties = networkHasCoin.find(
            (item) => item.name.toLowerCase() === currentNetworkName
          );
          const {
            reactiveContractAddress,
            marketplaceContractAddress,
            intergrationServer,
          } = currentContractProperties;

          const signer = web3Provider.getSigner();
          let owner = await IvirseIntegrationOwner.init(
            signer,
            [ROOT_PEM],
            ownerStorageConfig,
            reactiveContractAddress,
            marketplaceContractAddress,
            "",
            intergrationServer
          );
          const address = await owner.getAddress();

          dispatch.contracts.updateData({ signer, owner, address });
          resolve(owner);
        } catch (err) {
          console.log(err);
          reject(err);
        } finally {
          dispatch.global.setLoading(false);
        }
      });
    },
    getPublicKey: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const owner = getState()?.contracts?.owner;
          const address = getState()?.contracts?.address;

          let [_, publicKeyToEncrypt] =
            await owner.genKeyForDistributedDataEncryption();
          resolve({ address, publicKeyToEncrypt });
        } catch (err) {
          reject(err);
        }
      });
    },
    disconnect: async () => {
      let provider = getState()?.contracts?.provider;
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      // dispatch.contracts.updateData({
      //   address: null,
      //   erc20: null,
      //   provider: null,
      // });
      dispatch({ type: "RESET_APP" });
      setTimeout(() => {
        window.location.href = "/";
      }, 200);
      // window.location.reload();
    },
    getBalances: async (callback = () => {}) => {
      callback(false);
      let address = getState()?.contracts?.address;
      let web3Provider = getState()?.contracts?.web3Provider;

      let abi = [
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      let currentContractProperties =
        getState()?.contracts?.currentContractProperties;
      if (currentContractProperties) {
        let requestUrl = `${currentContractProperties.scanURL}/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=desc&apikey=${currentContractProperties.API_KEY}`;
        contractProvider
          .getAbi(requestUrl)
          .then(async (json) => {
            let results = (json.result || []).map(
              (item2) => item2?.contractAddress
            );
            let setAddress = [...new Set(results)];
            await Promise.all(
              setAddress.map(async (item, index) => {
                return new ethers.Contract(item, abi, web3Provider);
              })
            ).then(async (contracts = []) => {
              const data = async (contract, index) => {
                const signer = await web3Provider.getSigner();
                const erc20 = await contract.connect(signer);
                const address = await signer.getAddress();
                const addressCoin = contract.address;
                const symbol = await erc20.symbol();
                const name = await erc20.name();
                const balance = await erc20.balanceOf(address);

                return {
                  addressCoin,
                  symbol,
                  name,
                  balance: balance?.hexToDecimal(),
                };
              };

              let coinBalance = await web3Provider.getBalance(address);
              await Promise.all(
                contracts.map(async (contract, index) => {
                  return data(contract, index);
                })
              ).then((res = []) => {
                dispatch.contracts.updateData({
                  balances: [
                    {
                      symbol: currentContractProperties.symbol,
                      name: currentContractProperties.nameCoin,
                      balance: coinBalance?.hexToDecimal(),
                      addressCoin: ethers.constants.AddressZero,
                    },
                    ...res,
                  ],
                });
              });
            });
          })
          .catch((err) => {
            dispatch.contracts.updateData({
              balances: [],
            });
          })
          .finally(() => {
            callback(true);
          });
      } else {
        callback(true);
        dispatch.contracts.updateData({
          balances: [],
        });
      }
    },
    getTransfers: async ({ callback = () => {}, type = 1 }) => {
      callback(false);
      let web3Provider = getState()?.contracts?.web3Provider;
      let address = getState()?.contracts?.address;
      let currentContractProperties =
        getState()?.contracts?.currentContractProperties;

      if (currentContractProperties) {
        let transactionsRequestUrl = `${
          currentContractProperties.scanURL
        }/api?module=account&action=${
          type === 1 ? "tokentx" : "txlist"
        }&address=${address}&startblock=0&endblock=999999999&sort=desc&apikey=${
          currentContractProperties.API_KEY
        }`;

        contractProvider
          .getAbi(transactionsRequestUrl)
          .then(async (json) => {
            let results = json.result || [];
            let transfers = results.map((item) => ({
              ...item,
              time: moment.unix(item?.timeStamp).format("DD-MM-YYYY HH:mm:ss"),
              coinValue: `${
                item?.value
                  ? (item.value / Math.pow(10, 18))?.formatCurrency()
                  : 0
              } ${currentContractProperties.symbol}`,
              tokenValue: (item.value / Math.pow(10, 18))?.formatCurrency(),
              gasFee: (item.gasPrice * item.gasUsed) / Math.pow(10, 18),
              state: item.from.toLowerCase() === address.toLowerCase() ? 0 : 1,
              status: item.blockNumber ? 1 : 0,
            }));

            dispatch.contracts.updateData({
              transfers,
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch.contracts.updateData({
              transfers: [],
            });
          })
          .finally(() => {
            callback(true);
          });
      } else {
        dispatch.contracts.updateData({
          transfers: [],
        });
        callback(true);
      }
    },
    changeNetwork: async (chainId) => {
      return new Promise(async (resolve, reject) => {
        if (!window.ethereum) throw new Error("No crypto wallet found");

        window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
          })
          .then((res) => {
            resolve("Change network");
          })
          .catch(async (switchError) => {
            if (switchError.code === 4902) {
              let newParams = SWITCH_NETWORK.find(
                (item) => item.chainId == chainId
              ) || { chainId };
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [newParams],
                });
                resolve("Add new network");
              } catch (err) {
                console.log(err);
                reject(err);
              }
            } else {
              resolve("Cancel");
            }
          });
      });
    },

    mint: ({ address, amount }) => {
      let erc20 = getState()?.contracts?.erc20;

      const amountToSend = applyDecimals(amount, 18, "positive");

      return new Promise((resolve, reject) => {
        erc20
          .mint(address, amountToSend)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    transfer: ({ address, amount }) => {
      let erc20 = getState()?.contracts?.erc20;
      const amountToSend = applyDecimals(amount, 18, "positive");
      return new Promise((resolve, reject) => {
        erc20
          .transfer(address, amountToSend)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getTokenBalance: async () => {
      let erc20 = getState()?.contracts?.erc20;
      let address = getState()?.contracts?.address;

      const balance = await erc20.balanceOf(address);
      dispatch.contracts.updateData({
        balance: balance?.hexToDecimal(),
      });
    },

    getCoinBalance: async () => {
      let web3Provider = getState()?.contracts?.web3Provider;
      let address = getState()?.contracts?.address;
      let coinBalance = await web3Provider.getBalance(address);
      dispatch.contracts.updateData({
        coinBalance: coinBalance?.hexToDecimal(),
      });
    },
    getDataFromBscScan: async (callback = () => {}) => {
      let currentContractProperties =
        getState()?.contracts?.currentContractProperties;
      if (currentContractProperties) {
        let requestUrl = `${currentContractProperties.scanURL}/api?module=account&action=tokentx&address=${currentContractProperties.communityAddress}&startblock=0&endblock=999999999&sort=desc&apikey=${currentContractProperties.API_KEY}`;
        contractProvider
          .getAbi(requestUrl)
          .then((json) => {
            if (json.status === "1") {
              let result = json.result;
              let transationsTransferToCommunity = result
                ?.filter((item) => {
                  return (
                    item.contractAddress.toLowerCase() ==
                      currentContractProperties.address.toLowerCase() &&
                    item.to.toLowerCase() ==
                      currentContractProperties.communityAddress.toLowerCase()
                  );
                })
                .map((item, index) => ({ ...item, index: index + 1 }));
              let totalTokenTransferToCommunity =
                transationsTransferToCommunity?.reduce(
                  (a, b) => a + parseInt(b.value),
                  0
                ) / Math.pow(10, 18);

              let transationsClaimFromCommunity = result?.filter(
                (item) =>
                  item.contractAddress.toLowerCase() ==
                    currentContractProperties.address.toLowerCase() &&
                  item.from.toLowerCase() ==
                    currentContractProperties.communityAddress.toLowerCase()
              );
              let totalTokenClaimFromCommunity =
                transationsClaimFromCommunity?.reduce(
                  (a, b) => a + parseInt(b.value),
                  0
                ) / Math.pow(10, 18);
              dispatch.contracts.updateData({
                transationsTransferToCommunity,
                totalTokenTransferToCommunity,
                transationsClaimFromCommunity,
                totalTokenClaimFromCommunity,
              });
            } else {
              throw new Error("Fail to request!");
            }
          })
          .catch((err) => {
            dispatch.contracts.updateData({
              balances: [],
            });
          })
          .finally(() => {
            callback(true);
          });
      } else {
        callback(true);
        dispatch.contracts.updateData({
          balances: [],
        });
      }
    },
  }),
};

export default contracts;
