/* eslint-disable linebreak-style */
const router = require('express').Router();
const { routerUser } = require('./users');
const { routerMovie } = require('./movies');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

router.use('/users', routerUser);
router.use('/movies', routerMovie);
router.use((req, res, next) => {
  next(new DocumentNotFoundError('Ошибка авторизации'));
});

module.exports = { router };
