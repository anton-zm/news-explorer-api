const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const BadRequest = require('../errors/bad-req-err');

const { JWT_SECRET, NODE_ENV } = process.env;
const UniqueUserError = require('../errors/unique-user-err');
const AuthError = require('../errors/auth-err');

module.exports.getMe = (req, res, next) => {
  user
    .findById(req.user._id)
    .then((result) => {
      res.send({ name: result.name, email: result.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!password || password.length < 8) {
    throw new BadRequest('Нужно задать пароль. Длина пароля не менее 8 символов.');
  }
  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      user
        .create({ name, email, password: hash })
        .then((users) => res.send({
          data: {
            name: users.name,
            email: users.email,
          },
        }))

        .catch((err) => {
          if (err.name === 'ValidationError') {
            if (err.errors.email && err.errors.email.kind === 'unique') {
              throw new UniqueUserError('Пользователь с таким E-mail уже есть');
            } else {
              throw new BadRequest('Ошибка валидации');
            }
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (password) {
    return user
      .findUserByCredentials(email, password)
      .then((userObj) => {
        const token = jwt.sign({ _id: userObj._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      })
      .catch(next);
  }
  return next(new AuthError('Необходимо ввести пароль'));
};
