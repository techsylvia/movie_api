const movieCollection = require("./models").Movie;
const userCollection = require("./models").User;
const express = require("express");
bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator");

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());
//let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

//auth
require("./auth")(app);
// passport file
const passport = require("passport");

app.get("/users", async (req, res) => {
  const users = await userCollection.find();
  res.json(users);
});

//Return a list of ALL movies to the user

app.get("/", (req, res) => {
  res.status(200).message("hello test").send()
})

app.get(
  "/movies",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const movies = await movieCollection.find();
    res.json(movies);
  }
);

//Return data about a genre (description) by name/title

app.get(
  "/genre/:name",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const name = req.params.name;
    if (!name) {
      res.status(400).send();
      return;
    }
    const genre = await movieCollection.find({ "Genre.Name": name });
    if (!genre) {
      res.status(404).send();
      return;
    }
    res.json({ genre: genre });
  }
);

//Return a list of Movie by Title

app.get(
  "/movie/:title",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const title = req.params.title;
    if (!title) {
      res.status(400).send();
      return;
    }
    const movie = await movieCollection.find({ Title: title });
    if (!movie) {
      res.status(404).send();
      return;
    }
    res.json(movie);
  }
);

//Return data (description, genre, director, about a single movie by title to the user)

app.get(
  "/director/:name",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const name = req.params.name;
    if (!name) {
      res.status(404).send();
      return;
    }
    const director = await movieCollection
      .findOne({ "Director.Name": name })
      .exec();
    if (!director) {
      res.status(404).send();
      return;
    }
    res.json(director);
  }
);

//new users to register

app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmpty(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.tatus(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send((req.body.Username = "already exists"));
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

passport.authenticate("jwt", {
  session: false,
}),
  async (req, res) => {
    const newUser = req.body;
    if (!newUser) {
      res.status(400).send();
      return;
    }
    const user = await userCollection.create(newUser);
    if (!user) {
      res.status(404).send();
      return;
    }
    res.json(user);
  };

// Get user by username

app.get(
  "/user/:username",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const username = req.params.username;
    if (!username) {
      res.status(404).send();
      return;
    }
    const user = await userCollection.find({ Username: username });
    if (!user) {
      res.status(404).send();
      return;
    }
    res.json(user);
  }
);

// Allow users to update their user info (username, password, email, date of birth)
app.put(
  "/user/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userCollection.findById(userId).exec();
    if (!user) {
      res.status(404).send();
      return;
    }

    user.Username = userData.username;
    user.Password = userData.password;
    user.Email = userData.email;
    user.Birthday = userData.birthdate;

    await user.save();
    res.json({ result: "success" });
  }
);
// Add a movie to a user's list of favorites

app.post(
  "/user/:id/:movietitle",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const movieTitle = req.params.movietitle;
    const userId = req.params.id;

    const user = await userCollection.findById(userId).exec();
    if (!user) {
      res.status(404).send();
      return;
    }

    const movie = await movieCollection.findOne({ Title: movieTitle }).exec();
    if (!movie) {
      res.status(404).send("Movie title does not exist");
    }

    user.FavoriteMovies.push(movie._id);
    await user.save();

    res.json({ result: "success" });
  }
);

// Allow users to remove a movie from their list of favorites

app.delete(
  "/user/:id/:movieid",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const userId = req.params.id;
    const movieid = req.params.movieid;

    const user = await userCollection.findById(userId).exec();
    if (!user) {
      res.status(404).send();
      return;
    }
    const index = user.FavoriteMovies.indexOf(movieid);
    user.FavoriteMovies.splice(index, 1);

    await user.save();
    res.json({ result: "success" });
  }
);

// Allow existing users to deregister
app.delete(
  "/user/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      res.status(404).send();
      return;
    }
    await userCollection.deleteOne({ _id: userId }).exec();

    res.json({ result: "success" });
  }
);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' = port);
});
