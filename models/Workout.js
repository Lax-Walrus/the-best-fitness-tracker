const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Workoutbuilder = new Schema({
  name: { type: String, required: "Please name your exercise" },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],

  date: { type: Date, default: Date.now, required: true },
});
const Workout = mongoose.model("Workout", Workoutbuilder);

module.exports = Workout;
