// routes for test rest API

const express = require("express");
const mongoose = require("./../config/mongoose");
const debug = require("debug")("app:api");

const router = express.Router();

//schema and model are fairly universal for our CRUD items in collection
const foodSchema = new mongoose.Schema({
  food_name: String,
  calories: Number,
});

// model - this is a Class based on the schema
const Food = mongoose.model("Food", foodSchema);

router.get("/", async (req, res) => {
  const result = await getFoods();
  res.send(result);
  debug(result);
});

router.get("/:id", async (req, res) => {
  const result = await getFoodById(req.params.id);
  // res.set("Access-Control-Allow-Origin", "*");
  res.send(result);
  debug(result);
});

router.post("/", async (req, res) => {
  const result = await createFood();
  res.send(result);
  debug(result);
});

router.put("/", async (req, res) => {
  const result = await createFood();
  res.send(result);
  debug(result);
});

router.delete("/:id", async (req, res) => {
  const result = await deleteFood(req.params.id);
  res.send(result);
  debug(result);
});

const updateFood = async (id) => {
  const myFood = await Food.findById(id);
  // if not found done
  if (!myFood) return;
  myFood.calories = 40; // or use myFood.set({ props to be set...})
  const result = await myFood.save;
  return result;
};

const deleteFood = async (id) => {
  const result = await Food.deleteOne({ _id: id });
  return result;
};

const getFoods = async () => {
  const result = await Food.find(); // get all entries

  /** examples of more complex usages of .find()
   * filtering: .find({ prop: value, prop: value})
   * .limit(1)
   * .sort({ prop: 1 || -1})
   * .select({ prop1: 1, prop2: 0}) // selects only the props we need with 1
   *
   * comparison operators: eq, ne, gt, gte, lt, lte, in, nin (not in)
   * usage of comparison operators:
   * .find({price: { $gte: 10, $lte: 20}}) (between 10 and 20 inclusive)
   * .find({price: {$in: [10,15,20]}}) (value is 10,15 or 20)
   *
   * logical ops: and, or
   * .find().or([ {price: 20}, name: "john"]) is object is a filter
   *
   * regex:
   * starts with arkadi: .find({ name: /^arkadi/})
   * ends with a given string: .find({ name: /jazz$/})
   *
   * making regex not case sensitive: .find({ name: /jazz$/i})
   *
   * contains a string: .find({ name: /.asterist myString .asterisk / })
   *
   * returning count of matching docs: .count()
   *
   * pagination - combines .limit and .skip: .find().skip((pageNum -1) * pageSize).limit(pageSize)
   *
   * */
  debug(result);
  return result;
};

const getFoodById = async (id) => {
  const result = await Food.find({ _id: id }); // get all entries
  debug(result);
  return result;
};

const createFood = async () => {
  const myFood = new Food({
    food_name: "egg",
    calories: 30,
  });
  const result = await myFood.save();
  return result;
};

module.exports = router;
