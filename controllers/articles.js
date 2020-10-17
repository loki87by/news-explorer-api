// **импорты
const {
  Article, BadRequestError, NotFoundError, ForbiddenError,
} = require('../utils/allImports');
const {
  serverError, uncorrectedData, uncorrectedArticleId, hasntRights,
} = require('../utils/consts');

// **список статей
module.exports.getAllArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .populate('user')
    .then((articles) => res.send(articles))
    .catch((err) => res.status(err.message ? 400 : 500)
      .send({ message: err.message || serverError }));
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
        throw new BadRequestError(uncorrectedData);
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
      throw new NotFoundError(uncorrectedArticleId);
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(hasntRights);
      }
      Article.deleteOne(article)
        .then((articleData) => {
          res.send({ message: `статья ${articleData.title} удалена` });
        })
        .catch(next);
    })
    .catch(next);
};
