import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
const AlignDotWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 70%;
`;

function AlignDot({ children }) {
  return <AlignDotWrapper>{children}</AlignDotWrapper>;
}

AlignDot.propTypes = {
  children: PropTypes.string.isRequired,
};

export default AlignDot;
