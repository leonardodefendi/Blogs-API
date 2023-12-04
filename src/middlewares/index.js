const LoginMiddleware = require('./validateLogin');
const UserMiddleware = require('./validateUser');
const auth = require('./auth');

module.exports = { 
  LoginMiddleware,
  UserMiddleware,
  auth,
};