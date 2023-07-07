

const hamburger = document.querySelector('.hamburger');
const navBurger = document.querySelector('.nav');
const menuLink = document.querySelector('.nav-list');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navBurger.classList.toggle('hide');
  navBurger.classList.toggle('nav-burger');
  
  
}

hamburger.addEventListener('click', toggleMenu);
menuLink.addEventListener('click', toggleMenu); 