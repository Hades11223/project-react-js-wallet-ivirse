// import { combineUrlParams } from "@utils";
import axiosUtils from "@utils/datahub-axios-utils";

const axiosBaseProvider = (baseUrl = "") => ({
  create(body) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "POST",
          url: baseUrl + "/create",
          isUseServiceUrl: true,
          data: body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  //   createMultiple(body) {
  //     return new Promise((resolve, reject) => {
  //       axiosUtils
  //         .requestAxios({
  //           ignoreAuth: false,
  //           methodType: "POST",
  //           url: baseUrl + "/batch",
  //           isUseServiceUrl: true,
  //           body,
  //         })
  //         .then((res) => {
  //           resolve(res);
  //         })
  //         .catch((e) => reject(e));
  //     });
  //   },
  //   update(body) {
  //     let url = `${baseUrl}/${body?.id}`;

  //     return new Promise((resolve, reject) => {
  //       axiosUtils
  //         .requestAxios({
  //           ignoreAuth: false,

  //           methodType: "PUT",
  //           url,
  //           isUseServiceUrl: true,
  //           body,
  //         })
  //         .then((res) => {
  //           resolve(res);
  //         })
  //         .catch((e) => reject(e));
  //     });
  //   },
  //   patch(id, body) {
  //     let url = `${baseUrl}/${id}`;

  //     return new Promise((resolve, reject) => {
  //       axiosUtils
  //         .requestAxios({
  //           ignoreAuth: false,

  //           methodType: "PATCH",
  //           url,
  //           isUseServiceUrl: true,
  //           body,
  //         })
  //         .then((res) => {
  //           resolve(res);
  //         })
  //         .catch((e) => reject(e));
  //     });
  //   },
  search(params = {}) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "GET",
          url: baseUrl + "/search",
          params,
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  //   getDetail(id) {
  //     let url = `${baseUrl}/${id}`;
  //     return new Promise((resolve, reject) => {
  //       axiosUtils
  //         .requestAxios({
  //           ignoreAuth: false,

  //           methodType: "GET",
  //           url,
  //           isUseServiceUrl: true,
  //         })
  //         .then((res) => {
  //           resolve(res);
  //         })
  //         .catch((e) => reject(e));
  //     });
  //   },

  delete(params) {
    return new Promise((resolve, reject) => {
      axiosUtils
        .requestAxios({
          ignoreAuth: false,
          method: "DELETE",
          params,
          url: baseUrl + "/delete",
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
});

export default axiosBaseProvider;
