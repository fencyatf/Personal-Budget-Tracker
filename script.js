const incomeForm = document.getElementById("income-form")
const incomeAmount = document.getElementById("income-amount")

const expenseForm = document.getElementById("expense-form")
const expenseAmount = document.getElementById("expense-amount")
const expenseDesc = document.getElementById("expenseDesc")
const expenseCategory = document.getElementById("expense-category")

const displayIncome = document.getElementById("displayIncome")
const balanceElement = document.getElementById("balance")
const expenseTableBody = document.getElementById("expenseTableBody")

let income = 0;
let expenses = []

//Income - EventListener

incomeForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    income = parseInt(incomeAmount.value)
    incomeAmount.value = ""
    displayIncome.textContent = `Income is Rs ${income}`
    updateBalance();
})

//Expense - EventListener

expenseForm.addEventListener("submit",(e) =>{
    e.preventDefault();

    const expense={
        description:expenseDesc.value,
        amount:parseInt(expenseAmount.value),
        category:expenseCategory.value
    }

    expenses.push(expense)
    expenseDesc.value = ""
    expenseAmount.value = ""
    expenseCategory.value = "Food"
    updateExpenseTable()
    updateBalance()
})

// Update the table with new expenses
const updateExpenseTable = () => {
    expenseTableBody.innerHTML = "";
    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.description}</td>
            <td>Rs ${expense.amount}</td>
            <td>${expense.category}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button></td>
        `

        expenseTableBody.appendChild(row);
    })
}

// Delete expense
const deleteExpense = (index) => {
    expenses.splice(index, 1);
    updateExpenseTable();
    updateBalance();
}

//Budget Summary - update

const updateBalance = () =>{
    const totalExpenses = expenses.reduce((sum,expense) => sum+expense.amount,0)
    const balance = income-totalExpenses
    balanceElement.textContent = `Balance is Rs ${balance}`
    
}