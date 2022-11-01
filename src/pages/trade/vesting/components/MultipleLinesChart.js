import { ChartEllipse } from "@svg";
import React, { PureComponent } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ChartEllipseWrapper, ChartToolTipWrapper } from "./styled";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;
    let valueShow = payload.value.split("-");

    return (
      <g transform={`translate(${x},${y})`} className="custom-tick">
        <text x={0} y={12} dy={12} textAnchor="end" fill="white">
          {valueShow[1]}
        </text>
        <text x={7} y={12} dy={28} textAnchor="end" fill="white">
          {valueShow[2]}
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
          <p className={`${item?.name?.toLowerCase()?.split(" ")?.join("-")}`}>
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

export default class MultipleLinesChart extends PureComponent {
  render() {
    let seedAmountIsZero = this.props.data.every((item) => !item.amountSeed);
    let privateAmountIsZero = this.props.data.every(
      (item) => !item.amountPrivate
    );
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={500}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            // tick={{ fill: "white" }}
            tick={<CustomizedAxisTick />}
            tickLine={false}
            strokeWidth={3}
            stroke="white"
            height={60}
            // tickFormatter={this.xAxisTickFormatter}
          />
          <YAxis
            tick={{ fill: "white" }}
            strokeWidth={3}
            stroke="white"
            tickLine={false}
          />
          <Tooltip content={<CustomToolTip />} />
          {!privateAmountIsZero && (
            <Line
              type="monotone"
              dataKey="amountPrivate"
              stroke="#1B76FF"
              // activeDot={{ r: 8 }}
              name="Private Sale"
              strokeWidth={3}
              dot={{ strokeWidth: 1 }}
              connectNulls
            />
          )}
          {!seedAmountIsZero && (
            <Line
              type="monotone"
              dataKey="amountSeed"
              stroke="#DE71C9"
              name="Seed Sale"
              strokeWidth={3}
              dot={{ strokeWidth: 1 }}
              connectNulls
            />
          )}
          {!(privateAmountIsZero || seedAmountIsZero) && (
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8C3CF4"
              name="Total"
              strokeWidth={3}
              dot={{ strokeWidth: 1 }}
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
