const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .populate('owner')
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink,
    nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Movie.findById(_id)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        throw new DocumentNotFoundError('Фильм не найден');
      } else {
        const ownerId = movie.owner.id;
        if (ownerId !== userId) {
          throw new ForbiddenError('Нельзя удалить чужой фильм');
        } else {
          Movie.deleteOne(movie)
            .then((info) => {
              res.send({ data: info });
            })
            .catch((err) => {
              next(err);
            });
        }
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
