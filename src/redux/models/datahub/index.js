const datahub = {
  state: {
    collected: {},
    liked: {},
    history: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    setAmountDeposit: ({ amount }) => {
      dispatch.datahub.updateData({ amountDeposit: amount });
    },
  }),
};

export default datahub;
