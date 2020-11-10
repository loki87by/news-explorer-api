// *импорт
const { pathToDb, JWT_SECRET } = require('../config');
const { limiter, centralErrorHandler } = require('./appExtensions');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const Article = require('../models/article');
const User = require('../models/user');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { getMyInfo, createUser, login } = require('../controllers/users');
const indexRouter = require('../routes');
const {
  BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError,
} = require('../errors');

// *экспорт
module.exports = {
  pathToDb,
  JWT_SECRET,
  limiter,
  centralErrorHandler,
  requestLogger,
  errorLogger,
  indexRouter,
  Article,
  User,
  getAllArticles,
  createArticle,
  deleteArticle,
  getMyInfo,
  createUser,
  login,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
};
