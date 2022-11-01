import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { formatPrice } from "@utils";
import React from "react";
import { AmPieWrapper } from "./styled";

export default function AmPieChart(props) {
  const { width } = useDebounceWindowResize();
  const total = props.data.reduce((total, current) => total + current.value, 0);
  am4core.ready(function () {
    var chart = am4core.create(props.nameChart, am4charts.PieChart);
    chart.data = props.data;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.labels.template.fill = am4core.color("#fff");
    pieSeries.ticks.template.stroke = am4core.color("#fff");
    pieSeries.ticks.template.strokeWidth = 1;
    pieSeries.ticks.template.strokeOpacity = 1;
    pieSeries.ticks.template.strokeLinecap = "round";
    pieSeries.ticks.template.strokeLinejoin = "round";
    // pieSeries.labels.template.fontSize = 20;
    pieSeries.labels.template.text =
      "[font-size: 16px;font-weight: 400;line-height: 20px;]{name}[/] : \n [font-weight: 700;font-size: 20px;line-height: 22px;]{value}[/] [font-weight: 500;font-size: 14px;line-height: 18px;]({value.percent.formatNumber('#.0')}%)[/]";
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "name";
    pieSeries.labels.template.wrap = true;
    pieSeries.labels.template.maxWidth = width > 1325 ? 170 : 100;

    // var gradient = new am4core.LinearGradient();
    // gradient.addColor(am4core.color("#FFB74B"));
    // gradient.addColor(am4core.color("#FDF44D"));

    pieSeries.slices.template.propertyFields.fill = "color";

    chart.innerRadius = am4core.percent(width > 1325 ? 55 : 45);
    chart.radius = am4core.percent(width > 1325 ? 80 : 65);
    // chart.innerWidth = 200;
    // chart.svgContainer.autoResize = false;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
    am4core.options.autoDispose = true;
  }); // end am4core.ready()

  return (
    <AmPieWrapper>
      <div className="main-chart">
        <div id={props.nameChart} className="chart-div"></div>
        <div className="title-container">
          <h3 className="chart-title">{props.nameChart}</h3>
        </div>
        <h3 className="total">{formatPrice(total)}</h3>
      </div>
    </AmPieWrapper>
  );
}
