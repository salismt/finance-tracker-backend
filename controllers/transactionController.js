const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const transactionData = await Transaction.find();
        res.json({
            transactions: transactionData
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTransactionsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const transactionData = await Transaction.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        res.json({
            transactions: transactionData
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTotalExpenseAndIncome = async (req, res) => {
    try {
        const expenses = await Transaction.aggregate([
            { $match: { type: 'expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const incomes = await Transaction.aggregate([
            { $match: { type: 'income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            total_expense: expenses[0] ? expenses[0].total : 0,
            total_income: incomes[0] ? incomes[0].total : 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCurrentBalance = async (req, res) => {
    try {
        const expenses = await Transaction.aggregate([
            { $match: { type: 'expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const incomes = await Transaction.aggregate([
            { $match: { type: 'income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const totalExpenses = expenses[0] ? parseFloat(expenses[0].total.toString()) : 0;
        const totalIncomes = incomes[0] ? parseFloat(incomes[0].total.toString()) : 0;

        const currentBalance = totalIncomes - totalExpenses;

        res.json({ current_balance: currentBalance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addTransaction = async (req, res) => {
    const transaction = new Transaction({
        name: req.body.name,
        category: req.body.category,
        date: req.body.date,
        currency: req.body.currency,
        amount: req.body.amount,
        type: req.body.type
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
