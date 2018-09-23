const Comment = require('../models/comment.js');

module.exports = function (app) {


// CREATE Comment
app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
        // res.redirect(`/movies/:movieId/reviews/${comment.reviewId}`)
        // using AJAX
        res.status(200).send({ comment: comment });

    }).catch((err) => {
        // console.log(err.message)
        res.status(400).send({ err: err })
    })
});

// DELETE
app.delete('/movies/:movieId/reviews/:id/comments/:id', (req, res) => {
    console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            // res.redirect(`/movies/:movieId/reviews/${comment.reviewId}`);
            res.status(200).send(comment)
        }).catch((err) => {
    // console.log(err.message);
    res.status(200).send(err);
  })
})

}




