const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  stdId: {
    type: Number,
    required: true,
    unique: true,
  },
  srn: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DataSchema", dataSchema);
