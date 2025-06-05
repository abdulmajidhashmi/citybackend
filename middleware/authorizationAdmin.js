const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const authorizationAdmin = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided in cookies' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    // Find user by number (assuming decoded has `number`)
    const adminData = await userModel.findOne({ number: decoded.phone });

    if (!adminData) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (adminData.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: admin role required' });
    }
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
  }
};

module.exports = authorizationAdmin;
