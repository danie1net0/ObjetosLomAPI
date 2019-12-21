require('dotenv/config');

const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: './resources/mail/',
    layoutsDir: './resources/mail/',
    defaultLayout: 'auth/forgot-password.html',
  },
  viewPath: './resources/mail/',
  extName: '.html',
};

transport.use('compile', handlebars(handlebarOptions));

module.exports = transport;
