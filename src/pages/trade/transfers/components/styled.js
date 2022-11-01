import styled from "styled-components";
import { Drawer } from "antd";

export const OpacityBoxWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 100%;
  padding: 16px;
  color: white;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 12px;
  p {
    margin-bottom: 4px;
    span:nth-child(1) {
      display: inline-block;
      margin-right: 8px;
    }
    display: flex;
    justify-content: space-between;
  }
  .transfer-info-left {
    width: 40%;
  }
  .transfer-info-right {
    .ts-status {
      padding-top: 0px;
      justify-content: flex-end;
    }
    div,
    span,
    p {
      text-align: right;
    }
  }
  @media screen and (max-width: 576px) {
    .time-and-state {
      font-size: 14px;
      img {
        width: 14px!important;
      }
    }
    .body-box {
      flex-direction: column-reverse;
      .transfer-info-right {

      }
      .transfer-info-left {
        width: 100%;
      }
      .transfer-info-right, .transfer-info-left {
        p.opacity-box__item {
          width: 100%;
          & > span:first-child {
            width: 60px;
          }
        }
      }
      div, span, p {
        font-size:14px!important;
        text-align: left;
        justify-content: unset;
      }
      .ts-status {
        justify-content:flex-start;
      }
    }
  }
`;

export const FilterDrawerWrapper = styled(Drawer)`
  .filter-header {
    padding: 12px;
    margin-bottom: 0px;
    font-weight: 700;
  }
  .state,
  .status,
  .time {
    h2 {
      font-weight: 700;
      font-size: 20px;
    }
    .active-filter {
      border: 1px solid #9b5fcc;
      background-color: white;
      span {
        color: #9b5fcc;
      }
    }
    margin-bottom: 24px;
  }
  .time > div {
    flex-wrap: wrap;
    button {
      margin-bottom: 8px;
    }
  }
  .filter-footer {
    position: absolute;
    bottom: 60px;
    left: 20%;
    .reset {
      &-button {
        border: 1px solid #6e6e6e;
        border-radius: 30px;
        font-weight: 500;
        font-size: 20px;
        line-height: 25px;
        /* identical to box height */

        /* Gray palette 3 */

        color: #6e6e6e;
        width: 100px;
    height: 39px;
    background: #fff;
      }
      &-button:hover{
        cursor: pointer;
        color: #9b5fcc;
        border-color:#9b5fcc;
      }
    }
  }
  @media screen and (max-width: 576px) {
    .filter-header {
      font-size: 20px;
    }
    .ant-drawer-body {
      padding: 16px;
    }
    .filter-footer {
      left: unset;
      span {
        font-size: 16px;
      }
    }
    .filter-body {
      div,h2,span {
        font-size: 14px!important;
      }
    }
  }
`;
