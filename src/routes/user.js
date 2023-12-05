const route = require('express').Router();
const { UserMiddleware, auth } = require('../middlewares');
const { userController } = require('../controller');

route.get('/', auth.authToken, userController.findAllUsers);
route.get('/:id', auth.authToken, userController.findUserById);
route.post('/', UserMiddleware.validateUserFields, userController.createUser);
route.delete('/me', auth.authToken, userController.deleteUserMe);

module.exports = route;