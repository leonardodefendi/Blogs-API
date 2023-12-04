const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const createNewPost = async ({ title, content, categoryIds, id }) => {
  const t = await sequelize.transaction();
  try {
    const createPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });
    const promises = [];
    categoryIds.forEach((categoryId) => {
      promises.push(PostCategory.create({ categoryId, postId: createPost.id }, { transaction: t }));
    });
    await Promise.all(promises);
    await t.commit();
    return { status: 201, data: createPost };
  } catch (err) {
    await t.rollback();
    return { status: 500, data: 'error' };
  }
};
const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const [posts] = await BlogPost.findAll({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, { model: Category,
      as: 'categories',
      through: { attributes: [] } },
    ],
  });
  if (!posts) return { status: 404, data: { message: 'Post does not exist' } };
  return { status: 200, data: posts };
};
const updatedPost = async ({ userId, id, title, content }) => {
  const post = await getPostById(id);
  if (post.data.message) return post;
  if (post.data.user.id !== userId) return { status: 401, data: { message: 'Unauthorized user' } };
  await BlogPost.update({ title, content }, { where: { id } });
  const newPost = await getPostById(id);
  return newPost;
};
const deletePost = async (id, userId) => {
  const post = await getPostById(id);
  if (post.data.message) return post;
  if (post.data.user.id !== userId) return { status: 401, data: { message: 'Unauthorized user' } };
  await BlogPost.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = { createNewPost, getAllPosts, getPostById, updatedPost, deletePost };