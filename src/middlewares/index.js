const LoginMiddleware = require('./validateLogin');
const UserMiddleware = require('./validateUser');

module.exports = { 
  LoginMiddleware,
  UserMiddleware,
};