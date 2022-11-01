import React from "react";
import { ModalWaitingWrapper } from "./styled";
import { WaitingRequestAnimation } from "@assets/animation";

const ModalWaitingConfirm = ({ visible, onOk, onCancel }) => {
  return (
    <ModalWaitingWrapper
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title="Waiting for processing transaction"
      footer={null}
    >
      <p>
        To proceed this transaction, you are required to complete a fee (add-on
        gas) transaction. Please confirm it on your wallet and keep this tab
        open until the transaction is completed.
      </p>
      <div className="animation-field">
        <WaitingRequestAnimation />
      </div>
      <p className="text-center">Waiting for blockchain confirmation...</p>
    </ModalWaitingWrapper>
  );
};

export default ModalWaitingConfirm;
