// **импорты
const User = require('../models/user');

// *свои данные
module.exports.getMyInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(err.message ? 404 : 500)
          .send({ message: 'Такого пользователя не существует' || 'На сервере произошла непредвиденная ошибка' });
      }
    });
};
