const mongoose = require("mongoose");

const RetrainingSchema = mongoose.Schema({
  Image: {
    type: "String",
    required: true,
    trim: true,
  },
  FeedbackSent: {
    type: "Date",
    required: true
  },
  Suggestion: {
    type: "Date",
    required: true
  },
  IsDownloaded: {
    type: "Boolean",
    required: true
  },
});

module.exports = mongoose.model("retraining", RetrainingSchema);