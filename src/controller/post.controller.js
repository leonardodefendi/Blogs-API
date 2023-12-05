const { postService, searchSerivce } = require('../services');

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

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { id: userId } = req.user;
  const { status, data } = await postService.updatedPost({ title, content, id, userId });
  return res.status(status).json(data); 
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { status, data } = await postService.deletePost(id, userId);
  if (data) return res.status(status).json(data);
  return res.sendStatus(status);
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const post = await searchSerivce.searchPostParam(q);
  console.log(post);
  console.log(q);
  return res.status(200).json(post);
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};