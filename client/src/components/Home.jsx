import React, { useState, useEffect } from "react";
import { searchFood } from "./../api/food";
import FoodSearchBar from "./FoodSearchBar";
import FoodStats from "./FoodStats";
import FoodsList from "./FoodsList";
import ServerTest from "./ServerTest";
import { getFoodNutritionalValues } from "../api/food";
import "../api/seed";

/**
 * Home / layout component with foods list and search
 */

const Home = () => {
  const initialFoods = [
    {
      id: 1,
      name: "apple",
      serving: "1 unit",
      weight: 30,
      cals: 100,
      protein: 2,
      fat: 5,
      cals_per_gr: 100 / 30,
      protein_per_gr: 2 / 30,
      fat_per_gr: 5 / 30,
    },
  ];
  const [foods, setFoods] = useState(initialFoods);

  useEffect(() => {
    // Update the document title using the browser API
    // console.log("suggestion array changed");
  }, []);

  const handleDeleteFood = (evt, foodItem) => {
    console.log("deleting food..");
    let newFoods = foods.filter((f) => {
      return f.id !== foodItem.id;
    });

    setFoods(newFoods);
  };

  const handleUpdateFood = (evt, foodItem) => {
    console.log("updating food...");
    console.log(foodItem);
    console.log(evt.target.value);

    // find food item by ID, update weight
    let newFoods = foods.map((f) => {
      if (f.id === foodItem.id) {
        f.weight = parseInt(evt.target.value || 0);
      }
      return f;
    });
    // const newFoods = foods;
    // let currentFood = foods.filter((f) => {
    // return f.id === foodItem.id;
    // });
    // currentFood.weight = evt.target.value;

    console.log("updated weight..");
    console.log(newFoods);
    setFoods(newFoods);
  };

  const handleAddFood = async (newFoodItem) => {
    // console.log(newFoodItem);
    // go fetch nutritional info and add it to the stats
    const { food_name, serving_qty, serving_unit } = newFoodItem;
    const newNutritionalValues = await getFoodNutritionalValues(food_name);
    // console.log(newNutritionalValues.data);

    const { nf_calories, nf_protein, nf_total_fat, serving_weight_grams } =
      newNutritionalValues.data.foods[0];
    setFoods([
      ...foods,
      {
        id: foods.length + 1,
        name: food_name,
        serving: `${serving_qty} ${serving_unit}`,
        weight: parseInt(serving_weight_grams),
        cals: nf_calories,
        protein: nf_protein,
        fat: nf_total_fat,
        cals_per_gr: nf_calories / serving_weight_grams,
        protein_per_gr: nf_protein / serving_weight_grams,
        fat_per_gr: nf_total_fat / serving_weight_grams,
      },
    ]);
    console.log(foods);
  };

  return (
    <React.Fragment>
      <div>
        <h1>Home component / Nutrition menu calculator</h1>
        <h3>
          search for a food, update the amount, see the calculation of protein,
          calories and fats
        </h3>

        <h5>
          *Disclaimer: I know it doesn't look pretty yet.. that's coming later
        </h5>

        <table>
          <tbody>
            <tr>
              <td>
                <FoodSearchBar handleAddFood={handleAddFood} />
              </td>
              <td>
                <FoodStats foods={foods} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <FoodsList
                  foods={foods}
                  handleUpdateFood={handleUpdateFood}
                  handleDeleteFood={handleDeleteFood}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ServerTest />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Home;
