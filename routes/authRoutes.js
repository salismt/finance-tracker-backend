const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const generateToken = user => {
    return jwt.sign({
        id: user.id,
        email: user.emails[0].value,
        name: user.displayName
    }, process.env.JWT_SECRET, { expiresIn: '48h' });  // 'your_secret_key' should be replaced with a real secret key
};

// Authenticate with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    // Generate a token
    const token = generateToken(req.user);

    // Send the token to the client
    res.json({
        success: true,
        token: token,
        user: {
            id: req.user.id,
            name: req.user.displayName,
            email: req.user.emails[0].value
        }
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Successfully logged out' });
});

module.exports = router;
