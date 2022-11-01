import { Modal } from "antd";
import "./modaltrade.scss";

export default function ConnectWalletModal({
  visible,
  onCancel,
  title,
  footer,
  children,
  footerFlex,
  ...props
}) {
  return (
    <>
      <Modal
        visible={visible}
        footer={footer ? null : ""}
        className="custom-connect-wallet-modal"
        onCancel={onCancel}
        {...props}
      >
        <h1 className="connect-modal-title">{title}</h1>
        <div className="custom-modal-body">{children}</div>
        <div className={`custom-modal-footer ${footerFlex} pb-3`}>{footer}</div>
      </Modal>
    </>
  );
}
