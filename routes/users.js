/* eslint-disable linebreak-style */
const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { updateProfile, getСurrentUser } = require('../controllers/users');

routerUser.get('/me', getСurrentUser);
routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = { routerUser };
