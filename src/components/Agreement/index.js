import { Checkbox } from "antd";
import React from "react";
import { AgreementBoxWrapper } from "./styled";

const AgreementBox = ({ onChange, content, borderColor, checkBoxContent }) => {
  return (
    <AgreementBoxWrapper className="agreement-field" borderColor={borderColor}>
      <p className="agreement-description">
        <img
          src={require("@images/trade/datahub/warning-icon.png")}
          style={{
            marginRight: "8px",
          }}
        />
        <span> {content}</span>
      </p>
      <p className="checkbox-agreement">
        <Checkbox onChange={onChange}>
          {checkBoxContent || "I agree"}
        </Checkbox>
      </p>
    </AgreementBoxWrapper>
  );
};

export default AgreementBox;
