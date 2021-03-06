// import passport from 'passport';

const router = require('express').Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', authHelpers.loginRedirect, (req, res, next) => authHelpers
    .createUser(req, res)
    .then((response) => {
      passport.authenticate('local', (err, user, info) => {
        if (user) {
          handleResponse(res, 200, 'success');
        }
      })(req, res, next);
    })
    .catch((err) => {
      handleResponse(res, 500, 'error');
    }));

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      handleResponse(res, 500, 'error');
    }
    if (!user) {
      handleResponse(res, 404, 'User not found');
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          handleResponse(res, 500, 'error');
        }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

// process the signup form
router.post(
  '/signup',
  passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);
router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);
// *** helpers *** //
function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
