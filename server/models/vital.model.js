const mongoose = require("mongoose");
const Patient = require("./patient.model");

const measurementSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  bodyTemperature: {
    type: Number,
    required: [true, "Please provide the body temperature!"],
  },
  bodyPressure: {
    type: Number,
    required: [true, "Please provide the body pressure!"],
  },
  respiratoryRate: {
    type: Number,
    required: [true, "Please provide the respiratory rate!"],
  },
  weight: {
    type: Number,
    required: [true, "Please provide the weight!"],
  },
  symptoms: [
    {
      type: String,
      required: [true, "Please provide symptops!"],
    },
  ],
});

const vitalSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  measurements: [measurementSchema],
});

module.exports = mongoose.model("vital", vitalSchema);
