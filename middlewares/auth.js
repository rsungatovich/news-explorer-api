const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
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
      JWT_SECRET,
    );
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
