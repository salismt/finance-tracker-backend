const mongoose = require('mongoose');
const {getAmount} = require("./numberHelper");

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: function(v) {
                return v.toString().match(/^\d+(\.\d{1,2})?$/);
            },
            message: props => `${props.value} is not a valid 2 decimal digit number!`
        },
        get: getAmount
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['income', 'expense']
    },
    user_id: { type: 'ObjectId', ref: 'User' }
}, {
    toJSON: { getters: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
