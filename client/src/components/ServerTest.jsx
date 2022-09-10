import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ServerTest = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      const { data, status } = await axios({
        method: "get", //you can set what request you want to be
        url: "http://localhost:5000/api/test",
        // headers: headers,
      });
      console.log(data);
      setFoods(data);
      return { data, status };
    };

    getFoods();
  }, []);

  return (
    <React.Fragment>
      <ul>
        {foods.map((food, i) => (
          <li key={i}>{food.food_name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ServerTest;
