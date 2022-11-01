import styled from "styled-components";

export const DepositPageWrapper = styled.div`
  padding: 0 5%;
  .deposit-header {
  }
  .deposit-body__wrapper {
    .deposit-body {
      width: 530px;
      height: 300px;
      background-color: ${(props) =>
        props.isImplement ? "#A1E1CA" : "rgba(0, 0, 0, 0.3)"};
      border-radius: 20px;
      padding: 12px 16px;
      .deposit-body__swap-header {
        .wallet,
        .datahub {
          svg {
            margin-right: 8px;
          }
          span {
            font-weight: 700;
            font-size: 20px;
            line-height: 22px;
            text-align: right;
            text-transform: uppercase;
            color: #ffffff;
          }
        }
        .swap-btn {
          flex-direction: column;
          .swap-btn-item svg path {
            fill: #c6c6c6;
            opacity: 0.3;
          }
          .swap-btn-item.active svg path {
            fill: white;
            opacity: 1;
          }

          button {
            background-color: transparent;
            border: none;
            outline: none;
            padding: 0 15px;
            height: auto;
            line-height: 10px;
          }
        }
      }
      .deposit-swap-text {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #ffffff;
      }
      .deposit-body__swap-body {
        background: #ffffff;
        border-radius: 20px;
        padding: 8px;
        .token-swap {
          .token-swap-btn {
            /* background-color: #f6f6f6;
            border-radius: 20px; */
            border: none;
            box-shadow: none;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #2b2b2b;
          }
        }
        .token-balance {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          text-align: right;
          color: #2b2b2b;
          padding-right: 15px;
        }
      }

      .token-amount {
        padding-left: 15px;
        .currency-input {
          border: none;
          outline: none;
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 22px;
          color: #2b2b2b;
        }
      }
      .estimate-gas-fee {
        margin-top: 24px;
        border-bottom: 1px solid #ffffff;
        padding-bottom: 24px;
        margin-bottom: 16px;
        span.title {
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #ffffff;
        }
        .value {
          span {
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #ffffff;
          }
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #ffffff;
        }
        span,
        p {
          color: white;
        }
      }
    }
  }
`;
