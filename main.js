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

app.post("/users", async (req, res) => {
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
  const username = req.params.username;
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
app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const user = await userCollection.findById(userId);
  if (!user) {
    res.status(404);
    return;
  }

  user.Username = userData.username;
  user.Password = userData.password;
  user.Email = userData.email;
  user.Birthday = userData.birthdate;

  await user.save();
  res.status(200);
});
// Add a movie to a user's list of favorites

app.post("/user/:id/:movietitle", async (req, res) => {
  const movieTitle = req.params.movietitle;
  const userId = req.params.id;

  const user = await userCollection.findById(userId);
  if (!user) {
    res.status(404);
    return;
  }

  const movie = await movieCollection.find({ Title: movieTitle });
  if (!movie) {
    res.status(404).send("Movie title does not exist");
  }

  user.FavoriteMovies.push(movie._id);
  await user.save();

  res.status(200);
});

// Allow users to remove a movie from their list of favorites

app.delete("/user/:id/:movieid", async (req, res) => {
  const userId = req.params.id;
  const movieid = req.params.movieid;

  const user = await userCollection.findById(userId);
  if (!user) {
    res.status(404);
    return;
  }
  const index = user.FavoriteMovies.indexOf(movieid);
  user.FavoriteMovies.splice(index, 1);

  await user.save();
  res.status(200);
});

// Allow existing users to deregister
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  if (!user) {
    res.status(404);
    return;
  }

  await userCollection.deleteOne({ _id: userId });
  res.status(200);
});
