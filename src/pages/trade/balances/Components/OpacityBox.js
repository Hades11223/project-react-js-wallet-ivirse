import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress } from "@utils/";
import React from "react";
import { OpacityBoxWrapper } from "./styled";



const OpacityBox = ({ data, key, scrWidth }) => {
  const windowSize = useDebounceWindowResize().width;
  return (
    <>
      {windowSize > 576 && (
        <OpacityBoxWrapper key={key} windowSize={windowSize}>
          <p className="item-name">
            <strong>{data?.name}</strong>
          </p>
          <div
            className={
              windowSize > 576 ? "d-flex justify-content-space-between" : ""
            }
          >
            <div className="opacity-box-left">
              <p className="item-symbol">
                Symbol: <strong>{data?.symbol}</strong>
              </p>
              <p className="item-address">
                Address:
                <AddressTooltip
                  address={data?.addressCoin}
                  getLengthAddress={getLengthAddress(
                    data?.addressCoin,
                    scrWidth
                  )}
                />
              </p>
            </div>
            <div
              className={
                windowSize > 576
                  ? "opacity-box-right"
                  : "opacity-box-right d-flex"
              }
            >
              <p>Balance:</p>
              <p>
                <strong>{data?.balance?.formatCurrency()}</strong>
              </p>
            </div>
          </div>
        </OpacityBoxWrapper>
      )}
      {windowSize < 576 && (
        <OpacityBoxWrapper key={key} windowSize={windowSize}>
          <p className="item-name">
            <strong>{data?.name}</strong>
          </p>
          <div className="d-flex">
            <div className="opacitybox-left-mobile">
              <p className="item-symbol">Symbol:</p>
              <p className="item-address">Address:</p>
              <p>Balance:</p>
            </div>
            <div className="opacitybox-right-mobile">
              <p>
                <strong>{data?.symbol}</strong>
              </p>
              <p>
                <AddressTooltip
                  address={data?.addressCoin}
                  getLengthAddress={getLengthAddress(
                    data?.addressCoin,
                    scrWidth
                  )}
                />
              </p>
              <p>
                <strong>{data?.balance?.formatCurrency()}</strong>
              </p>
            </div>
          </div>
        </OpacityBoxWrapper>
      )}
    </>
  );
};

export default OpacityBox;
