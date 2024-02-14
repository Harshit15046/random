const Expense = require('../Models/expenses');

const addExpense = async (req, res) => {
    try {
        const { expenseamount, description, category } = req.body;

        if (expenseamount === undefined || expenseamount.length === 0) {
            return res.status(400).json({ success: false, message: 'Parameter missing' });
        }

        const expense = await Expense.create({ expenseamount, description, category });

        return res.status(201).json({ expense, success: true });
    } catch (err) {
        return res.status(403).json({ success: false, error: err.message });
    }
};

const getExpense = async (req, res) => {
    console.log("getExpense")
    try {
        const expenses = await Expense.findAll();

        return res.status(200).json({ expenses, success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const deleteExpense = async (req, res) => {
    console.log("deleteExpense");
    try {
        const expenseId = req.params.expenseid;

        const deletedRows = await Expense.destroy({
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
};

module.exports = {
    addExpense,
    getExpense,
    deleteExpense,
};
