const { postService } = require('../services');

const createNewPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const { status, data } = await postService.createNewPost({ title, content, categoryIds, id });

  return res.status(status).json(data);
};
const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  console.log(posts);
  return res.status(200).json(posts);
};
const getPostById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getPostById(id);
  return res.status(status).json(data);
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
};