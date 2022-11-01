import React from "react";

import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { ArrowRight } from "@assets/svg";
import TradeButton from "@components/TradeButton";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import LinearText from "../../components/LinearText";
import { CarouselWrapper } from "./styled";

const HowItWorkItemGen = ({ content1, content2, logo, background }) => {
  return (
    <Col md={8} lg={8} sm={12} xs={12} className="how-it-work-content">
      <div
        className="how-it-work-item d-flex"
        style={{
          background: background,
        }}
      >
        <div className="col-left">
          <p className="content1">{content1}</p>
          <p className="content2">{content2}</p>
        </div>
        <div className="col-right d-flex justify-content-center align-items-center">
          <img src={logo} />
        </div>
      </div>
    </Col>
  );
};

const DataHubImg = () => {
  return (
    <div className="jumbotron-right d-flex justify-content-center align-items-center">
      <img
        className="pill-background"
        src={require("@images/trade/datahub/pill-background.png")}
      />
      <img
        className="pill"
        src={require("@images/trade/datahub/pill-datahub-main-page.png")}
      />
    </div>
  );
};

const how_it_work_items = [
  {
    content1: "Connect",
    content2: "Wallet",
    logo: require("@images/trade/datahub/connect-wallet-logo.png"),
    background: "linear-gradient(284.97deg, #E4ABC6 2.81%, #A281FF 65.38%)",
  },
  {
    content1: "Data",
    content2: "Migration",
    logo: require("@images/trade/datahub/data-migration-logo.png"),
    background: "linear-gradient(287deg, #7150D1 5.35%, #D8C943 72.67%)",
  },
  {
    content1: "Data",
    content2: "Marketplace",
    logo: require("@images/trade/datahub/data-market-place-logo.png"),
    background: "linear-gradient(101.73deg, #7BC1A5 10.19%, #6F4CD0 88.68%)",
  },
];

export const StaticComponent = () => {
  const { scrWidth } = useSelector((state) => state.global);
  const onChange = (currentSlide) => {};
  return (
    <>
      <div id="data-hub-jumbotron" className="d-flex">
        <div className="jumbotron-left">
          <LinearText
            title={
              <span>
                DATA MARKETPLACE - <br /> A Digital Marketplace <br />
                for Healthcare Data
              </span>
            }
            fontSize={scrWidth > 576 ? "38px" : "24px"}
            lineHeight={scrWidth > 576 ? "42px" : "30px"}
          />
          {scrWidth < 768 && <DataHubImg />}
          <p className="jumbotron-text">
            The community of buying and selling healthcare data is interactive
            between buyers and sellers, healthcare records purchased and sold
            will be verified and moderated by doctors before posted. All data
            will be scruntinized and any fraud detected will be hefty fined.
          </p>
          <TradeButton
            type={"gradient"}
            content="Click here to explore"
            icon={<ArrowRight />}
            iconPosition="right"
            onClick={() => {
              let exploreCheckPoint = document.getElementById(
                "emr-result-checkpoint"
              );
              exploreCheckPoint.scrollIntoView();
            }}
          />
          <div className="instruction-box d-flex justify-content-space-between align-items-center">
            <div className="instruction-box__item">
              <p className="instruction-box-item__value">34k+</p>
              <p className="instruction-box-item__title">data</p>
            </div>
            <div className="instruction-box__item">
              <p className="instruction-box-item__value">2k+</p>
              <p className="instruction-box-item__title">transctions/day</p>
            </div>
            <div className="instruction-box__item">
              <p className="instruction-box-item__value">4k+</p>
              <p className="instruction-box-item__title">users</p>
            </div>
          </div>
        </div>
        {scrWidth > 768 && <DataHubImg />}
      </div>
      <div class="data-hub-how-it-work">
        <h1>How it works</h1>
        {scrWidth > 768 ? (
          <Row gutter={[16, 16]}>
            {how_it_work_items?.map((item, index) => (
              <HowItWorkItemGen
                key={index}
                content1={item?.content1}
                content2={item?.content2}
                logo={item?.logo}
                background={item?.background}
              />
            ))}
          </Row>
        ) : (
          <CarouselWrapper
            afterChange={onChange}
            arrows={true}
            dots={false}
            prevArrow={
              <button>
                <LeftCircleOutlined />
              </button>
            }
            nextArrow={
              <button>
                <RightCircleOutlined />
              </button>
            }
          >
            {how_it_work_items?.map((item, index) => (
              <HowItWorkItemGen
                key={index}
                content1={item?.content1}
                content2={item?.content2}
                logo={item?.logo}
                background={item?.background}
              />
            ))}
          </CarouselWrapper>
        )}
      </div>
    </>
  );
};
