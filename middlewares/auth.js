const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

// Weird syntax for models.User might over-ride later
const { User } = models;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
  usernameField: 'email',
},
(email, password, done) => {
  console.log('Need body');
  User.findOne({
    where: { email },
  }).then((user) => {
    console.log({ user });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    if (passwordsMatch(password, user.password_hash) === false) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user, { message: 'Successfully Logged In!' });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
});

passport.redirectIfLoggedIn = route =>
  (req, res, next) => (req.user ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = route =>
  (req, res, next) => (req.user ? next() : res.redirect(route));

module.exports = passport;
