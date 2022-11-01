import { DownArrow, UpArrow } from "@assets/svg";
import React, { useState } from "react";
import { SortItemWrapper } from "./styled";
const state = {
  null: {
    current: null,
    new: "asc",
  },
  asc: {
    current: "asc",
    new: "desc",
  },
  desc: {
    current: "desc",
    new: null,
  },
};
function SortItem({ item = {}, onChange = () => {} }) {
  const [value, setValue] = useState(null);
  return (
    <SortItemWrapper>
      <div className="d-flex align-items-center"> {item.title}</div>
      <div
        className="d-flex"
        onClick={() => {
          setValue(state[value].new);
          onChange({ ...item, order: state[value].new });
        }}
      >
        <UpArrow style={{ color: value == "asc" ? "#40a9ff" : "white" }} />
        <DownArrow style={{ color: value == "desc" ? "#40a9ff" : "white" }} />
      </div>
    </SortItemWrapper>
  );
}

export default SortItem;
