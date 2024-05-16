const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const contentModel = mongoose.model("content", contentSchema);

module.exports = contentModel;
