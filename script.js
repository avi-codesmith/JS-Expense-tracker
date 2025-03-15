"use strict";

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll(".input");
const amount = document.getElementById("amount-input");
const date = document.getElementById("date-input");
const category = document.getElementById("category-select");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalCol = document.getElementById("total-amount");
let totalAmount = 0;

inputs.forEach((input, index) => {
  input.addEventListener("focus", () => {
    if (labels[index]) {
      labels[index].style.top = "22%";
      labels[index].style.color = "royalblue";
    }
  });
});

const addTd = () => {
  const selectedCategory = category.value;
  const amountValue = Number(amount.value);
  const dateValue = date.value;

  if (!amountValue) {
    alert("Please Enter Amount!");
    return;
  }
  if (!dateValue) {
    alert("Please Enter or Select Date!");
    return;
  }
  if (!selectedCategory) {
    alert("Please Select Category!");
    return;
  }

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${selectedCategory}</td>
    <td>${amountValue}</td>
    <td>${dateValue}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  expensesTableBody.appendChild(tr);

  totalAmount += amountValue;
  totalCol.textContent = totalAmount;

  amount.value = "";
  date.value = "";
  category.value = "";
};

expensesTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.closest("tr");
    const amountValue = Number(row.children[1].textContent);
    row.remove();
    totalAmount -= amountValue;
    totalCol.textContent = totalAmount;
  }
});

addBtn.addEventListener("click", addTd);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTd();
    addBtn.classList.add("active");
    setTimeout(() => {
      addBtn.classList.remove("active");
    });
  }
});
