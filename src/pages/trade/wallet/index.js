import { CopyOutlined } from "@ant-design/icons";
import { CorrectLine, WrongLine } from "@assets/animation";
import TradeButton from "@components/TradeButton";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { IviIcon } from "@svg";
import { applyDecimals, copyToClipBoard } from "@utils";
import { Button, Input, Modal, Spin, Tooltip } from "antd";
import { ethers } from "ethers";
import { debounce } from "lodash";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LinearText from "../components/LinearText";
import { WrapperStyled } from "./styled";
const SuccessModal = forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
    }),
    []
  );

  return (
    <Modal
      visible={visible}
      title="Transfer Successfully!"
      onOk={onCancel}
      onCancel={onCancel}
      footer={[
        <Button key="toTransferScan" className="btn-trans" onClick={onCancel}>
          <Link to={"/transfers-scan"} style={{ color: "black" }}>
            Go to TransferScan
          </Link>
        </Button>,
        <Button key="back" onClick={onCancel} className="button-footer-model">
          Continue
        </Button>,
      ]}
    >
      <CorrectLine />
    </Modal>
  );
});

const FailModal = forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
    }),
    []
  );
  return (
    <Modal
      visible={visible}
      title="Transfer Failed!"
      onCancel={onCancel}
      footer={[
        <Button onClick={onCancel} className="button-footer-model">
          Try again
        </Button>,
      ]}
    >
      <WrongLine />
      <p className="model-text">Transfer failed, please try again</p>
    </Modal>
  );
});

const Wallet = ({
  erc20,
  address,
  balance,
  web3Provider,
  symbol,
  currentContractProperties,
  setLoading,
}) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const windowSize = useDebounceWindowResize()?.width;
  const transfer = useDispatch()?.contracts?.transfer;

  const onClickTransfer = () => {
    setState({ loading: true });
    transfer({ address: state.fromAddress, amount: state.amount })
      .then((res) => {
        successRef?.current?.show();
      })
      .catch((err) => {
        console.log(err);

        failRef?.current?.show();
      })
      .finally(() => {
        setState({ loading: false });
      });
  };
  const successRef = useRef();
  const failRef = useRef();
  const calculatorGasFee = debounce(async () => {
    const amountToSend = await applyDecimals(state.amount, 18, "positive");
    const est = await erc20.estimateGas.transfer(
      state.fromAddress,
      amountToSend
    );
    setState({
      gasLimit: parseInt(est._hex, 16),
      gasFee: (parseInt(est._hex, 16) * 10) / 1000000000,
      gasPrice: 10 / 1000000000,
    });
  }, 1000);

  useEffect(() => {
    if (
      state.fromAddress &&
      state.amount &&
      ethers.utils.isAddress(state.fromAddress)
    ) {
      calculatorGasFee();
    }
  }, [state.fromAddress, state.amount]);

  return (
    <WrapperStyled>
      <div className="w-full mt-7">
        <LinearText
          className="wallet-title"
          title={"Wallet"}
          fontSize="50px"
          lineHeight="50px"
        />
      </div>

      <div className="card-contain w-full">
        <div className="head">
          <div className="address-block">
            <div className="title d-flex align-items-center">
              <div className="address-title">Your wallet</div>
            </div>
            {windowSize > 576 ? (
              <div className="content">
                {address?.substring(0, 15)}...{address?.substr(-3)}
                <Tooltip title={"Copy"}>
                  <CopyOutlined
                    onClick={() => {
                      copyToClipBoard(address);
                    }}
                  />
                </Tooltip>
              </div>
            ) : (
              <div className="content">
                {address?.substring(0, 6)}...{address?.substr(-3)}
                <Tooltip title={"Copy"}>
                  <CopyOutlined
                    onClick={() => {
                      copyToClipBoard(address);
                    }}
                  />
                </Tooltip>
              </div>
            )}
          </div>

          <div className="price-block">
            <div className="flex">
              <div className="symbol">{symbol}</div>
              <div className="icon">
                <IviIcon width={24} height={24} />
              </div>
            </div>
            <div className="balance">{balance?.formatCurrency()}</div>
          </div>
        </div>
        <div className="body">
          <div className="content">
            <div className="asset-title mb-2">Amount</div>
            <div className="asset-input mg-bt-15">
              {/* <InputNumber
                precision={8}
                decimalSeparator=","
                placeholder="Enter amount"
                max={balance}
                min={0}
                step={0.1}
                // formatter={(value) =>
                //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                // }
                parser={(value) => value.replace(/\\s?|(,*)/g, "")}
                onChange={(value) => {
                  if (value > balance) {
                  } else {
                    setState({ amount: value });
                  }
                }}
                style={{ width: "100%" }}
              /> */}
              <CurrencyInput
                className="currency-input"
                placeholder="Enter amount"
                style={{ width: "100%" }}
                decimalSeparator={"."}
                groupSeparator={","}
                decimalsLimit={8}
                onValueChange={(value) => {
                  if (value && value > balance) {
                    setState({ amount: balance });
                  } else if (value) {
                    setState({ amount: value });
                  } else {
                    setState({ amount: 0 });
                  }
                }}
                value={state.amount}
              />
            </div>
            <div className="rep-title mb-2">Recipient</div>
            <div className="asset-input mg-bt-15">
              <Input
                className="input-recipient"
                onChange={(e) => {
                  setState({ fromAddress: e.target.value });
                }}
                placeholder="Enter wallet address"
              />
            </div>
            <div className="est mg-bt-15">
              <div className="title">Estimate Gas Fee</div>
              <div className="gas-fee">
                <div className="fee">{state.gasFee}</div>
                <div className="symbol">
                  {currentContractProperties?.symbol}
                </div>
              </div>
            </div>
            <hr className="bg-white" />
            <div className="footer card-item">
              <TradeButton
                className="d-flex justify-content-center w-full pt-3 pb-3 align-items-center"
                type="gradient"
                content={state.loading ? <Spin /> : "SEND"}
                onClick={onClickTransfer}
                disabled={state.loading || !state.amount || !state.fromAddress}
                fontSize="16px"
                style={{ height: "40px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="transparent-box"></div>
      <SuccessModal ref={successRef} />
      <FailModal ref={failRef} />
    </WrapperStyled>
  );
};

export default Wallet;
