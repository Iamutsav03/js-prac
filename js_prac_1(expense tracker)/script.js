let editingExpenseId = null;

function addExpense(event) {
    event.preventDefault();

    const ul = document.getElementById('expense-list');

    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseCategory = document.getElementById('expenseCategory').value;
    const expenseDescription = document.getElementById('expenseDescription').value;

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (editingExpenseId !== null) {
        // Update the existing expense
        const index = expenses.findIndex(
            expense => expense.id === editingExpenseId
        );

        if (index !== -1) {
            expenses[index].amount = expenseAmount;
            expenses[index].category = expenseCategory;
            expenses[index].description = expenseDescription;
        }

        editingExpenseId = null;
    } else {
        // Add a new expense
        const expense = {
            id: Date.now(),
            amount: expenseAmount,
            category: expenseCategory,
            description: expenseDescription
        };

        expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));

    event.target.reset();
    displayExpenses();
}

// Display all expenses
function displayExpenses() {
    const ul = document.getElementById('expense-list');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    ul.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');

        li.append(
            `Amount: ${expense.amount}, Category: ${expense.category}, Description: ${expense.description} `
        );

        const dltButton = document.createElement('button');
        dltButton.textContent = 'Delete';
        dltButton.className = 'delete-button';

        dltButton.addEventListener('click', () => {
            dltexpense(expense.id);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';

        editButton.addEventListener('click', () => {
            editExpense(expense.id);
        });

        li.append(dltButton, editButton);
        ul.appendChild(li);
    });
}

// Delete an expense
function dltexpense(expenseId) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const updatedExpenses = expenses.filter(
        expense => expense.id !== expenseId
    );

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    displayExpenses();
}

// Load an expense into the form for editing
function editExpense(expenseId) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const expenseToEdit = expenses.find(
        expense => expense.id === expenseId
    );

    if (!expenseToEdit) return;

    document.getElementById('expenseAmount').value = expenseToEdit.amount;
    document.getElementById('expenseCategory').value = expenseToEdit.category;
    document.getElementById('expenseDescription').value = expenseToEdit.description;

    editingExpenseId = expenseId;
}

// Load saved expenses when the page opens
document.addEventListener('DOMContentLoaded', displayExpenses);