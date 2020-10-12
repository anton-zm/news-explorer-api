const mongoose = require('mongoose');
const contact = require('../models/contact');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-req-err');
const RightsError = require('../errors/right-err');

module.exports.createContact = (req, res, next) => {
  const { name, phone } = req.body;
  contact
    .create({
      name,
      phone,
      owner: req.user._id,
    })
    .then((cont) =>
      res.send({
        name: cont.name,
        phone: cont.phone,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ошибка валидации данных');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteContact = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    throw new BadRequest('Некорректный ID');
  }
  return contact
    .findById(req.params.contactId)
    .orFail(new NotFoundError('Контакт не найден'))
    .then((cont) => {
      if (!(cont.owner.toString() === req.user._id)) {
        throw new RightsError('Вы не можете удалять чужие контакты');
      }
      return contact
        .deleteOne(cont)
        .then(() => res.send({ message: 'Контакт  удален' }))
        .catch(next);
    })
    .catch(next);
};

module.exports.editContact = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    throw new BadRequest('Некорректный ID');
  }
  contact
    .findById(req.params.contactId)
    .orFail(new NotFoundError('Контакт не найден'))
    .then((e) => contact.updateOne(e, { name: req.body.name, phone: req.body.phone }))
    .then(() => res.send({ message: 'Контакт  изменен' }))
    .catch(next);
};

module.exports.getContacts = (req, res, next) => {
  contact
    .find({ owner: req.user._id })
    .then((conts) => res.send({ data: conts }))
    .catch(next);
};
