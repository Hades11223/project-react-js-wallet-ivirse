import styled from "styled-components";
import { Modal } from "antd";

export const ModalBaseWrapper = styled(Modal)`
  .ant-modal-close-x {
    padding-top: 8px;
  }
  .ant-modal-header,
  .ant-modal-footer {
    border: none;
  }
  .modal-notifi-content {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #2b2b2b;
  }
`;
