// *импорт
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const {
  errors, celebrate, Joi, CelebrateErr,
} = require('celebrate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
const validator = require('validator');
const userLimit = require('express-rate-limit');

// *экспорт
module.exports = {
  express,
  bodyParser,
  cookieParser,
  mongoose,
  cors,
  helmet,
  errors,
  celebrate,
  Joi,
  CelebrateErr,
  jwt,
  bcrypt,
  winston,
  expressWinston,
  path,
  validator,
  userLimit,
};
