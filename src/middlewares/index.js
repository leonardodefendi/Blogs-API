const LoginMiddleware = require('./validateLogin');
const UserMiddleware = require('./validateUser');
const auth = require('./auth');
const PostCategoryMiddleware = require('./validatePostCategories');

module.exports = { 
  LoginMiddleware,
  UserMiddleware,
  auth,
  PostCategoryMiddleware,
};