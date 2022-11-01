import React from "react";
import { LinearWrapper } from "./styled";

const LinearText = ({ title,...props }) => {
  return <LinearWrapper {...props}>{title}</LinearWrapper>;
};
export default LinearText;
