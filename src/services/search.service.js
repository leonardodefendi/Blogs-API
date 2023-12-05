const Sequelize = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const searchPostParam = async (param) => {
  const query = `%${param}%`;
  const posts = await BlogPost.findAll({
    where: { [Sequelize.Op.or]: 
      [{ title: { [Sequelize.Op.like]: query } }, { content: { [Sequelize.Op.like]: query } }] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, { model: Category,
      as: 'categories',
      through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  searchPostParam,
};