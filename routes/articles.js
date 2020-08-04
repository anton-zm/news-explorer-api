const articleRouter = require('express').Router();
const { createArticle, deleteArticle } = require('../controllers/articles');

articleRouter.post('/', createArticle);
articleRouter.delete('/:articleId', deleteArticle);

module.exports = articleRouter;
