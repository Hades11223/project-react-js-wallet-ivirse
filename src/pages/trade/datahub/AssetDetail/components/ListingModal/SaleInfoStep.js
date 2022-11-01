import AgreementBox from "@components/Agreement";
import TradeBasicSelect from "@components/TradeBasicSelect";
import { SelectType } from "@components/TradeBasicSelect/styled";
import useCustomState from "@hook/useCustomState";
import { ButtonSwapToken, tokens } from "@pages/trade/datahub/deposit";
import ModalSwapToken from "@pages/trade/datahub/deposit/components/ModalSwap";
import ModalSuccessNoti from "@pages/trade/datahub/Profile/components/ModalSuccessNoti";
import { Col, DatePicker, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { GeneralStyleWrapper, SaleInfoStepWrapper } from "../styled";
import "./style.scss";

const SaleInfoStep = ({ assetCId, setState, state }) => {
  const [componentState, setComponentState] = useCustomState({
    currentToken: tokens[0],
    currentTokenIndex: 0,
    // modal swap
    isOpenModalSwap: false,
  });
  const handleCloseModalSwap = ({ tokenIdx }) => {
    tokenIdx =
      tokenIdx === undefined ? componentState.currentTokenIndex : tokenIdx;
    setComponentState({
      isOpenModalSwap: false,
      currentTokenIndex: tokenIdx,
    });
  };
  const handleOpenModalSwap = () => {
    setComponentState({
      isOpenModalSwap: true,
    });
  };
  const handleChangeExpiredDate = (time) => {
    setState({
      expiredDate: time?.format("YYYY/MM/DD"),
    });
  };
  const handleChangeExpiredTime = (time) => {
    setState({
      expiredTime: time?.format("hh:mm"),
    });
  };
  // const handleChangeHashtag = (hashtag) => {
  //   setState({
  //     hashtag,
  //   });
  // };

  const handleCheckout = (e) => {
    setState({
      isCheckout: e?.target?.checked,
    });
  };
  return (
    <GeneralStyleWrapper>
      <SaleInfoStepWrapper>
        <p className="asset-name">
          <span className="line-title">Name</span>
          <span className="line-value">{assetCId || ""}</span>
        </p>
        {/* <div className="avatar-field d-flex justify-content-space-between">
          <span className="line-title">Avatar</span>
          <CustomSearch
            placeholder="Search by name..."
            className="search-avatar"
            style={{
              width: "370px",
            }}
          />
        </div>
        <div className="list-avatar-field"></div> */}
        <Row
          className="price-and-expired-field d-flex justify-content-space-between"
          gutter={[16, 16]}
        >
          <Col
            md={12}
            lg={12}
            sm={24}
            xs={24}
            className="price-field mt-4 mb-4"
          >
            <p className="line-title">Price</p>
            <div className="price-field__wrapper">
              <ButtonSwapToken
                handleOpenModalSwap={handleOpenModalSwap}
                state={componentState}
              />
              <CurrencyInput
                className="input-listing-price"
                placeholder={"Please input asset amount!"}
                decimalSeparator={"."}
                groupSeparator={","}
                allowNegativeValue={false}
                decimalsLimit={8}
                value={state?.toValue}
                onValueChange={(value) => {
                  setState({
                    toValue: value,
                  });
                }}
              />
            </div>
          </Col>
          {/* <Col md={12} lg={12} sm={24} xs={24} className="expired-field mt-4">
            <p className="line-title">Expired time</p>
            <div>
              <DatePicker
                popupClassName="custom-date-picker-panel"
                className="expired-date-picker"
                format={(value) => {
                  return value.format("LL");
                }}
                onChange={handleChangeExpiredDate}
                value={state?.expiredDate ? moment(state?.expiredDate) : null}
              />
            </div>
            <div className="mt-2">
              <TimePicker
                popupClassName="custom-time-picker-panel"
                className="expired-hours-picker"
                format="hh:mm a"
                use12Hours
                onChange={handleChangeExpiredTime}
                value={
                  state?.expiredTime
                    ? moment(state?.expiredTime, "hh:mm a")
                    : null
                }
              />
            </div>
          </Col> */}
        </Row>
        {/* <div className="hastag-field mt-4">
          <p className="line-title">Hastag</p>
          <TradeBasicSelect
            showArrow
            className="w-full"
            type={SelectType.TRANSPARENT_GRAY_ROUND}
            mode="multiple"
            placeholder={"Choose"}
            onChange={handleChangeHashtag}
            value={state?.hashtag}
            options={[
              {
                label: "Healtcare",
                value: 1,
              },
              {
                label: "EHR",
                value: 2,
              },
              {
                label: "Internal",
                value: 3,
              },
            ]}
          />
        </div> */}
        <AgreementBox
          onChange={handleCheckout}
          checkBoxContent="I checked all content"
          content="You need to double-check the content and warn the buyer (if any) in case the profile is partially missing.
          Ivirse will not be responsible for reports received from buyers."
        />
      </SaleInfoStepWrapper>
      <ModalSwapToken
        visible={componentState.isOpenModalSwap}
        onOk={() => {}}
        onCancel={handleCloseModalSwap}
        tokenLists={tokens}
        currentToken={tokens[componentState.currentTokenIndex]}
      />
     
    </GeneralStyleWrapper>
  );
};

export default SaleInfoStep;
