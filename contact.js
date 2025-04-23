// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    databaseURL: "https://login-example-2831e-default-rtdb.firebaseio.com/",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.appspot.com",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:84ca0a6079c13587e3831e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-Form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      alert("Please fill in all the fields.");
      return;
    }

    // Save to Firebase
    const contactFormDB = ref(db, "contactForm");
    const newMessageRef = push(contactFormDB);
    set(newMessageRef, {
      name,
      email,
      message
    }).then(() => {
      document.getElementById("formMessage").style.display = "block";
      form.reset();
      setTimeout(() => {
        document.getElementById("formMessage").style.display = "none";
      }, 3000);
    }).catch((error) => {
      console.error("Error saving message:", error);
      alert("Something went wrong. Please try again.");
    });
  });
});
