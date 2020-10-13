// **импорты
const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articleRouter');
const userRouter = require('./routes/userRouter');

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

// *подключение роутов
app.use('/articles', articleRouter);
app.use('/users', userRouter);

// *портирование
app.listen(PORT, () => {
  console.log('Server started');
});
