const global = {
  state: {
    loading: false,
    scrWidth: window.innerWidth,
    navProfile: 0,
    breadcrumb: "/data-hub",
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    setLoading: (loading) => {
      dispatch.global.updateData({
        loading,
      });
    },
    setConnectType: (type) => {
      dispatch.global.updateData({
        type,
      });
    },
    setScrWidth: (scrWidth) => {
      dispatch.global.updateData({
        scrWidth,
      });
    },
    setNavProfile: (navProfile) => {
      dispatch.global.updateData({
        navProfile,
      });
    },
  }),
};

export default global;
