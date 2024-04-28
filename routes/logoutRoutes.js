const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Successfully logged out' });
});
