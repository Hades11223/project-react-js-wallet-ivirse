import useCustomState from "@hook/useCustomState";
import { ChartEllipse } from "@svg";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area
} from "recharts";
import { ChartEllipseWrapper, ChartToolTipWrapper } from "./styled";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;
    let valueShow = payload.value.split("-");
    return (
      <g transform={`translate(${x},${y})`} className="custom-tick">
        <text x={0} y={12} dy={12} textAnchor="end" fill="white">
          {valueShow[0]}
        </text>
        <text x={7} y={12} dy={28} textAnchor="end" fill="white">
          {valueShow[1]}
        </text>
      </g>
    );
  }
}

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <ChartToolTipWrapper className="custom-tooltip">
        <p className="label">{label}</p>
        {payload?.map((item, index) => (
          <p key={index} className={`${item?.name?.toLowerCase()?.split(" ")?.join("-")}`}>
            <ChartEllipseWrapper fill={item?.color || "#fff"}>
              <ChartEllipse className="chart-ellipse-icon" />
              <span className="chart-tooltip-item__name">{item?.name}: </span>
              <span className="chart-tooltip-item__value">
                {item?.value?.formatCurrency()}
              </span>
            </ChartEllipseWrapper>
          </p>
        ))}
      </ChartToolTipWrapper>
    );
  }

  return null;
};

function MultiLinesChart(props) { 

  const {scrWidth} = props


    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={scrWidth>576 ? 500 : 200}
          height={scrWidth>576 ? 500 : 50}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: -10,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <CartesianGrid strokeDasharray="5 5 " vertical={false} />
          <XAxis
            dataKey="name"
            // tick={{ fill: "white" }}
            tick={<CustomizedAxisTick />}
            tickLine={false}
            strokeWidth={3}
            stroke="white"
            height={60}
          />
          <YAxis
            tick={{ fill: "white" }}
            strokeWidth={3}
            stroke="white"
            tickLine={false}
          />
          <Tooltip content={<CustomToolTip />} />
          {(
            <Line
              type="monotone"
              dataKey="IVI"
              stroke="#1B76FF"
              fill ="#1B76FF"
              // activeDot={{ r: 8 }}
              name="IVI"
              // strokeWidth={3}
              dot={{ strokeWidth: 1 }}
              connectNulls
              

            />
          )}
          {(
            <Line
              type="monotone"
              dataKey="IHI"
              stroke="#DE71C9"
              name="IHI"
              // strokeWidth={3}
              dot={{ strokeWidth: 1 }}
              connectNulls
            />
          )}
          {(
            <Line
              type="monotone"
              dataKey="USDT"
              stroke="#8C3CF4"
              name="USDT"
              // strokeWidth={3}
              dot={{ strokeWidth: 1 }}
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  const mapStateToProps = ({global : {scrWidth}})=>({
    scrWidth
  })

  const mapActionToProps = {}

  export default connect(mapStateToProps,mapActionToProps)(MultiLinesChart)

