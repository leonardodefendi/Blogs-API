const { User } = require('../models');

const validateUserFields = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(email);
  if (!emailValid) return res.status(400).json({ message: '"email" must be a valid email' }); 
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(409).json({ message: 'User already registered' });
  next();
};

module.exports = { validateUserFields };