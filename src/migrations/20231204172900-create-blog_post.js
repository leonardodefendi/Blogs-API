'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('blog_posts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.STRING, allowNull: false },
      user_id: { type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      published: { type: Sequelize.DATE, onUpdate: new Date() },
      updated: { 
        type: Sequelize.DATE, onUpdate: new Date() },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('blog_posts');
  }
};
