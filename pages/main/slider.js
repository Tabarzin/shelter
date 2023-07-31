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

/* MODAL WINDOW */

const showPetModal = (data) => {
  // Create the modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal");

  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalPetInfo = document.createElement("div");
  modalPetInfo.classList.add("modal-pet-info");

  // Create elements to display the pet data in the modal
  const petName = document.createElement("h3");
  petName.textContent = data.name;

  const petImage = document.createElement("img");
  petImage.src = data.img;
  petImage.alt = data.name;

  const petTypeBreed = document.createElement("h4");
  petTypeBreed.textContent = `${data.type} - ${data.breed}`;

  const petDescription = document.createElement("h5");
  petDescription.textContent = data.description;

  const petAge = document.createElement("p");
  petAge.classList.add("modal-pet-info__sub");
  petAge.textContent = `Age: ${data.age}`;

  const petInoculations = document.createElement("p");
  petInoculations.classList.add("modal-pet-info__sub");
  petInoculations.textContent = `Inoculations: ${data.inoculations.join(", ")}`;

  const petDiseases = document.createElement("p");
  petDiseases.classList.add("modal-pet-info__sub");
  petDiseases.textContent = `Diseases: ${data.diseases.join(", ")}`;

  const petParasites = document.createElement("p");
  petParasites.classList.add("modal-pet-info__sub");
  petParasites.textContent = `Parasites: ${data.parasites.join(", ")}`;

  // Append pet data elements to the modal content
  modalContent.appendChild(petImage);
  modalPetInfo.appendChild(petName);
  modalPetInfo.appendChild(petTypeBreed);
  modalPetInfo.appendChild(petDescription);
  modalPetInfo.appendChild(petAge);
  modalPetInfo.appendChild(petInoculations);
  modalPetInfo.appendChild(petDiseases);
  modalPetInfo.appendChild(petParasites);

  // Append the modal content to the modal container
  modalContent.appendChild(modalPetInfo);
  modalContainer.appendChild(modalContent);

  // Append the modal container to the document body
  document.body.appendChild(modalContainer);

  // Step 3: Add event listener to close the modal when clicked outside
  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      document.body.removeChild(modalContainer);
    }
  });
};
