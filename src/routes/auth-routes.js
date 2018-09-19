import passport from 'passport';

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

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
