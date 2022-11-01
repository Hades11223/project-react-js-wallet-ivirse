import styled from "styled-components";
import { Modal } from "antd";

export const ModalSwapWrapper = styled(Modal)`
  padding: 8px;
  .ant-modal-close-x {
    padding-top: 4px;
    svg {
      fill: black;
    }
  }
  .token-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
  .wrapper.disabled {
    cursor: not-allowed;
    .token-swap-item {
      pointer-events: none !important;
    }
  }
  .token-swap-item {
    padding: 12px 4px;
    .token-swap-item__info {
      .name,
      .description {
        margin-bottom: 0px;
      }
      .name {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #2b2b2b;
      }
      .description {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #2b2b2b;
      }
    }
    .token-swap-item__price {
      .token-price {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        text-align: right;
        color: #2b2b2b;
        margin-bottom: 0px;
      }
      .usd-price {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: right;
        color: #2b2b2b;
        margin-bottom: 0px;
      }
    }
  }
  .token-swap-item:hover {
    background-color: #9b5fcc;
    cursor: pointer;
    /* .token-price,
    .name {
      color: #9b5fcc;
    } */
    .name,
    .token-price,
    .description,
    .usd-price {
      color: white !important;
    }
  }
  .line-dash:last-child {
    display: none;
  }
  .active {
    color: #9b5fcc !important;
  }
`;
