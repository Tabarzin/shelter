// HAMBURGER //

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

/* MODAL WINDOW */

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeButton = document.getElementById("close-button");

export const showPetModal = (data) => {
  modal.style.display = "flex";
  modalContent.style.display = "flex ";

  const petName = document.querySelector(".pet-name");
  petName.textContent = data.name;

  const petImage = document.querySelector(".modal-image");
  petImage.src = data.img;
  petImage.alt = data.name;

  const petTypeBreed = document.querySelector(".pet-type-breed");
  petTypeBreed.textContent = `${data.type} - ${data.breed}`;

  const petDescription = document.querySelector(".pet-description");
  petDescription.textContent = data.description;

  const petAgeValue = document.getElementById("pet-age-value");
  petAgeValue.textContent = `${data.age}`;

  const petInocValue = document.getElementById("pet-inoculations-value");
  petInocValue.textContent = `${data.inoculations.join(", ")}`;

  const petDiseases = document.getElementById("pet-diseases-value");
  petDiseases.textContent = `${data.diseases.join(", ")}`;

  const petParasites = document.getElementById("pet-parasites-value");
  petParasites.textContent = `${data.parasites.join(", ")}`;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
};

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});
