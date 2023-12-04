const { Category } = require('../models');

const validateCategories = async (req, res, next) => {
  const { categoryIds, content, title } = req.body;
  if (!categoryIds) return res.status(400).json({ message: 'Some required fields are missing' });
  if (!content || !title) {
    return res
      .status(400).json({ message: 'Some required fields are missing' }); 
  }
 
  next();
};
const verifyCategoryExist = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll();
  const exists = categoryIds.filter((id) => {
    const find = categories.some((category) => Number(category.id) === Number(id));
    return find;
  });
  if (exists.length !== categoryIds.length || categoryIds.length === 0) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

module.exports = {
  validateCategories,
  verifyCategoryExist,
};