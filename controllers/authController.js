const googleService = require('../services/auth/googleService');
const userService = require('../services/userService');
const jwtService = require('../services/auth/tokenService');
const asyncHandler = require('express-async-handler');

exports.getGoogleLoginUrl = (req, res) => {
  res.redirect(googleService.getGoogleUrl());
};

exports.handleGoogleAuthCallabck = asyncHandler(async (req, res, next) => {
  const { code } = req.query;
  const googleUser = await googleService.getGoogleAccountFromCode(code);

  const user = await userService.findOrCreateUser(googleUser);
  const jwt = jwtService.signJWT(user);
  const redirectUrl = `${req.protocol}://${req.get('host')}?jwt=${jwt}`;

  res.redirect(redirectUrl);
});
