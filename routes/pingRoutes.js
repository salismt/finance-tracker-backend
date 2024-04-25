const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
        try {
            res.json({success: true});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

module.exports = router;
