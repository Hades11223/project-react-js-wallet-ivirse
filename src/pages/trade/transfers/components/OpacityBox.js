import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress } from "@utils";
import React from "react";
import { OpacityBoxWrapper } from "./styled";
const OpacityBox = ({ data, keyChild, scrWidth, toggleTable }) => {
  return (
    <OpacityBoxWrapper key={keyChild}>
      <div className="time-and-state d-flex mb-2">
        <div>
          {data.state === 0 ? (
            <div className="TransferIcon">
              <img
                alt=""
                className="state-icon"
                src={require("@images/out-icon.png")}
              ></img>
            </div>
          ) : (
            <div className="TransferIcon">
              <img
                alt=""
                className="state-icon"
                src={require("@images/in-icon.png")}
              ></img>
            </div>
          )}
        </div>
        <div>{data?.time}</div>
      </div>
      <div className="body-box d-flex justify-content-space-between">
        <div className="transfer-info-left">
          {toggleTable !== 2 && (
            <p className="opacity-box__item">
              <span>Token: </span>
              <span>
                <strong>{data?.tokenName}</strong>
              </span>
            </p>
          )}

          <p className="opacity-box__item">
            <span>From: </span>
            <span>
              {
                <AddressTooltip
                  address={data?.from}
                  getLengthAddress={getLengthAddress(data?.from, scrWidth)}
                />
              }
            </span>
          </p>
          <p className="opacity-box__item">
            <span>To: </span>
            <span>
              {
                <AddressTooltip
                  address={data?.to}
                  getLengthAddress={getLengthAddress(data?.to, scrWidth)}
                />
              }
            </span>
          </p>
        </div>
        <div className="transfer-info-right">
          <div className="transfer-opacity-status">
            {data?.status ? (
              <div className="ts-status">
                <div className="ts-ck">
                  <div className="green icon"></div>
                </div>
                <p className="ts-text">Success</p>
              </div>
            ) : (
              <div className="ts-status">
                <div className="ts-ck">
                  <div className="red icon"></div>
                </div>
                <p className="ts-text">Fail</p>
              </div>
            )}
          </div>
          <p className="opacity-box__item">
            <span>{toggleTable === 2 ? "Gas Fee" : "Value"}: </span>
            {toggleTable === 2 ? (
              <span>{(data?.gas * 10) / 1000000000}</span>
            ) : (
              <span>{data?.tokenValue}</span>
            )}
          </p>
          <p className="opacity-box__item">
            <span>Hash: </span>
            {toggleTable === 2 ? (
              <span>
                <AddressTooltip
                  address={data?.hash}
                  getLengthAddress={getLengthAddress(data?.hash, scrWidth)}
                />
              </span>
            ) : (
              <span>
                <AddressTooltip
                  address={data?.hash}
                  getLengthAddress={getLengthAddress(data?.hash, scrWidth)}
                />
              </span>
            )}
          </p>
        </div>
      </div>
    </OpacityBoxWrapper>
  );
};

export default OpacityBox;
