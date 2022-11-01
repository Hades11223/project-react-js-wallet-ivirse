import styled from "styled-components";
let headerHeight = "90px";
export const HeaderWrapper = styled.div`
  padding: 3% 5% 0% 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  position: fixed;
  width: 100%;
  height: ${headerHeight};
  top: 0;
  z-index: 99;
  background-color: transparent;
  padding: 0px 20px;

  &.scroll-blur {
    backdrop-filter: blur(20px);
  }

  @media screen and (max-width: 576px) {
    height: calc(${headerHeight}*2 / 3);
  }

  &.show-menu {
    .routes {
      background-color: rgba(0, 0, 0, 0.9) !important;
      background: rgba(0, 0, 0, 0.9) !important;
    }
  }
  .routes {
    display: flex;
    justify-content: space-around;
    width: 50%;
    .item-menu {
      padding: 5px;
      max-width: 105px;
      margin-left: 25px;
    }
    .item-menu:hover {
      font-weight: bold;
    }
  }

  .info-account {
    display: flex;
    gap: 20px;
    @media screen and (max-width: 992px) {
      position: fixed;
      bottom: 0;
      left: 10px;
      right: 10px;
      /* right: 0; */
      background-color: rgba(56, 23, 95, 0.1);
      backdrop-filter: blur(20px);
    }
    @media screen and (max-width: 576px) {
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      flex-direction: row-reverse;

      .space + span {
        margin-top: 5px;
      }
    }
    .network {
      position: relative;
      white-space: nowrap;
      /* padding: 5px 10px; */
      border-radius: 100px;
      display: flex;
      height: 35px;

      align-items: center;
      cursor: pointer;
      @media screen and (max-width: 576px) {
        height: 40px;
        &-select {
          height: 40px;
        }
      }
      .ant-select {
        height: 100%;
        .ant-select-selector {
          @media screen and (max-width: 576px) {
            height: 100%;
          }
          .ant-select-selection-item {
            margin-left: 20px;
            display: flex;
            align-items: center;
          }
          border: 1px solid #ffffff;
          border-radius: 20px;
          background: transparent;
          color: wheat;
        }
      }
      .ant-select-arrow {
        color: wheat;
      }
      .icon-nk {
        width: 24px;
        height: 24px;
      }
      .name-nk {
        margin-left: 5px;
        font-size: 14px;
        white-space: nowrap;
      }
      .arrow-down {
        font-size: 14px;
        margin-left: 3px;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #27d0c6;
        position: absolute;
        left: 15px;
      }
    }
    .token-address-text {
      height: 35px;
      padding: 6px 10px;
      background: #6e5ac3;
      border-radius: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      @media screen and (max-width: 576px) {
        flex-direction: column;
        height: unset;
        align-items: flex-start;
        padding: 3px 25px;
        border-radius: 35px;
        height: 40px;
        font-size: 12px;
      }
      .address {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
      .space {
        margin: 0px 10px;
      }
      .balance {
        display: flex;
        align-items: center;
        white-space: nowrap;

        .IVI-icon {
          padding-top: 6px;
          margin-right: 4px;
          @media screen and (max-width: 576px) {
            /* width: 15px;
            height: 15px; */
            padding-top: 0;
          }
        }
        @media screen and (max-width: 576px) {
          /* width: 126px; */
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .account {
      align-items: center;
      display: flex;
      .wrapper-account {
        cursor: pointer;
        /* background: linear-gradient(to right, #a95197, #565197); */
        padding: 2px;
        border-radius: 10px;
        margin-left: 10px;

        .account-content {
          border-radius: 10px;
          padding: 5px 12px;
          font-size: 16px;
          background-color: #424d6d;
          transition: all 0.8s;
          cursor: pointer;
          color: white;
          border: none;
        }
        .account-content:hover {
          background: linear-gradient(to right, #a95197, #565197);
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .routes {
      .item-menu {
        display: none;
        display: flex;
        white-space: nowrap;
        max-width: 100%;
        font-size: 18px;
        vertical-align: middle;
        align-items: center;
      }
    }
    .logo-header {
      margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .collapse-icon {
      display: none;
    }
  }
  @media screen and (max-width: 992px) {
    .info-account {
      padding-bottom: 16px;

      .account {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1199px) and (min-width: 992px) {
    .routes {
      .item-menu {
        display: none;
        display: flex;
        /* white-space: nowrap; */
        max-width: 150px;
        font-size: 16px;
        vertical-align: middle;
        align-items: center;
      }
    }
    .logo-header {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .collapse-icon {
      display: none;
    }
  }

  @media screen and (max-width: 1200px) and (min-width: 768px) {
    .routes {
      display: none;
    }
    .collapse-icon {
      display: block;
    }
  }

  @media screen and (max-width: 767px) {
    .routes {
      display: none;
    }
    .logo-header {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .collapse-icon {
      display: block;
    }
  }

  &.show-menu {
    background: linear-gradient(to bottom, #424d6d, #585778);
    .routes {
      display: block;
      position: fixed;
      top: ${headerHeight};
      background-color: blue !important;
      width: 100%;
      left: 0;
      padding: 5px 25px;
      height: 420px;
      .item-menu {
        max-width: 100%;
        padding: 8px 5px;
      }
    }
  }
`;

export const SellImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1%;
  .button-sell {
    font-weight: 600;
    border: none;
    border-radius: 10px;
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #565197 7.32%,
      #ae5297 100%
    );
  }

  .img-border {
    height: 500px;
    border-radius: 20px;
  }
`;
export const TextHeaderWrapper = styled.div`
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
`;

export const HeaderMenuWrapper = styled.div`
  display: none;
  @media screen and (max-width: 1200px) and (min-width: 768px) {
    display: block;
  }

  @media screen and (max-width: 767px) and (min-width: 576px) {
    display: block;
  }
  @media screen and (max-width: 576px) {
    display: block;
  }
  ul {
    list-style: none;
  }
  .footer-drawer {
    margin-top: 40px;
    svg {
      fill: red;
    }
  }
  

  .menu-ipad {
    background-color: transparent;
    border: none !important;
  }
`;
