import clientUtils from "@utils/client-utils";
import baseProvider from "./base-provider";
const baseUrl = "/admin";
const adminProvider = {
  ...baseProvider(baseUrl),
  countActiveAdmin() {
    let url = `${baseUrl}/count`;
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
  increaseAcceptAddress({ id, address }) {
    let url = `${baseUrl}/increase-accept/${id}`;
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
  decreaseAcceptAddress({ id, address }) {
    let url = `${baseUrl}/decrease-accept/${id}`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
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
  increaseRejectAddress({ id, address }) {
    let url = `${baseUrl}/increase-reject/${id}`;
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
  decreaseRejectAddress({ id, address }) {
    let url = `${baseUrl}/decrease-reject/${id}`;
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
  login({ network, address }) {
    let url = `${baseUrl}/login`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: { network, address },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};

export default adminProvider;
