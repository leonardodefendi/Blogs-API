const route = require('express').Router();
const { auth, PostCategoryMiddleware, PostMiddleware } = require('../middlewares');
const { postController } = require('../controller');

route.get('/', auth.authToken, postController.getAllPosts);
route.get('/search', auth.authToken, postController.searchPost);
route.get('/:id', auth.authToken, postController.getPostById);
route.post(
  '/', 
  auth.authToken,
  PostCategoryMiddleware.validateCategories,
  PostCategoryMiddleware.verifyCategoryExist,
  postController.createNewPost,
);
route.put(
  '/:id', 
  auth.authToken,
  PostMiddleware.validatePostFieldsUpdate, 
  postController.updatePost,
);
route.delete('/:id', auth.authToken, postController.deletePost);

module.exports = route;