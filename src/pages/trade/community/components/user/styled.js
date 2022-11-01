import { Modal } from "antd";
import styled from "styled-components";

export const UserWrapper = styled.div`
  padding: 40px;
  margin-top: -50px;
  .title-text{
    position: absolute;
    top : 33px;
    left: 5%;
  }
  .content {
    padding: 20px;
    border-radius: 20px;
    width: auto;
    max-width: 526px;
    height: 290px;

    /* Black color */
    color: white;
    background: rgba(43, 43, 43, 0.5);
    border-radius: 20px;
    &__header {
      display: flex;
      justify-content: start;
      align-items: center;
      &__icon {
        margin-left: 5px;
      }
      &__text {
        margin-left: 20px;
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #ffffff;
        height: 100%;
      }
    }
    &__explain {
      padding: 20px;
      font-family: "Bai Jamjuree";
      font-style: normal;
      font-weight: 100;
      font-size: 13px;
      line-height: 18px;
      text-align: justify;

      color: #ffffff;
      &__detail {
        &--blue {
          text-decoration-line: underline;
          color: #1b76ff;
          font-weight: 700;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    &__display {
      &__claim {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 576px) {
          font-size: small;
        }
        &__account {
          /* width: 30%; */
          display: flex;
          &__icon {
          }
          &__wallet {
            text-overflow: ellipsis;
          }
        }
        &__token {
          /* width: 30%; */
        }
      }
    }
  }
  @media screen and (max-width: 576px) and (min-width: 461px) {
    padding: 30px;
    .content {
      height: 315px;
    }
  }
  @media screen and (max-width: 460px) and (min-width: 364px) {
    padding: 30px;
    .content {
      height: 330px;
    }
  }
  @media screen and (max-width: 363px) {
    padding: 20px;
    .content {
      height: 340px;
      padding: 10px;
    }
  }
  @media screen and (min-height: 1000px) {
    margin-top: -100px;
  }
`;
export const NewModal = styled(Modal)`
  .scroll {
    height: 300px;
    overflow-y: scroll;
  }
  .ant-modal-content {
    .ant-modal-close-x {
      .anticon {
        margin-top: 20px;

        margin-right: 5px;
        stroke: #6e6e6e;
        svg {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  .ant-modal-footer {
    display: flex;
    justify-content: end;
    .delete__btn {
      border-radius: 20px;
    }
    .submit__btn {
      width: auto;
    }
  }
  .campaign-text {
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height */

    text-align: right;

    /* Black color */

    color: #2b2b2b;
  }
  .token-text {
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 138% */

    text-align: right;

    /* Black color */

    color: #2b2b2b;
  }
`;
