import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import "./style.scss";

const snackbarUtils = {
  success: (title = "", content, customOk = () => {}, okText = "Ok") => {
    Modal.success({
      title,
      content,
      style: { minHeight: "300px" },
      wrapClassName: "wrapper-confirm-modal",
      onOk: async () => {
        customOk();
      },
      okText,
    });
  },
  error: (
    title = "",
    content,
    customOk = () => {},
    okText = "Cancel",
    closable = false,
    closeIcon = <CloseOutlined />
  ) => {
    Modal.error({
      title,
      content,
      style: { minHeight: "300px" },
      wrapClassName: "wrapper-confirm-modal",
      onOk: async () => {
        customOk();
      },
      okText,
      closable,
      closeIcon,
    });
  },

  confirm: ({ title = "", content, onOk = () => {}, ...props }) => {
    Modal.confirm({
      title,
      content,
      style: { minHeight: "300px" },
      wrapClassName: "wrapper-confirm-modal",
      onOk,
      ...props,
    });
  },
  warning: (title = "", content, customOk = () => {}) => {
    Modal.warning({
      title,
      content,
      style: { minHeight: "300px" },
      wrapClassName: "wrapper-confirm-modal",
      onOk: async () => {
        customOk();
      },
    });
  },
};

export default snackbarUtils;
