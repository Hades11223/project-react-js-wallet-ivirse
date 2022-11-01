import styled from "styled-components";
import { Select } from "antd";

export const SelectType = {
  TRANSPARENT_GRAY_ROUND: "transparent_gray_round",
};

const getBorderFromType = (type) => {
  const { TRANSPARENT_GRAY_ROUND } = SelectType;
  switch (type) {
    case TRANSPARENT_GRAY_ROUND:
      return "1px solid #6E6E6E !important";
    default:
      return "1px solid black";
  }
};

const getColorFromType = (type) => {
  const { TRANSPARENT_GRAY_ROUND } = SelectType;
  switch (type) {
    case TRANSPARENT_GRAY_ROUND:
      return "#6E6E6E !important";
    default:
      return "black";
  }
};

const BasicSelectWrapper = styled(Select)`
  .ant-select {
    &.w-full {
      width: 100%;
    }
    &.w-half {
      width: 50%;
    }
    padding: 8px 16px;
  }
  .ant-select-selector {
    border-radius: ${(props) =>
      props?.type?.includes("round") ? "20px!important" : "none"};
    border: ${(props) => getBorderFromType(props?.type)};

    .ant-select-selection-placeholder {
      color: ${(props) => getColorFromType(props?.type)};
    }
  }
`;

export default BasicSelectWrapper;
