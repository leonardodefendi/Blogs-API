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
route.get('/:id', auth.authToken, postController.getPostById);

module.exports = route;