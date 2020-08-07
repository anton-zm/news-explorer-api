const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles');

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
      link: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  createArticle
);
articleRouter.delete('/:articleId', deleteArticle);

module.exports = articleRouter;
