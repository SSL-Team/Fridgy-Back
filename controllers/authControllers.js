const passport = require('../middlewares/auth');
const models = require('../models');
const User = models.User;

module.exports.error = function (req, res) {
  res.sendStatus(401).json({ msg: "authenticaiton error"});
};

module.exports.signup = function (req, res) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password_hash: req.body.password,
  }).then((user) => {
    res.json({ msg: "user created" });
  }).catch(() => {
    res.status(400).json({ msg: "error creating user " + req.body.email });
  });
};


module.exports.login = function (req, res, next) {
  passport.authenticate('local', { failureRedirect: '/api/auth/error' })(req, res, next);
},
  (req, res) => {
    console.log('Next')
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  }


module.exports.logout = function (req, res) {
  req.logout();
  res.json({ msg: "user logged out successfully"});
};


module.exports.profile = function (req, res) {
  passport.redirectIfNotLoggedIn('/error'),
  (req, res) => {
    res.json({ msg: "This is the profile page for: "+req.user.email });
  }
};