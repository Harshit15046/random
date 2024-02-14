const express = require('express');

const expenseControllers = require('../controllers/expense');
const Expenses = require('../Models/expenses');
const router = express.Router();

// router.post('/addExpense', expenseControllers.addExpense);
router.post('/addExpense', async function (req, res, next) {
    console.log("addExpense",req.body);
    try {
        const expenseamount = req.body.expenseamount;
        const description =req.body.expenseamount;
        const category=req.body.category;
        // const { expenseamount, description, category } = req.body;

        if (expenseamount === undefined || expenseamount.length === 0) {
            return res.status(400).json({ success: false, message: 'Parameter missing' });
        }

        const expense = await Expenses.create({ expenseamount, description, category });

        return res.status(201).json({ expense, success: true });
    } catch (err) {
        return res.status(403).json({ success: false, error: err.message });
    }
});
router.get('/getExpense', async function (req, res, next) {
    console.log("getExpense")
    try {
        const expenses = await Expenses.findAll({});

        return res.status(200).json({ expenses, success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});
router.delete('/deleteExpense/:expenseid', async function (req, res, next) {
    try {
        const expenseId = req.params.expenseid;

        const deletedRows = await Expenses.destroy({
            where: { id: expenseId }
        });

        if (deletedRows > 0) {
            return res.status(200).json({ success: true, message: 'Expense deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;