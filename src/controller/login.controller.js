const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const { JWT_SECRET } = process.env;

const validateLogin = async (req, res) => {
  const { status, data } = await loginService.validateToken(req.body);
  if (data.message) return res.status(status).json(data);
  const payload = {
    id: data.id,
    email: data.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
  return res.status(200).json({ token });
};

module.exports = {
  validateLogin,
};