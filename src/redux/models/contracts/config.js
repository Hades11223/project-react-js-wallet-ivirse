import WalletConnectProvider from "@walletconnect/web3-provider";
import ABI from "./abi.json";
const INFURA_API_KEY = "3e31b3e72c8c4e798f5a2a61cf0ec50e";
const BNB_API_KEY = "FZ9TGE7XCY32G7YR7BDDBJ211CF7DMFF2G";
const API_KEY = "8J1EEMW7316ZJ6QZVFPHU55UCB4XWDCA2Y";

export default {
  createNewWalletConnectProvider: () => {
    return new WalletConnectProvider({
      infuraId: INFURA_API_KEY,
      rpc: {
        3: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
        4: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
        42: "https://kovan.poa.network",
        56: "https://bsc-dataseed.binance.org",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
      },
    });
  },
  networkHasCoin: [
    {
      name: "bnb",
      address: "0x26D32Da27E6F9F1cA2C9b227e9a75782C30fCD36",
      ABI: ABI,
      scanURL: "https://api.bscscan.com",
      chainId: "0x38",
      API_KEY: BNB_API_KEY,
      symbol: "BNB",
      nameCoin: "BNB smart chain",
      communityAddress: "0xC9CbADdEADf90C070B4Bd9a8EAB670d9a4e68D99",
      reactiveContractAddress: "0x1fFc7B3Ab96dCBf759678C079e852aC530D176c8",
      marketplaceContractAddress: "0xcC38FC44e71B609404eD88777Bc5c4869C66b792",
      intergrationServer: "https://integration.ivirse.com",
    },
    {
      name: "bnbt",
      address: "0xcb77b2ba1C924d66465FC3F0DC6Ac8e3bBAFf810",
      ABI: ABI,
      scanURL: "https://api-testnet.bscscan.com",
      chainId: "0x61",
      API_KEY: BNB_API_KEY,
      vestingAddress: "0xdD57304ccf2DBb9C5c7ccB86Cc9A39DC7EDdF34F",
      symbol: "BNBT",
      nameCoin: "BNB smart chain testnet",
      communityAddress: "0xAeF2c316F6b7199C9fAaBd1397840C000147901B",
      reactiveContractAddress: "0xcBc330aD5063A55410781a85776F8dc70Df8b7CF",
      marketplaceContractAddress: "0x2Df5E994856DcE0ea2bCF377Dd0626399A9Bf555",
      intergrationServer: "https://integration.ivirse.com/staging",
    },
  ],
};
