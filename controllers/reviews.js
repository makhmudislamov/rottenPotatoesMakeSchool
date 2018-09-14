const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

module.exports = function (app) {

//  INDEX
// app.get('/', (req, res) => {
//   Review.find()
//     .then(reviews => {
//       res.render('reviews-index', { reviews: reviews });
//     })
//     .catch(err => {
//       console.log(err);
//     })
// });

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
});

// NEW
app.get('/reviews/new', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-new', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
});

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
      Comment.find({reviewId: review._id}).then(comments => {
        res.render('reviews-show', {
          review: review,
          comments: comments
        })
      })

    
  }).catch((err) => {
    console.log(err.message);
  })
});

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
});

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
});

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
});

}