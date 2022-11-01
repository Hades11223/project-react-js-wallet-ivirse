import API_VAR from "@constants/api";
import aiAxiosUtils from "@utils/ai-axios-utils";

const AiUploadFileProvider = {
  upload: (body) => {
    return new Promise((resolve, reject) => {
      aiAxiosUtils
        .requestAxios({
          method: "POST",
          ignoreAuth: true,
          url: API_VAR.AI + "/prediction",
          isUseServiceUrl: true,
          data: body,
          isUpload: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
};

export default AiUploadFileProvider;
