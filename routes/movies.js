/* eslint-disable linebreak-style */
const routerMovie = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { customValidate } = require('../utils/customValidate');
const { constRegex } = require('../utils/constRegex');

routerMovie.get('/', getMovies);
routerMovie.post('/', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    image: Joi.string().required().regex(constRegex),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
    thumbnail: Joi.string().required().regex(constRegex),
    trailerLink: Joi.string().required().regex(constRegex),
    description: Joi.string().required(),
    year: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    country: Joi.string().required(),
  }),
}), createMovie);
routerMovie.delete('/:_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().custom(customValidate),
  }),
}), deleteMovie);

module.exports = { routerMovie };
