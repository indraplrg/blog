const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
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
