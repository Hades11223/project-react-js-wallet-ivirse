import React from "react";
import PropTypes from "prop-types";
import { ModalHeaderWrapper } from "./styled";
import { BackIcon } from "@assets/svg";

const ModalHeader = (props) => {
  return (
    <ModalHeaderWrapper>
      <BackIcon
        onClick={() => {
          props?.callback && props?.callback();
        }}
      />
      {props.title}
    </ModalHeaderWrapper>
  );
};
ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default ModalHeader;
