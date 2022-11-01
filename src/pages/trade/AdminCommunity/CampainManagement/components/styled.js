import styled, { css } from "styled-components";
const center = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ExcelDisplayWrapper = styled.div`
  ${center}
  width: 100%;
  .icon {
    width: 20%;
  }
  .text {
    width: 80%;

    &__filename {
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
      width: 150px;
    }
    &--green {
      color: #0a9921;
    }
  }
`;

export const InvalidDialogWrapper = styled.div`
  .message-item {
    display: flex;
    p {
      margin-bottom: 0px;
    }
    .icon-success, .icon-error {
      width: 20px;
      height: 20px;
    }
    .icon-success {
      margin-right: 4px;
      path {
        fill: green;
      }
    }
    .icon-error {
      margin-right:4px;
      path {
        fill: red;
      }
    }

    /* path {
      fill: green !important;
    } */
  }
`;
