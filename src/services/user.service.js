const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  if (displayName.length < 8) {
    return { 
      status: 400,
      data:
      { message: '"displayName" length must be at least 8 characters long' } }; 
  }
  if (password.length < 6) {
    return { 
      status: 400,
      data:
        { message: '"password" length must be at least 6 characters long' } }; 
  }
  const user = await User.create({ displayName, email, password, image });
  return { status: 201, data: user };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = {
  createUser,
  getAllUsers,
};