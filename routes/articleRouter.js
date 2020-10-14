/* eslint-disable linebreak-style */
// **импорты
const articleRouter = require('express').Router();
const { celebrate, Joi, CelebrateErr } = require('celebrate');
const validator = require('validator');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateErr({ message: 'Введите корректный URL' });
  }
  return value;
};

// **роуты
articleRouter.get('/', getAllArticles);

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(validateUrl).required(),
    image: Joi.string().custom(validateUrl).required(),
  }),
}), createArticle);

articleRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }).unknown(true),
}), deleteArticle);

// **экспорт
module.exports = articleRouter;
