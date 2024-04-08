const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const financeRoutes = require('./routes/financeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const passport = require('passport');
const session = require('express-session');
require('./config/passportSetup'); // Ensure Passport is configured

const authRoutes = require('./routes/authRoutes'); // Define authRoutes

const app = express();
app.use(express.json());

// Express session
app.use(
    session({
        secret: 'secret', // Replace 'secret' with a real secret in production
        resave: false,
        saveUninitialized: false
    })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use('/api', financeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
