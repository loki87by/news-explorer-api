// **импорт
const loginRouter = require('express').Router();
const { celebrate, Joi } = require('../utils/libraries');
const { login } = require('../utils/allImports');
const { errorText } = require('../utils/celebrate');

// **функционал
loginRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }).label('password')
      .messages(errorText),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().label('password')
      .messages(errorText),
  }),
}), login);

// **экспорт
module.exports = loginRouter;
