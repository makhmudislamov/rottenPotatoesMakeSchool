const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

// handlebar
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// route 1
// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Hello World!' });
// })

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review" },
//   { title: "Awesome Review" }
// ]

// INDEX
// app.get('/', (req, res) => {
//   res.render('reviews-index', { reviews: reviews });
// })

// updating root and using Review model frmo DB
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
}

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

// Review model. declaration is similari to class. Classes are saved in recent memory and models are on the database.
const Review = mongoose.model('Review', {
  title: String
});


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})