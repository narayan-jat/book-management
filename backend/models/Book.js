// Updated models/Book.js
const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema ({
  title: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String, required: true},
  condition: {type: String, required: true},
  image_url: {type: String, required: false},
  owner_id: {
    type: String,
    required: true,
  },
  availability: {type: Boolean, default: true},
});

module.exports = mongoose.model ('Book', bookSchema);
