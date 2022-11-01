import { Modal } from "antd";
import styled from "styled-components";

export const WrapperDashBoard = styled.div`
  .chart-container {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 992px) {
      flex-direction: column;
    }
    .piechart-container {
      width: 45%;
      background: linear-gradient(
        111.68deg,
        rgba(49, 56, 94, 0.29) 7.59%,
        rgba(2, 9, 45, 0.39) 102.04%
      );
      backdrop-filter: blur(22px);
      border-radius: 20px;
      padding: 2%;
      height: 360px;
      margin-bottom: 20px;
      @media screen and (max-width: 992px) and (min-width: 576px) {
        width: 100%;
        height: 275px;
      }
      @media screen and (max-width: 577px) {
        width: 100%;
        height: 275px;
      }
      .piechart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #ffffff;
        margin-bottom: 20px;
      }
      .piechart-item {
        display: flex;
        justify-content: space-between;
        &-left {
        }
        &-right {
          width: 100%;
          margin-left: 5px;
          @media screen and (max-width: 1024px) and (min-width: 992px) {
            margin-left: 0px;
          }
          @media screen and (max-width: 992px) and (min-width: 576px) {
            margin-left: 60px;
          }
          @media screen and (max-width: 575px) {
            margin-left: 20px;
          }
          .content-right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            &-legend {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-weight: 500;
              font-size: 12px;
              line-height: 18px;
              @media screen and (max-width: 992px) and (min-width: 576px) {
                font-weight: 400;
                font-size: 20px;
                line-height: 25px;
              }
              @media screen and (max-width: 577px) {
                font-size: 14px;
                line-height: 17px;
              }
              /* margin-left: 5px; */
              color: #ffffff;
              width: 80%;
              &-left {
                /* margin-right: 10px; */
              }
            }
          }
        }
      }
    }
    .barchart-container {
      background: linear-gradient(
        111.68deg,
        rgba(49, 56, 94, 0.29) 7.59%,
        rgba(2, 9, 45, 0.39) 102.04%
      );
      backdrop-filter: blur(22px);
      border-radius: 20px;
      padding: 2%;
      width: 52%;
      height: 360px;
      @media screen and (max-width: 992px) {
        width: 100%;
        /* height: 500px; */
      }
      .barchart-total {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #ffffff;
      }
    }
  }
  .line-chart-container {
    height: 400px;
    background: linear-gradient(
      111.68deg,
      rgba(49, 56, 94, 0.29) 7.59%,
      rgba(2, 9, 45, 0.39) 102.04%
    );
    backdrop-filter: blur(22px);
    border-radius: 20px;
    padding: 2%;
    margin-top: 40px;
    display: flex;
    padding-bottom: 55px;
    @media screen and (max-width: 992px) and (min-width: 576px) {
      flex-direction: column;
      height: 800px;
      padding-bottom: 100px;
    }
    @media screen and (max-width: 576px) {
      flex-direction: column;
      height: 600px;
      padding-bottom: 100px;
    }
    .line-chart-left {
      width: 70%;
      @media screen and (max-width: 992px) {
        height: 60%;
        width: 100%;
      }
      &-title {
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 20px;
      }
    }
    .line-chart-right {
      width: 30%;
      @media screen and (max-width: 992px) {
        width: 100%;
      }
      &-title {
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 20px;
        @media screen and (max-width: 576px) {
          font-size: 18px;
        }
      }
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        @media screen and (max-width: 992px) {
          /* justify-content: space-between; */
        }
        &-img {
          width: 20px;
          height: 20px;
          margin-right: 20px;
          @media screen and (max-width: 992px) {
            margin-right: 60px;
          }
        }
        &-content {
          width: 70%;
          color: #ffffff;
          @media screen and (max-width: 992px) {
            width: 100%;
          }

          .content-up {
            display: flex;
            justify-content: space-between;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            @media screen and (max-width: 992px) and (min-width: 576px) {
              font-size: 20px;
              line-height: 25px;
            }
            @media screen and (max-width: 576px) {
              font-size: 16px;
              line-height: 18px;
            }
          }
          .content-down {
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            @media screen and (max-width: 992px) and (min-width: 576px) {
              font-size: 18px;
              line-height: 22px;
            }
            @media screen and (max-width: 576px) {
              font-size: 14px;
              line-height: 17px;
            }
          }
        }
      }
    }
  }
`;

export const ProfileWrapper = styled.div`
  padding: 0 5% 5% 5%;
  .content {
    display: flex;
    margin-top: 50px;
    @media screen and (max-width: 992px) {
      flex-direction: column;
    }
    &__tabs {
      display: flex;
      justify-content: start;
      flex-direction: column;
      width: 20%;
      @media screen and (max-width: 992px) {
        width: 100%;
      }
      &-mobile {
        display: flex;
        /* justify-content: space-between; */
        margin-bottom: 20px;
        /* gap: 10px; */
        @media screen and (max-width: 768px) and (min-width: 576px) {

          a {
            /* width: 35%; */
          }
        }
        @media screen and (max-width: 576px) {

          a {
            /* width: 45%; */
          }

        }
      }
      &-item {
        display: flex;
        align-items: center;
        &-icon {
          margin-right: 8px;
        }
      }
    }
    &__data {
      width: 80%;
      @media screen and (max-width: 992px){
        width: 100%;
      }
    }
  }
  .price-range-containter {
    margin-top: 8px;
    .price-range-wrapper {
      display: flex;
      align-items: center;
      input {
        width: 50%;
      }
    }
  }
  .show-more {
    padding-bottom: 10px;
    a {
      text-decoration: none;
      color: white;
    }
  }
`;

export const LikedWrapper = styled.div`
  .market-place-search {
    margin: 15px 0;
  }
  .group-items {
    /* width: 80%; */
    padding-left: 20px;
    @media screen and (max-width: 992px) {
      padding: 0;
    }
    .result-number {
      color: white;
      span:first-child {
        font-size: 20px;
        line-height: 22px;
        font-weight: 700;
      }
      span:last-child {
        font-size: 14px;
        line-height: 18px;
        font-weight: 400;
      }
    }
    .group-items__body {
      margin-top: 24px;
    }
  }
`;

export const TabItem = styled.div`
  background: transparent;
  padding: 15px 0px;
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-transform: uppercase;
  cursor: pointer;

  .content__tabs-item {
    color: ${(props) => (props.active ? "#fff" : "#C6C6C6")};
  }
`;

export const HistoryWrapper = styled.div`
  .history-container {
    .history-header {
      display: flex;
      justify-content: end;
      &-search {
        margin-bottom: 30px;
        width: 60%;
        @media screen and (max-width: 992px) {
          width: 100%;
        }
      }
    }
    .history-contain {
      &-result {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #ffffff;
        margin-bottom: 10px;
        span:nth-child(3) {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
        }
      }
    }
  }
`;
export const CollectedWrapper = styled.div``;

export const OpacityBoxHistoryWrapper = styled.div`
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 10px;
  .history {
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    &-left {
      &-date {
        p {
          margin: 0;
        }
        p:nth-child(1) {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #c6c6c6;
        }
        p:nth-child(2) {
          font-weight: 400;
          font-size: 20px;
          line-height: 25px;
        }
      }
      &-dataId {
        font-weight: 700;
        font-size: 24px;
        line-height: 22px;
      }
      &-status {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
      }
    }
    &-right {
      width: 30%;
      direction: rtl;
      &-owner {
        margin-top: 10px;
        p {
          margin: 0;
        }
      }
    }
  }
`;

export const RequestWrapper = styled.div`
  .status {
    &.accepted {
      color: #0a9921;
    }
    &.rejected {
      color:white;
    }
    &.expired {
      color:white;
    }
  }
`;
