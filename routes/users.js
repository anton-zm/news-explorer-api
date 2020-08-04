const usersRouter = require('express').Router();

// const { celebrate, Joi } = require('celebrate');

// const { getUsers, getUser } = require('../controllers/users');

const { getMe } = require('../controllers/users');

// usersRouter.get('/', getUsers);

// usersRouter.get(
//   '/:userId',
//   celebrate({
//     params: Joi.object().keys({
//       userId: Joi.string().length(24).hex(),
//     }),
//   }),
//   getUser // eslint-disable-line
// );

usersRouter.get('/me', getMe);

module.exports = usersRouter;
