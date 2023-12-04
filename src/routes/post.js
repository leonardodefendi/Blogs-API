const route = require('express').Router();
const { auth, PostCategoryMiddleware } = require('../middlewares');
const { postController } = require('../controller');

route.post(
  '/', 
  auth.authToken,
  PostCategoryMiddleware.validateCategories,
  PostCategoryMiddleware.verifyCategoryExist,
  postController.createNewPost,
);

route.get('/', auth.authToken, postController.getAllPosts);

module.exports = route;