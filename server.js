const express = require("express");
const routes = require("./controllers");
const mongoose = require("./config/connection");

const webPort = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup to use public directory to be static
app.use(express.static("public"));

// Set to use the [Routes]
app.use(routes);

app.listen(webPort, () => {
  console.log(`App running on port http://localhost:${webPort}`);
});
