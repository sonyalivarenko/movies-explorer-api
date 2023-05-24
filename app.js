require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { router } = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const { PORT = 3000, DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: 'Ошибка на сервере' });
    next();
  } else {
    res.status(statusCode).send({ message: err.message });
    next();
  }
});

app.listen(PORT);
