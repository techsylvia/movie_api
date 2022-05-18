const express = require("express");
const app = express();

let topBooks = [
  {
    title: "Intrusion",
    director: "Adam Salky",
  },
  {
    title: "The little things",
    director: "John Lee Hancock",
  },
  {
    title: "The Voyeurs",
    director: "Michael Mohan",
  },
  {
    title: "Hypnotic",
    director: "Matt Angel",
  },
  {
    title: "Things heard & seen",
    director: "Shari Springer Berman and Robert Pulcini",
  },
  {
    title: "The guilty",
    director: "Antoine Fuqua",
  },
  {
    title: "The father",
    director: "Florian Zeller",
  },
  {
    title: "The power of the dog",
    director: "Jane Campion",
  },
  {
    title: "The Beguiled",
    director: "Sofia Coppola",
  },
  {
    title: "I see you",
    director: "Adam Randall",
  },
];

// GET requests
app.get("/", (req, res) => {
  console.log(req);

  res.send("The top thriller movies!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/books", (req, res) => {
  res.json(topMovies);
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
