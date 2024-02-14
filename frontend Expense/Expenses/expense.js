async function addNewExpense(e) {
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value, 
        category: e.target.category.value
    };

    console.log(expenseDetails);

    try {
        const response = await axios.post('http://localhost:3000/expense/addExpense', expenseDetails);

        if (response.status === 201) {
            addNewExpensetoUI(response.data.expense);
        } else {
            throw new Error('Failed To create new expense');
        }
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/expense/getExpense');

        response.data.expenses.forEach(expense => {
            addNewExpensetoUI(expense);
        });
    } catch (err) {
        console.log(err);
    }
});

function addNewExpensetoUI(expense) {
    const parentElement = document.getElementById('listOfExpenses');
    const expenseEleId = `expense-${expense.id}`;

    // Use createElement to create a new li element
    const listItem = document.createElement('li');

    // Set the id attribute of the li element
    listItem.id = expenseEleId;

    // Populate the li element with expense details
    listItem.innerHTML = `
        <p><strong>Amount:</strong> ${expense.expenseamount}</p>
        <p><strong>Category:</strong> ${expense.category}</p>
        <p><strong>Description:</strong> ${expense.description}</p>
        <button onclick='deleteExpense(event, ${expense.id})'>Delete Expense</button>
    `;

    // Append the li element to the parent element
    parentElement.appendChild(listItem);
}

// Assuming you have a deleteExpense function defined elsewhere in your code
async function deleteExpense(event, expenseId) {
    try {
        const response = await axios.delete(`http://localhost:3000/expense/deleteExpense/${expenseId}`);
        console.log(response);

        if (response.status === 200) {
            // Assuming you want to remove the deleted expense from the UI
            removeExpenseFromUI(expenseId);
        } else {
            throw new Error('Failed to delete expense');
        }
    } catch (err) {
        console.log(err);
    }
}

function removeExpenseFromUI(expenseId) {
    const expenseElement = document.getElementById(`expense-${expenseId}`);
    
    if (expenseElement) {
        expenseElement.remove();
    }
}

