const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const extractToken = (baererToken) => baererToken.split(' ')[1];

const authToken = (req, res, next) => {
  const baererToken = req.header('Authorization');
  if (!baererToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = extractToken(baererToken);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { authToken };