'use strict';

/**
 * Add event listener to elements
 */
const addEventOnElem = function (elem, type, callback) {
  if (NodeList.prototype.isPrototypeOf(elem) || Array.isArray(elem)) {
    elem.forEach(el => el.addEventListener(type, callback));
  } else if (elem) {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle functionality
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar?.classList.remove("active");
  overlay?.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Header sticky & back-to-top button activation
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header?.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header?.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header?.classList.remove("header-hide");
  } else {
    header?.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/**
 * Scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight / 2) {
      section.classList.add("active");
    }
  });
};

document.addEventListener("DOMContentLoaded", scrollReveal);
addEventOnElem(window, "scroll", scrollReveal);


document.getElementById('contact-Form').addEventListener('submit', function(event) {
  event.preventDefault();
  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let message = document.getElementById('message').value.trim();
  let formMessage = document.getElementById('formMessage');
  
  if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please fill all fields.";
      formMessage.style.color = "red";
  } else {
      formMessage.textContent = "Your message has been sent!";
      formMessage.style.color = "green";
      document.getElementById('contactForm').reset();
  }
});


document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelectorAll(".product");

  products.forEach(product => {
      let productId = product.getAttribute("data-id");
      let likeBtn = product.querySelector(".add to wishlist");
      let likeCount = product.querySelector(".wishlist-count");

      // LocalStorage se previous likes fetch karo
      let savedLikes = localStorage.getItem(productId);
      wishlistCount.textContent = savedLikes ? savedLikes : 0;

      likeBtn.addEventListener("click", function () {
          let currentLikes = parseInt(wishlistCount.textContent);
          let newLikes = currentLikes + 1;

          likeCount.textContent = newLikes;
          localStorage.setItem(productId, newLikes);
      });
  });
});








