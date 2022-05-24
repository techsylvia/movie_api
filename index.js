// Framework
const express = require("express");
// Library
const morgan = require("morgan");

const app = express(); // variable

const myErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(myErrorHandler);
// const myLogger = (req, res, next) => {
//   console.log(req.url);
//   next();
// };
// app.use(myLogger);

app.use(morgan("common")); // logging middleware
app.use(express.static("public"));

let topMovies = [
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

// GET requests // creating Routes
app.get("/students", (req, res) => {
  console.log(req.url);
  res.send("The top thriller movies!");
});

app.get("/student", (req, res) => {
  console.log(req.url);
  res.send("The top thriller movies!");
});

app.post("/transaction", (req, res) => {
  console.log(req.url);
  res.send("The top thriller movies!");
});

app.put("/student", (req, res) => {
  console.log(req.url);
  res.send("The top thriller movies!");
});

app.delete("/student", (req, res) => {
  console.log(req.url);
  res.send("The top thriller movies!");
});

app.get("/documentation", (req, res) => {
  console.log(req.url);
  res.sendFile("public/documentation.html", { root: __dirname }); // absolute path
});

app.get("/movies", (req, res) => {
  console.log(req.url);
  res.json(topMovies);
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
