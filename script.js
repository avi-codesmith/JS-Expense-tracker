"use strict";

const labels = document.querySelectorAll("label");
const logo = document.querySelector("h1");
const l1 = document.querySelector(".label1");
const l2 = document.querySelector(".label2");
const l3 = document.querySelector(".label3");
const inputs = document.querySelectorAll(".input");
const amount = document.getElementById("amount-input");
const date = document.getElementById("date-input");
const category = document.getElementById("category-select");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalCol = document.getElementById("total-amount");
const sound = new Audio("errorSound.mp3");
let totalAmount = 0;

const reload = () => {
  location.reload();
};

inputs.forEach((input, index) => {
  input.addEventListener("focus", () => {
    if (labels[index]) {
      labels[index].style.top = "22%";
      labels[index].style.color = "royalblue";
    }
  });
});

category.addEventListener("input", () => {
  category.value = category.value.replace(/[^A-Za-z]/g, "");
});

const addTd = () => {
  const selectedCategory = category.value;
  const amountValue = Number(amount.value);
  const dateValue = date.value;

  if (!selectedCategory && !dateValue && !amountValue) {
    inputs.forEach((input) => {
      sound.play();
      input.classList.add("move");
      labels.forEach((label) => {
        label.style.color = "red";
      });
      setTimeout(() => {
        input.classList.remove("move");
        labels.forEach((label) => {
          label.style.color = "#555";
        });
      }, 200);
    });
    return;
  } else if (!amountValue && !selectedCategory) {
    sound.play();
    amount.classList.add("move");
    category.classList.add("move");
    l2.style.color = "red";
    l1.style.color = "red";
    setTimeout(() => {
      amount.classList.remove("move");
      category.classList.remove("move");
      l2.style.color = "#555";
      l1.style.color = "#555";
    }, 200);
    return;
  } else if (!selectedCategory && !dateValue) {
    sound.play();
    category.classList.add("move");
    date.classList.add("move");
    l1.style.color = "red";
    l3.style.color = "red";
    setTimeout(() => {
      category.classList.remove("move");
      date.classList.remove("move");
      l1.style.color = "#555";
      l3.style.color = "#555";
    }, 200);
    return;
  } else if (!amountValue && !dateValue) {
    sound.play();
    date.classList.add("move");
    amount.classList.add("move");
    l2.style.color = "red";
    l3.style.color = "red";
    setTimeout(() => {
      date.classList.remove("move");
      amount.classList.remove("move");
      l2.style.color = "#555";
      l3.style.color = "#555";
    }, 200);
    return;
  } else if (!amountValue) {
    sound.play();
    amount.classList.add("move");
    l2.style.color = "red";
    setTimeout(() => {
      amount.classList.remove("move");
      l2.style.color = "#555";
    }, 200);
    return;
  } else if (!dateValue) {
    sound.play();
    date.classList.add("move");
    l3.style.color = "red";
    setTimeout(() => {
      date.classList.remove("move");
      l3.style.color = "#555";
    }, 200);
    return;
  } else if (!selectedCategory) {
    sound.play();
    category.classList.add("move");
    l1.style.color = "red";
    setTimeout(() => {
      category.classList.remove("move");
      l1.style.color = "#555";
    }, 200);
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

logo.addEventListener("click", reload);
