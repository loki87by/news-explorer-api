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
const createUserRouter = require('./routes/createUser');
const loginRouter = require('./routes/login');
const articleRouter = require('./routes/articleRouter');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/userRouter');
const pattern = require('./routes/pattern');

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
// *регистрация
app.use('/signup', createUserRouter);
// *логин
app.use('/signin', loginRouter);
// *мидлвэр аутентификации
app.use(auth);
// *пользователи
app.use('/users', userRouter);
// *статьи
app.use('/articles', articleRouter);
// *url-пустышки
app.use('*', pattern);

// *обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

// *портирование
app.listen(PORT, () => {
  console.log('Server started');
});
