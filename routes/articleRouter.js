// **импорты
const articleRouter = require('express').Router();
const { celebrate, Joi } = require('../utils/libraries');
const { getAllArticles, createArticle, deleteArticle } = require('../utils/allImports');
const { errorText, validateUrl } = require('../utils/celebrate');

// **роуты
// *получение всех статей
articleRouter.get('/', getAllArticles);

// *создание статьи
articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().label('keyword').messages(errorText),
    title: Joi.string().required().label('title').messages(errorText),
    text: Joi.string().required().label('text').messages(errorText),
    date: Joi.string().required().label('date').messages(errorText),
    source: Joi.string().required().label('source').messages(errorText),
    link: Joi.string().custom(validateUrl).required().label('link')
      .messages(errorText),
    image: Joi.string().custom(validateUrl).required().label('image')
      .messages(errorText),
  }),
}), createArticle);

// *удаление статьи
articleRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex()
      .label('id')
      .messages(errorText),
  }).unknown(true),
}), deleteArticle);

// **экспорт
module.exports = articleRouter;
