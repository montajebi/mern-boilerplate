const { Forbidden } = require('../utils/errorUtils');

module.exports = (role) => (req, _, next) => {
  const currentUser = req.user;

  if (currentUser.role.toLocaleLowerCase() !== role.toLocaleLowerCase()) {
    return next(new Forbidden('ACCESS_DENIED_ERR'));
  }

  return next();
};
