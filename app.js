// **импорты
require('dotenv').config();
const {
  express, bodyParser, cookieParser, mongoose, cors, helmet, errors,
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
app.use(cors({ origin: true }));
app.use(limiter);
app.use(helmet());

// *парсеры
app.use(cookieParser());
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
