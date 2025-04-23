import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    databaseURL: "https://login-example-2831e-default-rtdb.firebaseio.com",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.firebasestorage.app",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:be0eb289df9f4c20e3831e"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Global Cart Array
let cart = [];

// ✅ Function to Show Product List
function showProductList() {
    document.getElementById("product-list").style.display = "flex";
    document.getElementById("product-details").style.display = "none";
}

// ✅ Function to Show Product Details
function showProductDetails(title, image, description, price) {
    document.getElementById("detail-title").textContent = title;
    document.getElementById("detail-description").textContent = description || "No description available.";
    document.getElementById("detail-price").textContent = price ? `₹${price}` : "Price Not Available";
    

    let imgElement = document.getElementById("detail-image");
    imgElement.src = image;
    imgElement.onerror = function () {
        imgElement.src = "default-image.jpg"; // Fallback image
    };

    document.getElementById("product-list").style.display = "none";
    document.getElementById("product-details").style.display = "block";
}

// ✅ Function to Add Product to Cart
function addToCart(title, price, image) {
    let existingProduct = cart.find(item => item.title === title);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: price,
            image: image,
            quantity: 1
        });
    }
    updateCartUI();
}

// ✅ Function to Remove Product from Cart
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    updateCartUI();
}

// ✅ Function to Update Cart UI
function updateCartUI() {
    let cartCount = document.getElementById("cart-count");
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart is empty</p>";
    } else {
        cart.forEach(item => {
            let cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");

            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}" width="50">
                <span>${item.title} - ₹${item.price} x ${item.quantity}</span>
                <button class="remove-from-cart">Remove</button>
            `;

            cartItemDiv.querySelector(".remove-from-cart").addEventListener("click", () => {
                removeFromCart(item.title);
            });

            cartContainer.appendChild(cartItemDiv);
        });
    }
    updateTotalPrice();
}

// ✅ Function to Update Total Price
function updateTotalPrice() {
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById("total-price").textContent = `₹${totalPrice}`;
}

// ✅ Fetch & Display Products from Firebase
async function fetchProducts() {
    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        let productContainer = document.getElementById("product-list");

        productContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let productDiv = document.createElement("div");
            productDiv.classList.add("menu-item");

            let priceText = data.price ? `₹${data.price}` : "Price Not Available";

            productDiv.innerHTML = `
                <img src="${data.image}" alt="${data.title}" width="150" class="product-image">
                <h3>${data.title}</h3>
                <p class="price">${priceText}</p>
                <button class="add-to-cart">Add to Cart</button>
                <button class="view-more">View More</button>
            `;

            let imgElement = productDiv.querySelector(".product-image");
            imgElement.onerror = function () {
                imgElement.src = "default-image.jpg";
            };

            productDiv.querySelector(".view-more").addEventListener("click", () => {
                showProductDetails(data.title, data.image, data.description, data.price);
            });

            productDiv.querySelector(".add-to-cart").addEventListener("click", () => {
                addToCart(data.title, data.price, data.image);
            });

            productContainer.appendChild(productDiv);
        });

    } catch (error) {
        console.error("Error fetching products: ", error);
    }
}

// ✅ Ensure DOM is Ready Before Adding Event Listeners
document.getElementById("checkout-btn").addEventListener("click", function() {
    window.location.href = "payment.html"; // Redirects to payment.html
  });
  // Get cart total price
let totalPrice = document.getElementById("total-price").innerText;

// Store it in localStorage
localStorage.setItem("cartTotal", totalPrice);


// ✅ Back to Product List Button
document.getElementById("back-to-products").addEventListener("click", showProductList);

// ✅ Toggle Cart
function toggleCart() {
    let cartSection = document.getElementById("cart-section");
    cartSection.style.display = (cartSection.style.display === "none" || cartSection.style.display === "") ? "block" : "none";
}

// ✅ Close Cart Button
document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-section").style.display = "none";
});

// ✅ Show/Hide Cart
document.getElementById("cart-btn").addEventListener("click", toggleCart);

// ✅ Load Products on Page Load
window.onload = fetchProducts;



