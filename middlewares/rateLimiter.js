const rateLimiter = require('express-rate-limit');

const reqLimit = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'С данного IP поступает слишком много запросов. Пожалуйста, попробуйте еще раз через 15 минут',
});

module.exports = { reqLimit };
