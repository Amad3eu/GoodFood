const card = document.querySelector("#card");
const logoCard = document.getElementById("logo-card");
const numberCard = document.querySelector("#card .number-card");
const nameCard = document.querySelector("#card .name-card");
const mounthExpirationCard = document.querySelector(
  "#card .mounth-expiration-card"
);
const yearExpirationCard = document.querySelector(
  "#card .year-expiration-card"
);
const firmCard = document.querySelector("#card .firm-card p");
const ccvCard = document.querySelector("#card .ccv-card");

const btnOpenForm = document.getElementById("btn-open-form-card");
const formCard = document.getElementById("form-card");
const numberCardForm = document.getElementById("number-card-form");
const nameCardForm = document.getElementById("name-card-form");
const selectMounthCardForm = document.getElementById(
  "mounth-expiration-card-form"
);
const selectYearCardForm = document.getElementById("year-expiration-card-form");
const ccvCardForm = document.getElementById("ccv-card-form");

const showFrontCard = () => {
  if (card.classList.contains("active")) {
    card.classList.remove("active");
  }
};

card.addEventListener("click", () => {
  card.classList.toggle("active");
});

btnOpenForm.addEventListener("click", () => {
  btnOpenForm.classList.toggle("active");
  formCard.classList.toggle("active");
});

for (let i = 1; i <= 12; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  selectMounthCardForm.appendChild(option);
}

let currentYear = new Date().getFullYear();

for (let i = currentYear; i <= currentYear + 8; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  selectYearCardForm.appendChild(option);
}

numberCardForm.addEventListener("keyup", (e) => {
  let valueNumberCardForm = e.target.value

    .replace(/\s/g, "")

    .replace(/\D/g, "")

    .replace(/([0-9]{4})/g, "$1 ")
    .trim();
  numberCardForm.value = valueNumberCardForm;

  numberCard.textContent = valueNumberCardForm;

  if (valueNumberCardForm === "") {
    numberCard.textContent = "**** **** **** ****";
    logoCard.innerHTML = "";
  }

  if (valueNumberCardForm[0] === "4") {
    logoCard.innerHTML = "";
    let imgLogo = document.createElement("img");
    imgLogo.src =
      "https://firebasestorage.googleapis.com/v0/b/fire-fotos-8e3f9.appspot.com/o/img%2Fvisa.png?alt=media&token=d1324d01-81f6-42d4-a37c-1edc19e1e0b1";
    logoCard.appendChild(imgLogo);
  } else if (valueNumberCardForm[0] === "5") {
    logoCard.innerHTML = "";
    let imgLogo = document.createElement("img");
    imgLogo.src =
      "https://firebasestorage.googleapis.com/v0/b/fire-fotos-8e3f9.appspot.com/o/img%2Fmastercard.png?alt=media&token=1a5347d2-a282-436f-87a8-f193458830f4";
    logoCard.appendChild(imgLogo);
  }

  showFrontCard();
});

nameCardForm.addEventListener("keyup", (e) => {
  let valueNameCardForm = e.target.value.replace(/[0-9]/g, "");

  nameCardForm.value = valueNameCardForm;
  nameCard.textContent = valueNameCardForm;
  firmCard.textContent = valueNameCardForm;

  if (valueNameCardForm === "") {
    nameCard.textContent = "John Doe";
  }

  showFrontCard();
});

selectMounthCardForm.addEventListener("change", (e) => {
  mounthExpirationCard.textContent = e.target.value;
  showFrontCard();
});

selectYearCardForm.addEventListener("change", (e) => {
  yearExpirationCard.textContent = e.target.value.slice(2);
  showFrontCard();
});

// Ccv
ccvCardForm.addEventListener("keyup", (e) => {
  if (!card.classList.contains("active")) {
    card.classList.add("active");
  }

  ccvCardForm.value = ccvCardForm.value
    // Eliminar espacios en blanco
    .replace(/\s/g, "")
    // Eliminar todos los caracteres que no sean números del 0 al 9
    .replace(/\D/g, "");

  ccvCard.textContent = ccvCardForm.value;
});
