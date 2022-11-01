import React, { PureComponent } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { PieWrapper } from "./styled";
import { connect } from "react-redux";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  //   return (
  //     <g>
  //       <text
  //         x={cx}
  //         y={cy}
  //         dy={8}
  //         textAnchor="middle"
  //         fill={fill}
  //         fontSize={20}
  //       >
  //         {payload.date}
  //       </text>
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         innerRadius={innerRadius}
  //         outerRadius={outerRadius}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         fill={fill}
  //       />
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         innerRadius={outerRadius + 6}
  //         outerRadius={outerRadius + 10}
  //         fill={fill}
  //       />
  //       <path
  //         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
  //         stroke={"white"}
  //         fill="none"
  //       />
  //       <circle cx={ex} cy={ey} r={2} fill={"white"} stroke="none" />
  //       <text
  //         fontSize={15}
  //         x={ex + (cos >= 0 ? 1 : -1) * 12}
  //         y={ey}
  //         textAnchor={textAnchor}
  //         fill={"white"}
  //       >{`${value.formatCurrency()}`}</text>
  //       <text
  //         fontSize={15}
  //         x={ex + (cos >= 0 ? 1 : -1) * 12}
  //         y={ey}
  //         dy={18}
  //         textAnchor={textAnchor}
  //         fill={"white"}
  //       >
  //         {`(${(percent * 100).toFixed(2)}%)`}
  //       </text>
  //     </g>
  //   );
  return (
    <g>
      <text
        x={cx}
        y={cy - 25}
        dy={8}
        textAnchor="middle"
        fill={"white"}
        fontSize={14}
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={"white"}
        fontSize={14}
      >
        {value.formatCurrency()}
      </text>
      <text
        x={cx}
        y={cy + 25}
        dy={8}
        textAnchor="middle"
        fill={"white"}
        fontSize={14}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};
const COLORS = [
  "#BEE4CC", //claimable
  "#7C5EFC", //claimed
  "#EBCB82", //commingsoon
  "#28ffc9",
  "#5ab6e2",
  "#4000ff",
  "#8c46d9",
  "#c42062",
  "#FF0000",
];
const LINEAR_COLOR = [
  {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    offset1: "19.39%",
    stopColor1: "#1CAD98",
    stopOpacity1: "1",
    offset2: "74.94%",
    stopColor2: "#59D2D0",
    stopOpacity2: "1",
  },
  {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    offset1: "26.67%",
    stopColor1: "#726FCE",
    stopOpacity1: "1",
    offset2: "74.82%",
    stopColor2: "#6A4FF0",
    stopOpacity2: "1",
  },
  {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    offset1: "31.07%",
    stopColor1: "#F39550",
    stopOpacity1: "1",
    offset2: "79.41%",
    stopColor2: "#D56F81",
    stopOpacity2: "1",
  },
  {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    offset1: "31.07%",
    stopColor1: "#DC66E7",
    stopOpacity1: "1",
    offset2: "79.41%",
    stopColor2: "#FFCAC5",
    stopOpacity2: "1",
  },
];

class Example extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {

    const {scrWidth} = this.props
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieWrapper>
          <div className="main-chart">
            <PieChart width={scrWidth >992? 190 : scrWidth >768 ? scrWidth/4 : scrWidth>576 ? scrWidth/3 : 160} height={scrWidth >992? 190: scrWidth >768 ? scrWidth/4 : scrWidth>576 ? scrWidth/3 : 160} className="pie-chart">
              <defs>
                {LINEAR_COLOR.map((item, index) => (
                  <linearGradient
                    id={`piechart_color_${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    key={index}
                  >
                    <stop
                      offset={item.offset1}
                      stopColor={item.stopColor1}
                      stopOpacity={item.stopOpacity1}
                    />
                    <stop
                      offset={item.offset2}
                      stopColor={item.stopColor2}
                      stopOpacity={item.stopOpacity1}
                    />
                  </linearGradient>
                ))}
              </defs>
              {/* <Legend display={true}/> */}
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.props.data}
                cx={scrWidth < 425 ? "50%" : scrWidth < 567 ? "50%" : scrWidth < 1024? "47%" : "50%"}
                cy={scrWidth < 425 ? "50%" : scrWidth < 567 ? "50%" :scrWidth<1024 ? "47%" : "50%"}
                innerRadius={scrWidth>992? 60 : scrWidth>576 ?  65 : 50}
                outerRadius={scrWidth>992? 80 :scrWidth>576 ?  87 : 70}
                dataKey={this.props.keyValue}
                onMouseEnter={this.onPieEnter}
              >
                {this.props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#piechart_color_${index})`}
                  />
                ))}
              </Pie>
            </PieChart>
            <h3
              className="chart-title"
              style={{ textAlign: "center", color: "white", fontSize: "24px" }}
            >
              {this.props.chartName}
            </h3>
            {/* </ResponsiveContainer> */}
          </div>
        </PieWrapper>

      </ResponsiveContainer>
    );
  }
}

const mapStateToProps=(state)=>({
  scrWidth : state.global.scrWidth
})

const mapActionToProps = {

}


export default connect(mapStateToProps,mapActionToProps)(Example)