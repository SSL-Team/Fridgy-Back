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
      res.redirect('/auth/api/error');
    }
    if (user) {
      // todo remove password hash
      res.json(user);
    } else {
      res.status(404).json({ msg: 'Professional error message' });
    }
  })(req, res, next);
};

module.exports.logout = function logoutExport(req, res) {
  req.logout();
  res.json({ msg: 'user logged out successfully' });
};

// Change to fix the same problem had with login function
// Also does not belong in auth controllers
// module.exports.profile = function profileExport(req, res) {
//   passport.redirectIfNotLoggedIn('/error'),
//   (req, res) => {
//     res.json({ msg: "This is the profile page for: "+req.user.email });
//   }
// };
