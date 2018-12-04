const passport = require('../middlewares/auth');
const models = require('../models');

const { User } = models;

module.exports.error = function errorExport(req, res) {
  res.sendStatus(401).json({ msg: 'authenticaiton error' });
};

module.exports.signup = function signupExport(req, res) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password_hash: req.body.password,
  }).then(() => {
    res.json({
      msg: 'user created',
      user: req.body.username,
      email: req.body.email,
    });
  }).catch(() => {
    res.status(400).json({ msg: `error creating user ${req.body.email}` });
  });
};

module.exports.login = function loginExport(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.redirect('/auth/api/error');
    }
    if (user) {
      req.logIn(user, (error) => {
        if (!error) {
          return res.json({
            msg: 'User logged in successfully!',
            email: user.email,
            username: user.username,
            firstName: user.firstName,
          });
        }
      });
    } else {
      return res.redirect('/api/auth/error');
    }
  })(req, res, next);
};

module.exports.logout = function logoutExport(req, res) {
  req.logout();
  res.json({ msg: 'user logged out successfully' });
};
