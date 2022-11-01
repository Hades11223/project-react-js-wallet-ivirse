import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { ModalSwapWrapper } from "./styled";

const Line = () => {
  return (
    <div
      className="line-dash"
      style={{
        width: "100%",
        height: "0px",
        left: "7px",
        opacity: 0.3,
        borderBottom: "1px dashed #2B2B2B",
      }}
    ></div>
  );
};

const ModalSwap = ({
  visible,
  onOk,
  onCancel,
  tokenLists,
  currentToken,
  ...props
}) => {
  return (
    <ModalSwapWrapper
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={<></>}
      closable={true}
      title={"Choose token"}
      closeIcon={<CloseOutlined />}
      {...props}
    >
      {tokenLists?.map((item, index) => (
        <div className={`wrapper ${item?.disabled && "disabled"}`}>
          <div
            className={`token-swap-item d-flex justify-content-space-between `}
            onClick={() => {
              onCancel({ tokenIdx: index });
            }}
          >
            <div className="token-swap-item__info d-flex">
              <img className="token-icon" src={item?.Icon} alt="" />
              <div>
                <p
                  className={`name ${
                    item?.value === currentToken?.value ? "active" : ""
                  }`}
                >
                  {item?.text}
                </p>
                <p className="description">{item?.description}</p>
              </div>
            </div>
            <div className="token-swap-item__price">
              <p
                className={`token-price ${
                  item?.value === currentToken?.value ? "active" : ""
                }`}
              >
                40000
              </p>
              <p className="usd-price">$8.888</p>
            </div>
          </div>
          <Line />
        </div>
      ))}
    </ModalSwapWrapper>
  );
};

export default ModalSwap;
