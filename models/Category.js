const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        trim: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
