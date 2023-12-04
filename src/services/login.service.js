const { User } = require('../models');

const validateToken = async ({ email, password }) => {
  const [user] = await User.findAll({ where: { email } });
  if (!user) return { status: 400, data: { message: 'Invalid fields' } };
  if (user.password !== password) return { status: 400, data: { message: 'Invalid fields' } };
  return { status: 200, data: user };
};

module.exports = {
  validateToken,
};