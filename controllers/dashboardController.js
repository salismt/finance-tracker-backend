const Transaction = require("../models/Transaction");
const Category = require("../models/Category");
const {ObjectId} = require("mongodb");
exports.getDashboard = async (req, res) => {
    try {
        const userId = new ObjectId(req.user.id);
        const expenses = await Transaction.aggregate([{$match: { user_id: userId, type: 'expense'}}, {
            $group: {
                _id: null,
                total: {$sum: '$amount'}
            }
        }]);

        const incomes = await Transaction.aggregate([{$match: { user_id: userId, type: 'income'}}, {
            $group: {
                _id: null,
                total: {$sum: '$amount'}
            }
        }]);

        const totalExpenses = expenses[0] ? parseFloat(expenses[0].total.toString()) : 0;
        const totalIncomes = incomes[0] ? parseFloat(incomes[0].total.toString()) : 0;

        const currentBalance = totalIncomes - totalExpenses;
        const transactionData = await Transaction.find({
            user_id: userId
        });
        const categories = await Category.find();

        res.json({
            current_balance: currentBalance.toString(),
            total_expense: totalExpenses.toString(),
            total_income: totalIncomes.toString(),
            categories: categories,
            transactions: transactionData
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
