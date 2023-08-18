import petsData from "../main/pets.json" assert { type: "json" };
import { showPetModal } from "../script.js";

// PETS GENERATOR //

// const modal = document.getElementById("modal");
// const modalContent = document.getElementById("modal-content");

const cardsContainer = document.querySelector(".pets-cards-container");
const prevButton = document.querySelectorAll(".button-arrow")[0];
const nextButton = document.querySelectorAll(".button-arrow")[1];
const firstPageButton = document.querySelector(".button_paginator");
const lastPageButton = document.querySelectorAll(
  ".button-arrow-interactive"
)[1];

const currentPageIndicator = document.querySelector(".button_paginator");

let currentPage = 1;
let cardsPerPage = calculateCardsPerPage();

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

function updateCards() {
  cardsContainer.innerHTML = "";
  for (let i = 0; i < cardsPerPage; i++) {
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
