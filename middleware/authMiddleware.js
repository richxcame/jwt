const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, '77ffdfbd03eaa619a7eea683a7598e4a390f849d61ae9892725e30031ac42ac8b90440104e1a2b14beda7b200a3f0cb0e4cf23d00be0ea54f25722e0acb0a86d', (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      } else {
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, '77ffdfbd03eaa619a7eea683a7598e4a390f849d61ae9892725e30031ac42ac8b90440104e1a2b14beda7b200a3f0cb0e4cf23d00be0ea54f25722e0acb0a86d', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id)
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { authMiddleware, checkUser };
