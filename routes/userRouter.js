// **импорты
const userRouter = require('express').Router();
const { getMyInfo } = require('../controllers/users');

// **роуты
// *роут получения информации о себе
userRouter.get('/me', getMyInfo);

// **экспорт
module.exports = userRouter;
