import petsData from "./pets.json" assert { type: "json" };
import { showPetModal } from "./pages/script.js";

const sliderTrack = document.querySelector(".slider-track");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let availableCards = [];
let currentCardIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const rightArrowButton = document.querySelector(".slider-right-arrow");

  rightArrowButton.addEventListener("click", () => {
    updateSlider();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const leftArrowButton = document.querySelector(".slider-left-arrow");

  leftArrowButton.addEventListener("click", () => {
    updateSlider();
  });
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateCard = (data) => {
  const card = document.createElement("div");
  card.classList.add("slider-card");

  const cardImageContainer = document.createElement("div");
  cardImageContainer.classList.add("slider-card-image");
  card.appendChild(cardImageContainer);

  const image = document.createElement("img");
  image.src = data.img;
  image.alt = data.name;
  cardImageContainer.appendChild(image);

  const petTitle = document.createElement("span");
  petTitle.classList.add("slider-pet-title");
  petTitle.textContent = data.name;
  card.appendChild(petTitle);

  const learnMoreButton = document.createElement("button");
  learnMoreButton.classList.add("button_secondary");
  card.appendChild(learnMoreButton);

  const learnMoreSpan = document.createElement("span");
  learnMoreSpan.classList.add("learn-more");
  learnMoreSpan.textContent = "Learn more";
  learnMoreButton.appendChild(learnMoreSpan);

  card.addEventListener("click", () => {
    showPetModal(data);
  });

  return card;
};

let resizeTimeout;

const debounce = (func, delay) => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(func, delay);
};

const updateSlider = () => {
  if (availableCards.length === 0) {
    availableCards = petsData.slice();
    shuffleArray(availableCards);
  }

  const screenWidth = window.innerWidth;
  let numCardsToShow = 3;

  if (screenWidth < 1278) {
    numCardsToShow = 2;
  }

  if (screenWidth < 768) {
    numCardsToShow = 1;
  }

  const currentSlideCards = availableCards.slice(
    currentCardIndex,
    currentCardIndex + numCardsToShow
  );

  if (currentSlideCards.length < numCardsToShow) {
    const remainingCards = 3 - currentSlideCards.length;
    currentSlideCards.push(...availableCards.slice(0, remainingCards));
  }

  currentCardIndex =
    (currentCardIndex + numCardsToShow) % availableCards.length;

  sliderTrack.innerHTML = "";
  currentSlideCards.forEach((data) => {
    const card = generateCard(data);
    sliderTrack.appendChild(card);
  });
};

updateSlider();

window.addEventListener("resize", () => {
  debounce(updateSlider, 300);
});
