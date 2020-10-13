// **импорты
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
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
const limiter = userLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Мы заметили подозрительную активность с вашего IP-адреса, повторите запрос позже',
});

app.use(cors({ origin: true }));
app.use(limiter);

// *парсеры
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

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла непредвиденная ошибка'
      : message,
  });
  next(err);
});

// *портирование
app.listen(PORT, () => {
  console.log('Server started');
});
