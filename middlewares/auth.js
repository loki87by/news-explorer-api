// **верификация
const { jwt } = require('../utils/libraries');
const { JWT_SECRET, UnauthorizedError } = require('../utils/allImports');
const { authorizeFirst } = require('../utils/consts');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(authorizeFirst);
  }
  req.user = payload;
  next();
};
