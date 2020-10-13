// **импорты
const express = require('express');
const mongoose = require('mongoose');
const createUserRouter = require('./routes/createUser');
const articleRouter = require('./routes/articleRouter');
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

// **подключение роутов
// *регистрация
app.use('/signup', createUserRouter);
// *статьи
app.use('/articles', articleRouter);
// *пользователи
app.use('/users', userRouter);
// *url-пустышки
app.use('*', pattern);

// *портирование
app.listen(PORT, () => {
  console.log('Server started');
});
