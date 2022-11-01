import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const TRANSPARENT_WHITE = "transparent_white";
const TRANSPARENT_GRAY = "transparent_gray";
const GRADIENT = "gradient";
const VIOLET = "violet";
const GRAY_BLACK = "gray_black";
const GREEN = "green";
const TRANSPARENT_VIOLET_CUSTOM = "transparent_violet_custom";

const TradeBtnWrapper = styled.div`
  .hover-123:hover {
    transform: scale(1.05);
  }
  .ant-btn {
    :hover {
      background: ${(props) => {
        switch (props.type) {
          case TRANSPARENT_WHITE:
            return "transparent";
          case TRANSPARENT_GRAY:
            return "transparent";
          case TRANSPARENT_VIOLET_CUSTOM:
            return "transparent";
          case GRADIENT:
            return "radial-gradient(96.92% 1534.99% at 95.38% 91.84%,#915fcd 7.32%,#ae5297 100%)";
          case VIOLET:
            return "#6E5AC3";
          case GRAY_BLACK:
            return "#F5F5F5";
          case GREEN:
            return "linear-gradient(146.05deg, #1CAD98 20.12%, #59D2D0 80.17%)";
          default:
            return "radial-gradient(96.92% 1534.99% at 95.38% 91.84%,#915fcd 7.32%,#ae5297 100%)";
        }
      }};
    }
    background: ${(props) => {
      switch (props.type) {
        case TRANSPARENT_WHITE:
          return "transparent";
        case TRANSPARENT_GRAY:
          return "transparent";
        case TRANSPARENT_VIOLET_CUSTOM:
          return "transparent";
        case GRADIENT:
          return "radial-gradient(96.92% 1534.99% at 95.38% 91.84%,#915fcd 7.32%,#ae5297 100%)";
        case VIOLET:
          return "#6E5AC3";
        case GRAY_BLACK:
          return "#F5F5F5";
        case GREEN:
          return "linear-gradient(146.05deg, #1CAD98 20.12%, #59D2D0 80.17%)";
        default:
          return "radial-gradient(96.92% 1534.99% at 95.38% 91.84%,#915fcd 7.32%,#ae5297 100%)";
      }
    }};
    border-radius: 20px;
    border: ${(props) => {
      switch (props.type) {
        case TRANSPARENT_WHITE:
          return "1px solid white";
        case TRANSPARENT_GRAY:
          return "1px solid gray";
        case TRANSPARENT_VIOLET_CUSTOM:
          return "1px solid #6E5AC3";
        case GRADIENT:
          return "none";
        default:
          return "none";
      }
    }};
    span {
      margin-left: 4px;
      color: ${(props) => {
        if ([GRADIENT, TRANSPARENT_WHITE, VIOLET, GREEN].includes(props.type)) {
          return "white";
        } else if (props.type === GRAY_BLACK) {
          return "#6E6E6E";
        } else if (props.type === TRANSPARENT_VIOLET_CUSTOM) {
          return "#6E5AC3";
        } else {
          return "#6E6E6E";
        }
      }};
    }
  }
  .flex-row-reverse svg {
    margin-left: 8px;
  }
`;

const TradeButton = ({
  icon,
  content,
  type,
  parentClassName,
  fontSize,
  colorText,
  iconPosition,
  lineHeight,
  fontWeight,
  style,
  ...props
}) => {
  "";
  return (
    <TradeBtnWrapper
      type={props.disabled ? "transparent_gray" : type}
      className={parentClassName}
    >
      <Button
        className={`d-flex align-items-center ${
          iconPosition === "right" ? "flex-row-reverse" : ""
        }`}
        style={{ marginRight: "10px", ...style }}
        {...props}
      >
        {icon}
        <span
          className="text__inline"
          style={{
            fontSize: fontSize,
            color: colorText,
            lineHeight,
            fontWeight,
          }}
        >
          {content}
        </span>
      </Button>
    </TradeBtnWrapper>
  );
};

export default TradeButton;
