// **импорты
require('dotenv').config();
const {
  express, bodyParser, mongoose, cors, helmet, errors,
} = require('./utils/consts');
const {
  pathToDb, limiter, centralErrorHandler, requestLogger, errorLogger, indexRouter,
} = require('./utils/consts');

const { PORT = 3000 } = process.env;
const app = express();

// **подключение к БД
mongoose.connect(pathToDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// **функционал
app.use(
  cors({
    origin: /* [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://diplom.students.nomoreparties.co',
      'http://www.diplom.students.nomoreparties.co',
      'https://diplom.students.nomoreparties.co',
      'https://www.diplom.students.nomoreparties.co',
    ],
    credentials: */ true,
  }),
);
app.use(limiter);
app.use(helmet());

// *парсеры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *логгер запросов
app.use(requestLogger);

// **подключение роутов
app.use('/', indexRouter);

// *обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

// *портирование
app.listen(PORT);
