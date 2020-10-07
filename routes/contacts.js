const contactRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createContact, deleteContact, getContacts, editContact } = require('../controllers/contacts');

contactRouter.get('/', getContacts);
contactRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  }),
  createContact
);

contactRouter.delete(
  '/:contactId',
  celebrate({
    params: Joi.object().keys({
      contactId: Joi.string().length(24).hex(),
    }),
  }),
  deleteContact
);

contactRouter.patch('/:contactId', editContact);

module.exports = contactRouter;
