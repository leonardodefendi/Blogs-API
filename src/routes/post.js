const route = require('express').Router();
const { auth, PostCategoryMiddleware } = require('../middlewares');
const { postController } = require('../controller');

route.post(
  '/', 
  auth.authToken,
  PostCategoryMiddleware.validateCategories, 
  postController.createNewPost,
);

module.exports = route;