import { CopyOutlined } from "@ant-design/icons";
import { copyToClipBoard } from "@utils";
import { Tooltip } from "antd";
import React from "react";

export const AddressTooltip = ({ address, getLengthAddress }) => {
  return (
    <span>
      <Tooltip title={"Copy"}>
        <CopyOutlined
          onClick={(e) => {
            e.stopPropagation();
            copyToClipBoard(address);
          }}
        />
      </Tooltip>
      <Tooltip title={address}>{getLengthAddress}</Tooltip>
    </span>
  );
};
