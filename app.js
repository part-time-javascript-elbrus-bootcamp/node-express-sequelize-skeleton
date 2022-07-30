// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register');

// использование данных из конфигурации файла .env
require('dotenv').config();

const express = require('express');
const config = require('./config/config');
const apiRouter = require('./routes/api/api.main');
const mainRouter = require('./routes/render/main.route');
const authRouter = require('./routes/render/auth.route');
const regRouter = require('./routes/render/reg.route');
const usersRouter = require('./routes/render/users.route');

const errorHandler = require('./middleware/errorHandler');
const { sequelize } = require('./db/models');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const port = process.env.PORT ?? 3000;

// конфигурация приложения
config(app);

// маршрутизация приложения
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/registration', regRouter);
app.use('/users', usersRouter);

// обработка ошибок из next(error)
app.use(errorHandler);

// проверка работы ДБ
sequelize.authenticate();

// прослушивание порта приложения
app.listen(port, () => {
  console.log(`*** Server started at ${port} port ***`);
});
