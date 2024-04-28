const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Setup for Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
    }
    if (!await bcrypt.compare(password, user.password)) {
        return done(null, false, { message: 'Invalid credentials' });
    }
    return done(null, user);
}));

// Serialize user into the sessions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
