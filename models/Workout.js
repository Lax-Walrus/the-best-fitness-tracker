const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Workouts = new Schema({
  name: { type: String, required: "Please name your exercise" },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercises" }],

  date: { type: Date, default: Date.now, required: true },
});
const Workout = mongoose.model("Workout", Workouts);

module.exports = Workout;
