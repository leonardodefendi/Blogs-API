const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) return { status: 400, data: { message: '"name" is required' } };
  const newCategory = await Category.create({ name });
  return { status: 201, data: newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 200, data: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};