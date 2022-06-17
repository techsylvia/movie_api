const movieCollection = require("./models").Movie;
const userCollection = require("./models").User;
const express = require("express"),
  bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const users = await userCollection.find();
  res.json(users);
});

app.get("/movies", async (req, res) => {
  const movies = await movieCollection.find();
  res.json(movies);
});

app.listen(8080, () => {
  console.log("Your app is listening in port 8080");
});
