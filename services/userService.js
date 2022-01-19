const User = require('../models/User');
const { NotFound } = require('../utils/errorUtils');

exports.findOrCreateUser = async (userObject) => {
  const user = await User.findOne({ email: userObject.email });

  let newUser;
  if (!user) {
    newUser = await User.create(userObject);
  }

  return user || newUser;
};

exports._findUserById = async (userId) => {
  const user = await User.findById(userId);

  return user;
};

exports.findUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new NotFound('There is no user with that id.');

  return user;
};
