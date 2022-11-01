import { Carousel, Drawer, Modal } from "antd";
import styled from "styled-components";
export const ModalConfirmRequestWrapper = styled(Modal)`
  pointer-events: none;
  .explain-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    /* Black color */

    color: #2b2b2b;
  }
  .ant-modal-header,
  .ant-modal-footer {
    border: none;
  }
  .ant-modal-close-x {
    padding-top: 8px;
  }
  .info-field {
    background: rgba(161, 225, 202, 0.2);
    border-radius: 10px;
    min-height: 100px;
    padding: 12px 12px;
    .img-field {
      background: linear-gradient(123.23deg, #94e0c4 -16.4%, #8bc5b0 71.36%);
      border-radius: 5px;
      padding: 12px;
    }
    .text-info-field {
      h1 {
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #2b2b2b;
      }
      .price-field {
        .token-icon__wrapper {
          padding: 8px;
          padding-top: 0px;
          display: flex;
          /* align-items: center; */
          justify-content: center;
          .token-icon {
            width: 24px;
            height: 24px;
          }
        }
        p {
          margin-bottom: 0px;
        }
        .token-value {
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #2b2b2b;
        }
        .usdt-value {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-align: right;
          color: #6e6e6e;
        }
      }
      .requester {
        margin-top: 32px;
        .requester-avatar {
          padding: 8px;
          padding-top: 0px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .requester-info {
          p {
            margin-bottom: 0px;
          }
          p:first-child {
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #6e6e6e;
          }
          p:last-child {
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #6e6e6e;
          }
        }
      }
    }
  }

  .warning-field {
    margin-top: 8px;
    margin-bottom: 16px;
    border: 1px solid rgba(155, 95, 204, 0.2);
    border-radius: 10px;
    padding: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-align: justify;
    color: #000000;
  }
  .expired-field {
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #2b2b2b;
    }
    .ant-statistic-content-value {
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      color: #9b5fcc;
    }
  }
`;
export const SidebarFilterItemWrapper = styled.div`
  color: white;
  .padding-item {
    padding-top: 15px;
  }
  .filter-checkbox {
    .ant-checkbox-wrapper {
      .ant-checkbox {
        display: none;
      }
    }
  }
  .filter-radio {
    .ant-radio-wrapper {
      span {
        color: #ffffff !important;
        font-weight: 500 !important;
        font-size: 14px !important;
      }
      .ant-radio {
        display: none;
      }
    }
    label:nth-child(${(props) => props.activedList}) {
      span {
        width: fit-content;
        font-weight: 700 !important;
        background: rgba(28, 12, 49, 0.3);
        border-radius: 10px;
        color: #ffffff !important;
      }
    }
  }
  .actived {
    font-weight: 700;
    background: rgba(28, 12, 49, 0.3);
    border-radius: 10px;
  }
  .filter-group__title {
    color: #8ed8b3;
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
  }
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    .ant-checkbox-wrapper {
      margin-bottom: 8px;
      .ant-checkbox-input {
        background-color: transparent;
      }
      span {
        background-color: transparent;
        color: #c6c6c6;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    .ant-radio-wrapper {
      margin-bottom: 8px;
      span {
        background-color: transparent;
        color: #c6c6c6;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
  .filter-group-divider {
    border: 1px solid #b0b0b0;
    width: 100%;
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .item-filter {
    width: fit-content;
    padding: 2px 5px;
    font-size: 14px;
  }
  .rotate90 {
    rotate: -90deg;
  }
`;

export const SidebarFilterWrapper = styled.div`
  color: white;
  .filter-group_wrapper {
    &:last-child {
      .filter-group-divider {
        display: none;
      }
    }
  }
`;

export const GroupItemWrapper = styled.div`
  .trade-item.status-granted {
    .expired-in p:first-child,
    .name,
    .like-count {
      color: #b0b0b0;
    }
    .like-count:hover {
      transform: scale(1.02);
    }
  }
  .user-liked {
    path {
      fill: red !important;
    }
  }
`;

export const AssetItemWrapper = styled.div`
  /* z-index : -999; */
  height: 410px;
  @media screen and (max-width: 576px) {
    height: 300px;
  }
  &.trade-item {
    background-color: rgba(81, 51, 122, 0.8);
    border-radius: 10px;
    /* height: 441px; */
    z-index: -999;
    padding: 24px;
    @media screen and (max-width: 576px) {
      padding: 12px;
    }
    .trade-item__image {
      position: relative;
      border-radius: 5px;
      height: 209px;
      background: linear-gradient(90deg, #8ea89f 0%, #638c7d 83.69%);
      @media screen and (max-width: 576px) {
        height: 150px;
      }
      &.listed {
        background: linear-gradient(90deg, #8ea89f 0%, #638c7d 83.69%);
      }
      &.owner {
        background: linear-gradient(
          318.33deg,
          #dc66e7 -42.83%,
          #ffcac5 108.59%
        );
      }
      &.granted {
        background: linear-gradient(317.19deg, #726fce 33.56%, #6a4ff0 56.1%);
      }
      &.reported {
        background: linear-gradient(121.02deg, #f9a86e 11.95%, #ed9aa9 101.41%);
      }
      img {
        /* width: 70%;
        height: 70%; */
      }
      &-card {
        @media screen and (max-width: 576px) {
          width: 60px;
        }
      }
      .status {
        position: absolute;
        bottom: 8px;
        left: 8px;
        background: #ffffff;
        border-radius: 20px;
        padding: 4px 16px;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #8aa89d;
        .ivi-currency {
        }
        &.available {
          color: #8aa89d;
        }
        &.active {
          color: #e98cda;
        }
        &.sold {
          color: #6b51ee;
        }
        &.accessible {
          color: #f6a57f;
        }
      }
      .avatar {
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: -20px;
        left: 12px;
        @media screen and (max-width: 576px) {
          width: 35px;
          height: 35px;
        }
      }
      .granted-overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(28, 12, 49, 0.8);
        border-radius: 5px;
        .granted {
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          position: absolute;
          transform: rotate(-23.48deg);
          p {
            margin-bottom: 0px;
          }
          p:first-child {
            font-style: normal;
            font-weight: 700;
            font-size: 30px;
            line-height: 55px;
            text-transform: uppercase;
            color: #c6c6c6;
            @media screen and (max-width: 576px) {
              font-size: 24px;
              line-height: 45px;
            }
          }
          p:last-child {
            padding: 4px 0px;
            text-align: center;
            background: #d9d9d9;
            border-radius: 5px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            text-transform: uppercase;

            color: #2c0d4c;
            @media screen and (max-width: 576px) {
              font-size: 12px;
            }
          }
        }
      }
    }
    .name-and-like-count {
      margin-top: 24px;
      &-badge {
        font-size: 11px;
        padding: 3px;
      }
      .name {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        @media screen and (max-width: 576px) {
          font-size: 12px;
        }
        .anticon-copy {
          padding: 0!important;
          svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      }
      .like-count {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: white;
        @media screen and (max-width: 576px) {
          font-size: 12px;
          line-height: 15px;
        }
      }
      .like-count:hover {
        transform: scale(1.1);
      }
    }
    .code {
      margin-top: 8px;
      .code-value {
        margin-left: 4px;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #b0b0b0;
      }
    }
    .current-bid {
      margin-top: 20px;
      margin-bottom: 16px;
      & > span {
        font-weight: 400;
        font-size: 14px;
        color: #b0b0b0;
      }
      @media screen and (max-width: 576px) {
        margin-top: 5px;
        margin-bottom: 10px;
      }
      .current-bid__value {
        span {
          margin-left: 4px;
        }
        .currency-value {
          font-weight: 700;
          font-size: 20px;
          line-height: 22px;
          color: #ffffff;
          @media screen and (max-width: 576px) {
            font-size: 15px;
            line-height: 17px;
          }
        }
        .currency-name {
          font-weight: 400;
          font-size: 16px;
          line-height: 18px;
          color: #ffffff;
        }
      }
    }
    .expired-in-and-request-accept {
      .expired-in {
        & > p ~ span {
          color: white;
        }
        p:first-child {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #ffffff;
          margin-bottom: 0px;
        }
        .ant-statistic {
          line-height: 22px;
          .ant-statistic-content-value {
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            color: #ffffff;
          }
        }
      }
      .ant-btn {
        margin-right: 0px !important;
      }
    }
  }
  &.trade-item:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  .like-icon {
    @media screen and (max-width: 576px) {
      width: 17px;
    }
  }
  .user-liked {
    path {
      fill: red !important;
    }
    @media screen and (max-width: 576px) {
      width: 18px;
    }
  }
`;

export const ChartEllipseWrapper = styled.div`
  .chart-ellipse-icon {
    circle {
      fill: ${(props) => props?.fill};
    }
  }
  .chart-tooltip-item__value,
  .chart-tooltip-item__name {
    color: ${(props) => props?.fill};
    margin-left: 8px;
  }
`;

export const ToolTipWrapper = styled.div`
  .chart-ellipse-icon {
    circle {
      fill: ${(props) => props?.fill};
    }
  }
  .chart-tooltip-item__name {
    /* color: ${(props) => props?.fill}; */
    color: #fff;
    margin-left: 8px;
  }
  .chart-tooltip-item__value {
    text-align: right;
    color: #fff;
  }
`;

export const ChartToolTipWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 16px 8px;
  border-radius: 10px;
  .label {
    font-weight: 700;
    color: white;
    &-item {
      margin: 0;
    }
  }
  .tooltip-text {
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    margin: 2px;
  }
`;

export const BarChartWrapper = styled.div`
  .recharts-tooltip-cursor {
    fill: #37145f;
  }
  .recharts-wrapper {
    /* width: 100% !important; */
    .recharts-surface {
      /* width: 100% !important; */
    }
    .recharts-legend-wrapper {
      /* width: 100% !important; */
    }
  }
  .bar-style {
    border-radius: 20px;
  }
`;

export const ProgressBarWrapper = styled.div`
  .progress-parent {
    width: 70%;
    height: 10px;
    background-color: #6e5ac3;
    border-radius: 10px;
    .progress-children {
      width: ${(props) => `${props.length}%`};
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
    }
  }
`;

export const PieWrapper = styled.div``;

export const CarouselWrapper = styled(Carousel)`
  height: 100%;
  .slick-list {
    .slick-track {
      div {
        height: 250px;
      }
    }
  }
  .slick-arrow {
    z-index: 100;
    width: unset;
    .anticon {
      width: 100%;
    }
  }
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-prev:focus,
  .ant-carousel .slick-next:focus {
    font-size: inherit;
    color: currentColor !important;
  }

  .slick-arrow.slick-prev {
    font-size: 20px !important;
  }

  .slick-arrow.slick-next {
    font-size: 20px !important;
  }
  .ant-carousel .slick-next::before {
    content: "";
  }
  .ant-carousel .slick-prev::before {
    content: "";
  }
  /* .anticon {
    padding: 8px;
    border-radius: 50%;
    svg {
      fill: white;
      width: 24px;
      height: 24px;
    }
  } */

  .anticon:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export const FilterDrawerDatahubWrapper = styled(Drawer)`
  .active-filter {
    border: 1px solid #9b5fcc;
    background-color: white;
    span {
      color: #9b5fcc;
    }
  }
  .price-range-containter {
    margin-top: 8px;
    .apply-price {
      width: 30%;
    }
    .price-range-wrapper {
      display: flex;
      align-items: center;
      input {
        width: 50%;
      }
    }
  }
  .reset-button {
    width: 30%;
    position: absolute;
    margin-right: 10px;
    bottom: 20px;
  }
`;

export const ButtonFilterMarketWrapper = styled.div`
  color: #fff;
  font-size: 14px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin-right: 15px;
  .button {
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 20px;
    padding: 5px 7px;
  }
`;
