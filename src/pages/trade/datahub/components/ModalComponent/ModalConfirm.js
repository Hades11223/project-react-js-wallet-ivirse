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
      Are you sure you want to report this asset's issues?
      </p>
      
    </ModalWaitingWrapper>
  );
};

export default ModalWaitingConfirm;
