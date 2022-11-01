import styled from "styled-components";

export const DataInfoStepWrapper = styled.div`
  .type-field {
    margin-top: 24px;
  }
  .type-select-table {
    border: 1px solid #6e6e6e;

    border-radius: 20px;
    .type-select-table__header {
      border-radius: 15px 15px 0px 0px;
      padding: 12px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #6e6e6e;
      background-color: rgba(155, 95, 204, 0.2);
      .menu-head {
        width: 30%;
      }
      .summary-head {
        width: 70%;
      }
    }
    .type-select-table__body {
      .type-select-item {
        &:last-child {
          .type-select-item__title {
            border-bottom-left-radius: 20px;
            border-bottom: none;
          }
          .type-select-item__select-field {
            border-bottom-right-radius: 20px;
            border-bottom: none;
          }
        }
        .type-select-item__title {
          width: 30%;
          padding: 12px;
          border: 1px solid #c6c6c6;
          border-left: none;
        }
        .type-select-item__select-field {
          border: 1px solid #c6c6c6;
          width: 70%;
          padding: 12px;
          border-right: none;
          .ant-select {
            width: 100%;
          }
          .ant-select-selector {
            border: none;
            outline: none;
          }
          .ant-select-selection-placeholder {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #6e6e6e;
          }
        }
      }
    }
  }
  .reason-field,
  .description-field {
    .ant-input-textarea-show-count::after {
      position: absolute;
      right: 10px;
    }
    .description-input {
      position: relative;
      border-radius: 20px;
      border: 1px solid #6e6e6e;
      padding: 16px;
      .ant-input {
        border: none;
        width: 90%;
        &::placeholder {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #6e6e6e;
        }
      }
    }
  }
`;
export const SaleInfoStepWrapper = styled.div`
  .search-avatar {
    .ant-input {
      border-right: none;
    }
    .ant-btn {
      border: 1px solid #c6c6c6;
      border-left: none;
    }
  }
  .price-field {
  }
  .expired-field {
    .expired-date-picker,
    .expired-hours-picker {
      padding: 8px 16px;
      border: 1px solid #6e6e6e;
      border-radius: 20px;
    }
    .expired-date-picker {
      width: 100%;
    }
    input {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      color: #6e5ac3;
    }
  }
  .hastag-field {
    margin-bottom: 48px;
  }
`;

export const GeneralStyleWrapper = styled.div`
  .line-title {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #2b2b2b;
    margin-right: 12px;
  }
  .line-value {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    color: #9b5fcc;
  }
`;
