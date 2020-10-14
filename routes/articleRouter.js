// **импорты
const articleRouter = require('express').Router();
const { celebrate, Joi, CelebrateErr } = require('celebrate');
const validator = require('validator');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { string, url } = require('../utils/celebrate');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateErr('Введите корректный URL');
  }
  return value;
};

// **роуты
articleRouter.get('/', getAllArticles);

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().label('keyword').messages(string),
    title: Joi.string().required().label('title').messages(string),
    text: Joi.string().required().label('text').messages(string),
    date: Joi.string().required().label('date').messages(string),
    source: Joi.string().required().label('source').messages(string),
    link: Joi.string().custom(validateUrl).required().label('link')
      .messages(url),
    image: Joi.string().custom(validateUrl).required().label('image')
      .messages(url),
  }),
}), createArticle);

articleRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }).unknown(true),
}), deleteArticle);

// **экспорт
module.exports = articleRouter;
