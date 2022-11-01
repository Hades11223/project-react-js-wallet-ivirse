import clientUtils from "@utils/client-utils";

export default {
  upload({ url, form }) {
    return new Promise((resolve, reject) => {
      clientUtils
        .upload({ methodType: "POST", url: "/upload", form, ignoreAuth: false })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  downloadFile(file) {
    let url = clientUtils.getFilePath({ url: file });
    return clientUtils.requestApiReport("get", url, {});
  },
};
