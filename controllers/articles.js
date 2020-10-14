// **импорты
const Article = require('../models/article');
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFoundErr');
const ForbiddenError = require('../errors/forbiddenErr');

// **список статей
module.exports.getAllArticles = (req, res) => {
  Article.find({})
    .populate('user')
    .then((articles) => res.send(articles))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла непредвиденная ошибка' }));
};

// **создание статьи
module.exports.createArticle = (req, res, next) => {
  Article.create({
    keyword: req.body.keyword,
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    source: req.body.source,
    link: req.body.link,
    image: req.body.image,
    owner: req.user._id,
  })
    .then((article) => {
      if (res.statusCode === 400) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      res.status(201).send(article);
    })
    .catch((err) => next(err));
};

// **удаление карточки
module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.params;
  Article.findOne({ _id })
    .orFail()
    .catch(() => {
      throw new NotFoundError('Нет статьи с таким id');
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для выполнения операции');
      }
      Article.findByIdAndRemove(req.params._id)
        .then((articleData) => {
          res.send(articleData);
        })
        .catch(next);
    })
    .catch(next);
};
