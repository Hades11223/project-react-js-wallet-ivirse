import { Tooltip } from "antd";
import React from "react";
import styled from "styled-components";

const typeCss = {
  low: {
    default: {
      backgroundColor: "transparent",
      border: "#5a5262 1px solid",
    },
    hover: {
      backgroundColor: "#5a5262",
      opancity: 0.2,
    },
  },
  medium: {
    default: {
      backgroundColor: "#5a5262",
      opancity: 0.2,
    },
    hover: {
      backgroundColor: "#444141",
      opancity: 0.5,
    },
  },
  high: {
    default: {
      backgroundColor:
        "radial-gradient(96.92% 1534.99% at 95.38% 91.84%, #915FCD 7.32%, #AE5297 100%)",
    },
    hover: {
      backgroundColor:
        "linear-gradient(89.86deg, #B775E2 1.77%, #DE71C9 100.7%)",
    },
  },
};

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(props) => (props.disable ? "#9B5FCC" : props.backgroundColor)};
  border: ${(props) => props.border || "none"};
  opacity: ${(props) => (props.disable ? "0.2" : "1")};
  pointer-events: ${(props) => (props.disable ? "none" : "unset")};
  :hover {
    background: ${(props) => props.hover.backgroundColor};
    opacity: ${(props) => props.hover.opacity};
  }
`;
export const IconAdmin = ({
  children,
  type,
  tooltipText = "",
  onClick,
  ...props
}) => {
  return (
    <Tooltip title={tooltipText}>
      <IconWrapper {...typeCss[type]} {...props} onClick={onClick}>
        {children}
      </IconWrapper>
    </Tooltip>
  );
};

const buttonTypeCss = {
  high: {
    default: {
      backgroundColor:
        "radial-gradient(96.92% 1534.99% at 95.38% 91.84%, #915FCD 7.32%, #AE5297 100%)",
    },
    hover: {
      backgroundColor:
        "linear-gradient(89.86deg, #B775E2 1.77%, #DE71C9 100.7%)",
    },
  },
  special: {
    default: {
      backgroundColor: "transparent",
    },
    hover: {
      backgroundColor:
        "linear-gradient(89.86deg, #B775E2 1.77%, #DE71C9 100.7%)",
    },
  },
};
const ButtonWrapper = styled.div`
  /* max-width: 170px; */
  div {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  text,
  small {
  }
  height: 40px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  padding: 10px 20px;

  background: ${(props) => props.default.backgroundColor};
  border: ${(props) =>
    props.border
      ? `1px solid ${props.color ? props.color : "#ffffff"}`
      : "none"};
  :hover {
    background: ${(props) => props.hover.backgroundColor};
    opacity: ${(props) => props.hover.opacity};
  }
  white-space: nowrap;
`;
export const ButtonAdmin = ({ children, type, tooltipText = "", ...props }) => {
  return (
    <Tooltip title={tooltipText}>
      <ButtonWrapper {...buttonTypeCss[type]} {...props}>
        {children}
      </ButtonWrapper>
    </Tooltip>
  );
};
