const route = require('express').Router();
const { LoginMiddleware } = require('../middlewares');
const { loginController } = require('../controller');

route.post('/', LoginMiddleware.validateLoginFields, loginController.validateLogin);

module.exports = route;