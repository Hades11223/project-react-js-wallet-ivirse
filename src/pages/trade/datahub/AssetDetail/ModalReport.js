import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import { Checkbox, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalReportWrapper } from "./styled";
const { TextArea } = Input;

const ModalReport = ({ visible, onOk, onCancel, location }) => {
  const [state, _setState] = useState({
    isAgree: false,
    fileList: [],
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleChangeAgreement = (e) => {
    setState({
      isAgree: e.target.checked,
    });
  };
  return (
    <ModalReportWrapper
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title="Report data"
      closeIcon={<CloseOutlined />}
      className="modal-report"
      footer={
        <div className="modal-report-footer d-flex justify-content-end">
          <TradeButton
            content={"Cancel"}
            type="transparent_gray"
            onClick={onCancel}
          />
          <TradeButton content={"Report"} type="gradient" onClick={onOk} />
        </div>
      }
    >
      <p className="data-and-token-field d-flex justify-content-space-between">
        <div className="data-field">
          <span className="field-title">Data </span>
          <span>EMR266851414</span>
        </div>
        <div className="token-field d-flex align-items-center">
          <img
            src={require("@images/trade/datahub/ivi-token-swap.png")}
            style={{
              marginRight: "4px",
            }}
          />
          <span>IVI token</span>
        </div>
      </p>
      <div className="description-field mb-4">
        <p className="field-title">Description</p>
        <TextArea rows={4} placeholder="Detail your report" />
      </div>
      <div className="upload-image-field">
        <p className="field-title">Image</p>
        <Upload
          listType="picture-card"
          onChange={(fileData) => {
            if (fileData?.file?.status === "done") {
              setState({
                fileList: fileData.fileList,
              });
              message.success("Upload successfully!");
            }
            if (fileData.fileList?.length === 5) {
              message.info("You 've reach total 5 files uploaded");
            }
          }}
          maxCount={5}
          accept={".png, .jpg, .jpeg"}
          method="get"
          beforeUpload={(file, fileList) => {
            if (file.size > 1024 * 1024 * 20) {
              message.error(
                "You can upload only 5 files which less than 20MB!"
              );
              return Upload.LIST_IGNORE;
            }
            if (!file.type.includes("image/")) {
              message.error("You can only upload image files!");
              return Upload.LIST_IGNORE;
            }
          }}
          // disabled={state.fileList.length === 5}
        >
          <TradeButton
            content="Add item"
            type="transparent_violet_custom"
            icon={<PlusCircleOutlined />}
            fontSize={"16px"}
            fontWeight="500"
            lineHeight="20px"
          />
        </Upload>
      </div>
      <div className="agreement-field">
        <p className="agreement-description">
          <img
            src={require("@images/trade/datahub/warning-icon.png")}
            style={{
              marginRight: "8px",
            }}
          />
          <span>
            {" "}
            The report will be deducted gas fee for the system, users should
            carefully check the information when clicking submit
          </span>
        </p>
        <p className="checkbox-agreement">
          <Checkbox onChange={handleChangeAgreement}>I checked</Checkbox>
        </p>
      </div>
    </ModalReportWrapper>
  );
};

export default ModalReport;
