import adminProvider from "@data-access/admin-provider";
import campaignProvider from "@data-access/campaign-provider";
import notificationProvider from "@data-access/notification-provider";
import { getState } from "@redux";
import { ethers } from "ethers";
import moment from "moment";
import abi from "./abi";
export default {
  state: {
    notificationParams: { page: 0, size: 10, sort: { createdAt: "desc" } },
    adminParams: { page: 0, size: 10, sort: { status: "asc" } },
    campaignParams: { page: 0, size: 10, sort: { status: "asc" } },
    isAdmin: false,
    isParticipant: false,
    adminDatas: [],
    notifications: [],
    campaigns: [],
    datas: [],
    tokenCanUse: 0,
    notificationTotalElements: 0,
    adminTotalElement: 0,
    campaignTotalElement: 0,
    activeNavItem: 0,
    tokenCanClaim: 0,
    role: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    setRole: ({ role }) => {
      dispatch.community.updateData({
        role,
      });
    },
    setParams: ({ key, ...newParams }) => {
      let oldParams = getState()?.community?.[key];
      dispatch.community.updateData({
        [key]: { ...oldParams, ...newParams },
      });
    },
    initVestingCommunity: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let currentContractProperties =
            getState()?.contracts?.currentContractProperties;
          let address = getState()?.contracts?.address;
          let web3Provider = getState()?.contracts?.web3Provider;
          let signer = getState()?.contracts?.signer;
          let currentAddress = currentContractProperties?.communityAddress;

          if (currentAddress) {
            let vestingContract = new ethers.Contract(
              currentAddress,
              abi,
              web3Provider
            );

            let vestingContractWithSigner = vestingContract.connect(signer);
            // vestingContractWithSigner.on("ChangeCampaign", () => {
            //   dispatch.community.getCampaigns();
            // });

            // vestingContractWithSigner.on("Release", () => {
            //   dispatch.community.getCampaigns();
            // });
            // vestingContractWithSigner.on("AddAdmin", () => {
            //   dispatch.community.handleVerify();
            //   dispatch.community.getCampaigns();
            //   dispatch.community.getCountActiveAdmin();
            //   setTimeout(() => {
            //     dispatch.community.getAdminData();
            //   }, 1000);
            // });
            // vestingContractWithSigner.on("RemoveAdmin", () => {
            //   dispatch.community.handleVerify();
            //   dispatch.community.getCampaigns();
            //   dispatch.community.getCountActiveAdmin();
            //   setTimeout(() => {
            //     dispatch.community.getAdminData();
            //   }, 1000);
            // });

            // vestingContractWithSigner.on("AdminAccept", () => {
            //   dispatch.community.getAdminData();
            // });
            // vestingContractWithSigner.on("AdminReject", () => {
            //   dispatch.community.getAdminData();
            // });

            // vestingContractWithSigner.on("DeleteCampaign  ", () => {
            //   dispatch.community.getCampaigns();
            // });
            // vestingContractWithSigner.on("AdminAcceptRelease  ", () => {
            //   dispatch.community.getCampaigns();
            // });
            // vestingContractWithSigner.on("AdminRejectRelease", () => {
            //   dispatch.community.getCampaigns();
            // });

            let isAdmin = await vestingContractWithSigner.isAdmin(address);

            // let isAdmin = true;

            let isParticipant = await vestingContractWithSigner.isParticipant(
              address
            );
            // let isParticipant = 1;
            dispatch.community.handleVerify();
            dispatch.community.getCountActiveAdmin();
            dispatch.community.updateData({
              isAdmin,
              isParticipant,
              vestingContractWithSigner,
              currentAddress,
            });
            resolve({
              isAdmin,
              isParticipant,
              vestingContractWithSigner,
              currentAddress,
            });
          } else {
            reject(false);
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    handleVerify: async () => {
      const vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      const address = getState()?.contracts?.address;
      let isAdmin = await vestingContractWithSigner.isAdmin(address);
      dispatch.community.updateData({
        isAdmin,
      });
    },

    getAdminData: async () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      let adminParams = getState()?.community?.adminParams;
      const address = getState()?.contracts?.address;

      let network = getState()?.contracts?.currentContractProperties?.name;

      dispatch.community.getCountActiveAdmin();

      return new Promise(async (resolve, reject) => {
        adminProvider
          .getMultiple({ ...adminParams, network })
          .then((res) => {
            Promise.all(
              res.data
                .filter((account) =>
                  ethers.utils.isAddress(account.walletAddress)
                )
                .map(async (item) => {
                  let countAccept =
                    await vestingContractWithSigner.getAdminConsensusByAddressAndStatus(
                      item.walletAddress,
                      1
                    );
                  let countReject =
                    await vestingContractWithSigner.getAdminConsensusByAddressAndStatus(
                      item.walletAddress,
                      2
                    );
                  let consent = await vestingContractWithSigner.adminConsents(
                    item.walletAddress,
                    address
                  );

                  return {
                    ...item,
                    countAccept: countAccept?.hexToNumber(),
                    countReject: countReject?.hexToNumber(),
                    consent,
                  };
                })
            )
              .then((data) => {
                dispatch.community.updateData({
                  adminDatas: data,
                  adminTotalElement: res?.totalElements,
                });
                resolve(data);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            dispatch.community.updateData({
              adminDatas: [],
              adminTotalElement: 0,
            });
            reject(err);
          });
      });
    },
    getNotifications: () => {
      let notificationParams = getState()?.community?.notificationParams;
      let network = getState()?.contracts?.currentContractProperties?.name;
      return new Promise(async (resolve, reject) => {
        notificationProvider
          .getMultiple({ ...notificationParams, network })
          .then((res) => {
            let notifications = res.data || [];
            let notificationTotalElements = res.totalElements;
            dispatch.community.updateData({
              notifications,
              notificationTotalElements,
            });
            resolve(notifications);
          })
          .catch((err) => {
            dispatch.community.updateData({
              notifications: [],
              notificationTotalElements: 0,
            });
            reject(err);
          });
      });
    },

    getTokenCanClaim: (address) => {
      let erc20 = getState()?.contracts?.erc20;
      let currentAddress = getState()?.community?.currentAddress;
      return new Promise((resolve, reject) => {
        erc20
          .allowance(currentAddress, address)
          .then((value) => {
            let convertValue = value?.hexToDecimal();
            dispatch.community.updateData({
              tokenCanClaim: convertValue,
            });
            resolve(value);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    claimToken: async (address) => {
      let erc20 = getState()?.contracts?.erc20;
      let currentAddress = getState()?.community?.currentAddress;
      let allowance = await erc20.allowance(currentAddress, address);
      erc20.on("Approval", (owner, spender, amount) => {
        if ((currentAddress == owner) & (spender == address)) {
          dispatch.community.getTokenCanClaim(address);
        }
      });
      return new Promise((resolve, reject) => {
        erc20
          .transferFrom(currentAddress, address, allowance)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createCampaign: async ({ name, accounts, amounts }) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .createCampaign(name, accounts, amounts)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getCampaigns: async () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      let campaignParams = getState()?.community?.campaignParams;
      const address = getState()?.contracts?.address;
      let network = getState()?.contracts?.currentContractProperties?.name;

      return new Promise((resolve, reject) => {
        campaignProvider
          .getMultiple({
            ...campaignParams,
            network,
            sort: { createdAt: "desc", status: "desc", openingDay: "desc" },
          })
          .then((res) => {
            Promise.all(
              res?.data?.map(async (item) => {
                let countAccept =
                  await vestingContractWithSigner.getConsensusByNameAndStatus(
                    item.name,
                    1
                  );
                let countReject =
                  await vestingContractWithSigner.getConsensusByNameAndStatus(
                    item.name,
                    2
                  );
                let consent = await vestingContractWithSigner.campaignConsents(
                  item.name,
                  address
                );

                return {
                  ...item,
                  countAccept: countAccept?.hexToNumber(),
                  countReject: countReject?.hexToNumber(),
                  consent,
                };
              })
            ).then((campaigns) => {
              dispatch.community.updateData({
                campaigns,
                campaignTotalElement: res?.totalElements,
              });
              resolve(res);
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch.community.updateData({
              adminDatas: [],
              adminTotalElement: 0,
            });
            reject(err);
          });
      });
    },
    adminAcceptRelease: async ({ campaignName }) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .adminAcceptRelease(campaignName)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    adminRejectRelease: async ({ campaignName }) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .adminRejectRelease(campaignName)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    release: async ({ campaignName, passive = true }) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .release(campaignName, passive)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteCampaign: async ({ campaignName }) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .deleteCampaign(campaignName)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    adminAccept: async (address) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .adminAccept(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    adminReject: async (address) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .adminReject(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    adminAcceptRevoke: async (address) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .adminAcceptRevoke(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    adminRejectRevoke: async (address) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .adminRejectRevoke(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addAdmin: async (address) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .addAdmin(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    revokeAdminRole: async (address) => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .revokeAdminRole(address)
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    renounceAdminRole: async () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .renounceAdminRole()
          .then((res) => {
            resolve(res.wait());
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getDatas: async () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      let currentAddress = getState()?.community?.currentAddress;

      let erc20 = getState()?.contracts?.erc20;
      const communityBalance = await erc20.balanceOf(currentAddress);
      let now = moment().unix();
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .getDatas()
          .then((datas) => {
            let newData = datas
              .map((item, idx) => {
                let time = moment
                  .unix(parseInt(item.unlockTime._hex, 16))
                  .format("DD-MM-YYYY HH:mm:ss");
                let amount = item.amount._hex.hexToDecimalRound();
                return {
                  ...item,
                  stt: idx + 1,
                  time,
                  amount,
                  status: now > parseInt(item.unlockTime._hex, 16),
                };
              })
              .sort((a, b) => a.unlockTime - b.unlockTime);
            dispatch.community.updateData({
              datas: newData,
              communityBalance: communityBalance?.hexToDecimal(),
            });
            resolve(datas);
          })
          .catch((err) => {
            dispatch.community.updateData({ datas: [] });

            reject(err);
          });
      });
    },
    getTokenCanUse: () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .getTokenCanUse()
          .then((res) => {
            resolve(res);
            dispatch.community.updateData({
              tokenCanUse: res?.hexToDecimal(),
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getDataFromSmartContract: () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .getTokenCanUse()
          .then((res) => {
            resolve(res);
            dispatch.community.updateData({
              tokenCanUse: res?.hexToDecimal(),
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getTokenUsed: () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .getTokenUsed()
          .then((res) => {
            dispatch.community.updateData({
              tokenUsed: res?.hexToDecimal(),
            });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getCountActiveAdmin: () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;

      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .getAdmins()
          .then((res) => {
            dispatch.community.updateData({ countActiveAdmin: res.length });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAllCampaigns: () => {
      let vestingContractWithSigner =
        getState()?.community?.vestingContractWithSigner;
      return new Promise((resolve, reject) => {
        vestingContractWithSigner
          .getAllCampaigns()
          .then((res) => {
            const [campaigns, names] = res;
            console.log(campaigns.map((item, index) => ({
              ...item,
              name: names[index],
              participants: item.participants.map((subItem) => ({
                ...subItem,
                amount: subItem?.amount?.hexToDecimal(),
              })),
            })));
            dispatch.community.updateData({
              allCampaign: campaigns.map((item, index) => ({
                ...item,
                name: names[index],
                participants: item.participants.map((subItem) => ({
                  ...subItem,
                  amount: subItem?.amount?.hexToDecimal(),
                })),
              })),
            });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  }),
};
