import React from "react";
import DonutChart from "./DonutChart";
import NutritionalTable from "./nutritionalTable";
import { getFoodData } from "../fakedata/foodData";
import ColumnChart from "./columnChart";
import { getFoodNutritionalValues, searchFood } from "../api/food";

export default class ItemNutrients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FETCH_REMOTE_DATA: false,
      query: "salmon",
      weight: 50,
      foodItem: {},
      dailyGoals: {
        protein: 100,
        calories: 2000
      },
      dailyProgress: {
        protein: 0,
        calories: 0
      },

      chart: {
        chartOptions: {
          labels: ["A", "B", "C", "D"]
        },
        series: [44, 55, 41, 17]
      }
    };

    // this.addToChart = () => {
    //   console.log("add to chart");
    //   let chartInfo = { ...this.state.chart };
    //   // chartInfo.options.labels.push("F");
    //   chartInfo.series.push(50);

    //   this.setState({ chart: chartInfo });

    //   console.log(this.state.chart);
    // };

    // this.updateMessage = () => {
    //   this.setState({ message: "hi back to you" });
    // };
  }
  // hooks and other methods

  formatDailyGoalProgressForChart = () => {
    const {
      protein: proteinConsumed,
      calories: caloriesConsumed
    } = this.state.dailyProgress;
    const {
      protein: proteinTarget,
      calories: caloriesTarget
    } = this.state.dailyGoals;
    let proteinDailyPercent =
      ((100 * proteinConsumed) /
        proteinTarget /
        this.state.foodItem.serving_weight_grams) *
      this.state.weight;
    let caloriesDailyPercent =
      ((100 * caloriesConsumed) /
        caloriesTarget /
        this.state.foodItem.serving_weight_grams) *
      this.state.weight;

    return [proteinDailyPercent, caloriesDailyPercent];
  };

  download = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  handleChange = (evt) => {
    // universal form change handler yay.. not the prettiest way to do things - will ideally refactor into smaller chunks of state!
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
      // foodItem: { ...this.state.foodItem, [evt.target.name]: value }
    });
  };

  handleUpdate = () => {
    console.log("updating chart");
    let chartInfo = this.state.chart;
    chartInfo.chartOptions = { labels: ["moo", "cow"] };
    chartInfo.series = [10, 20, 30];

    this.setState({ chart: chartInfo });

    console.log(this.state.chart);
  };

  getFood = () => {
    // let foodName = document.getElementById("foodName").value;

    // console.log(foodName);
    const data = { query: this.state.query };

    // temp testing - if false then just go to local db (fake data and grab from there - no need to make remote calls for now)
    if (this.state.FETCH_REMOTE_DATA === false) {
      this.setState({ foodItem: getFoodData() });
      setTimeout(() => {
        //grabbing data takes time yo
        console.log(
          "got food item from fake data: " + this.state.foodItem.food_name
        );
        const {
          nf_protein: protein,
          nf_calories: calories
        } = this.state.foodItem;
        let d = { ...this.state.dailyProgress };

        d.protein = protein;
        d.calories = calories;
        this.setState({ dailyProgress: d });
        console.log(
          "state daily progress: " + this.state.dailyProgress.protein
        );
      }, 1000);

      // set up daily  progress:

      return;
    }

    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "f12c824c",
        "x-app-key": "d6e4333c453746c5d39d345ffbeb7540",
        "x-remote-user-id": "0"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let serving_weight_gr = data.foods[0].serving_weight_grams;
        let calories_per_serving = data.foods[0].nf_calories;
        let calories_per_gr_weight = calories_per_serving / serving_weight_gr;
        let food_weight_gr = this.state.weight;
        document.getElementById("totalCal").value =
          calories_per_gr_weight * food_weight_gr;
        // make a chart out of the baseline ingredients of what we just grabbed
        // createChart(data);

        //get all nutritional values of the food
        this.setState({ foodItem: data.foods[0] });
        // const nutritional_values = data.foods[0];

        this.download(data.foods[0], "json.txt", "text/plain");
        //drop the json data to file for local testing

        // for (el in nutritional_values) {
        // if (el.substring(0, 2) == "nf") {
        // this is a baseline ingredient
        // console.log(el, nutritional_values[el]);

        //       bar chart
        // options.series[0].data.push(nutritional_values[el]);
        // options.xaxis.categories.push(el.substring(3).replace('_',' '));

        //       for pie chart
        // }
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  componentDidUpdate() {
    // console.log("component did update fired");
  }

  componentDidMount() {
    // console.log("component did mount fired");
  }

  // methods here
  // getFood() {
  // let foodName = document.getElementById("foodName").value;
  // let foodName = this.state.foodName;
  // console.log(foodName);
  // const data = { query: foodName };

  //   fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-app-id": "f12c824c",
  //       "x-app-key": "d6e4333c453746c5d39d345ffbeb7540",
  //       "x-remote-user-id": "0"
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       let serving_weight_gr = data.foods[0].serving_weight_grams;
  //       let calories_per_serving = data.foods[0].nf_calories;
  //       let calories_per_gr_weight = calories_per_serving / serving_weight_gr;
  //       let food_weight_gr = document.getElementById("weight").value;
  //       document.getElementById("totalCal").value =
  //         calories_per_gr_weight * food_weight_gr;
  //       // make a chart out of the baseline ingredients of what we just grabbed
  //       // createChart(data);

  //       // update nutritional info we just got
  //       const nutritional_values = data.foods[0];

  //       for (let el in nutritional_values) {
  //         if (el.substring(0, 2) == "nf") {
  //           // this is a baseline ingredient
  //           console.log(el, nutritional_values[el]);

  //           //       bar chart
  //           // options.series[0].data.push(nutritional_values[el]);
  //           // options.xaxis.categories.push(el.substring(3).replace('_',' '));

  //           //       for pie chart
  //           let pieOptions = this.state.pieChartOptions;
  //           pieOptions.series.push(nutritional_values[el]);
  //           pieOptions.labels.push(el.substring(3).replace("_", " "));

  //           this.setState({pieChartOptions: pieOptions})
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  //  Chart stuff goes here
  // createChart = (data) => {
  //   var barOptions = {
  //     series: [
  //       {
  //         data: []
  //       }
  //     ],
  //     chart: {
  //       type: "pie",
  //       height: 350
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 4,
  //         horizontal: false
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     xaxis: {
  //       categories: []
  //     }
  //   };

  //   let

  //   //pull out all of the nutrients

  //   }
  //   }

  //   // var chart = new ApexCharts(document.getElementById("chart"), pieOptions);
  //   // chart.render();
  // };

  // init = () => {
  //   // do stuff here
  // };

  render() {
    return (
      <React.Fragment>
        {/* <TestComponent message={this.state.message} /> */}
        {/* <button onClick={this.updateMessage}>update message</button> */}
        <div>
          <span>Search for food</span>
          <input
            type="text"
            name="query"
            label="name"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
        <div>
          weight [gr]
          <input
            type="text"
            name="weight"
            label="weight"
            value={this.state.weight}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <p>{this.state.query}</p>
          <p>{this.state.weight}</p>
        </div>

        <div>
          <button onClick={this.getFood}>fetch </button>
          <button onClick={() => searchFood("salmon")}>try axios</button>
        </div>
        <div>
          <span>total calories:</span>
          <input type="text" id="totalCal" />
        </div>
        <div>
          <NutritionalTable
            foodItem={this.state.foodItem}
            weight={this.state.weight}
          />
        </div>
        <ColumnChart
          categories={["calories", "protein"]}
          series={[
            {
              data: this.formatDailyGoalProgressForChart()
            }
          ]}
        />
        <DonutChart
          chartOptions={this.state.chart.chartOptions}
          series={this.state.chart.series}
          onUpdate={this.handleUpdate}
        />
      </React.Fragment>
    );
  }
}
