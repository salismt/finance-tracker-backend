const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    getTransactionsByDate,
    getTotalExpenseAndIncome,
    getCurrentBalance
} = require('../controllers/transactionController');

router.get('/', getTransactions);
router.get('/by-date', getTransactionsByDate);
router.get('/totals', getTotalExpenseAndIncome);
router.get('/balance', getCurrentBalance);
router.post('/', addTransaction);

module.exports = router;
