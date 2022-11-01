import { forwardRef, useImperativeHandle, useState } from "react";
import ModalTrade from "@components/ModalTrade";

const ModalError = (props, ref) => {
  const [state, _setState] = useState({});
  const { title, visible } = props;

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ visible: true });
    },
    handleCancelModal: () => {
      onCancel();
    }
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
        {/* <div className="p-2">
          <img
            alt="metamask"
            src={require("@images/trade/modal_metamask.png")}
            width={84}
            height={84}
          />
        </div> */}
        <div className="p-2">
          {/* <h1 style={{ fontSize: "16px", fontWeight: "700" }}>MetaMask</h1> */}
          <p className="text-justify" fontSize="16px">
          The connection attempt failed. Please click try again and follow the steps to connect in your wallet.
          </p>
        </div>
      </div>
    </ModalTrade>
  );
};
export default forwardRef(ModalError);
