// **импорт
const pattern = require('express').Router();

pattern.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// **экспорт
module.exports = pattern;
