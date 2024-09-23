const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token and get the user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID (decoded.user.id should exist)
    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user to the req object
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token, authorization denied' });
  }
};

module.exports = authMiddleware;
