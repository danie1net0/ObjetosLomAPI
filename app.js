require('dotenv/config');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/objects', require('./routes/object'));

app.use('/api/users', require('./routes/user/user'));
app.use('/api/acceppt-users', require('./routes/user/acceppt-user'));

app.use('/api/auth', require('./routes/auth'));

module.exports = app;
