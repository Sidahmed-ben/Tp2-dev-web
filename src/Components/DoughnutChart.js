import React, { Component } from "react";
import * as d3 from "d3";

class DoughnutChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const data = [12, 5, 6, 6];
    const ratingColumn = ["Confort", "Consommation", "Puissance", "Sécurité"];

    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", 300)
      .attr("height", 400);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d, i) => ratingColumn[i])
      .attr("x", (d, i) => i * 70 + 32.5) // Center horizontally
      .attr("y", (d, i) => 300 - 10 * d + (d * 10) / 2) // Center vertically
      .attr("text-anchor", "middle") // Center text horizontally
      .attr("alignment-baseline", "middle") // Center text vertically
      .attr("fill", "black");
  }
  render() {
    return <div id={"my_dataviz"}></div>;
  }
}
export default DoughnutChart;
