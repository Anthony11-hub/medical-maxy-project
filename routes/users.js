const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// user Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Login Page
router.get('/admin', forwardAuthenticated, (req, res) => res.render('admin'));

// Register Page
router.get('/view-admin',ensureAuthenticated,(req, res) => res.render('view-admin'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register Page
router.get('/set-pricing',ensureAuthenticated, (req, res) => res.render('set-pricing'));

router.get('/doctor',ensureAuthenticated, (req, res) => res.render('doctor'));

// router.get('/add-doctor',ensureAuthenticated, (req, res) => res.render('add-doctor'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/admin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



router.post('/add-doctor', (req, res) => {
  const { name, email, password, password2} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('add-doctor', {
      errors,
      name,
      email,
      password,
      password2

    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('add-doctor', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/doctor');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


// admin
router.post('/admin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin-dash',
    failureRedirect: '/users/admin',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout (function(err){
    if(err){
      throw err;
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  })
});


// admin Logout
router.get('/admin-logout', (req, res) => {
  req.logout (function(err){
    if(err){
      throw err;
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/admin');
  })
});


module.exports = router;
