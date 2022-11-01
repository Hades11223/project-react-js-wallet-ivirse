import { Excel, UploadExcel } from "@assets/svg";
import React from "react";
import { ExcelDisplayWrapper } from "./styled";
import PropTypes from "prop-types";

function ExcelDisplay({ fileName }) {
  return (
    <ExcelDisplayWrapper>
      <div className="icon">
        <Excel />
      </div>
      <div className="text">
        <div className="text__filename">{fileName}</div>
        <label className="text--green">Uploaded</label>
      </div>
    </ExcelDisplayWrapper>
  );
}

ExcelDisplay.propTypes = {
  fileName: PropTypes.string,
};

export default ExcelDisplay;
