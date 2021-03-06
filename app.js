const reviews = require('./controllers/reviews.js');
const comments = require('./controllers/comments.js');
const movies = require('./controllers/movies.js');
const admin = require('./controllers/admin.js');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
var exphbs = require('express-handlebars');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
// handlebar
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/rotten-potatoes');

movies(app);
reviews(app);
comments(app);
admin(app);

// PORT
app.listen(3000, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;