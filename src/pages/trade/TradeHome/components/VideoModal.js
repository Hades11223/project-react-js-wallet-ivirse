import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./video.scss";

const VideoModal = (props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ visible: true });
    },
  }));
  const onCancel = () => {
    setState({ visible: false });
  };
  return (
    <Modal
      width={"70%"}
      className="home-trade-modal"
      visible={state.visible}
      title={null}
      onCancel={onCancel}
      footer={null}
      closable={false}
      id="home-video-modal"
    >
      <iframe
        width={"100%"}
        height={"600px"}
        src="https://www.youtube.com/embed/3F_ulkwE_BU"
        title="YouTube video player"
        frameBorder="0"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default forwardRef(VideoModal);
