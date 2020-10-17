// **импорт
const pattern = require('express').Router();
const { pageNotFound } = require('../utils/consts');

// **функционал
pattern.get('*', (req, res) => {
  res.status(404).send({ message: pageNotFound });
});
pattern.post('*', (req, res) => {
  res.status(404).send({ message: pageNotFound });
});
pattern.put('*', (req, res) => {
  res.status(404).send({ message: pageNotFound });
});
pattern.patch('*', (req, res) => {
  res.status(404).send({ message: pageNotFound });
});
pattern.delete('*', (req, res) => {
  res.status(404).send({ message: pageNotFound });
});

// **экспорт
module.exports = pattern;
