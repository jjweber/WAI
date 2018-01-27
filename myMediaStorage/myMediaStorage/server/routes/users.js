const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* Register a user
router.post('/register', function(req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);

  const errors = req.validationErrors();

  if(errors) {
    res.render('/signup', {
      errors: errors
    });
  } else {
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password
    });

    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    })

    req.flash('success_msg', 'You are registered and can now login');
    res.redirect('/login');
  }
});
*/

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user) {
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });

  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });


// Login the user
router.post('/login',
  passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/login'}),
  function(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password }, function(err, user) {
      if(err) {
        console.log(err);
        return res.status(500).send()
      }

      if(!user) {
        return res.status(404).send();
      }
      req.session.user = user;
      return res.json(user);
    });
  }
)

module.exports = router;
