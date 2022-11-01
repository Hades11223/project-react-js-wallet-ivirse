import styled from "styled-components";

export const ProfileRecordWrapperStyled = styled.div`
  h2 {
    color: #ffffff;
  }
  .profile {
    display: flex;
    &-avatar {
      width: 105px;
      height: 105px;
      background: #d8e4f4;
      border-radius: 100%;
      margin-right: 30px;
      @media screen and (max-width: 768px) {
        width: 40px;
        height: 40px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-content {
      width: 25%;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &-detail {
        display: flex;
        justify-content: space-between;
        &-left {
        }
      }
    }
  }
`;

export const ServiceListWrapperStyled = styled.div`
  .service-title {
    color: #61ca96;
  }
  .service-time {
    display: flex;
    justify-content: space-between;
  }
  .service-list {
    width: 100%;
    list-style: disc;
    &-detail {
      display: flex;
      justify-content: space-between;
    }
  }
  ul {
    list-style: disc;
  }
  .service-total {
    display: flex;
    justify-content: space-between;
  }
`;

export const MedicResultWrapperStyled = styled.div`
  .medic-header {
    display: flex;
  }
  h2 {
    color: #61ca96;
  }
  .medic-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .w-700 {
    font-weight: 700;
  }
`;

export const TestResultWrapperStyled = styled.div`
  h2 {
    color: #61ca96;
  }
  .test-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .font-title {
    font-weight: 600;
  }
`;

export const CDHAWrapperStyled = styled.div`
  h2 {
    color: #61ca96;
  }
  .cdha-item {
    margin-bottom: 45px;
    &-name {
      font-weight: 700;
    }
  }
  ul {
    list-style: disc;
  }
`;

export const SurgeryWrapperStyled = styled.div`
  h2 {
    color: #61ca96;
  }
`;

export const MedicineWrapperStyled = styled.div`
  h2 {
    color: #61ca96;
  }
`;
