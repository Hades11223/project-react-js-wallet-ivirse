import TradeButton from "@components/TradeButton";
import React from "react";
import { ModalSuccessNotiWrapper } from "./styled";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress } from "@utils/";

const ModalSuccessNoti = ({ visible, onOk, onCancel, data }) => {
  return (
    <ModalSuccessNotiWrapper
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title="Completed"
      footer={
        <div className="success-noti-footer d-flex justify-content-end">
          <TradeButton type="gradient" content={"Done"} onClick={onCancel} />
        </div>
      }
    >
      <p className="noti-text-1">
        Ayy! You just sold{" "}
        <span>
          <AddressTooltip
            address={data?.dataCid || ""}
            getLengthAddress={getLengthAddress(
              data?.dataCid,
              window.innerWidth
            )}
          />
        </span>
        . It’s been confirmed on the blockchain!
      </p>
      <div className="info-success">
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">
            <span>
              {/* <AddressTooltip
                address={data?.dataCid || ""}
                getLengthAddress={getLengthAddress(
                  data?.dataCid,
                  window.innerWidth
                )}
              /> */}
              Data ID
            </span>
          </div>
          <div className="info-value" id="dataId">
            <AddressTooltip
              address={data?.dataCid || ""}
              getLengthAddress={getLengthAddress(
                data?.dataCid,
                window.innerWidth
              )}
            />
          </div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">Price</div>
          <div className="info-value" id="price">
            {data?.tokenAmount?.hexToDecimal()} IVI
          </div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">Requester</div>
          <div className="info-value" id="requester">
            <AddressTooltip
              address={data?.buyer || ""}
              getLengthAddress={getLengthAddress(
                data?.buyer,
                window.innerWidth
              )}
            />
          </div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">Status</div>
          <div className={`info-value ${"completed"}`}>Completed</div>
        </p>
        <p className="info-line d-flex justify-content-space-between">
          <div className="info-title">Transaction Hash</div>
          <div className="info-value">
            <AddressTooltip
              address="0x3861ef67037411B41922259104566D91b635a396"
              getLengthAddress={getLengthAddress(
                "0x3861ef67037411B41922259104566D91b635a396",
                window.innerWidth
              )}
            />
          </div>
        </p>
      </div>
    </ModalSuccessNotiWrapper>
  );
};

export default ModalSuccessNoti;
