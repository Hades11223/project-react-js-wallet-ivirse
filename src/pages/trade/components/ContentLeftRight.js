import React from "react";
import { ContentLeftRightWrapperStyled } from "./styled";

function ContentLeftRight({ left, right, styleLeft, styleRight, ...props }) {
  return (
    <ContentLeftRightWrapperStyled>
      <p style={{...props}}>
        <span style={styleLeft}>{left}</span>
        <span style={styleRight}>{right}</span>
      </p>
    </ContentLeftRightWrapperStyled>
  );
}

export default ContentLeftRight;
