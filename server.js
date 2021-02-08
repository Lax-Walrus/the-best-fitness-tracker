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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", {
  useNewUrlParser: true,
});

// routes this is my html routes

app.get("/", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .sort({ date: -1 })
    .lean()

    .then((workout) => {
      res.render("index", { workouts: workout });
    });
});

// routes this are api routes

app.post("api/exercises", ({ body }, res) => {});
app.get("api/exercises", (req, res) => {});
app.put("api/exercises", (req, res) => {});
app.delete("api/exercises", (req, res) => {});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
