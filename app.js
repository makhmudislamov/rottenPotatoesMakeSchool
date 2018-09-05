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
let reviews = [
  { title: "Great Review" },
  { title: "Awesome Review" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})