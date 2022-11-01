import { Button } from "antd";
import React from "react";
import { ResetButtonWrapper } from "./styled";

function ResetButton({ icon, title, ...props }) {
  return (
    <ResetButtonWrapper>
        {icon} <span>{title}</span>
    </ResetButtonWrapper>
  );
}

export default ResetButton;
