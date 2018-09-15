const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('3b665f3bff49568f114e51e707884fa5');
const Review = require('../models/review.js');

module.exports = function(app) {

    // INDEX
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {
                movies: response.results
            });
        }).catch(console.error)
    });


    // SHOW
 app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then((movie) => {
    Review.find({ movieId: req.params.id }).then((reviews) =>{

    if (movie.video) {
      moviedb.movieVideos({ id: req.params.id }).then(videos => {
        movie.trailer_youtube_id = videos.results[0].key
        renderTemplate(movie, reviews);
      })
    } else {
      renderTemplate(movie, reviews);
    }

    function renderTemplate(movie, reviews)  {
      res.render('movies-show', { movie: movie, reviews:reviews });
    }
  })

  }).catch(console.error)

});

  
}