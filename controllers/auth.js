const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.userAuthentication(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('_id', token, { httpOnly: true, sameSite: true });
      res.end({ message: 'Токен отправлен' });
    })
    .catch(next);
};

const logout = (req, res) => {
  res
    .clearCookie('_id')
    .send({ message: 'Токен удален' });
};

module.exports = {
  login,
  logout,
  createUser,
};
