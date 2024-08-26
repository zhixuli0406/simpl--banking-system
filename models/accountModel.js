const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: [0, 'Balance cannot be negative']
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
