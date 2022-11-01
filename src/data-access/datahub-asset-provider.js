import API_VAR, { API_ROUTE } from "@constants/api";
import axiosUtils from "@utils/datahub-axios-utils";
import axiosBaseProvider from "./axios-base-provider";

const DatahubAssetProvider = {
  ...axiosBaseProvider(API_VAR.ASSET),
  save(body) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "POST",
          url: API_VAR.ASSET + "/save",
          isUseServiceUrl: true,
          data: body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  updateViews(body) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "PUT",
          url: API_VAR.ASSET + API_ROUTE.ASSET.UPDATE_VIEWS,
          isUseServiceUrl: true,
          data: body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};

export default DatahubAssetProvider;
