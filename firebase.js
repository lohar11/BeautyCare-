import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.appspot.com",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:84ca0a6079c13587e3831e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Sign-Up
async function signUpUser(name, email, password, dob) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            dob: dob
        });
        alert("Account Created Successfully!");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Handle Login
async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        window.location.href = "index.html";
    } catch (error) {
        alert("Login Failed: " + error.message);
    }
}

// Handle Logout
function logoutUser() {
    signOut(auth).then(() => {
        alert("You have been signed out.");
        window.location.href = "index.html";
    }).catch((error) => {
        alert("Error signing out: " + error.message);
    });
}

// Display Signed-in Users (Admin View)
async function displayUsers() {
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = ""; // Clear previous data

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        usersList.innerHTML += `<li>${userData.name} - ${userData.email}</li>`;
    });
}

// Check Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("logoutNav").classList.remove("hidden");
        document.getElementById("signupNav").style.display = "none";
    } else {
        document.getElementById("logoutNav").classList.add("hidden");
        document.getElementById("signupNav").style.display = "block";
    }
});

// Event Listeners
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const dob = document.getElementById("signupDOB").value;
        signUpUser(name, email, password, dob);
    });
}

if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        loginUser(email, password);
    });
}

if (document.getElementById("signoutButton")) {
    document.getElementById("signoutButton").addEventListener("click", logoutUser);
}

if (document.getElementById("usersList")) {
    displayUsers();
}
