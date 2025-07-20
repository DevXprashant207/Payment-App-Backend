// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid or missing 'amount'" });
    }

    // Fetch sender account
    const senderAccount = await Account.findOne({ userId: req.userId });
    if (!senderAccount || senderAccount.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    // Fetch recipient account
    const recipientAccount = await Account.findOne({ userId: to });
    if (!recipientAccount) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Update balances
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;
