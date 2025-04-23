'use strict';

/**
 * Utility: Add event listener to single or multiple elements
 */
const addEventOnElem = function (elem, type, callback) {
  if (NodeList.prototype.isPrototypeOf(elem) || Array.isArray(elem)) {
    elem.forEach(el => el.addEventListener(type, callback));
  } else if (elem) {
    elem.addEventListener(type, callback);
  }
};

/**
 * ===============================
 * 🌐 HEADER FUNCTIONALITY START
 * ===============================
 */

// Navbar toggle (open/close on mobile)
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

// Sticky Header & Back to Top Button
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const handleHeaderScroll = function () {
  if (window.scrollY > 150) {
    header?.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header?.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", handleHeaderScroll);

// Hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;

const stickyHeader = function () {
  if (window.scrollY < lastScrollY) {
    header?.classList.remove("header-hide");
  } else {
    header?.classList.add("header-hide");
  }
  lastScrollY = window.scrollY;
};

addEventOnElem(window, "scroll", stickyHeader);

// Scroll reveal animation for sections
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

/**
 * ===============================
 * ✅ FOOTER FUNCTIONALITY START
 * ===============================
 * If your footer has form, newsletter, etc., handle that here
 * You can expand this block as needed
 */

// Example: Newsletter form submission
const contactForm = document.getElementById('contact-Form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let name = document.getElementById('name')?.value.trim();
    let email = document.getElementById('email')?.value.trim();
    let message = document.getElementById('message')?.value.trim();
    let formMessage = document.getElementById('formMessage');

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please fill all fields.";
      formMessage.style.color = "red";
    } else {
      formMessage.textContent = "Your message has been sent!";
      formMessage.style.color = "green";
      contactForm.reset();
    }
  });
}
