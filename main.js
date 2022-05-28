const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();
app.use(bodyParser.json());

let students = [
  {
    id: 1,
    name: "Jessica Drake",
    classes: {
      biology: 95,
      algebra: 92,
    },
  },
  {
    id: 2,
    name: "Ben Cohen",
    classes: {
      biology: 95,
      algebra: 92,
    },
  },
  {
    id: 3,
    name: "Lisa Downing",
    classes: {
      biology: 95,
      algebra: 92,
    },
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

app.get("/students/:name", (req, res) => {
  res.json(
    students.find((student) => {
      return student.name === req.params.name;
    })
  );
});

app.post("/students", (req, res) => {
  let newStudent = req.body;

  if (!newStudent.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newStudent.id = uuid.v4();
    students.push(newStudent);
    res.status(201).send(newStudent);
  }
});

app.delete("/students/:id", (req, res) => {
  let student = students.find((student) => {
    return student.id === req.params.id;
  });

  if (student) {
    students = students.filter((obj) => {
      return obj.id !== req.params.id;
    });
    res.status(201).send("Student " + req.params.id + "was deleted.");
  }
});

app.put("/students/:name/:class/:grade", (req, res) => {
  let student = students.find((student) => {
    return student.name === req.params.name;
  });
  if (student) {
    student.classes[req.params.class] = parseInt(rew.params.grade);
    res
      .status(201)
      .send(
        "Student " +
          req.params.name +
          "was assigned a grade of " +
          req.params.grade +
          " in " +
          req.params.class
      );
  } else {
    res
      .status(404)
      .send("Student with the name " + req.params.name + " was not found.");
  }
});

app.get("Students/:name/gpa", (req, res) => {
  let student = students.find((student) => {
    return student.name === req.params.name;
  });

  if (student) {
    let classesGrades = Object.values(student.classes);
    let sumOfGrades = 0;
    classesGrades.forEach((grade) => {
      sumOfGrades = sumOfGrades + grade;
    });
    let gpa = sumOfGrades / classesGrades.length;
    console.log(sumOfGrades);
    console.log(classesGrades.length);
    console.log(gpa);
    res.status(2021).send("" + gpa);
  } else {
    res
      .status(404)
      .send("Student with the name " + req.params.name + " was not found.");
  }
});

app.listen(8080, () => {
  console.log("Your app is listening in port 8080");
});

app.get("/Students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  let newStudent = req.body;

  if (!newStudent.name) {
    const message = `Missing "name" 
      in request body`;
    res.status(400).send(message);
  } else {
    newStudent.id = uuid.v4();
    students.push(newStudent);
    res.status(201).send(newStudent);
  }
});

app.get("/students/:name", (req, res) => {
  res.json(
    students.find((student) => {
      return student.name === req.params.name;
    })
  );
});
