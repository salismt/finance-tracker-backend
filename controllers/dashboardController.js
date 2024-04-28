const Transaction = require("../models/Transaction");
const Category = require("../models/Category");
exports.getDashboard = async (req, res) => {
    try {
        const expenses = await Transaction.aggregate([{$match: {type: 'expense'}}, {
            $group: {
                _id: null,
                total: {$sum: '$amount'}
            }
        }]);

        const incomes = await Transaction.aggregate([{$match: {type: 'income'}}, {
            $group: {
                _id: null,
                total: {$sum: '$amount'}
            }
        }]);

        const totalExpenses = expenses[0] ? parseFloat(expenses[0].total.toString()) : 0;
        const totalIncomes = incomes[0] ? parseFloat(incomes[0].total.toString()) : 0;

        const currentBalance = totalIncomes - totalExpenses;
        const transactionData = await Transaction.find();
        const categories = await Category.find();

        res.json({
            current_balance: currentBalance,
            total_expense: totalExpenses,
            total_income: totalIncomes,
            balance_history: [{
                "date": "2024-01-15T00:00:00+00:00", "balance": 7000
            }, {
                "date": "2024-01-16T00:00:00+00:00", "balance": 8000
            }],
            categories: categories,
            statements: transactionData
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}