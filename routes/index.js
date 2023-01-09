const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// admin routes
router.get('/admin-dash', ensureAuthenticated, (req, res) =>
  res.render('admin-dash', {
    user: req.user
  })
);

module.exports = router;
