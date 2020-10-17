// **импорт
const createUserRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { errorText } = require('../utils/celebrate');

// **функционал
createUserRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }).label('email')
      .messages(errorText),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().label('password')
      .messages(errorText),
    name: Joi.string().required().min(2).max(30)
      .label('name')
      .messages(errorText),
  }),
}), createUser);

// **экспорт
module.exports = createUserRouter;
