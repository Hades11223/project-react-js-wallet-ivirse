import React, { useEffect } from "react";
import { WrapperDashBoard } from "./styled";
import { pieData } from "./dataProfile";

import { Divider, LegendPoint } from "@pages/trade/vesting/components/styled";
import BarChart from "../components/BarChart";
import { barData } from "./dataProfile";
import MultiLinesChart from "../components/MultiLinesChart";
import MultipleLinesChart from "@pages/trade/vesting/components/MultipleLinesChart";
import PieChartProfile from "../components/PieChartProfile";
import { useSelector } from "react-redux";
import DotIcon from "@components/DotIcon";

function DashBoard() {
  const dataBar = barData.map((item, index) => ({
    ...item,
    total: (function () {
      return item.IHI + item.IVI + item.USDT;
    })(),
  }));
  const { scrWidth } = useSelector((state) => state.global);
  const total = pieData.reduce((sum, item) => {
    return sum + item.assets;
  }, 0);
  const Legend = [
    {
      color: "linear-gradient(146.05deg, #1CAD98 20.12%, #59D2D0 80.17%)",
    },
    {
      color: "linear-gradient(146.05deg, #726FCE 20.12%, #6A4FF0 80.17%)",
    },
    {
      color: "linear-gradient(146.05deg, #F39550 20.12%, #D56F81 80.17%)",
    },
    {
      color: "linear-gradient(146.05deg, #DC66E7 20.12%, #FFCAC5 80.17%)",
    },
  ];

  useEffect(() => {
    // scroll to top effect
    let container = document.querySelector(".wrapper-container");
    container.scrollTo(0, 0);
  });

  return (
    <WrapperDashBoard>
      <div className="chart-container">
        <div className="piechart-container">
          <div className="piechart-total">
            <span>Total Assets</span>
            <span>{total}</span>
          </div>
          <div className="piechart-item">
            <div className="piechart-item-left">
              <PieChartProfile
                data={pieData}
                keyValue={"assets"}
                chartName={""}
              />
            </div>

            <div className="piechart-item-right">
              {pieData.map((item, index) => {
                return (
                  <div key={index} className="content-right">
                    {/* <LegendPoint background={Legend[index].color} /> */}
                    <DotIcon color={Legend[index].color} />
                    <span className="content-right-legend">
                      <span className="content-right-legend-left">
                        {item.name}
                      </span>
                      <span>{item.assets}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="barchart-container">
          <div className="barchart-total">
            <span>Token earned</span>
          </div>
          <BarChart data={dataBar} />
        </div>
      </div>
      <div className="line-chart-container">
        <div className="line-chart-left">
          <h2 className="line-chart-left-title">TOKENS VOLATILITY </h2>
          <MultiLinesChart data={barData} />
        </div>
        {scrWidth < 992 && (
          <Divider marginTop={60} marginBottom={scrWidth > 576 ? 45 : 20} />
        )}
        <div className="line-chart-right">
          <h2 className="line-chart-right-title">REALTIME</h2>
          <div className="line-chart-right-item">
            <img
              className="line-chart-right-item-img"
              src={require("@images/trade/datahub/IVI-currency.png")}
            />
            <div className="line-chart-right-item-content">
              <div className="content-up">
                <span>IVI</span>
                <span>40,000</span>
              </div>
              <div className="content-down">
                <span>IVI Tokens</span>
                <span>$869,652</span>
              </div>
            </div>
          </div>
          <div className="line-chart-right-item">
            <img
              className="line-chart-right-item-img"
              src={require("@images/trade/datahub/IHI-currency.png")}
            />
            <div className="line-chart-right-item-content">
              <div className="content-up">
                <span>IVI</span>
                <span>40,000</span>
              </div>
              <div className="content-down">
                <span>IVI Tokens</span>
                <span>$869,652</span>
              </div>
            </div>
          </div>
          <div className="line-chart-right-item">
            <img
              className="line-chart-right-item-img"
              src={require("@images/trade/datahub/usdt-currency.png")}
            />
            <div className="line-chart-right-item-content">
              <div className="content-up">
                <span>IVI</span>
                <span>40,000</span>
              </div>
              <div className="content-down">
                <span>IVI Tokens</span>
                <span>$869,652</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperDashBoard>
  );
}

export default DashBoard;
