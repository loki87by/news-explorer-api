// **импорты
const { bcrypt, jwt } = require('../utils/libraries');
const { JWT_SECRET, User, ConflictError } = require('../utils/allImports');
const {
  nonexistentUser, serverError, emailConflict, loginSuccess,
} = require('../utils/consts');

// *свои данные
module.exports.getMyInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(err.message ? 404 : 500)
          .send({ message: nonexistentUser || serverError });
      }
    });
};

// **новый пользователь
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError(emailConflict);
      } else {
        next(err);
      }
    })
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

// *логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, JWT_SECRET,
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: loginSuccess });
    })
    .catch(next);
};
