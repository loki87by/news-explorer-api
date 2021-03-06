// **импорты
const { CelebrateErr } = require('celebrate');
const validator = require('validator');

// **функционал
// *текст ошибок
module.exports.errorText = {
  'string.empty': 'Поле {#label} не должно быть пустым',
  'any.required': 'Поле {#label} обязательно к заполнению',
  'string.min': 'В поле {#label} должно быть больше {#limit} символов',
  'string.max': 'В поле {#label} должно быть меньше {#limit} символов',
  'string.email': 'Поле {#label} должно содержать адрес электронной почты',
  'any.custom': 'Введите корректный URL',
  'string.pattern.base': 'Поле {#label} не должно содержать спец.символов',
  'string.base': 'Поле {#label} содержит спец.символы! Пароль должен состоять из больших и маленьких, а так же цифр.',
  'string.length': 'Длина строки не соответствует ожидаемой.',
  'string.alphanum': 'Поле {#label} должно содержать только буквы и цифры',
  'string.hex': 'Параметр {#label} может содержать только символы шестнадцатеричной системы',
};

// *проверка валидности URL
module.exports.validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateErr('Введите корректный URL');
  }
  return value;
};
