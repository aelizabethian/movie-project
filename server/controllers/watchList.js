const Movie = require('../models/movie');
const User = require('../models/user');

//Think of controllers as response to all of the route functions!
//This syntax of exports.X = X() is just another way to specify exporting a function
exports.addMovieToList = function(req, res) {
  User.findOne({_id: req.user._id}, function (err, user) {
    const movie = new Movie.MovieModel(req.body.movie);
    
    movie.save(function (err, movie) {
      user.watchList.push(movie);

      user.save(function (err, user) {
        res.send({
          movie,
          watchListCount: user.watchList.length
        });
      });
    });
  });
};

exports.getWatchList = function(req, res) {
  User.findOne({_id: req.user._id}, function (err, user) {
    res.send({
      movies: user.watchList,
      watchListCount: user.watchList.length
    });
  });
};