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

//Return a list of ALL movies to the user

app.get("/movies", async (req, res) => {
  const movies = await movieCollection.find();
  res.json(movies);
});

//Return data about a genre (description) by name/title

app.get("/genre/:name", async (req, res) => {
  const name = req.params.name;
  if (!name) {
    res.status(400);
    return;
  }
  const genre = await movieCollection.find({ "Genre.Name": name });
  if (!genre) {
    res.status(404);
    return;
  }
  res.json({ genre: genre });
});

app.listen(8080, () => {
  console.log("Your app is listening in port 8080");
});

//Return a list of Movie by Title

app.get("/movie/:title", async (req, res) => {
  const title = req.params.title;
  if (!title) {
    res.status(400);
    return;
  }
  const movie = await movieCollection.find({ Title: title });
  if (!movie) {
    res.status(404);
    return;
  }
  res.json(movie);
});

//Return data (description, genre, director, about a single movie by title to the user)

app.get("/director/:name", async (req, res) => {
  const name = req.params.name;
  if (!name) {
    res.status(404);
    return;
  }
  const director = await movieCollection.find({ "Director.Name": name });
  if (!director) {
    res.status(404);
    return;
  }
  res.json({ director: name });
});

//new users to register

app.post("/user", async (req, res) => {
  const newUser = req.body;
  if (!newUser) {
    res.status(400);
    return;
  }
  const user = await userCollection.create(newUser);
  if (!user) {
    res.status(404);
    return;
  }
  res.json(user);
});


// Get user by username

app.get("/user/:username", async (req, res) => {
  const username = req.body.username;
  if (!username) {
    res.status(404);
    return;
  }
  const user = await userCollection.find({ Username: username });
  if (!user) {
    res.status(404);
    return;
  }
  res.json({ username });
});

// Allow users to update their user info (username, password, email, date of birth)

// Add a movie to a user's list of favorites

app.post("/user/:id/:movieTitle", (req, res) => {
  const req.body.username;
  let user = user.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res
      .status(200)
      .send(`${movieTitle} has been added to user ${id}'s favorites`);
  } else {
    res.status(400).send("did not add to favorites");
  }
});

// Allow users to remove a movie from their list of favorites

// Allow existing users to deregister
