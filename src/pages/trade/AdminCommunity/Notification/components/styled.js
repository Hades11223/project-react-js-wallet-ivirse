import styled from "styled-components";
import { Drawer } from "antd";

export const NotiListWrapper = styled.div`
  padding-bottom: 60px;
  .list-notifications {
    background-color: rgba(0, 0, 0, 0.1);
    /* background-color: rgba(0, 0, 0, 0.25); */
    .ant-list-item {
      padding: 0px;
      &:first-child {
        .noti-list-item {
          border-radius: 20px 20px 0px 0px;
        }
      }
      &:last-child {
        .noti-list-item {
          border-radius: 0px 0px 20px 20px;
        }
      }
    }
    border-radius: 20px;
    .noti-list-item {
      color: white;
      font-size: 16px;
      padding: 16px 16px;
      background-color: transparent;
      &.unread {
        background-color: rgba(0, 0, 0, 0.25);
      }
      .noti-list-item__head {
        .noti-time {
          font-weight: 400;
        }
        .noti-category {
          font-weight: 700;
          font-size: 20px;
        }
      }
      .noti-list-item__body {
        h3 {
          color: white;
          font-size: 20px;
          margin-bottom: 0px;
          font-weight: 700 !important;
        }
        p {
          font-size: 20px;
          font-weight: 400;
          span:nth-child(1){
            word-break: break-all;
          }
          @media screen and (max-width: 576px) {
            font-size: 16px;
          }
        }
      }
    }
  }
`;
