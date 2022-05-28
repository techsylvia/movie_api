const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();
app.use(bodyParser.json());

let favoriteMoviesUser1 = ["scary movie", "Blade"];

let users = [
  {
    id: 1,
    username: "Jessica Drake",
    favoriteMovies: ["Basketball Diaries"],
  },
  {
    id: 2,
    username: "Ben Cohen",
    favoriteMovies: ["Forrest Gump"],
  },
  {
    id: 3,
    username: "Lisa Downing",
    favoriteMovies: ["Die Hard"],
  },
];

app.get("/users/:name", (req, res) => {
  res.json(
    users.find((user) => {
      return user.username === req.params.name;
    })
  );
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  let newUser = req.body;
  console.log(newUser);

  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message); // message is string cannot use json
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser); // object can use json
  }
});

app.patch("/user/:id", (req, res) => {
  const userid = req.params.id;
  if (!userid) {
    res.status(400).send("user Id missing");
  }
  let updateuser = req.body;
  if (!updateuser.username) {
    const message = "Updated username missing";
    res.status(400).send(message);
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userid) {
      users[i].username = updateuser.username;
    }
  }
  const message = "success";
  res.status(200).send(message);
});

app.listen(8080, () => {
  console.log("Your app is listening in port 8080");
});
