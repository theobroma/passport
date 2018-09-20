import passport from 'passport';

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// process the signup form
router.post(
  '/signup',
  passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
  }
);

module.exports = router;
