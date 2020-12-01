const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Ничего не найдено'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = { getUserInfo };
