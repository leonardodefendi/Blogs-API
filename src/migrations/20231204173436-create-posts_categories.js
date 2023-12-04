'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts_categories', {
      post_id: { type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          key: 'id',
          model: 'blog_posts',
        },
        onDelete: 'CASCADE',
      },
      category_id: { type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('posts_categories');
  }
};
