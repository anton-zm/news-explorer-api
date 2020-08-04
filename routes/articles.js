const articleRouter = require('express').Router();
const { createArticle } = require('../controllers/articles');

articleRouter.post('/', createArticle);

module.exports = articleRouter;
