import axios from "axios";

export const UrlServer = () => {
  // const userApp = useSelector(state => state.userApp);
  const domain = global.origin;
  const localhost = false;

//   return "http://3.0.155.248:2396";
return "https://ai.ivirse.com";
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
    isUpload = false,
  }) {
    url = isUseServiceUrl ? this.serverApi + url : url;
    return new Promise((resolve, reject) => {
      let contentType = isUpload ? "multipart/form-data" : "application/json";
      if (isUpload) {
        const formData = new FormData();
        if (data?.length) {
          data.forEach((file) => {
            formData.append("file", file);
          });
        } else {
          formData.append("file", data);
        }
        data = formData;
      }
      console.log(url);
      axios({
        method,
        url,
        params,
        timeout: timeout * 1000,
        data,
        headers: ignoreAuth
          ? { "Content-Type": contentType }
          : {
              "Content-Type": contentType,
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
