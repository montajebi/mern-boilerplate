const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

exports.signJWT = (userObject) => {
  const { _id: id } = userObject;
  return jwt.sign({ id }, JWT_SECRET);
};

exports.verifyJWT = (token) => jwt.verify(token, JWT_SECRET);
