const mongoose = require('mongoose');

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
        required: true,
        validate: {
            validator: function(v) {
                return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(v);
            },
            message: props => `${props.value} is not a valid RFC 3339 date!`
        }
    },
    currency: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[A-Z]{3}$/.test(v);
            },
            message: props => `${props.value} is not a valid ISO 4217 currency code!`
        }
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: function(v) {
                return v.toString().match(/^\d+(\.\d{1,2})?$/);
            },
            message: props => `${props.value} is not a valid 2 decimal digit number!`
        }
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['income', 'expense']
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
