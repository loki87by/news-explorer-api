// **импорты
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userLimit = require('express-rate-limit');
const cors = require('cors');
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

// **подключение роутов
// *регистрация
app.use('/signup', createUserRouter);
// *статьи
app.use('/articles', articleRouter);
// *мидлвэр аутентификации
app.use(auth);
// *пользователи
app.use('/users', userRouter);
// *url-пустышки
app.use('*', pattern);
// *логин
app.use('/signin', loginRouter);

// *портирование
app.listen(PORT, () => {
  console.log('Server started');
});
