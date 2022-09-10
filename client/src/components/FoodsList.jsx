import React, { useState, useEffect } from "react";
import { searchFood } from "./../api/food";
import { formatNutritionalValues } from "../utils";

/**
 * This is the list of foods im eating to build a menu out of - we can edit this list, add to it, remove etc.
 */

const FoodsList = ({ foods, handleUpdateFood, handleDeleteFood }) => {
  return (
    <React.Fragment>
      <div className="component-container">
        <div>
          <h1>Foods list</h1>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Food item</th>
                <th>Serving</th>
                <th>Weight[gr]</th>
                <th>Calories</th>
                <th>Fat</th>
                <th>Protein</th>
                {/* <th>Edit</th> */}
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, i) => (
                <tr key={i}>
                  <td>{food.name}</td>
                  <td>{food.serving}</td>
                  <td>
                    <input
                      type="number"
                      value={food.weight}
                      onChange={(e) => handleUpdateFood(e, food)}
                    />
                  </td>
                  <td>
                    {formatNutritionalValues(food.cals_per_gr * food.weight)}
                  </td>
                  <td>
                    {formatNutritionalValues(food.protein_per_gr * food.weight)}
                  </td>
                  <td>
                    {formatNutritionalValues(food.fat_per_gr * food.weight)}
                  </td>
                  {/* <td>
                    <a href="#">edit </a>
                  </td> */}
                  <td>
                    <button onClick={(e) => handleDeleteFood(e, food)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodsList;
