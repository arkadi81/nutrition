/**
 * Food api using axios - fetch info from nutritionex
 */

import axios from "axios";

const fakeDB = {
  provider: "JSonBase",
  bucketName: "ark12f4dsre",
  baseEndpoint: "https://jsonbase.com/ark12f4dsre/"
};

export const seed = async () => {
  try {
    const { data, status } = await axios.put(
      [fakeDB.baseEndpoint, "foodList"].join("/"),

      {
        hello: "world"
      }
    );
    console.log(data);
  } catch {
    console.log("error");
  }
  // return { data, status };
};

//setting axios params: https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios

const headers = {
  "Content-Type": "application/json",
  "x-app-id": "f12c824c",
  "x-app-key": "d6e4333c453746c5d39d345ffbeb7540",
  "x-remote-user-id": "0"
};

const endpoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";

export const getFoodNutritionalValues = async (query) => {
  // get nutritional values for food match
  const { data, status } = await axios({
    method: "post", //you can set what request you want to be
    url: endpoint,
    data: { query: query },
    headers: headers
  });
  return { data, status };
};

export const searchFood = async (query) => {
  // get nutritional values for food match

  const searchEndpoint = "https://trackapi.nutritionix.com//v2/search/instant";

  // prepare parameters for get request
  let params = { query: query };
  const url = searchEndpoint + "?" + encodeURLParams(params);

  console.log(url);

  const { data, status } = await axios({
    method: "get", //you can set what request you want to be
    url: url,
    headers: headers
  });
  console.log(data);
  return { data, status };
};

const encodeURLParams = (paramObject) => {
  // helper function for encoding object into url param string
  return Object.entries(paramObject)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");
};
