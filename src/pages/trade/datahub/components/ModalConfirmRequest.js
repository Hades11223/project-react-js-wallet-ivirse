import { CloseOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import useCustomState from "@hook/useCustomState";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress } from "@utils/index";
import { Checkbox } from "antd";
import React from "react";
import { ModalConfirmRequestWrapper } from "./styled";

const ModalConfirmRequest = ({
  visible,
  onOk,
  onCancel,
  currentTime,
  responsePeriod,
  dataCid,
  tokenAmount,
  dataOwner,
}) => {
  const [state, setState] = useCustomState({ checked: false });
  return (
    <ModalConfirmRequestWrapper
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title="Request access"
      closable={true}
      closeIcon={<CloseOutlined />}
      footer={
        <div className="modal-request-footer d-flex justify-content-end">
          <TradeButton
            type={"transparent_gray"}
            content={"Cancel"}
            onClick={onCancel}
          />
          <TradeButton
            type={"gradient"}
            content="Continue"
            onClick={onOk}
            disabled={!state.checked}
          />
        </div>
      }
    >
      <p>Are you sure you want to request data?</p>
      <div className="info-field d-flex">
        <div className="img-field">
          <img
            src={require("@images/trade/datahub/example-image.png")}
            alt=""
          />
        </div>
        <div className="text-info-field ml-4">
          <h1>
            <AddressTooltip
              address={dataCid || ""}
              getLengthAddress={getLengthAddress(dataCid, window.innerWidth)}
            />
          </h1>
          <div className="d-flex price-field">
            <div className="token-icon__wrapper">
              <img
                className="token-icon"
                alt=""
                src={require("@images/trade/datahub/ivi-token-swap.png")}
              />
            </div>
            <div>
              <p className="token-value">
                {/* {tokenAmount?.hexToDecimal()} */}
                <span>IVI</span>
              </p>
              {/* <p className="usdt-value">$869,652</p> */}
            </div>
          </div>
          <div className="requester d-flex">
            <div className="requester-avatar">
              <img
                src={require("@images/trade/datahub/item-example-avatar.png")}
                alt=""
              />
            </div>
            <div className="requester-info">
              <p>Owner</p>
              <p>
                <AddressTooltip
                  address={dataOwner || ""}
                  getLengthAddress={getLengthAddress(
                    dataOwner,
                    window.innerWidth
                  )}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="explain-text mt-2">
        After choosing "Continue", please wait for the owner to accept this
        requisition within 24 hours.
      </p>
      <div className="warning-field">
        <img src={require("@images/trade/datahub/warning-icon.png")} alt="" />{" "}
        You are suggested to double-check the information in the description.
        <span>
          {" "}IVIRSE will not be responsible for the information of the data after
          the purchase completion.{" "}
        </span>
        <br />{" "}
        <Checkbox
          className="mt-2"
          checked={state.checked}
          onClick={(e) => {
            e.stopPropagation();
            setState({ checked: !state.checked });
          }}
        >
          I checked all content
        </Checkbox>
      </div>
    </ModalConfirmRequestWrapper>
  );
};

export default ModalConfirmRequest;
