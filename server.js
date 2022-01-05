const express = require("express");
const cors = require("cors");
const path = require('path');
const dot=require('dotenv').config({ path: path.join(__dirname,".env") })



const app = express();

app.use(cors())
var ingredient = require(path.join(__dirname, "app/ingredient"));
var step = require(path.join(__dirname, "app/step"));
var category = require(path.join(__dirname, "app/category"));
var allergen= require(path.join(__dirname, "app/allergen"));
var recipe= require(path.join(__dirname, "app/recipe"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', step);
app.use('/ingredient', ingredient);
app.use('/step', step);
app.use('/category', category);
app.use('/allergen',allergen);
app.use('/recipe',recipe);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


