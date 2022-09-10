import React, { Component } from "react";
import Chart from "react-apexcharts";

class DonutChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {
        chartOptions: {
          labels: ["A", "B", "C", "D"]
        },
        series: [44, 55, 41, 17]
      }
    };

    console.log("props.series: " + this.props.series);
    console.log("props.chartOptions: " + this.props.chartOptions.labels);

    //would rather use arrow notation but need to turn on transpiling option in codesanbox for this
    // this.addToChart
    //  this.addToChart.bind(this);
  }

  componentDidUpdate() {
    //update state?
    // console.log("donut updated. new info: ", this.props);
  }

  render() {
    // const { chartOptions } = this.props.chart;
    // const {series} = this.props.chart;
    return (
      <React.Fragment>
        <div className="donut">
          <Chart
            options={this.props.chartOptions}
            series={this.props.series}
            type="donut"
            width="370"
          />
        </div>
        <button onClick={this.props.onUpdate}>Add a value</button>
      </React.Fragment>
    );
  }
}
export default DonutChart;
