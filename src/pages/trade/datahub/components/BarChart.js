import React, { PureComponent } from "react";
import { ChartEllipse } from "@svg";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChartWrapper, ToolTipWrapper } from "./styled";
import { ChartToolTipWrapper } from "./styled";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

const LINEAR_COLOR = {
  x1: "0",
  y1: "0",
  x2: "0",
  y2: "1",
  offset1: "0%",
  stopColor1: "#5AEDC3",
  stopOpacity1: "1",
  offset2: "47.92%",
  stopColor2: "#E4DD8F",
  stopOpacity2: "1",
  offset3: "73.96%",
  stopColor3: "#00945D",
  stopOpacity3: "1",
};

const CustomToolTip = (props) => {
  const { active, payload, label } = props;
  if (active && payload) {
    const { IVI, IHI, USDT, total } = payload[0]?.payload;
    return (
      <ChartToolTipWrapper className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="tooltip-text">IVI : {IVI}</p>
        <p className="tooltip-text">IHI : {IHI}</p>
        <p className="tooltip-text">USDT : {USDT}</p>
      </ChartToolTipWrapper>
    );
  }

  return null;
};
// const getPath = (x, y, width, height) => `M0 5C0 2.23858 2.23858 0 5 0H22C24.7614 0 ${width} 2.23858 ${width} 5V${height}H0V5Z`;

// const TriangleBar = (props) => {
//   const { fill, x, y, width, height } = props;

//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
//   // return (
   
//   //     <path
//   //       d="M0 5C0 2.23858 2.23858 0 5 0H21C23.7614 0 ${} 2.23858 26 5V35H0V5Z"
//   //       // fill="url(#paint0_linear_4065_5772)"
//   //       fill={fill}
//   //       stroke="none"
//   //     />
//   // );
// };

class Example extends PureComponent {
  //   static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';
  constructor() {
    super();
  }

  render() {
    const { scrWidth } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChartWrapper>
          <BarChart
            width={scrWidth > 992 ? scrWidth / 3.2 : scrWidth / 1.14}
            height={350}
            data={this.props.data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              {this.props.data.map((item, index) => (
                <linearGradient
                  id={`barchart_color_${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={index}
                >
                  <stop
                    // offset={`${this.props.data?.IVI / this.props.data?.total *100}%`}
                    offset={LINEAR_COLOR.offset1}
                    stopColor={LINEAR_COLOR.stopColor1}
                    stopOpacity={LINEAR_COLOR.stopOpacity1}
                  />
                  <stop
                    // offset={`${this.props.data?.IHI / this.props.data?.total *100}%`}
                    offset={LINEAR_COLOR.offset2}
                    stopColor={LINEAR_COLOR.stopColor2}
                    stopOpacity={LINEAR_COLOR.stopOpacity1}
                  />
                  <stop
                    offset={LINEAR_COLOR.offset3}
                    stopColor={LINEAR_COLOR.stopColor3}
                    stopOpacity={LINEAR_COLOR.stopOpacity3}
                  />
                </linearGradient>
              ))}
            </defs>

            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#fff", fontSize: 10 }}
              tickLine={false}
              strokeWidth={1}
              stroke="white"
              height={60}
              interval={0}
            />
            {/* <YAxis /> */}
            <Tooltip content={<CustomToolTip />} />
            {/* <Legend /> */}
            <Bar
              dataKey="total"
              stackId="a"
              fill={`url(#barchart_color_0)`}
              // shape={<TriangleBar />}
              
            />
            {/* <Bar dataKey="IHI" stackId="a" fill={`url(#barchart_color_1)`} />
            <Bar dataKey="USDT" stackId="a" fill={`url(#barchart_color_2)`} /> */}
          </BarChart>
        </BarChartWrapper>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = ({ global: { scrWidth } }) => ({
  scrWidth,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Example);
