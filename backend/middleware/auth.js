const jwt = require('jsonwebtoken');
const config = require('config');
const { ErrorHandler } = require("../responseHandler");

const GeneralUserAuth = (req,res,next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json(ErrorHandler('No token present, Authorization Denied'));
  }

  const decoded = jwt.verify(token, config.get('jwtSecret'));
  req.user = decoded.user;
  next();

};

const AdminOnlyAuth = (req,res,next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json(ErrorHandler('No token present, Authorization Denied'));
  }
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  if (!decoded && decoded.user.Role !== 1) return res.status(401).json(ErrorHandler('Unauthorized access'));
  req.user = decoded.user;
  next();
}

module.exports = {
  GeneralUserAuth, AdminOnlyAuth
}