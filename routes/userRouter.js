// **импорты
const userRouter = require('express').Router();
const { getMyInfo } = require('../controllers/users');

// **роуты
userRouter.get('/me', getMyInfo);

// **экспорт
module.exports = userRouter;
