/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const isUrl = /https?:\/\/w*[-._~:/?#[\]@!$&'()*+,;=0-9a-z]+#?/i;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: isUrl,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: isUrl,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: isUrl,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
