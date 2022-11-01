import DotIcon from "@components/DotIcon";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { OpacityGroupWrapper } from "../styled";

const mapColor = (value) => {
  switch (value) {
    case "active":
      return "green";
    case "processing":
      return "red";
    case "inactive":
      return "gray";
    default:
      return "white";
  }
};

const OpacityGroup = ({ data, supportData }) => {
  const { scrWidth } = useSelector((state) => state.global);
  const { AddressTooltip, getLengthAddress, genDataByStatus } = supportData;
  return (
    <OpacityGroupWrapper scrWidth={scrWidth}>
      {data?.map((item, index) => {
        let data = genDataByStatus(item);
        return (
          <div className="opacity-box">
            <div
              className={
                scrWidth > 576
                  ? "d-flex justify-content-space-between"
                  : "d-flex-column"
              }
            >
              <div className="content-left">
                <div className="status">
                  <DotIcon size={"10px"} color={data.dotColor} />
                  <span>{data.statusText}</span>
                </div>
                <div className="admin-name">
                  <span className="title">Admin name</span>
                  <span className="value">{item?.name}</span>
                </div>
                <div className="address">
                  <span className="title">Wallet address</span>
                  <span className="value">
                    <AddressTooltip
                      address={item?.walletAddress}
                      getLengthAddress={getLengthAddress(
                        item?.walletAddress,
                        window.innerWidth
                      )}
                    />
                  </span>
                </div>
                <div className="request-type">
                  <span className="title">Request Type</span>
                  <span className="value">{data.statusText}</span>
                </div>
              </div>
              <div className="content-right">
                <div className="Create-date">
                  <span className="date-title">Create date</span>
                  <span className="value-title">
                    {moment(item?.createdAt)?.format("DD-MM-YYYY HH:mm:ss")}
                  </span>
                </div>
                <div className="active-date">
                  <span className="date-title">Active date</span>
                  <span className="date-value"></span>
                </div>
                <div className="approve">
                  <span className="date-title">Approve</span>
                  <span className="date-value">{data.approvalReject}</span>
                </div>
              </div>
            </div>
            <div className="action-group d-flex justify-content-end">
              {data.action}
            </div>
          </div>
        );
      })}
    </OpacityGroupWrapper>
  );
};

export default OpacityGroup;
