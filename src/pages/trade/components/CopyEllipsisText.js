import { CopyOutlined } from "@ant-design/icons";
import { copyToClipBoard } from "@utils/";
import { Tooltip } from "antd";
import React from "react";
import { CopyEllipsisTextWrapper } from "./styled";

function CopyEllipsisText({ title = "Copy to clipboard", content = "" }) {
  return (
    <CopyEllipsisTextWrapper>
      <Tooltip title={title}>
        <CopyOutlined
          onClick={() => {
            
            copyToClipBoard(content);
          }}
        />
      </Tooltip>
      <Tooltip title={content}>
        <div className="inline-text-w-2">{content}</div>
      </Tooltip>
    </CopyEllipsisTextWrapper>
  );
}

export default CopyEllipsisText;
