import API_VAR from "@constants/api";
import axiosUtils from "@utils/datahub-axios-utils";
import axiosBaseProvider from "./axios-base-provider";

const AssetLikedProvider = {
  ...axiosBaseProvider(API_VAR.LIKED),
  searchByUserAddress(params = {}) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "GET",
          url: API_VAR.LIKED + "/search-by-user-address",
          params,
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  changeLiked({ address, cid }) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "PUT",
          url: API_VAR.LIKED + `/change/${cid}`,
          data: { address },
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};
export default AssetLikedProvider;
