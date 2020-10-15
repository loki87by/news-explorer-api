// **импорты
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter, centralErrorHandler } = require('./utils/appExtensions');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes')

const { PORT = 3000 } = process.env;
const app = express();

// **подключение к БД
mongoose.connect('mongodb://localhost:27017/diploma', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(err);
  });

// **функционал
app.use(cors({ origin: true }));
app.use(limiter);
app.use(helmet());

// *парсеры
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *логгер запросов
app.use(requestLogger);

// **подключение роутов
app.use('/', indexRouter)

// *обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

// *портирование
app.listen(PORT, () => {
  console.log('Server started');
});
