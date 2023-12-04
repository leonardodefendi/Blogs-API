module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },{
    timestamps: false,
    tableName: 'categories',
  });
  Category.associate = (models) => {
    Category.hasMany = (models.PostCategory, {
      foreignKey: 'categoryId',
      as: 'category',
    })
  };
  return Category;
};