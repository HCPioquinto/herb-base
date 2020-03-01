const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  Image: {
    type: "String",
    required: true,
    trim: true,
  },
  FeedbackSent: {
    type: "Date",
    required: true
  },
  PlantNameResult: {
    type: "String",
    required: true
  },
  PlantNameCorrection: {
    type: "String",
    trim: true,
    required: true
  },
  IsApproved: {
    type: "Boolean",
    required: true
  },
});

module.exports = mongoose.model("feedbacks", FeedbackSchema);