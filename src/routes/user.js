const route = require('express').Router();
const { UserMiddleware } = require('../middlewares');
const { userController } = require('../controller');

route.post('/', UserMiddleware.validateUserFields, userController.createUser);

module.exports = route;