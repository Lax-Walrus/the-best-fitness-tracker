// pulls the npm packages in and requires them
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3005;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", {
  useNewUrlParser: true,
});

// routes this is my html routes

app.get("/", (req, res) => {
  db.Workout.find({})
    .populate("exercise")
    .sort({ date: -1 })
    .lean()

    .then((workout) => {
      res.render("index", { workouts: workout });
    });
});

app.get("/createdworkouts", (req, res) => {
  db.Workout.find({})
    .sort({ date: "asc" })
    .populate("exercises")
    .then((data) => {
      res.render({ workouts: data });
    })
    .catch((err) => {
      res.json(err);
      console.err(err);
    });
});

// routes this are api routes

app.post("/api/exercise", ({ body }, res) => {
  const workoutObj = {
    name: body.name,
    rep: body.rep,
    unit: body.unit,
    notes: body.notes,
  };
  console.table(workoutObj);

  db.Exercise.create(workoutObj)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        { _id: body._id },
        { $push: { exercises: _id } },
        { new: true }
      )
    )
    .then((workout) => {
      res.json(workout);
      console.log(JSON.stringify(workout));
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create({ name: body.name })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
app.get("api/exercises", (req, res) => {});
app.put("api/exercises", (req, res) => {});

app.get("/createdworkouts", (req, res) => {
  db.Exercise.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
      console.err(err);
    });
});

app.delete("api/exercises", (req, res) => {});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
