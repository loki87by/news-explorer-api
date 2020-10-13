// **верификация
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'efdc8333ecbf5019c9023644d4a5bede'}`);
  } catch (err) {
    throw new UnauthorizedError('Сначала нужно авторизоваться');
  }
  req.user = payload;
  next();
};
