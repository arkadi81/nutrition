// db.js - not currently in use - uses native mongoDB api

const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri = process.env.MONGO_URI;
const uri =
  "mongodb+srv://ark:qO1J2mzJ3n0retm9@cluster0.wgswo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  if (err) throw err;

  const collection = client
    .db("nutrition")
    .collection("foods")
    .find()
    .toArray((err, result) => {
      if (err) throw err;

      console.log("dabatase connected");
      console.log(result);
    });
  // perform actions on the collection object

  // console.log(collection);
  client.close();
});
