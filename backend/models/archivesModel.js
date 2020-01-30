const mongoose = require("mongoose");

const ArchivesSchema = mongoose.Schema({
  Image: {
    type: "String",
    required: true,
    trim: true,
  },
  FeedbackSent: {
    type: "Date",
    required: true
  },
  ArchivedDate: {
    type: "Date",
    required: true
  },
  Remarks: {
    type: "String",
    trim: true,
    required: true
  },
  IsRetrained: {
    type: "Boolean",
    required: true
  },
});

module.exports = mongoose.model("archives", ArchivesSchema);