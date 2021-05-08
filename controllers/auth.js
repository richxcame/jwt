const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'That email is already registered!'
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, '77ffdfbd03eaa619a7eea683a7598e4a390f849d61ae9892725e30031ac42ac8b90440104e1a2b14beda7b200a3f0cb0e4cf23d00be0ea54f25722e0acb0a86d', { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('user logged in');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await  User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000 });
    res.status(201).json({ "user": user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

};

module.exports.login_post = async (req, res) => {
  console.log(req.body);
  res.send('user logged in');
};
