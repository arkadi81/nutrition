import React, { useState, useEffect } from "react";
import { searchFood } from "./../api/food";

import "./FoodSearchBar.css";

const FoodSearchBar = ({ handleAddFood }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    // console.log("suggestion array changed");
  }, [suggestions]);

  const handleChange = async (evt) => {
    console.log("search value updated");
    // get info, display it

    const res = await searchFood(evt.target.value);
    res.status === 200 ? setSuggestions(res.data.common) : setSuggestions([]);
    console.log(suggestions);
  };

  const handleChangeSearchString = async (evt) => {
    setSearchString(evt.target.value);

    if (searchString === "") return null;

    const res = await searchFood(evt.target.value);
    res.status === 200 ? setSuggestions(res.data.common) : setSuggestions([]);
  };

  const handleClick = (evt, foodData) => {
    // when a food suggestion is clicked, add food to foods array
    addFood(foodData);
  };

  const addFood = (food) => {
    console.log("adding food: ");
    console.log(food);
    handleAddFood(food);

    setSuggestions([]);
    setSearchString("");
  };
  const renderSuggestions = () => {
    if (suggestions.length === 0) return `no food suggestions`;

    return (
      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((s, k) => (
            <tr key={k}>
              <td>
                <span>{s.food_name}</span>
              </td>
              <td>
                <img src={s.photo.thumb} alt={s.food_name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderAutoComplete = () => {
    return (
      <div className="autocomplete-items">
        {suggestions.map((s, k) => (
          <div key={k} onClick={(e) => handleClick(e, s)}>
            <img src={s.photo.thumb} alt={s.food_name} />
            <span>{s.food_name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="component-container">
        <div>
          <h1>Search</h1>
        </div>
        <div className="autocomplete">
          <label htmlFor="searchBox">
            Start typing to search for a food item:{" "}
          </label>
          <input
            id="searchBox"
            type="text"
            value={searchString}
            onChange={handleChangeSearchString}
          />
          {/* render autocomplete items */}
          {renderAutoComplete()}
        </div>
        {/* {renderSuggestions()} */}
        {/* on keyup, go fetch and display in a list */}
      </div>
    </React.Fragment>
  );
};

export default FoodSearchBar;
