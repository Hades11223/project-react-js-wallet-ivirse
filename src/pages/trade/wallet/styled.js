import styled from "styled-components";

export const WrapperStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
  /* .transparent-box{
    width: 100%;
    min-height: 500px;
    color: transparent;
  } */

  .custom-input::placeholder {
    font-style: italic;
  }
  .custom-input:focus::placeholder {
    color: transparent;
  }

  .custom-input {
    /* height: 20px; */
    background-color: transparent;
    border: none;
    color: white;
  }
  .custom-input:focus {
    box-shadow: none;
  }

  .ant-card-bordered {
    width: 400px;
    padding-bottom: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px #ccc;
    .ant-card-body {
      padding: 8px;
      #card-header-icon {
        width: 100%;
        position: relative;
        /* margin-bottom: 36px; */
        .tunning-icon {
          position: absolute;
          right: 0px;
          top: 0px;
        }
      }
      .tunning-icon :hover {
        cursor: pointer;
        fill: #ccc;
        transition: fill 0.4s;
      }
    }

    .card-item:nth-child(2) {
      display: flex;
    }
    .card-item .card-item__info {
      margin-bottom: 8px;
      #gas-limit div,
      #gas-price div {
        color: white;
        padding-left: 16px;
      }
    }
    .card-item__info:last-child {
      display: flex;
      justify-content: space-between;
      div {
        flex: 50%;
        color: white;
      }
      div:first-child {
        margin-right: 32px;
      }
    }
    .card-item__info:nth-child(2) .item-info__detail {
      align-items: center;
    }
    .card-item {
      /* height: 50px; */
      background: radial-gradient(
        96.92% 1534.99% at 95.38% 91.84%,
        #a8a5c3 7.32%,
        #d0a7c6 100%
      );
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 15px;
      margin-top: 10px;
      padding: 5px 12px 5px 12px;

      #currency-icon {
        display: flex;
        align-items: center;
        margin-right: 8px;
        img {
          width: 20px;
          height: 20px;
        }
      }

      #currency-name {
        margin: 0px;
        line-height: 17px;
      }

      .card-item__label {
        color: #3f4c6c;
        font-weight: 700;
      }
      .item-info__detail {
        padding-left: 10px !important;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px;
        background-color: #3f4c6c;
        border-radius: 15px;
        height: 50px;

        #asset-left {
          span {
            margin-left: 8px;
            color: #949494;
            display: block;
          }
        }
        #asset-right {
          display: flex;
          div:first-child {
            margin-right: 6px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
              text-align: right;
              margin: 0px;
              line-height: 15px;
            }
            #asset-name {
              color: white;
              font-weight: 600;
            }
            #asset-amount {
              color: #b8b8b8;
            }
          }

          .asset-icon {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .message-success {
    font-weight: 600;
    font-size: 19px;
    padding-top: 10px;
    margin-bottom: -20px;
    text-align: center;
    color: lightgreen;
  }
  .message-error {
    font-weight: 600;
    font-size: 19px;
    padding-top: 10px;
    margin-bottom: -20px;
    text-align: center;
    color: red;
  }
  /* .ant-modal-content {
    background-color: white;
    width: 520px;
    min-height: 150px;
  } */
  /* .ant-modal-body {
    width: 100%;
    text-align: center;
    color: lightgreen;
    padding-top: 48px;
    font-size: 33px;
    padding: 0px;
    line-height: 1.5715;
    word-wrap: break-word;
  } */
  .ant-input-number-handler-wrap {
    display: none;
  }

  .button-fail {
    background-color: yellow;
  }

  .card-contain {
    background-color: transparent;
    width: 500px;
    .head {
      padding: 16px;
      border-radius: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: hsla(0, 100%, 10%, 0.1);
      font-family: "Bai Jamjuree";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      color: white;
      @media screen and (max-width: 576px) {
        flex-direction: row;
      }
      .address-block {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          .address-title {
            line-height: 24px;
          }
        }
        .content {
        }
      }
      .price-block {
        /* width: 10%; */
        /* @media screen and (max-width: 576px) {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
          align-items: center;
          .icon {
            display: flex;
            align-items: center;
          }
        } */
        .flex {
          display: flex;
          align-items: center;
          .icon {
            margin-left: 8px;
          }
        }
        .balance {
          @media screen and (max-width: 576px) {
            padding-right: 10px;
          }
        }
      }
    }
    .body {
      border-radius: 30px;
      margin-top: 8px;
      width: 100%;
      background-color: hsla(0, 100%, 10%, 0.1);
      font-family: "Bai Jamjuree";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 26px;
      color: white;
      .content {
        padding: 15px;
        .mg-bt-15 {
          margin-bottom: 15px;
        }
        .asset-input {
          background-color: white;
          border-radius: 20px;
          .ant-input-number {
            border-radius: 20px;
            .ant-input-number-input-wrap {
              .ant-input-number-input {
                padding: 4px 11px;
                height: auto;
              }
            }
          }
          .currency-input {
            border: none;
            padding: 4px 16px;
            &:focus-visible {
              border: none;
              outline: none;
            }
            &::placeholder {
              color: #c1c1c1;
              font-style: italic;
            }
            &:focus::placeholder {
              color: transparent;
            }
          }
          input {
            border-radius: 20px;
            color: black;
            font-family: "Bai Jamjuree";
            font-style: normal;
            font-size: 16px;
            line-height: 26px;
          }
        }
        .est {
          display: flex;
          justify-content: space-between;
          .title {
            width: 30%;
          }
          .gas-fee {
            width: 33%;
            display: flex;
            justify-content: space-between;
          }
        }
        .line {
          width: 100%;
          background-color: white;
          height: 2px;
          margin-bottom: 15px;
        }
        .footer {
          margin-top: 20px;
          padding-top: 0px;
        }
        .footer:hover {
          /* opacity:0.8; */
          button {
            color: black;
          }
        }
      }
    }
  }

  /* Responsive */
  @media screen and (max-width: 576px) {
    height: unset;
    /* margin-top: -50px; */
    padding-top: 10px;
  }
  @media screen and (min-height: 78px) and (max-width: 576px) {
    padding-top: 20%;
  }
  @media screen and (max-width:400px) {
    padding-top: 0px!important;
  }
  @media screen and (min-width: 993px) {
    padding-bottom: 120px;
  }
  @media screen and (max-width: 992px) {
    .card-contain {
      width: 90%;
    }
  }
  @media screen and (max-width: 992px) and (min-width: 577px) {
    .wallet-title {
      margin-top: -150px;
    }
  }
  @media screen and (min-width: 577px) {
    justify-content: unset;
    .wallet-title {
      margin-top: unset;
    }
  }

  @media screen and (max-width: 576px) {
    .wallet-title {
      font-size: 40px !important;
      line-height: 40px;
      /* padding-top: 50px; */
    }
    .card-contain {
      width: 100%;
      .head {
        background-color: rgba(0, 0, 0, 0.25);
        .icon {
          padding-top: 3.5px;
        }
      }
      .body {
        background-color: rgba(0, 0, 0, 0.25);
        .est {
          .title {
            width: auto !important;
          }
        }
      }
    }
  }
`;
