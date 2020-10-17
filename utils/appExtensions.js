// **импорты
const { userLimit } = require('./libraries');

// **функционал
// *лимитеp
module.exports.limiter = userLimit({ windowMs: 15 * 60 * 1000, max: 50, message: 'Мы заметили подозрительную активность с вашего IP-адреса, повторите запрос позже' });

// *централизованная обработка ошибок
module.exports.centralErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Упс. На сервере произошла непредвиденная ошибка' : message });
  next(err);
};
