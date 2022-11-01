import styled from "styled-components";

export const TradeSelectStyled = styled.div`
  position: relative;
  padding: 1px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  border-radius: 20px;
  background-color: transparent;
  width: 100%;
  .select-prefix {
    position: absolute;
    left: 8px;
    display: flex;
    align-items: center;
    color: white;
    svg {
      circle,
      path {
        stroke: white;
      }
    }
    .custom-css-icon {
      width: 20px;
      height: 20px;
      circle,
      path {
        stroke-width: 0.01;
      }
    }
    span {
      margin-left: 4px;
    }
  }
  .ant-select-selector {
    background-color: transparent!important;
    border: none!important;
    &:focus {
        outline: none;
    }
    .ant-select-selection-item {
      color: white;
      position: absolute;
      left: 72px;
    }
  }
  .ant-select-arrow {
    color: white;
  }
`;
