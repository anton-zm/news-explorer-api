const articleRouter = require('express').Router();
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles');

articleRouter.get('/', getArticles);
articleRouter.post('/', createArticle);
articleRouter.delete('/:articleId', deleteArticle);

module.exports = articleRouter;
