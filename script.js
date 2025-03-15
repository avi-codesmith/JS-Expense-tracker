"use strict";

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll(".input");

inputs.forEach((input, index) => {
  input.addEventListener("focus", () => {
    if (labels[index]) {
      labels[index].style.top = "22%";
      labels[index].style.color = "royalblue";
    }
  });
});
