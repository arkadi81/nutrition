import React, { Component } from "react";

class NutritionalTable extends Component {
  // grabs food info from props - single food item
  // props.foodItem =  structure from nutritionex
  // for the sake of testing: props.weight is the current weight of the food
  render() {
    const { foodItem } = this.props;

    // food item has a lot more info than we need - we just need to render the simple non nested stuff

    // check and assemble everything that's not an array or object

    let shortNutritionalInfo = {};

    Object.keys(foodItem).map((key, index) => {
      if (typeof foodItem[key] !== "object" && !Array.isArray(foodItem[key])) {
        shortNutritionalInfo[key] = foodItem[key];
        console.log(key);
      }
      return 0;
    });
    return (
      <React.Fragment>
        <div className="Nutritional Table">hi</div>
        <div>{foodItem.food_name}</div>
        {Object.keys(shortNutritionalInfo).map((key, index) => {
          return (
            <div key={index}>
              <div>
                {key}: {shortNutritionalInfo[key]}:{" "}
                {(shortNutritionalInfo[key] / foodItem.serving_weight_grams) *
                  this.props.weight}
              </div>

              <hr />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
export default NutritionalTable;
