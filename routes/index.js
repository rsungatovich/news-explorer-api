const routes = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const articleRoutes = require('./articles');
const NotFoundError = require('../errors/NotFoundError');

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(articleRoutes);
routes.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = routes;
