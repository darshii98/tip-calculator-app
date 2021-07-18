"use strict";

//Selection of elements
const billAmt = document.querySelector("#billamount");
const numPeople = document.querySelector("#numpeople");

const btnTip = document.querySelectorAll(".btn-tip");
const btn5 = document.querySelector(".btn-5");
const btn10 = document.querySelector(".btn-10");
const btn15 = document.querySelector(".btn-15");
const btn25 = document.querySelector(".btn-25");
const btn50 = document.querySelector(".btn-50");

const customTip = document.querySelector("#customtip");

const errMsg = document.querySelector(".error-msg");

const perPersonVal = document.querySelector(".per-person-value");
const totalVal = document.querySelector(".total-value");

const btnReset = document.querySelector(".btn-reset");

//helper functions//

//function to reset buttons
const resetBtn = function () {
  btnTip.forEach((btn) => {
    btn.classList.remove("btn--active");
  });
};

const errorNumPeople = function () {
  if (!errMsg.classList.contains("hidden")) {
    errMsg.classList.add("hidden");
  }
  if (numPeople.classList.contains("border-error")) {
    numPeople.classList.remove("border-error");
  }
};

//function to reset all values
const resetAll = function () {
  billAmt.value = "";
  numPeople.value = "";
  perPersonVal.textContent = "$0.00";
  totalVal.textContent = "$0.00";
  customTip.value = "";

  errorNumPeople();
  resetBtn();
};

//function to calculate tip and display
const tipCalcDisplay = function (e, tip) {
  resetBtn();

  const people = +numPeople.value;
  const billAmount = +billAmt.value;

  if (people <= 0) {
    errMsg.classList.remove("hidden");
    numPeople.classList.add("border-error");

    return;
  }

  const tipAbs = (this / 100) * billAmount;
  const tipPerPerson = tipAbs / people;
  const billPerPerson = (billAmount + tipAbs) / people;

  perPersonVal.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalVal.textContent = `$${billPerPerson.toFixed(2)}`;

  errorNumPeople();
  e.currentTarget.classList.add("btn--active");
};

//Event Listeners
//event listeners for all tips
btn5.addEventListener("click", tipCalcDisplay.bind(5));
btn10.addEventListener("click", tipCalcDisplay.bind(10));
btn15.addEventListener("click", tipCalcDisplay.bind(15));
btn25.addEventListener("click", tipCalcDisplay.bind(25));
btn50.addEventListener("click", tipCalcDisplay.bind(50));

//event listener for cutom value tip
document.addEventListener("keydown", function (e) {
  resetBtn();
  if (e.key === "Enter" && customTip.value !== "" && customTip.value >= 0) {
    const tip = +customTip.value;

    const people = +numPeople.value;
    const billAmount = +billAmt.value;

    if (people <= 0) {
      errMsg.classList.remove("hidden");
      numPeople.classList.add("border-error");

      return;
    }

    const tipAbs = (tip / 100) * billAmount;
    const tipPerPerson = tipAbs / people;
    const billPerPerson = (billAmount + tipAbs) / people;

    perPersonVal.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalVal.textContent = `$${billPerPerson.toFixed(2)}`;

    errorNumPeople();
  }
});

//event listener for reset button
btnReset.addEventListener("click", resetAll);
