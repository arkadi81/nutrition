import React from "react";

import { formatNutritionalValues } from "../utils";
/**
 * Statistics (can include visualization later)
 */

const FoodStats = ({ foods }) => {
  // hooks and other methods

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   // console.log("suggestion array changed");
  // }, []);

  const getStats = (foods) => {
    let total_weight = 0;
    let cals = 0;
    let protein = 0;
    let fat = 0;

    for (let food of foods) {
      total_weight += food.weight;
      cals += food.cals_per_gr * food.weight;
      protein += food.protein_per_gr * food.weight;
      fat += food.fat_per_gr * food.weight;
    }
    return { total_weight, cals, protein, fat };
  };
  // methods here

  const { total_weight, cals, protein, fat } = getStats(foods);
  return (
    <React.Fragment>
      <div className="component-container">
        <h1>Stats</h1>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Total weight</h3>
              </th>
              <th>
                <h3>Total Calories</h3>
              </th>
              <th>
                <h3>Total Protein</h3>
              </th>
              <th>
                <h3>Total Fat</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>{total_weight}</h4>
              </td>
              <td>
                <h4>{formatNutritionalValues(cals)}</h4>
              </td>
              <td>
                <h4>{formatNutritionalValues(protein)}</h4>
              </td>
              <td>
                <h4>{formatNutritionalValues(fat)}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default FoodStats;
