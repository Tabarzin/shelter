import petsData from "../../pets.json" assert { type: "json" };
import { showPetModal } from "../script.js";

console.log(petsData.length, "petsData");

// PETS GENERATOR //

// const modal = document.getElementById("modal");
// const modalContent = document.getElementById("modal-content");

const cardsContainer = document.querySelector(".pets-cards-container");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

const lastPageButton = document.querySelectorAll(
  ".button-arrow-interactive"
)[1];
const firstPageButton = document.querySelector(".button_paginator");

const leftArrows = document.querySelectorAll(".pets-left-arrow");

const currentPageIndicator = document.querySelector(".button_paginator");

let currentPage = 1;
let cardsPerPage = calculateCardsPerPage();
const totalPages = Math.ceil(petsData.length / cardsPerPage);

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("slider-card");

  const cardImage = document.createElement("div");
  cardImage.classList.add("slider-card", "slider-card-image");
  const image = document.createElement("img");
  image.src = data.img;
  image.alt = data.name;
  cardImage.appendChild(image);

  const petTitle = document.createElement("span");
  petTitle.classList.add("slider-pet-title");
  petTitle.textContent = data.name;

  const learnMoreButton = document.createElement("button");
  learnMoreButton.classList.add("button_secondary");
  const learnMoreSpan = document.createElement("span");
  learnMoreSpan.classList.add("learn-more");
  learnMoreSpan.textContent = "Learn more";
  learnMoreButton.appendChild(learnMoreSpan);

  card.appendChild(cardImage);
  card.appendChild(petTitle);
  card.appendChild(learnMoreButton);

  card.addEventListener("click", () => {
    showPetModal(data);
  });

  return card;
}

function calculateCardsPerPage() {
  const screenWidth = window.innerWidth;
  if (1280 <= screenWidth) {
    return 8;
  } else if (768 <= screenWidth && screenWidth < 1280) {
    return 6;
  } else {
    return 3;
  }
}

// function updateCards() {
//   cardsContainer.innerHTML = "";
//   for (let i = 0; i < cardsPerPage; i++) {
//     const card = createCard(petsData[i]);

//     cardsContainer.appendChild(card);
//   }
// }

function updateCards(page) {
  cardsContainer.innerHTML = "";
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  for (let i = startIndex; i < endIndex && i < petsData.length; i++) {
    const card = createCard(petsData[i]);
    cardsContainer.appendChild(card);
  }
}

// Initial update
updateCards();

// Responsive behavior
window.addEventListener("resize", () => {
  cardsPerPage = calculateCardsPerPage();
  updateCards();
});

function updateButtonStyles() {
  if (currentPage > 1) {
    leftArrows.forEach((arrow) => {
      arrow.classList.add("active-button");
    });
    prevButton.classList.add("active-button");
    firstPageButton.classList.add("active-button");
    nextButton.classList.remove("active-button");
    lastPageButton.classList.remove("active-button");
  } else if (currentPage === totalPages) {
    prevButton.classList.remove("active-button");
    firstPageButton.classList.remove("active-button");
    nextButton.classList.add("active-button");
    lastPageButton.classList.add("active-button");
  } else {
    prevButton.classList.remove("active-button");
    firstPageButton.classList.remove("active-button");
    nextButton.classList.remove("active-button");
    lastPageButton.classList.remove("active-button");
  }
}

prevButton.addEventListener("click", () => {
  console.log("prev btn clicked");
  if (currentPage > 1) {
    currentPage--;
    updateButtonStyles();
    updatePagination();
  }
});

nextButton.addEventListener("click", () => {
  console.log("next btn clicked");
  if (currentPage < totalPages) {
    currentPage++;

    updateButtonStyles();

    updatePagination();
  }
});

firstPageButton.addEventListener("click", () => {
  currentPage = 1;
  updateButtonStyles();
  updatePagination();
});

lastPageButton.addEventListener("click", () => {
  currentPage = totalPages;
  updateButtonStyles();
  updatePagination();
});

function updatePagination() {
  currentPageIndicator.textContent = currentPage;
  updateCards(currentPage);
}

updatePagination();
