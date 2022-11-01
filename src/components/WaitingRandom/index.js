import { WaitingRequestAnimation } from "@assets/animation";
import React from "react";
import { ModalWaitingWrapper } from "./styled";

const RandomWaitingModal = ({ visible, onOk, onCancel, title, content }) => {
  return (
    <ModalWaitingWrapper
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={title}
      footer={null}
    >
      <p>{content || ""}</p>
      <p
        style={{
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "20px",
          color: "#2B2B2B",
        }}
      >
        To approve IVIRSE to trade this asset, you must first complete a fee
        (plus gas) transaction. Confirm it in your wallet and keep this tab
        open! Read more <a>here</a>
      </p>
      <div className="animation-field">
        <WaitingRequestAnimation />
      </div>

      <p className="text-center">Waiting for blockchain processing...</p>
    </ModalWaitingWrapper>
  );
};

export default RandomWaitingModal;
