"use strict";

var card = document.querySelector("#card");
var logoCard = document.getElementById("logo-card");
var numberCard = document.querySelector("#card .number-card");
var nameCard = document.querySelector("#card .name-card");
var mounthExpirationCard = document.querySelector("#card .mounth-expiration-card");
var yearExpirationCard = document.querySelector("#card .year-expiration-card");
var firmCard = document.querySelector("#card .firm-card p");
var ccvCard = document.querySelector("#card .ccv-card");
var btnOpenForm = document.getElementById("btn-open-form-card");
var formCard = document.getElementById("form-card");
var numberCardForm = document.getElementById("number-card-form");
var nameCardForm = document.getElementById("name-card-form");
var selectMounthCardForm = document.getElementById("mounth-expiration-card-form");
var selectYearCardForm = document.getElementById("year-expiration-card-form");
var ccvCardForm = document.getElementById("ccv-card-form");

var showFrontCard = function showFrontCard() {
  if (card.classList.contains("active")) {
    card.classList.remove("active");
  }
};

card.addEventListener("click", function () {
  card.classList.toggle("active");
});
btnOpenForm.addEventListener("click", function () {
  btnOpenForm.classList.toggle("active");
  formCard.classList.toggle("active");
});

for (var i = 1; i <= 12; i++) {
  var option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  selectMounthCardForm.appendChild(option);
}

var currentYear = new Date().getFullYear();

for (var _i = currentYear; _i <= currentYear + 8; _i++) {
  var _option = document.createElement("option");

  _option.value = _i;
  _option.innerText = _i;
  selectYearCardForm.appendChild(_option);
}

numberCardForm.addEventListener("keyup", function (e) {
  var valueNumberCardForm = e.target.value.replace(/\s/g, "").replace(/\D/g, "").replace(/([0-9]{4})/g, "$1 ").trim();
  numberCardForm.value = valueNumberCardForm;
  numberCard.textContent = valueNumberCardForm;

  if (valueNumberCardForm === "") {
    numberCard.textContent = "**** **** **** ****";
    logoCard.innerHTML = "";
  }

  if (valueNumberCardForm[0] === "4") {
    logoCard.innerHTML = "";
    var imgLogo = document.createElement("img");
    imgLogo.src = "https://firebasestorage.googleapis.com/v0/b/fire-fotos-8e3f9.appspot.com/o/img%2Fvisa.png?alt=media&token=d1324d01-81f6-42d4-a37c-1edc19e1e0b1";
    logoCard.appendChild(imgLogo);
  } else if (valueNumberCardForm[0] === "5") {
    logoCard.innerHTML = "";

    var _imgLogo = document.createElement("img");

    _imgLogo.src = "https://firebasestorage.googleapis.com/v0/b/fire-fotos-8e3f9.appspot.com/o/img%2Fmastercard.png?alt=media&token=1a5347d2-a282-436f-87a8-f193458830f4";
    logoCard.appendChild(_imgLogo);
  }

  showFrontCard();
});
nameCardForm.addEventListener("keyup", function (e) {
  var valueNameCardForm = e.target.value.replace(/[0-9]/g, "");
  nameCardForm.value = valueNameCardForm;
  nameCard.textContent = valueNameCardForm;
  firmCard.textContent = valueNameCardForm;

  if (valueNameCardForm === "") {
    nameCard.textContent = "John Doe";
  }

  showFrontCard();
});
selectMounthCardForm.addEventListener("change", function (e) {
  mounthExpirationCard.textContent = e.target.value;
  showFrontCard();
});
selectYearCardForm.addEventListener("change", function (e) {
  yearExpirationCard.textContent = e.target.value.slice(2);
  showFrontCard();
}); // Ccv

ccvCardForm.addEventListener("keyup", function (e) {
  if (!card.classList.contains("active")) {
    card.classList.add("active");
  }

  ccvCardForm.value = ccvCardForm.value // Eliminar espacios en blanco
  .replace(/\s/g, "") // Eliminar todos los caracteres que no sean números del 0 al 9
  .replace(/\D/g, "");
  ccvCard.textContent = ccvCardForm.value;
});