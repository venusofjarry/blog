const express = require('express');
const home = express.Router();
const { login, loginPage } = require('./home/login')


home.get('/', require('./home/default'));

home.get('/login', loginPage);

home.post('/login', login);

home.get('/article', require('./home/article'));

module.exports = home;