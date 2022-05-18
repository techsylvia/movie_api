const express = require("express");
const app = express();

let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
  },
];

let bobby = {
  name: "bobby",
  age: 32,
};

// GET requests
app.get("/", (req, res) => {
  console.log(req);

  res.send("Welcome to my book club!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/books", (req, res) => {
  res.json(topBooks);
});

app.get("/bobby", (req, res) => {
  res.json(bobby);
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
