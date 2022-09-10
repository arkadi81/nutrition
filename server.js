require("dotenv").config(); // import env variables from .env
const debug = require("debug")("app:general");

const express = require("express");
const app = express();

const cors = require("cors");

const helmet = require("helmet"); // set http headers for added security
const morgan = require("morgan"); // log http requests

const genericRestApiRouter = require("./routes/genericRestApiRouter");

// middleware - takes req, returns to client or passes req to another middleware function
// app.use(function(req,res,next)) to install middleware. DNF next() at end of middleware to pass control!
app.use(express.json()); // parse body of request (req.body) into json if possible
app.use(express.urlencoded({ extended: true })); // parse url encoded payloads
app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);
// 3rd party middleware
app.use(helmet());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
  // console.log("Morgan enabled...");
  debug("Morgan enabled");
}

// routes
app.use("/api/test", genericRestApiRouter); // generic rest api could go here for testing / further dev

// app
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
