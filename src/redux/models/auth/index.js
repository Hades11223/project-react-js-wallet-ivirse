import adminProvider from "@data-access/admin-provider";
import clientUtils from "@utils/client-utils";

export default {
  state: {
    account: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    generateToken: ({ address, network }) => {
      return new Promise((resolve, reject) => {
        adminProvider
          .login({ address, network })
          .then((res) => {
            if (res.code == 0) {
              clientUtils.auth = `bearer ${res?.data?.access_token}`;
              dispatch.auth.updateData({
                auth: res,
              });
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  }),
};
