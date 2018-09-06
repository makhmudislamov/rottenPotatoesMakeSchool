const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
  useMongoClient: true
});

// Review model. declaration is similari to class. Classes are saved in recent memory and models are on the database.
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

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

// updating root and using Review model from DB
app.get('/reviews', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-new', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})