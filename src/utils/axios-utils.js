import axios from "axios";

const axiosUtils = {
  auth: "",
  serverApi: "",
  requestAxios: ({ method = "", url = "", data, timeout = 10 }) => {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        timeout: timeout * 1000,
        data,
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
