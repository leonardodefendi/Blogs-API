const route = require('express').Router();
const { auth } = require('../middlewares');
const { categoryController } = require('../controller');

route.post('/', auth.authToken, categoryController.createCategory);

module.exports = route;