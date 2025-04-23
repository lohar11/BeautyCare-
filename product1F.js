// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHZX5ImciW3PCnwQQcFgGhuCBrljqlJx0",
    authDomain: "login-example-2831e.firebaseapp.com",
    databaseURL: "https://login-example-2831e-default-rtdb.firebaseio.com",
    projectId: "login-example-2831e",
    storageBucket: "login-example-2831e.firebasestorage.app",
    messagingSenderId: "370204501307",
    appId: "1:370204501307:web:be0eb289df9f4c20e3831e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select Elements
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const menuList = document.getElementById("menu-list");
const cartPopup = document.getElementById("cart-popup");
const closeCartBtn = document.getElementById("close-cart");
const productDetailsSection = document.getElementById("product-details");
const backToProductsBtn = document.getElementById("back-to-products");

let totalPrice = 0;

// Fetch Products from Firebase
async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        displayProduct(product, doc.id);
    });
}

// Display Product on Page
function displayProduct(product, id) {
    if (!product.price || isNaN(product.price)) {
        console.error(`Invalid price for ${product.title}`);
        return;
    }

    const productElement = document.createElement("div");
    productElement.classList.add("product-list");
    productElement.setAttribute("data-id", id);
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class='price'>₹${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
        <button class="view-more">View More</button>
    `;
    menuList.appendChild(productElement);
}

// Attach Event Listeners to Buttons
menuList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        addToCart(e.target.closest(".product-list"));
    } else if (e.target.classList.contains("view-more")) {
        showProductDetails(e.target.closest(".product-list"));
    }
});

// Add Product to Cart
async function addToCart(productElement) {
    const id = productElement.getAttribute("data-id");
    const title = productElement.querySelector("h3").innerText;
    const priceText = productElement.querySelector(".price").innerText.replace("₹", "");
    const price = parseFloat(priceText);
    const image = productElement.querySelector("img").src;

    if (!title || isNaN(price)) {
        console.error("Invalid product details");
        return;
    }

    let product = { id, title, price, image, quantity: 1 };

    // Check if the item already exists in the cart
    const cartRef = doc(db, "cart", id);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
        const existingProduct = cartSnap.data();
        product.quantity = (existingProduct.quantity || 1) + 1;
    }

    await setDoc(cartRef, product);
    updateCartUI();
}

// Update Cart UI from Firebase
async function updateCartUI() {
    cartItems.innerHTML = "";
    totalPrice = 0;

    const querySnapshot = await getDocs(collection(db, "cart"));
    let cartArray = [];

    querySnapshot.forEach((doc) => {
        let item = doc.data();
        
        if (!item.price || isNaN(item.price) || !item.quantity || isNaN(item.quantity)) {
            console.error(`Invalid cart item: ${item.title}`);
            return;
        }

        cartArray.push(item);
        totalPrice += item.price * item.quantity;
    });

    cartArray.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" width="40"> ${item.title} - ₹${item.price} x ${item.quantity}
            <button class="remove-btn">Remove</button>
        `;

        // Attach Event Listener to Remove Button
        const removeBtn = li.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => removeFromCart(item.id));

        cartItems.appendChild(li);
    });

    cartCount.textContent = cartArray.length;
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
}

// Remove Product from Cart
async function removeFromCart(id) {
    await deleteDoc(doc(db, "cart", id));
    updateCartUI();
}

// Show Product Details when "View More" is Clicked
async function showProductDetails(productElement) {
    const id = productElement.getAttribute("data-id");
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const product = docSnap.data();
        
        productDetailsSection.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p>${product.description || "No description available."}</p>
            <p class="price">₹${product.price}</p>
            <button class="add-to-cart-details">Add to Cart</button>
            <button id="back-to-products">Back to Products</button>
        `;

        menuList.style.display = "none";
        productDetailsSection.style.display = "block";

        document.querySelector(".add-to-cart-details").addEventListener("click", () => {
            addToCart(productElement);
        });

        document.getElementById("back-to-products").addEventListener("click", () => {
            productDetailsSection.style.display = "none";
            menuList.style.display = "flex";
        });
    } else {
        console.error("Product not found");
    }
}

// Open and Close Cart
closeCartBtn.addEventListener("click", () => {
    cartPopup.classList.remove("open");
});

// Load Products on Page Load
fetchProducts();
updateCartUI();
