import { ClockIcon } from "@assets/svg";
import TradeButton from "@components/TradeButton";
import { Col, Row } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ModalWrapper } from "../styled";

const ModalConfirm = ({ onOk, title, type, ...props }, ref) => {
  const [state, _setState] = useState({
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const onCancel = () => {
    setState({ visible: false });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ visible: true });
    },
    close: () => {
      onCancel();
    },
  }));

  return (
    <ModalWrapper
      {...props}
      onCancel={onCancel}
      visible={state.visible}
      onOk={onOk}
      footer={null}
      width={600}
    >
      <h2 className="title">{`${type} admin role`}</h2>
      <div className="d-flex">
        <div className="img-wrapper">
          <img src={require("@images/trade/sad_img.png")} />
        </div>
        <div className="content ml-3">
          <p>
            You{" "}
            {type === "Renounce"
              ? "choose to give up your admin role. Are you sure?"
              : "just make a request to revoke this admin. Are you sure?"}
          </p>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              {" "}
              <TradeButton
                type={"transparent_gray"}
                content={"I 'll do it later"}
                icon={<ClockIcon />}
                onClick={onCancel}
              />
            </Col>

            <Col xs={24} sm={12}>
              {" "}
              <TradeButton type={"gradient"} content={"OK"} onClick={onOk} />
            </Col>
          </Row>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default forwardRef(ModalConfirm);
