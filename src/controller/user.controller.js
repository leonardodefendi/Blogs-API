const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;

const createUser = async (req, res) => {
  const { status, data } = await userService.createUser(req.body);
  if (data.message) return res.status(status).json(data);
  const payload = {
    id: data.id,
    email: data.email,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
  return res.status(201).json({ token });
};

const findAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers();
  return res.status(200).json(allUsers);
};

module.exports = {
  createUser,
  findAllUsers,
};