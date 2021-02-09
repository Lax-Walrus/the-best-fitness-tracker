const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Exercisebuilder = new Schema({
  name: { type: String, trim: true, required: "Exercise Name" },
  rep: { type: Number, required: "Rep Count" },
  unit: { type: String, required: "Unit" },
  notes: String,
});

const Exercise = mongoose.model("Exercise", Exercisebuilder);

module.exports = Exercise;
