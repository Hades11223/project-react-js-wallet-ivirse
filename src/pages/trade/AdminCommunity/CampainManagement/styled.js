import { Modal, Upload } from "antd";
import { memo } from "react";
import styled, { css } from "styled-components";

const { Dragger } = Upload;
const center = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CampainManagementWrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }

  .content {
    &__action {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }

    @media screen and (max-width: 922px) {
      padding-bottom: 50px;
    }
  }
`;

export const NewModal = styled(Modal)`
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
  .save-icon {
    transform: scale(0.6);
    margin-top: -5px;
    margin-left: -10px;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: #ae5297;
    border-color: #ae5297;
    background: #fff;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: end;
    .save__btn {
      border-radius: 20px;
    }
    .submit__btn {
      width: auto;
    }
  }
  .description {
    padding: 0px;
    &__list {
      padding: 0px;
      &__item {
        margin: 10px 0px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        button {
          padding: 0px;
        }
        &__name {
          font-family: "Bai Jamjuree";
          font-style: normal;
          font-size: 16px;
          line-height: 22px;
          color: #000000;
          font-weight: 700;
        }
        &__value {
          font-family: "Bai Jamjuree";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-align: right;
          color: #2b2b2b;
        }
      }
    }
  }
`;

export const NewDragger = memo(styled(Dragger)`
  display: flex;
  border: 1px dashed #bb73ac !important;
  border-radius: 20px !important;
  height: 200px !important;
  .upload {
    display: flex;
    &__display {
      width: 50%;
      ${center}
    }
    &__input {
      width: 50%;
      ${center}
      flex-direction: column;

      &__reupload {
      }
      &__reset {
        color: #6e6e6e;
        :not(.exist) {
          color: #1b76ff;
        }
      }
    }
  }
`);
