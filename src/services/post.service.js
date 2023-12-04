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

module.exports = {
  createNewPost,
  getAllPosts,
};