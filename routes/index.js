// **импорты
const indexRouter = require('express').Router();
const createUserRouter = require('./createUser');
const loginRouter = require('./login');
const articleRouter = require('./articleRouter');
const auth = require('../middlewares/auth');
const userRouter = require('./userRouter');
const pattern = require('./pattern');

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
module.exports = indexRouter;
