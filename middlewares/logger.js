// **импорты
const { winston, expressWinston, path } = require('../utils/libraries');

// **путь к папке
const dirPath = path.join(__dirname, '../../logs');

// **функционал
// *логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(dirPath, 'request.log') }),
  ],
  format: winston.format.json(),
});

// *логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(dirPath, 'error.log') }),
  ],
  format: winston.format.json(),
});

// **экспорт
module.exports = {
  requestLogger,
  errorLogger,
};
