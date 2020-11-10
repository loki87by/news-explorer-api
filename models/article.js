// **импорты
const mongoose = require('mongoose');

// **модель
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return /https?:\/{2}\S+/gi.test(str);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return /https?:\/{2}\S+/gi.test(str);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

// **экспорт
module.exports = mongoose.model('article', articleSchema);
