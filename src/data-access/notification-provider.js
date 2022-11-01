import clientUtils from "@utils/client-utils";
import baseProvider from "./base-provider";
const baseUrl = "/notification";
export default {
  ...baseProvider(baseUrl),
  increaseReader({ id, address }) {
    let url = `${baseUrl}/increase-reader/${id}`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,

          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: { hash: address },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  decreaseReader({ id, address }) {
    let url = `${baseUrl}/decrease-reader/${id}`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,

          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: { hash: address },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};
