const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const passport = require('passport');
const session = require('express-session');
require('./config/passportSetup'); // Ensure Passport is configured
const isAuthenticated = require('./middlewares/authenticate');

const authRoutes = require('./routes/authRoutes'); // Define authRoutes
const pingRoutes = require('./routes/pingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')

const app = express();
app.use(express.json());
app.use(cors());

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

// Apply the authentication middleware to all routes except auth routes
app.use('/api', isAuthenticated); // Protects all routes under '/api'
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);
app.use('/ping', pingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
