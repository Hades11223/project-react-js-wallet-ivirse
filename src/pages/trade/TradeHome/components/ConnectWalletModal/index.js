import { mobileCheck } from "@utils/";
import snackbarUtils from "@utils/snackbar-utils";
import { Col, Modal, Row } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const ConnectWalletModal = (props, ref) => {
  const type = useSelector((state) => state?.global?.type);
  const setConnectType = useDispatch()?.global?.setConnectType;
  const { scrWidth } = useSelector((state) => state.global);
  const { history } = props;
  const { connect, getPublicKey } = useDispatch().contracts;
  const { setLoading } = useDispatch().global;
  const [state, _setState] = useState({});
  const callbackRef = useRef({});
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useImperativeHandle(ref, () => ({
    show: ({ showErr, showInstall }) => {
      setState({ visible: true });
      callbackRef.current.showErr = showErr;
      callbackRef.current.showInstall = showInstall;
    },
    connect: () => {
      handleConnect({ type });
    },
    handleCancelConnectModal: () => {
      onCancel();
    },
  }));
  const setUpOwner = useDispatch()?.contracts?.setUpOwner;
  const handleConnect = ({ type }) => {
    setLoading(true);
    if (type === "metamask" && typeof window.ethereum === "undefined") {
      setLoading(false);
      callbackRef.current.showInstall();
    } else {
      setConnectType(type);
      if (history.location.search == "?type=genKey") {
        setUpOwner({ type })
          .then((res) => {
            snackbarUtils.confirm({
              title: "Sign to get public key",
              okText: "Sign",
              cancelButtonProps: { style: { display: "none" } },
              onOk: () => {
                getPublicKey()
                  ?.then((res) => {
                    console.log(res);
                    window?.ReactNativeWebView?.postMessage(
                      JSON.stringify(res)
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        connect({ type })
          .then(() => {
            history.push("/tutorial");
          })
          .catch(() => {
            // snackbarUtils.error("Please reconnect your wallet!");
            callbackRef.current.showErr();
          });
      }
      // .finally(() => {
      //   setLoading(false);
      // });
    }
  };
  const onCancel = () => {
    setState({ visible: false });
  };

  const checkMetamask = () => {
    const regex = new RegExp("metamaskmobile");
    return regex.test(navigator.userAgent.toLowerCase());
  };
  return (
    <Modal
      visible={state.visible}
      footer={null}
      className="custom-connect-wallet-modal"
      onCancel={onCancel}
    >
      <h1 className="connect-modal-title">Connect wallet</h1>
      <div className="available-wallet">
        <Row className={scrWidth > 992 ? "" : "justify-content-center"}>
          <Col
            span={8}
            className="available-wallet__item"
            style={{
              opacity: !checkMetamask() && mobileCheck() ? 0.5 : 1,
              pointerEvents:
                !checkMetamask() && mobileCheck() ? "none" : "unset",
            }}
          >
            <img
              src={require("@images/trade/Choose_wallet_meta_mask.png")}
              alt=""
              onClick={() => {
                setState({ connectType: "metamask" });
                handleConnect({ type: "metamask" });
              }}
            />
          </Col>
          <Col id="trust-wallet" span={8} className="available-wallet__item">
            <img
              src={require("@images/trade/Choose_wallet_trust.png")}
              alt=""
              onClick={() => {
                setState({ connectType: "wallet-connect" });
                handleConnect({ type: "wallet-connect" });
              }}
            />
          </Col>
          <Col span={8} className="available-wallet__item">
            <img
              src={require("@images/trade/Choose_wallet_connect.png")}
              alt=""
              onClick={() => {
                setState({ connectType: "wallet-connect" });
                handleConnect({ type: "wallet-connect" });
              }}
            />
          </Col>
        </Row>
      </div>
      <div
        className="custom-modal-footer"
        id="connect-wallet-modal"
        style={{
          display: "block",
        }}
      >
        <hr
          style={{
            backgroundColor: "#6e6e6e",
          }}
        />
        <p>Wallet are provided by External Provides</p>
      </div>
    </Modal>
  );
  // );
};
export default forwardRef(ConnectWalletModal);
