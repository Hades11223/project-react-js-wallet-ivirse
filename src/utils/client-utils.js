export const UrlServer = () => {
  const domain = global.origin;

  switch (domain) {
    case "http://3.0.155.248:2394":
      return "http://3.0.155.248:8080/api/ivirse/v1";
    case "http://10.0.0.99:9105":
      return "http://10.0.0.47:8080/api/ivirse/v1";
    case "https://wallet-ivirse.isofh.vn":
      return "https://ivirse-api.isofh.vn/api/ivirse/v1";
    case "https://ivirse.com":
      return "https://api.ivirse.com/api/ivirse/v1";
    case "https://wallet.ivirse.com":
      return "https://api.ivirse.com/api/ivirse/v1";
    default:
      return "https://api.ivirse.com/api/ivirse/v1";
  }
};

const clientUtils = {
  auth: "",
  serverApi: UrlServer(),
  requestApi({
    methodType,
    url,
    body,
    ignoreAuth = true,
    isUseServiceUrl = false,
  }) {
    return new Promise((resolve, reject) => {
      if (!body) body = {};

      if (methodType.toLowerCase() !== "get") {
        body = JSON.stringify(body);
      }
      url = isUseServiceUrl ? this.serverApi + url : url;
      this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        ignoreAuth
          ? {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          : {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.auth,
            },
        body
      )
        .then((s) => {
          s.json()
            .then((val) => {
              if (val.code === 401) {
                localStorage.clear();
                window.location.href = "/auth/login";
              }
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            window.location.href = "/auth/login";
          }
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };
      if (methodType.toLowerCase() !== "get") {
        fetchParam.body = body;
      }
      return fetch(url, fetchParam)
        .then((json) => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch((e) => {
          // window.location.href = "/maintain";
          reject(e);
        });
    });
  },
  upload({ methodType, url, form, isUseServiceUrl = true }) {
    return new Promise((resolve, reject) => {
      url = isUseServiceUrl ? this.serverApi + url : url;

      return this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        {
          Authorization: this.auth,
        },
        form
      )
        .then((s) => {
          s.json()
            .then((val) => {
              if (val.code === 401) {
                // localStorage.clear();
                // window.location.href = "/auth/login";
              }
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            // localStorage.clear();
            // window.location.href = "/auth/login";
          }
          reject(e);
        });
    });
  },
  getFilePath({ url }) {
    return this.serverApi + "/files/" + url;
  },
  requestApiReport(methodType, url, body) {
    return new Promise(async (resolve, reject) => {
      var dataBody = "";
      if (!body) body = {};
      dataBody = JSON.stringify(body);
      this.requestFetch(
        methodType,
        url && url.indexOf("http") == 0 ? url : url,
        {
          Authorization: this.auth,
        },
        dataBody
      )
        .then((s) => {
          s.blob().then((blob) => {
            let blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default clientUtils;
