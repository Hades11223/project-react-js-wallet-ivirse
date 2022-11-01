import axios from "axios";

export const UrlServer = () => {
  // const userApp = useSelector(state => state.userApp);
  const domain = global.origin;
  console.log("Ok", domain);
  const localhost = false;
  switch (domain) {
    // case "http://localhost:3000":
    //   return "http://localhost:8081";
    case "http://10.0.0.99:9105":
      return "http://10.0.0.47:9107";
    case "https://wallet-ivirse.isofh.vn":
      return "https://datahub-api.isofh.vn"; //https://ivirse-api.isofh.vn/api/ivirse/v1
    case "https://wallet.ivirse.com":
      return "https://datahub.ivirse.com"; //https://ivirse-api.isofh.vn/api/ivirse/v1
    default:
      return "https://datahub-api.isofh.vn";
  }
};

const axiosUtils = {
  auth: "",
  serverApi: UrlServer(),
  requestAxios({
    method = "",
    url = "",
    params = {},
    data,
    timeout = 10,
    ignoreAuth = true,
    isUseServiceUrl = false,
  }) {
    url = isUseServiceUrl ? this.serverApi + url : url;
    console.log();
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        params,
        timeout: timeout * 1000,
        data,
        headers: ignoreAuth
          ? { Accept: "application/json", "Content-Type": "application/json" }
          : {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                this.auth || `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default axiosUtils;
