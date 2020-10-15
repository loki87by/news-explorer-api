// **импорты
const indexRouter = require('express').Router();
const createUserRouter = require('./routes/createUser');
const loginRouter = require('./routes/login');
const articleRouter = require('./routes/articleRouter');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/userRouter');
const pattern = require('./routes/pattern');

// **роуты
// *регистрация
indexRouter.use('/signup', createUserRouter);
// *логин
indexRouter.use('/signin', loginRouter);
// *мидлвэр аутентификации
indexRouter.use(auth);
// *пользователи
indexRouter.use('/users', userRouter);
// *статьи
indexRouter.use('/articles', articleRouter);
// *url-пустышки
indexRouter.use('*', pattern);

// **экспорт
module.exports = indexRouter
