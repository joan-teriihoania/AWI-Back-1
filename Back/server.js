const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require('path');


const app = express();

app.use(cors())


var ingredient = require(path.join(__dirname, "app/ingredient"));
var step = require(path.join(__dirname, "app/step"));
var category = require(path.join(__dirname, "app/category"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', step);
app.use('/ingredient', ingredient);
app.use('/step', step);
app.use('/category', category);

/*
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application" });
});
*/
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


