let transactions = [];

// select dom element
const form = document.getElementById("transaction-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const transactionList = document.getElementById("transaction-list");

const balanceDisplay = document.getElementById("balance-amount");
const incomeDisplay = document.getElementById("income-amount");
const expenseDisplay = document.getElementById("expense-amount");

// add transactions
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = descInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!desc || isNaN(amount)) return;

  const transaction = {
    id: Date.now(),
    desc,
    amount,
    category,
  };

  transactions.push(transaction);
  updateUI();
  form.reset();
});

// Update UI
function updateUI() {
  transactionList.innerHTML = "";
  let income = 0,
    expense = 0;

  transactions.forEach(function (tx) {
    const li = document.createElement("li");
    li.innerHTML = `${tx.desc} => ${tx.amount} ${tx.category}
            <button onclick="deleteTransaction(${tx.id})">✕</button>
        `;

    transactionList.appendChild(li);

    tx.amount >= 0 ? (income += tx.amount) : (expense += Math.abs(tx.amount));
  });

  balanceDisplay.textContent = `${income - expense}`;
  incomeDisplay.textContent = `${income}`;
  expenseDisplay.textContent = `${expense}`;
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter((tx) => tx.id !== id);
  updateUI();
}

//local storage
function saveToStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromStorage() {
  localStorage.getItem("transactions");
  if (data) transactions = JSON.parse(data);
  updateUI();
}

window.addEventListener("load", loadFromStorage);
