import styled from "styled-components";

export const VerifyContainerWrapper = styled.div`
  width: 420px;
  height: 420px;
  padding: 10px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  align-items: center;
  /* position: absolute; */

  .logo {
    margin-top: 70px;
  }
  .linear-button {
    padding: 4px 26px 6px;
    width: 256px;
    height: 40px;
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 20px;
    color: white;
  }

  .loading-container {
    min-height: 150px;
    position: relative;
    .loading-content {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .text-container {
    .welcome-text {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      color: #0c0c0c;
    }
    .verify-text {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      color: #0c0c0c;
      margin-top: 19px;
    }
  }

  @media screen and (max-width: 490px) {
    width: 300px;
    height: 300px;
    .logo {
      margin-top: 20px;
      transform: scale(0.7);
    }
    .text-container {
      .welcome-text {
        font-size: 20px;
        line-height: 30px;
      }
      .verify-text {
        font-size: 17px;
      }
    }
  }
`;

export const AfterVerifyWrapper = styled.div`
  width: 100%;
  padding: 5% 3% 3% 3%;
  * {
    background: inherit;
  }
  .ant-row {
    width: inherit;
  }
`;
