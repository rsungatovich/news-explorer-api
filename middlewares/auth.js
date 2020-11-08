const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  let payload;

  try {
    if (!req.cookies._id) {
      throw new NotAuthorizedError('Необходима авторизация');
    }

    const token = req.cookies._id;
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
