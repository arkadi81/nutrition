import React, { Component } from "react";
import Chart from "react-apexcharts";

class ColumnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            distributed: true
          }
        },
        // colors: ["#2E93fA", "#66DA26"],

        xaxis: {
          categories: ["calories", "protein"]
        }
      },
      series: [
        {
          name: "Daily Progress",
          data: [30, 40]
        }
      ]
    };
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
        <div className="bar">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width="500"
          />
        </div>
      </React.Fragment>
    );
  }
}
export default ColumnChart;
