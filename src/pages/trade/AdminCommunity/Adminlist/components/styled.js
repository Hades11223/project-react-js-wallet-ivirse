import styled from "styled-components";
import { Modal } from "antd";

export const OpacityGroupWrapper = styled.div`
  
  .opacity-box {
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.25);
    color: white;
    margin-bottom: 12px;
    border-radius: 20px;
    .content-left {
      width: ${(props)=>(props.scrWidth>576?"50%" : "auto")};
    }
    .content-right {
      width: ${(props)=>(props.scrWidth>576?"40%" : "auto")};
    }
    .admin-name,
    .address,
    .request-type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media screen and (max-width: 576px) {
        justify-content: unset;
        display: -webkit-box;
      }
    }
    div,
    h3,
    span {
      color: white;
    }
    .status {
      text-transform: capitalize;
      font-size: 16px;
    }
    .title {
      font-size: 16px;
      font-weight: 400;
      display: inline-block;
      width: 140px;
    }
    .value {
      /* font-size: 20px; */
      font-size: ${(props)=>(props.scrWidth>576?"20px" : "16px")};
      font-weight: 700;
      display: flex;
      justify-content: flex-start;
      width: 60%;
    }
    .address {
      .value {
        font-weight: 400;
      }
    }
    .date-title,
    .date-value {
      font-weight: 400;
      font-size: 16px;
      
    }
    .date-title{
      @media screen and (max-width: 576px) {
        width: 140px;
      }
    }
    .Create-date,
    .active-date,
    .approve {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 576px){
        display: flex;
        justify-content: unset;
      }
    }
    .action-group {
      .ant-btn {
        width: auto;
      }
      .ant-btn + .ant-btn {
        margin-left: 8px;
      }
    }
  }
`;

export const ModalWrapper = styled(Modal)`
  .ant-modal-body {
    padding: 24px;
  }
  .img-wrapper {
    padding: 8px;
  }
  .title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
  }
  .content {
    p {
      font-size: 20px;
      font-weight: 700;
    }
    button {
      font-size: 20px;
    }
  }
`
