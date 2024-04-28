const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name
    }, process.env.JWT_SECRET, { expiresIn: '48h' });  // 'your_secret_key' should be replaced with a real secret key
};

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering new user" });
    }
});

// Login Route for Local Strategy
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Login failed' });
    }

    const token = generateToken(req.user);
    res.json({
        success: true,
        token: token,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Successfully logged out' });
});

module.exports = router;
