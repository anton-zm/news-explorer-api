const nodemailer = require('nodemailer');

module.exports.test = (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false,
    auth: {
      user: 'stvorka34@yandex.ru',
      pass: '851029poi',
    },
  });

  transporter.sendMail({
    from: 'stvorka34@yandex.ru',
    to: 'stvorka34@mail.ru',
    subject: 'Хочу в чат Telegram',
    html: `Отправитель: ${req.body.name}
          E-mail: ${req.body.email}
          Номер квартиры: ${req.body.flat}`,
  });

  res.redirect('http://a100a.ru');
};
