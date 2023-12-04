const LoginMiddleware = require('./validateLogin');
const UserMiddleware = require('./validateUser');
const auth = require('./auth');
const PostCategoryMiddleware = require('./validatePostCategories');
const PostMiddleware = require('./validatePostUpdate');

module.exports = { 
  LoginMiddleware,
  UserMiddleware,
  auth,
  PostCategoryMiddleware,
  PostMiddleware,
};