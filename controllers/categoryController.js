const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const categoryData = await Category.find();
        res.json({categories: categoryData});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.addCategory = async (req, res) => {
    const category = new Category({
        key: req.body.key
    });

    try {
        const newCategory = await category.save();
        res.status(201).json({success: true, category: newCategory});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};
