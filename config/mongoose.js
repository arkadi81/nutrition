// mongoose.js - database connection / config using mongoose

const mongoose = require("mongoose");
const debug = require("debug")("app:db");

// this works fine - configure a new user with permissions of read write to any db if this is failing... no clue why
const uri =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URL}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => debug("Connected to MongoDB..."))
  .catch((err) => debug("Couldnt connect", err));

module.exports = mongoose;
