const route = require('express').Router();
const { UserMiddleware, auth } = require('../middlewares');
const { userController } = require('../controller');

route.post('/', UserMiddleware.validateUserFields, userController.createUser);
route.get('/', auth.authToken, userController.findAllUsers);
route.get('/:id', auth.authToken, userController.findUserById);
route.delete('/me', auth.authToken, userController.deleteUserMe);

module.exports = route;