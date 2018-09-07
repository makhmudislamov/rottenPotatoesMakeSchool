//  mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
  useMongoClient: true
});

// Review model. declaration is similari to class. Classes are saved in recent memory and models are on the database.
module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
rating: Number
});

