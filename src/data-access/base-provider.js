import { combineUrlParams } from "@utils";
import clientUtils from "@utils/client-utils";
const baseProvider = (baseUrl = "") => ({
  create(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "POST",
          url: baseUrl,
          isUseServiceUrl: true,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  createMultiple(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "POST",
          url: baseUrl + "/batch",
          isUseServiceUrl: true,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  update(body) {
    let url = `${baseUrl}/${body?.id}`;

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  patch(id, body) {
    let url = `${baseUrl}/${id}`;

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "PATCH",
          url,
          isUseServiceUrl: true,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  getMultiple(params = {}) {
    let url = combineUrlParams(baseUrl, params);
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "GET",
          url,
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  getDetail(id) {
    let url = `${baseUrl}/${id}`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "GET",
          url,
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },

  delete(id) {
    let url = `${baseUrl}/${id}`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "DELETE",
          url,
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  deleteMultiple(ids) {
    let url = `${baseUrl}/batch`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "DELETE",
          url,
          isUseServiceUrl: true,
          body: ids,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
});

export default baseProvider;
