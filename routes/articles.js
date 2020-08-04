const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles');
const validateUrl = require('../urlRegex');

articleRouter.get('/', getArticles);
articleRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string()
        .required()
        .pattern(validateUrl)
        .error(() => new Error('В ссылке на статью есть ошибка')),
      image: Joi.string()
        .required()
        .pattern(validateUrl)
        .error(() => new Error('В ссылке на изображение статьи есть ошибка')),
    }),
  }),
  createArticle
);
articleRouter.delete('/:articleId', deleteArticle);

module.exports = articleRouter;
