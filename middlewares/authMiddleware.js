const jwtService = require('../services/auth/tokenService');
const userService = require('../services/userService');
const { Unauthorized } = require('../utils/errorUtils');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new Unauthorized(
      'You are not logged in! Please log in to get access.'
    );
  }

  const decoded = jwtService.verifyJWT(token);

  const currentUser = await userService._findUserById(decoded.id);

  if (!currentUser) {
    throw new Unauthorized(
      'The user belonging to this token does no longer exist.'
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
