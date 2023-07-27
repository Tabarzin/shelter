import petsData from "./pets.json" assert { type: "json" };

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
  card.classList.add("card");

  card.innerHTML = `
        <img src="${data.img}" alt="${data.name}">
        <h2>${data.name}</h2>
        
           `;
  return card;
};

const updateSlider = () => {
  if (availableCards.length === 0) {
    availableCards = petsData.slice();
    shuffleArray(availableCards);
  }

  const currentSlideCards = availableCards.slice(
    currentCardIndex,
    currentCardIndex + 3
  );

  if (currentSlideCards.length < 3) {
    const remainingCards = 3 - currentSlideCards.length;
    currentSlideCards.push(...availableCards.slice(0, remainingCards));
  }

  currentCardIndex = (currentCardIndex + 3) % availableCards.length;

  sliderTrack.innerHTML = "";
  currentSlideCards.forEach((data) => {
    const card = generateCard(data);
    sliderTrack.appendChild(card);
  });
};

updateSlider();
