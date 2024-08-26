const Account = require('../models/accountModel');

// Create a new account
exports.createAccount = async (req, res) => {
    try {
        const { name, balance } = req.body;
        const account = new Account({ name, balance });
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(req.body);
    }
};

// Deposit money into an account
exports.deposit = async (req, res) => {
    try {
        const { id, amount } = req.body;
        const account = await Account.findById(id);
        account.balance += amount;
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Withdraw money from an account
exports.withdraw = async (req, res) => {
    try {
        const { id, amount } = req.body;
        const account = await Account.findById(id);
        if (account.balance < amount) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }
        account.balance -= amount;
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Transfer money between accounts
exports.transfer = async (req, res) => {
    const session = await Account.startSession();
    session.startTransaction();
    try {
        const { fromAccountId, toAccountId, amount } = req.body;

        const fromAccount = await Account.findById(fromAccountId).session(session);
        const toAccount = await Account.findById(toAccountId).session(session);

        if (fromAccount.balance < amount) {
            throw new Error('Insufficient funds');
        }

        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await fromAccount.save();
        await toAccount.save();

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ fromAccount, toAccount });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: error.message });
    }
};
