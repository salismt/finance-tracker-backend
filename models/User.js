const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    googleId: String,
    email: { type: String, unique: true },
    name: String,
    password: String,
});

// Pre-save hook to hash password
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
