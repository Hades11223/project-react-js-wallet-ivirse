import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import { PieWrapper } from "./styled";
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
  return (
    <g>
      {payload.name === "Available for future campaigns" ? (
        <>
          <text
            x={cx}
            y={cy - 30}
            dy={8}
            textAnchor="middle"
            fill={"#FFFFFF"}
            fontSize={16}
          >
            Available for
          </text>
          <text
            x={cx}
            y={cy - 15}
            dy={8}
            textAnchor="middle"
            fill={"#FFFFFF"}
            fontSize={16}
          >
            future campaigns
          </text>
        </>
      ) : (
        <text
          x={cx}
          y={cy - 13}
          dy={8}
          textAnchor="middle"
          fill={"#FFFFFF"}
          fontSize={16}
        >
          {payload.name}
        </text>
      )}
      <text
        x={cx}
        y={cy + 15}
        dy={8}
        textAnchor="middle"
        fill={"#FFFFFF"}
        fontSize={16}
      >
        {value}
      </text>

      <text
        x={cx}
        y={cy + 35}
        dy={8}
        textAnchor="middle"
        fill={"#FFFFFF"}
        fontSize={16}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
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
    </g>
  );
};

export default class Example extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const COLORS1 = ["rgba(255, 183, 75, 1)", "rgba(255, 126, 33, 1)"];
    const COLORS2 = ["rgba(28, 173, 152, 1)", "rgba(114, 111, 206, 1)"];
    const total = this.props.data.reduce(
      (total, current) => total + current.value,
      0
    );
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieWrapper>
          <div className="main-chart">
            <PieChart width={400} height={300}>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.props.data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              >
                {this.props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      this.props.nameChart == "TOKEN TRANSFERRED TO SMC"
                        ? COLORS1[index % COLORS1.length]
                        : COLORS2[index % COLORS2.length]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="title-container">
              <h3 className="chart-title">{this.props.nameChart}</h3>
            </div>
            <h3 className="total">{total}</h3>
          </div>
        </PieWrapper>
      </ResponsiveContainer>
    );
  }
}
