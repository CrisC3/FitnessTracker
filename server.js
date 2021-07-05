const express = require("express");
const mongoose = require("mongoose");
const Exercises = require("./models/exercise");
const routes = require("./controllers");

const databaseUrl = "fitnessTracker";
const dbConnect = process.env.MONGODB_URI || "mongodb://localhost:27017/" + databaseUrl;
const webPort = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Set to use the [Routes]
app.use(routes);

mongoose.connect(dbConnect, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to MongoDb");
});

const data = {};

Exercises.create(data)
  .then(dbSample => {
    console.log(dbSample);
  })

app.listen(webPort, () => {
  console.log(`App running on port http://localhost:${webPort}`);
});
