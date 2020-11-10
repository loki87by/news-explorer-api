// **импорты
// *импорты модулей ноды
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

// *импорты из скриптов приложения
const { pathToDb } = require('../config');
const { limiter, centralErrorHandler } = require('./appExtensions');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const indexRouter = require('../routes');

// **экспорт
module.exports = {
  express,
  bodyParser,
  cookieParser,
  mongoose,
  cors,
  helmet,
  errors,
  pathToDb,
  limiter,
  centralErrorHandler,
  requestLogger,
  errorLogger,
  indexRouter,
};
