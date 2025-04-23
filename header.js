document.addEventListener("DOMContentLoaded", function () {
    console.log("Header and Footer Script Loaded");

    // ✅ Header HTML Injection
    const headerHTML = `
        <header class="header">
            <div class="alert">
                <div class="container">
                    <p class="alert-text">Free Shipping On All INDIA Orders 500 Rs+</p>
                </div>
            </div>
            <div class="header-top" data-header>
                <div class="container">
                    <button class="nav-open-btn" aria-label="open menu" id="nav-toggler">
                        <span class="line line-1"></span>
                        <span class="line line-2"></span>
                        <span class="line line-3"></span>
                    </button>
                    <a href="#" class="logo">
                        <img src="img/logo.png" width="100" height="26" alt="Glowing">
                    </a>
                    <nav class="navbar">
                        <ul class="navbar-list">
                            <li><a href="index.html" class="navbar-link">Home</a></li>
                            <li><a href="collection.html" class="navbar-link">Collection</a></li>
                            <li><a href="product.html" class="navbar-link">Product</a></li>
                            <li><a href="offer.html" class="navbar-link">Offer</a></li>
                            <li><a href="blog.html" class="navbar-link">Blog</a></li>
                            <li id="signInLink"><a href="login.html" class="navbar-link">Sign in/Sign Up</a></li>
                            <li id="profileLink" style="display: none;"><a href="profile.html" class="navbar-link">Profile</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    `;

    // ✅ Footer HTML Injection
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <p>&copy; 2025 Beauty Care. All rights reserved.</p>
            </div>
        </footer>
    `;

    // ✅ Inject HTML into containers
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    } else {
        console.error("Header container not found!");
    }

    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    } else {
        console.error("Footer container not found!");
    }

    // ✅ Navigation toggle functionality
    document.addEventListener("click", function (event) {
        if (event.target.id === "nav-toggler") {
            document.querySelector(".navbar").classList.toggle("active");
        }
    });

    // ✅ Show/Hide Profile Link Based on Login Status
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (isLoggedIn) {
        document.getElementById("signInLink").style.display = "none";
        document.getElementById("profileLink").style.display = "block";
    }
});
