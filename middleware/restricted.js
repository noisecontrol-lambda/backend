const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(412).json({ message: 'Request must include Authorization header' });
  }
  next();
};