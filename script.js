document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const showSignUp = document.getElementById("showSignUp");
    const showLogin = document.getElementById("showLogin");
    const signupNav = document.getElementById("signupNav");
    const logoutNav = document.getElementById("signoutNav");
    const logoutButton = document.getElementById("signoutButton");

    // Signup form fields
    const signupName = document.getElementById("signupName");
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const signupDOB = document.getElementById("signupDOB");

    // Toggle between login and signup forms
    showSignUp.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
    });

    showLogin.addEventListener("click", () => {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Function to check authentication state
    function checkAuthState() {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser) {
            if (signupNav) signupNav.style.display = "none";
            if (logoutNav) logoutNav.classList.remove("hidden");
        } else {
            if (signupNav) signupNav.style.display = "block";
            if (logoutNav) logoutNav.classList.add("hidden");
        }
    }

    // Run checkAuthState on page load
    checkAuthState();

    // Handle Sign-Up Submission
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate password strength
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!passwordPattern.test(signupPassword.value)) {
            alert("Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.");
            return;
        }

        // Validate password match
        if (signupPassword.value !== confirmPassword.value) {
            alert("Passwords do not match! Please try again.");
            return;
        }

        // Validate Date of Birth (minimum 13 years old)
        if (!validateDOB(signupDOB.value)) {
            alert("You must be at least 13 years old to sign up.");
            return;
        }

        // Save user data to localStorage
        const userData = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
            dob: signupDOB.value
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        alert("Sign-up successful! You can now log in.");
        checkAuthState();
        window.location.href = "index3.html";
    });

    // Handle Login Submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
        const storedUser = JSON.parse(localStorage.getItem("userData"));

        if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
            alert("signin Successful! Redirecting...");
            localStorage.setItem("isLoggedIn", "true");
            checkAuthState();
            window.location.href = "index3.html"; // Redirect to profile page
        } else {
            alert("Invalid email or password! Please try again.");
        }
    });

    // Handle Sign-Out
    signoutButton?.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        alert("You have been sign out.");
        checkAuthState();
        window.location.href = "index3.html"; // Redirect to home/login page
    });

    // Validate Date of Birth (Minimum 13 years)
    function validateDOB(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        return age > 13 || (age === 13 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
    }
});
