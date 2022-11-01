import styled from "styled-components";

export const AgreementBoxWrapper = styled.div`
  &.agreement-field {
    border: ${(props) =>
      `1px solid ${props?.borderColor || "rgba(155, 95, 204,0.2)"}`};
    border-radius: 10px;
    padding: 12px;
    .agreement-description span {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      text-align: justify;
      color: #000000;
    }
    .checkbox-agreement {
      span:last-child {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: justify;
        color: #6e6e6e;
      }
    }
  }
`;
