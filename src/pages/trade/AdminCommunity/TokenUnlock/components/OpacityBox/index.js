import React from "react";
import { OpacityBoxWrapper } from "../styled";

const OpacityBoxGroup = ({ data, total }) => {
  return (
    <OpacityBoxWrapper>
      {data?.map((item, index) => (
        <div className="opacity-box mb-2" key={index}>
          <div className="unlock-time">{item?.time?.slice(3, 11)}</div>
          <div className="unlock-value d-flex">
            <span className="title">Value unlock</span>
            <span className="value">{item?.amount?.formatCurrency()}</span>
          </div>
          <div className="total d-flex ">
            <span className="title">Total</span>
            <span className="value">{total?.formatCurrency()}</span>
          </div>
        </div>
      ))}
    </OpacityBoxWrapper>
  );
};

export default OpacityBoxGroup;
