const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

module.exports = function (app) {


// CREATE - working
app.post('/movies/:movieId/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/movies/${req.params.movieId}`);
  }).catch((err) => {
    console.log(err.message);
  })
});

// NEW - redirects to new review page
app.get('/movies/:movieId/reviews/new', (req, res) => {
    console.log(req.params.movieId);
    res.render('reviews-new', { movieId: req.params.movieId });
});



app.get('/movies/:movieId/reviews/:id', (req, res) => {
  // find review
  Review.findById(req.params.id).then(review => {
    // fetch its comments
    Comment.find({
      reviewId: req.params.id
    }).then(comments => {
      // respond with the template with both values
      res.render('reviews-show', {
        review: review,
        comments: comments
      })
    })
  }).catch((err) => {
    // catch errors
    console.log(err.message)
  });
});

// EDIT
app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    res.render('reviews-edit', {
      review: review
    })
  })
});

// UPDATE
app.put('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/movies/${review.movieId}`)
    })
    .catch(err => {
      console.log(err.message)
    })
});

// DELETE
app.delete('/movies/:movieId/reviews/:id',  (req, res) => {
  // console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect(`/movies/${req.params.movieId}`)
  }).catch((err) => {
    console.log(err.message);
  })
});

}