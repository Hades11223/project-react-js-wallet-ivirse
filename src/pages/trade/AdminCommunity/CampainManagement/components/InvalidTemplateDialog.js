import React from "react";
import { InvalidDialogWrapper } from "./styled";
import { TicketCircleIcon } from "@assets/svg";
import { CloseCircleOutlined } from "@ant-design/icons";

const MessageItem = ({ data, key }) => {
  const { label, value, message } = data;
  return (
    <div key={key} className="message-item">
      <p>
        <strong>{label}: </strong>
        {value ? (
          <TicketCircleIcon className="icon-success" />
        ) : (
          <>
            <CloseCircleOutlined className="icon-error" />
            {message}
          </>
        )}
      </p>
    </div>
  );
};

const InvalidTemplateDialog = ({ data }) => {
  const {
    checkName,
    checkReleaseTime,
    checkToken,
    checkCampaignValue,
    checkWalletAddress,
  } = data;
  const newData = [
    {
      label: "Event Name",
      value: checkName,
      message: "Event name must be string and less than 100 characters!",
    },
    {
      label: "Release Date",
      value: checkReleaseTime,
      message:
        "Release Date must be a valid date format dd/mm/yyyy or timestamp!",
    },
    {
      label: "Token",
      value: checkToken,
      message: "Token must be string and have values in [IVI, IHI]!",
    },
    {
      label: "CampaignValue & ReceivableToken",
      value: checkCampaignValue,
      message: "Campaign Value and Receivable Token must be number type! ",
    },
    {
      label: "Wallet Address",
      value: checkWalletAddress,
      message: "Wallet address must be correct and in type of string!",
    },
  ];

  return (
    <InvalidDialogWrapper>
      <h3>Your uploaded template file is Invalid, Please check again!</h3>
      {newData?.map((item, index) => (
        <MessageItem key={index} data={item} />
      ))}
    </InvalidDialogWrapper>
  );
};

export default InvalidTemplateDialog;
