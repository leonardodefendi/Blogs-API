const route = require('express').Router();
const { auth } = require('../middlewares');
const { categoryController } = require('../controller');

route.post('/', auth.authToken, categoryController.createCategory);
route.get('/', auth.authToken, categoryController.findAllCategories);

module.exports = route;