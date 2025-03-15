"use strict";

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll(".input");
const amount = document.getElementById("amount-input");
const date = document.getElementById("date-input");
const category = document.getElementById("category-select");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");

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
  const amountValue = amount.value;
  const dateValue = date.value;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${selectedCategory}</td>
    <td>${amountValue}</td>
    <td>${dateValue}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  expensesTableBody.appendChild(tr);
};

expensesTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest("tr").remove();
  }
});

addBtn.addEventListener("click", addTd);
