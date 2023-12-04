const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.createCategory(name);
  return res.status(status).json(data);
};

const findAllCategories = async (req, res) => {
  const { status, data } = await categoryService.getAllCategories();
  return res.status(status).json(data);
};

module.exports = {
  createCategory,
  findAllCategories,
};