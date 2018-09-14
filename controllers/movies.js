const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('3b665f3bff49568f114e51e707884fa5');

module.exports = function(app) {

    // INDEXm
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {
                movies: response.results
            });
        }).catch(console.error)
    });


    // SHOW ONE MOVIE 
    // app.get('/movies/:id', (req, res) => { 
    //     moviedb.movieInfo({ id: req.params.id }).then(movie => { 
    //         res.render('movies-show', { 
    //           movie: movie 
    //         }); 
    //       }).catch(console.error) 
    //     });

    app.get('/movies/:id', (req, res) => {
      moviedb.movieInfo({ id: req.params.id }).then(movie => {
        if (movie.video) {
          moviedb.movieVideos({
            id: req.params.id
          }).then(videos => {
            movie.trailer_youtube_id = videos.results[0].key
            renderTemplate(movie)
          })
        } else {
          renderTemplate(movie)
        }
        function renderTemplate(movie) {
          res.render('movies-show', {
            movie: movie
          });
        }

      }).catch(console.error)
    });

  

    //  CHECK HOW TO BUILD ROUTE FOR OTHER METHODS such as following

    // Popular movies
    // app.get('./popular', (req, res) => {
    //     moviedb.miscPopularMovies().then(response => {
    //         res.render('movies-popular', {
    //             movies: response.results
    //         });
    //     }).catch(console.error)
    // });
    // 

    }