import petsData from "../main/pets.json" assert { type: "json" };

const hamburger = document.querySelector(".hamburger");
const navBurger = document.querySelector(".nav");
const menuLink = document.querySelector(".nav-list");

function toggleMenu() {
  hamburger.classList.toggle("open");
  navBurger.classList.toggle("hide");
  navBurger.classList.toggle("nav-burger");
}

hamburger.addEventListener("click", toggleMenu);
menuLink.addEventListener("click", toggleMenu);

// PETS GENERATOR //

const cardsContainer = document.querySelector(".pets-cards-container");
const prevButton = document.querySelectorAll(".button-arrow")[0];
const nextButton = document.querySelectorAll(".button-arrow")[1];
const firstPageButton = document.querySelector(".button_paginator");
const lastPageButton = document.querySelectorAll(
  ".button-arrow-interactive"
)[1];

const currentPageIndicator = document.querySelector(".button_paginator");

let currentPage = 1;
let cardsPerPage = 8;

function createCard(pet) {
  const card = document.createElement("div");
  card.classList.add("slider-card");

  const cardImage = document.createElement("div");
  cardImage.classList.add("slider-card", "slider-card-image");
  const image = document.createElement("img");
  image.src = pet.img;
  image.alt = pet.name;
  cardImage.appendChild(image);

  const petTitle = document.createElement("span");
  petTitle.classList.add("slider-pet-title");
  petTitle.textContent = pet.name;

  const learnMoreButton = document.createElement("button");
  learnMoreButton.classList.add("button_secondary");
  const learnMoreSpan = document.createElement("span");
  learnMoreSpan.classList.add("learn-more");
  learnMoreSpan.textContent = "Learn more";
  learnMoreButton.appendChild(learnMoreSpan);

  card.appendChild(cardImage);
  card.appendChild(petTitle);
  card.appendChild(learnMoreButton);

  return card;
}

function updateCards() {
  cardsContainer.innerHTML = "";
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  for (let i = startIndex; i < endIndex && i < petsData.length; i++) {
    const card = createCard(petsData[i]);
    cardsContainer.appendChild(card);
  }

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = endIndex >= petsData.length;
  firstPageButton.disabled = currentPage === 1;
  lastPageButton.disabled =
    Math.ceil(petsData.length / cardsPerPage) === currentPage;

  currentPageIndicator.textContent = currentPage;
}

function handlePrevClick() {
  if (currentPage > 1) {
    currentPage--;
    updateCards();
  }
}

function handleNextClick() {
  const totalPages = Math.ceil(petsData.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updateCards();
  }
}

function handleFirstPageClick() {
  currentPage = 1;
  updateCards();
}

function handleLastPageClick() {
  currentPage = Math.ceil(petsData.length / cardsPerPage);
  updateCards();
}

prevButton.addEventListener("click", handlePrevClick);
nextButton.addEventListener("click", handleNextClick);
firstPageButton.addEventListener("click", handleFirstPageClick);
lastPageButton.addEventListener("click", handleLastPageClick);

updateCards();

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth;
  if (1280 <= screenWidth) {
    cardsPerPage = 8;
  } else if (768 <= screenWidth && screenWidth < 1280) {
    cardsPerPage = 6;
  } else {
    cardsPerPage = 3;
  }
  updateCards();
});
