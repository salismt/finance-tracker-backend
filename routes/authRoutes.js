const router = require('express').Router();
const passport = require('passport');

// Authenticate with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard'); // Adjust redirect as necessary
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
