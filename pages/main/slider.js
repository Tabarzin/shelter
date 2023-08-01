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
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalPetInfo = document.createElement("div");
  modalPetInfo.classList.add("modal-pet-info");

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
  const petAgeLabel = document.createElement("span");

  petAgeLabel.classList.add("modal-pet-info_label");
  petAgeLabel.textContent = "Age: ";

  const petAgeValue = document.createElement("span");
  petAgeValue.classList.add("modal-pet-info__sub-value");
  petAgeValue.textContent = `${data.age}`;

  petAge.appendChild(petAgeLabel);
  petAge.appendChild(petAgeValue);

  const petInoculations = document.createElement("p");

  const petInoculationsLabel = document.createElement("span");
  petInoculationsLabel.classList.add("modal-pet-info_label");
  petInoculationsLabel.textContent = `Inoculations: `;

  const petInoculationsValue = document.createElement("span");
  petInoculationsValue.classList.add("modal-pet-info__sub-value");
  petInoculationsValue.textContent = `${data.inoculations.join(", ")}`;

  petInoculations.appendChild(petInoculationsLabel);
  petInoculations.appendChild(petInoculationsValue);

  const petDiseases = document.createElement("p");

  const petDiseasesLabel = document.createElement("span");
  petDiseasesLabel.classList.add("modal-pet-info_label");
  petDiseasesLabel.textContent = `Diseases: `;

  const petDiseasesValue = document.createElement("span");
  petDiseasesValue.classList.add("modal-pet-info__sub-value");
  petDiseasesValue.textContent = `${data.diseases.join(", ")}`;

  petDiseases.appendChild(petDiseasesLabel);
  petDiseases.appendChild(petDiseasesValue);

  const petParasites = document.createElement("p");

  const petParasitesLabel = document.createElement("span");
  petParasitesLabel.classList.add("modal-pet-info_label");
  petParasitesLabel.textContent = `Parasites: `;

  const petParasitesValue = document.createElement("span");
  petParasitesValue.classList.add("modal-pet-info__sub-value");
  petParasitesValue.textContent = `${data.parasites.join(", ")}`;

  petParasites.appendChild(petParasitesLabel);
  petParasites.appendChild(petParasitesValue);

  modalContent.appendChild(petImage);
  modalPetInfo.appendChild(petName);
  modalPetInfo.appendChild(petTypeBreed);
  modalPetInfo.appendChild(petDescription);
  modalPetInfo.appendChild(petAge);
  modalPetInfo.appendChild(petInoculations);
  modalPetInfo.appendChild(petDiseases);
  modalPetInfo.appendChild(petParasites);

  modalContent.appendChild(modalPetInfo);
  modalContainer.appendChild(modalContent);

  document.body.appendChild(modalContainer);

  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      document.body.removeChild(modalContainer);
    }
  });
};

// const createElementWithClass = (tagName, className, textContent) => {
//   const element = document.createElement(tagName);
//   element.classList.add(className);
//   if (textContent) {
//     element.textContent = textContent;
//   }
//   return element;
// };

// const createDataElement = (label, value) => {
//   const container = document.createElement("p");
//   const labelElement = createElementWithClass(
//     "span",
//     "modal-pet-info__sub-label",
//     label
//   );
//   const valueElement = createElementWithClass(
//     "span",
//     "modal-pet-info__sub-value",
//     value
//   );
//   container.appendChild(labelElement);
//   container.appendChild(valueElement);
//   return container;
// };

// const showPetModal = (data) => {
//   const modalContainer = createElementWithClass("div", "modal");
//   const modalContent = createElementWithClass("div", "modal-content");
//   const modalPetInfo = createElementWithClass("div", "modal-pet-info");

//   modalPetInfo.appendChild(
//     createElementWithClass("h3", "modal-pet-info__name", data.name)
//   );
//   modalPetInfo.appendChild(
//     createElementWithClass("img", "modal-pet-image", null)
//   ).src = data.img;
//   modalPetInfo.lastChild.alt = data.name;
//   modalPetInfo.appendChild(
//     createElementWithClass("h4", null, `${data.type} - ${data.breed}`)
//   );
//   modalPetInfo.appendChild(
//     createElementWithClass("h5", null, data.description)
//   );
//   modalPetInfo.appendChild(createDataElement("Age:", data.age));
//   modalPetInfo.appendChild(
//     createDataElement("Inoculations:", data.inoculations.join(", "))
//   );
//   modalPetInfo.appendChild(
//     createDataElement("Diseases:", data.diseases.join(", "))
//   );
//   modalPetInfo.appendChild(
//     createDataElement("Parasites:", data.parasites.join(", "))
//   );

//   modalContent.appendChild(modalPetInfo);
//   modalContainer.appendChild(modalContent);
//   document.body.appendChild(modalContainer);

//   modalContainer.addEventListener("click", (event) => {
//     if (event.target === modalContainer) {
//       document.body.removeChild(modalContainer);
//     }
//   });
// };
