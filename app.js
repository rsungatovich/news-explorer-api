require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const { PORT, DATABASE_URL } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');

const app = express();

const options = {
  origin: [
    'http://localhost:8080',
    'https://chirikgaga.ga',
    'https://rsungatovich.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
