import React, { memo, useState } from "react";
import { ButtonSelect, MultipleButtonSelectWrapper } from "./styled";

const MultipleButtonSelect = ({
  options = [],
  onChange = () => {},
  content,
}) => {
  const [activeKey, setActiveKey] = useState(0);
  return (
    <MultipleButtonSelectWrapper>
      {options.map((item, index) => {
        return (
          <ButtonSelect
            key={index}
            onClick={() => {
              setActiveKey(index);
              onChange(item, index);
              if (typeof item?.handleClick == "function") {
                item?.handleClick();
              }
            }}
            active={index === activeKey ? "active" : ""}
          >
            {item.icon}
            <p>
              <span>{item.text}</span>
              {content && <span>{content}</span>}
            </p>
          </ButtonSelect>
        );
      })}
    </MultipleButtonSelectWrapper>
  );
};

export default memo(MultipleButtonSelect);
