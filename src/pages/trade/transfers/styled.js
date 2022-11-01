import styled from "styled-components";

export const StyledWrapper = styled.div`
  padding: 0 5%;
  padding-bottom: 48px;
  margin-bottom: 48px;
  .ts-status {
    justify-content: center;
    padding-top: 14px;
    display: flex;
    .ts-ck {
      padding-top: 6.5px;
      margin-right: 6px;
      .red {
        background-color: red;
      }
      .green {
        background-color: green;
      }
      .icon {
        border-radius: 50%;
        height: 10px;
        width: 10px;
      }
    }
  }
  .TransferIcon {
    justify-content: center;
    display: flex;
    .positionOut {
      position: relative;
      left: 5px;
    }
    .state-icon {
      width: 20px;
      height: auto;
      margin-right: 6px;
    }
    .icon-text {
    }
  }

  .icon-text {
    display: inline-block;
    margin-left: 2px;
  }

  .search-input {
    width: 100%;
    .ant-input {
      border-top-left-radius: 100px;
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
      height: 38px;
    }
    .ant-input-group-addon {
      height: 38px;
      border-radius: 100px;
      button {
        border: none;
        height: 100%;
        border-top-right-radius: 100px !important;
        border-bottom-right-radius: 100px !important;
      }
      .ant-btn .anticon {
        background: radial-gradient(
          96.92% 1534.99% at 95.38% 91.84%,
          #915fcd 7.32%,
          #ae5297 100%
        );
        align-items: center;
        margin-right: 3px;
        height: 74%;
        width: 90%;
        justify-content: center;
        border-radius: 100%;
        color: white;
      }
    }
  }

  .reset-btn-wrapper {
    .ant-btn {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      border: none;
      span {
        color: white;
        margin-left: 4px;
      }
    }
    .button-reset-filter {
      padding-left: 7px;
    }
  }

  .filter-group {
    min-width: 700px;
    .custom-select-wrapper {
      position: relative;
      padding: 1px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid white;
      border-radius: 20px;
      background-color: transparent;
      width: 30%;
      .select-prefix {
        position: absolute;
        left: 8px;
        display: flex;
        align-items: center;
        color: white;
        svg {
          circle,
          path {
            stroke: white;
          }
        }
        .custom-css-icon {
          width: 20px;
          height: 20px;
          circle,
          path {
            stroke-width: 0.01;
          }
        }
        span {
          margin-left: 4px;
        }
      }
      .ant-select-selector {
        background-color: transparent;
        border: none;
        .ant-select-selection-item {
          color: white;
          position: absolute;
          left: 72px;
        }
      }
      .ant-select-arrow {
        color: white;
      }
    }
  }

  .table-transfer {
    .ant-table-thead {
      .ant-table-cell:nth-child(6) {
        background-color: #6a4fdd;
      }
      .ant-table-cell:nth-child(7) {
        background-color: #593ed1;
      }
      .ant-table-cell:nth-child(8) {
        background-color: #4d33bf;
      }
      .ant-table-cell:nth-child(9) {
        background-color: #4530a2;
      }
    }
  }

  .active-btn {
    .ant-btn {
      border: none;
      background-color: white;
      svg {
        path {
          stroke: #9b5fcc;
        }
      }
      span {
        font-weight: 700;
        color: #9b5fcc;
      }
    }
  }
  .filter-drawer-btn {
    display: none;
  }
  @media screen and (max-width: 992px) {
    #transfer-toggle-and-search {
      margin-bottom: 9px;
      flex-direction: column;
      .search-table {
        margin-top: 12px;
        margin-bottom: 24px;
        @media screen and (max-width: 992px) {
          display: flex;
          align-items: center;
        }
      }
    }
    #transfer-filter {
      display: none;
    }
    .filter-drawer-btn {
      display: block;
    }
  }

  @media screen and (max-width: 576px) {
    .transfer-title {
      font-size: 30px;
      line-height: 32px;
    }
  }
`;
