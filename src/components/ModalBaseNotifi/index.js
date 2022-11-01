import { CloseOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import React from "react";
import { ModalBaseWrapper } from "./styled";
import { CorrectLine, WrongLine } from "@assets/animation";

const ModalNotification = ({
  modalAddingCssClass = "",
  footerAddingCssClass = "",
  visible,
  onCancel = () => {},
  onOk = () => {},
  type,
  content,
  title,
  actionContent = "OK",
  closeContent = "Cancel",
  ...props
}) => {
  return (
    <ModalBaseWrapper
      className={`notification-modal ${modalAddingCssClass}`}
      visible={visible}
      onCancel={onCancel}
      title={title}
      closeIcon={<CloseOutlined />}
      footer={
        <div
          className={`notification-modal__footer d-flex justify-content-end ${footerAddingCssClass}`}
        >
          {type === "success" ? (
            <>
              <TradeButton
                type="gradient"
                content={closeContent}
                onClick={onCancel}
              />
            </>
          ) : (
            <>
              <TradeButton
                type="transparent_gray"
                content={closeContent}
                onClick={onCancel}
              />
              <TradeButton
                type="gradient"
                content={actionContent}
                onClick={onOk}
              />
            </>
          )}
        </div>
      }
      {...props}
    >
      <div className="modal-notifi-content__wrapper">
        <div className="modal-icon-noti">
          {type === "success" ? <CorrectLine /> : <WrongLine />}
        </div>
        <p className="modal-notifi-content text-center mt-4">{content}</p>
      </div>
    </ModalBaseWrapper>
  );
};

export default ModalNotification;
