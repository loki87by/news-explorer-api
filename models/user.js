// **импорты
const { mongoose, bcrypt, validator } = require('../utils/libraries');
const { UnauthorizedError } = require('../utils/allImports');
const { uncorrectedLoginData } = require('../utils/consts');

// **модель
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(uncorrectedLoginData))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(uncorrectedLoginData);
        }
        return user;
      }));
};

// **экспорт
module.exports = mongoose.model('user', userSchema);
