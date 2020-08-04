const mongoose = require('mongoose');
const article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-req-err');
const RightsError = require('../errors/right-err');

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  article
    .create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((art) =>
      res.send({
        keyword: art.keyword,
        title: art.title,
        text: art.text,
        date: art.date,
        source: art.source,
        link: art.link,
        image: art.image,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Что-то пошло не так...');
      } else {
        next(err);
      }
    })
    .catch(next);
};
