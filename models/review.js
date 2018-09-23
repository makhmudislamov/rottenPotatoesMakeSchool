//  mongoose
const mongoose = require('mongoose');

// Review model. declaration is similari to class. Classes are saved in recent memory and models are on the database.
module.exports = mongoose.model('Review', {
  movieId: { type: String, required: true },
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

