require('dotenv').config();

const { JWT_SECRET = 'efdc8333ecbf5019c9023644d4a5bede' } = process.env;
const pathToDb = 'mongodb://localhost:27017/diploma';

module.exports = {
  JWT_SECRET, pathToDb,
};
