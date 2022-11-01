import React from "react";
import BasicSelectWrapper from "./styled";

const TradeBasicSelect = ({
  defaultValue,
  options,
  onChange,
  placeholder,
  type,
  ...props
}) => {
  return (
    <BasicSelectWrapper
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      {...props}
    ></BasicSelectWrapper>
  );
};

export default TradeBasicSelect;
