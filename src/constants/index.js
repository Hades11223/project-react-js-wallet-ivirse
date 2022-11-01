export const theme = {};

export const assetStatusDatamarket = {
  CANBUY: 1,
  AUCTION: 2,
  GRANT: 3,
};

export const ASSET_REQUEST_STATUS = {
  0: "Pending",
  1: "Declined",
  2: "Accepted",
  3: "Accused Successfully",
  4: "Response expired",
  5: "Accuse time expired"
}

export const getStatusByCode = (status) => {
  switch (status) {
    case 1:
      return "Listed";
    case 2:
      return "Owner";
    case 3:
      return "Granted";
    case 4:
      return "Reported";
    default:
      return "";
  }
};

export const DatahubAssetConst = {
  MEDICAL_UNIT: {
    filter: [{ label: "EMR", value: 0 }],
    mapping: {
      0: "EMR",
    },
  },
};
