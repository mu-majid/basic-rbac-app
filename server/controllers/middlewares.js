const roles = require('../roles');

exports.accessGranted = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: 'You Don\'t have enough permission to perform this action to resource.'
        });
      }
      next()
    }
    catch (error) {
      next(error);
    }
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user) {
      return res.status(401).json({
        error: 'You need to be logged in to access this route'
      });
    }
    res.user = user;
    next();
  }
  catch (error) {
    next(error);
  }
}