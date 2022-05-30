const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan");

const app = express();
app.use(bodyParser.json());

// Log data
app.use(morgan("common"));

// Sends static files to log.txt
app.use(express.static("public"));

let users = [
  {
    id: "1",
    username: "Jessica Drake",
    favoriteMovies: ["Basketball Diaries"],
  },
  {
    id: "2",
    username: "Ben Cohen",
    favoriteMovies: ["Forrest Gump"],
  },
  {
    id: "3",
    username: "Lisa Downing",
    favoriteMovies: ["Die Hard"],
  },
];

let movies = [
  {
    title: "Predator",
    description: "The hunt is on!",
    director: {
      name: "John McTiernan",
      bio: "Directed by favorite childhood movie",
    },
    genre: {
      name: "Action",
      description: "Guns a blazin",
    },
    img: "",
  },
  {
    title: "Intrusion",
    description: "The quietest towns hide the darkest secrets",
    director: {
      name: "Adam Salky",
      bio: "",
    },
    genre: {
      name: "Thriller",
      description: "Full of suspense",
    },
    img: "",
  },
  {
    title: "The Little Things",
    description: "These guys cannot be stopped!",
    director: {
      name: "	John Lee Hancock",
      bio: "",
    },
    genre: {
      name: "Thriller",
      description:
        "Deputy Sheriff Joe “Deke” Deacon (Washington) is on a search for a serial killer with Sergeant Jim Baxter (Malik), who is unaware that the investigation is dredging up Deke’s past.",
    },
    img: "",
  },
  {
    title: "Die Hard",
    description: "He just doesn't die!",
    director: {
      name: "John McTiernan",
      bio: "He directed Die Hard.",
    },
    genre: {
      name: "Action",
      description: "Guns a blazin",
    },
    img: "",
  },
  {
    title: "The Voyeurs",
    description:
      "A young couple (Sydney Sweeney and Justice Smith), find themselves becoming interested in the sex life of their neighbors across the street (Ben Hardy and Natasha Liu Bordizzo).",
    director: {
      name: "Michael Mohan",
      bio: "",
    },
    genre: {
      name: "Thriller",
      description: "",
    },
    img: "",
  },
  {
    title: "The Burbs",
    description: "You cannot trust your neighbors!",
    director: {
      name: "Joe Dante",
      bio: "He directed Tom Hanks before he was Tom Hanks.",
    },
    genre: {
      name: "Comedy",
      description: "Its funny!",
    },
    img: "",
  },
  {
    title: "The Beguiled",
    description:
      "Is an atmospheric thriller from acclaimed writer/director Sofia Coppola, winner of the Best Director award at the 2017 Cannes International Film Festival.",
    director: {
      name: "Sofia Coppola",
      bio: "",
    },
    genre: {
      name: "Drama",
      description: "",
    },
    img: "",
  },

  {
    title: "The Guilty",
    description:
      "A troubled police detective assigned to 911 operator duty scrambles to save a distressed caller during a harrowing day of revelations — and reckonings.",
    director: {
      name: "Antoine Fuqua",
      bio: "",
    },
    genre: {
      name: "Crime",
      description: "",
    },
    img: "",
  },
  {
    title: "The Father",
    description:
      "THE FATHER stars Anthony Hopkins who plays a mischievous and highly independent man who, as he ages, refuses all assistance from his daughter.. As he tries to make sense of his changing circumstances, he begins to doubt his loved ones, his own mind and even the fabric of his reality.",
    director: {
      name: "Florian Zeller",
      bio: "",
    },
    genre: {
      name: "Suspense",
      description: "",
    },
    img: "",
  },
  {
    title: "The Power of the Dog",
    description:
      "A domineering but charismatic rancher wages a war of intimidation on his brother's new wife and her teen son — until long-hidden secrets come to light.",
    director: {
      name: "Jane Campion",
      bio: "",
    },
    genre: {
      name: "Dramas",
      description: "",
    },
    img: "",
  },
];

// Send to doc in public folder
app.get("/documentation.html", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Get Users Name
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

// Create user and id
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message); // message is string cannot use json
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser); // object can use json
  }
});

// Update username Id
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
      return res.status(200).send("success");
    }
  }

  res.status(404).send(`${userid} not found`);
});

// Delete user Id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("user has not been deleted");
  }
});

// List of Movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// Read Movie by Title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("movie does not exist");
  }
});

// Read Movie by Genre Name
app.get("/movies/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no type of this genre");
  }
});

// Read Directors Name
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no director found");
  }
});

// Create add Movie to Fav

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res
      .status(200)
      .send(`${movieTtitle} has been added to user ${id}'s favorites`);
  } else {
    res.status(400).send("did not add to favorites");
  }
});

// Delete movie from fav movies
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  //Checking if user exists
  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from users ${id}'s favorites`);
  } else {
    res.status(400).send("did not remove");
  }
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

// Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening in port 8080");
});
