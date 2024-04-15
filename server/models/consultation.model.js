const mongoose = require("mongoose");
const Patient = require("./patient.model");
const Nurse = require("./nurse.model");

const consultationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
  },
  date: {
    type: String,
    required: [true, "Please provide date!"],
  },
  possibleDiagnosis: {
    type: String,
    required: [true, "Please provide the patient diagnosis!"],
  },
  suggestions: {
    type: String,
    required: [true, "Please provide the suggestions!"],
  },
});

module.exports = mongoose.model("consultation", consultationSchema);
