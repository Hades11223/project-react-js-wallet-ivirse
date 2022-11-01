import ModalTrade from "@components/ModalTrade";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const ModalInstallWallet = (props, ref) => {
  const { title, visible } = props;
  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ visible: true });
    },
    handleCancelModal: () => {
      onCancel();
    },
  }));
  const onCancel = () => {
    setState({ visible: false });
  };
  return (
    <ModalTrade
      title={title}
      visible={state.visible}
      onCancel={onCancel}
      closable={true}
      {...props}
    >
      <div className="install-wallet-modal d-flex">
        <div className="p-2">
          <img
            alt="metamask"
            src={require("@images/trade/modal_metamask.png")}
            width={84}
            height={84}
          />
        </div>
        <div className="p-2">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>MetaMask</h1>
          <p className="text-justify" fontSize="16px">
            Please install MetaMask extension in Chrome Store.
          </p>
        </div>
      </div>
    </ModalTrade>
  );
};

export default forwardRef(ModalInstallWallet);
