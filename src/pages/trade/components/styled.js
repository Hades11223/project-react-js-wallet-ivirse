import { Button, Input, Table } from "antd";
import styled, { css } from "styled-components";

export const LinearWrapper = styled.div`
  /* width: ${(props) => (props.width ? props.width : "569px")}; */
  height: ${(props) => (props.height ? props.height : "")};
  font-family: "Bai Jamjuree";
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  margin-bottom: ${(props) => props.margin || "24px"};

  background: linear-gradient(
    180deg,
    #ffffff 13.92%,
    #ea95bc 32.23%,
    #f9e3ed 64.78%,
    #ea95bc 84.72%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const GlobalIconsWrapper = styled.div`
  width: 100% !important;
  margin-top: 25px;
  .testclass {
    /* margin-top:100px; */
    width: 95% !important;
    bottom: 0px;
    background: transparent;
    position: absolute;
    /* padding-left: 40px; */
  }
  /* height: 40px; */
  padding-left: 40px;
  a {
    display: inline-block;
  }
  svg {
    margin-right: 20px;
    width: 32px;
    height: 32px;
    width: 25px;
    height: 25px;
  }
  a:last-child {
    position: relative;
    top: -2px;
    svg {
      width: 18px;
      height: 20px;
    }
  }
  .policy {
    color: #ffffff;
    font-size: 14px;
    line-height: 17px;
  }
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const LinearButton = styled(Button)`
  background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border-radius: 20px;
  color: white;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 38px;
`;
export const CustomSearch = styled(Input.Search)`
  width: ${(props) => (props?.width ? props.width : "100%")};
  .ant-input {
    border-top-left-radius: 100px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    height: 38px;
    border-right: none;
  }
  .ant-input-group-addon {
    height: 38px;
    border-radius: 100px;
    button {
      border: none;
      height: 100%;
      border-top-right-radius: 100px !important;
      border-bottom-right-radius: 100px !important;
    }
    .ant-btn .anticon {
      background: radial-gradient(
        96.92% 1534.99% at 95.38% 91.84%,
        #915fcd 7.32%,
        #ae5297 100%
      );
      align-items: center;
      margin-right: 3px;
      height: 74%;
      width: 90%;
      justify-content: center;
      border-radius: 100%;
      color: white;
    }
  }
`;
export const ResetButtonWrapper = styled(Button)`
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  border: none;
  span {
    color: white;
    margin-left: 4px;
  }
  span:hover {
    color: #40a9ff;
  }
`;
export const ModalHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 20px;
    cursor: pointer;
  }
`;

function createCSS() {
  let arrColor = [
    "#A794F5",
    "#927BFA",
    "#866FEA",
    "#7E65EB",
    "#7359E5",
    "#6A4FDD",
    "#593ED1",
    "#4D33BF",
    "#372293",
    "#2E1C7D",
    "#200F69",
  ];
  let styleText = ``;
  for (let i = 0; i < arrColor.length; i++) {
    styleText += `
    .ant-table-thead .ant-table-cell:nth-child(${i + 1}) {
      background: ${arrColor[i]};
      border-radius: 8px 8px 0px 0px;
    }
     `;
  }

  return css`
    ${styleText}
  `;
}
export const TradeTable = styled(Table)`
  .ant-table {
    background-color: transparent;
  }
  .ant-table table {
    border-collapse: collapse;
  }
  .ant-table-thead > tr > th {
    border: 0;
    color: white;
  }

  .search-table {
    width: 40%;
    .ant-input {
      border-top-left-radius: 100px;
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
      height: 38px;
    }
    .ant-input-group-addon {
      height: 38px;
      border-radius: 100px;
      button {
        border: none;
        height: 100%;
        border-top-right-radius: 100px !important;
        border-bottom-right-radius: 100px !important;
      }
      .ant-btn .anticon {
        background: radial-gradient(
          96.92% 1534.99% at 95.38% 91.84%,
          #915fcd 7.32%,
          #ae5297 100%
        );
        align-items: center;
        margin-right: 3px;
        height: 74%;
        width: 90%;
        justify-content: center;
        border-radius: 100%;
        color: white;
      }
    }
  }

  .ant-table-tbody {
    > tr.ant-table-row:hover > td,
    .ant-table-tbody > tr > td.ant-table-cell-row-hover {
      background: transparent;
    }
    border: 1px solid white;
    color: white;
    .ant-table-expanded-row.ant-table-expanded-row-level-1:hover > * {
      background: transparent;
    }
    .ant-table-placeholder {
      background: transparent;
      * {
        color: white;
      }
    }
    .ant-table-placeholder :hover {
      background: transparent;
    }
  }
  .ant-table-thead > tr > th {
    border-radius: 8px 8px 0px 0px;
    text-align: center;
    /* left: -1px; */
  }
  .ant-table-cell-row-hover {
    background-color: transparent !important;
    .view {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        stroke-width: 0px;
        cursor: pointer;
        background: none;
        border-radius: 13px;
      }
      svg:hover {
        background: #503d66;
      }
    }
  }
  .view {
    display: none;
  }
  td.ant-table-column-sort {
    background-color: transparent;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-radius: 8px 8px 0px 0px;
  }

  .ant-table-container table > thead > tr:first-child th:last-child {
    border-radius: 8px 8px 0px 0px;
  }
  ${createCSS()};
  .ant-pagination {
    position: relative;
    .ant-pagination-options {
      top: 0;
      position: absolute;
      left: -15px;
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    button {
      background-color: transparent;
      border: none !important;
      outline: none !important;
      span {
        color: white;
        font-size: 14px;
      }
    }
  }
  .ant-pagination-item {
    color: white;
    font-size: 14px;
    a {
      color: white;
    }
  }
  .ant-table-pagination > * {
    background: transparent;
    border: none;
  }
  .ant-pagination-item-active {
    background-color: #fff !important;
    border-radius: 20%;
    a {
      color: #000 !important;
    }
  }
  .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link {
    background: transparent;
    border: none;
    color: white;
  }
  .ant-table-summary {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    font-size: 16px;
    text-transform: uppercase;
  }
  .ant-pagination-options {
    .ant-select-selector {
      background-color: transparent;
      color: white;
      border-radius: 20px;
    }
    .ant-select-arrow {
      color: white;
    }
  }
  .ant-table-expanded-row {
    * {
      background: transparent;
    }
  }
  .ant-pagination-item:active {
    background-color: #fff;
  }
`;

export const MultipleButtonSelectWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 10px;
`;
export const ButtonSelect = styled(Button)`
  background: ${(props) =>
    props.active == "active" ? "white" : "transparent"};
  border: ${(props) => (props.active == "active" ? "none" : "1px solid white")};
  color: ${(props) => (props.active == "active" ? "#9B5FCC" : "white")};
  font-weight: ${(props) => (props.active == "active" ? "bold" : "")};
  border-radius: 20px;
  display: flex;
  align-items: center;
  :focus {
    color: #9b5fcc;
    font-weight: bold;
  }
  :hover {
    color: #9b5fcc;
    font-weight: bold;
  }

  svg {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    /* fill: ${(props) => (props.active == "active" ? "#9b5fcc" : "white")}; */
  }
  p {
    margin-bottom: 0;
    span:nth-child(2) {
      margin-left: 15px;
    }
  }
`;
export const CopyEllipsisTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentLeftRightWrapperStyled = styled.div`
  p {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 576px){
      flex-direction: column;
    }
  }
`;
