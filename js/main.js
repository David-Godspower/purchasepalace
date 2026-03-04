// ==========================================
// 🌐 PURCHASEPALACE MAIN SITE SCRIPT
// ==========================================

// 1. INITIALIZE CART
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("purchasepalace_cart")) || [];
} catch (error) {
  console.error("Error loading cart:", error);
  cart = [];
}
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Load Tasks
    renderProducts();
    updateCartBadge();
    startHeroSlider();
    
    // 2. Auth Check (This MUST be inside here)
    checkAuthStatus();
    
    // 3. Misc
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// ==========================================
// ⚙️ RENDER FUNCTION (Moved from products.js)
// ==========================================
function renderProducts() {
  // Safety: Do these grids exist?
  const arrivalsGrid = document.getElementById("arrivals-grid");
  const popularGrid = document.getElementById("popular-grid");

  if (!arrivalsGrid && !popularGrid) return; // Stop if we are not on Home Page

  // Clear loading text
  if (arrivalsGrid) arrivalsGrid.innerHTML = "";
  if (popularGrid) popularGrid.innerHTML = "";

  // Loop through the data from products.js
  products.forEach((product) => {
    const formattedPrice = product.price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // HERE IS THE FIX: href="product.html?id=${product.id}"
    const productHTML = `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <h3>${product.name}</h3>
                <span class="label" style="padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${product.badge}</span>
                <p class="price">$${formattedPrice}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

    if (product.section === "arrivals" && arrivalsGrid) {
      arrivalsGrid.innerHTML += productHTML;
    } else if (product.section === "popular" && popularGrid) {
      popularGrid.innerHTML += productHTML;
    }
  });
}
// ==========================================
// 👤 SECURE AUTHENTICATION UI LOGIC
// ==========================================
function checkAuthStatus() {
    const guestView = document.getElementById("guest-view");
    const userView = document.getElementById("user-view");
    const currentUser = JSON.parse(localStorage.getItem("purchasepalace_user"));

    // If these elements don't exist, stop so we don't get an error
    if (!guestView || !userView) return;

    if (currentUser) {
        // User IS logged in
        guestView.style.display = "none";
        userView.style.display = "block";
        
        // Safely update the name
        const userBtn = userView.querySelector(".user-btn");
        if (userBtn) {
            userBtn.textContent = `Hi, ${currentUser.name} ▾`;
        }
    } else {
        // User IS NOT logged in
        guestView.style.display = "block";
        userView.style.display = "none";
    }
}
// ==========================================
// 🔍 SEARCH LOGIC
// ==========================================
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm),
    );

    const resultsGrid = document.getElementById("arrivals-grid");
    const newArrivalsTitle = document.querySelector(".new-arrivals h2");

    if (resultsGrid) {
      resultsGrid.innerHTML = "";
      if (newArrivalsTitle)
        newArrivalsTitle.textContent = `Search Results for "${searchTerm}"`;

      if (filteredProducts.length > 0) {
        filteredProducts.forEach((product) => {
          const productHTML = `
                        <div class="product-card">
                            <a href="product.html?id=${product.id}">
                                <img src="${product.image}" alt="${product.name}">
                            </a>
                            <h3>${product.name}</h3>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    `;
          resultsGrid.innerHTML += productHTML;
        });
      } else {
        resultsGrid.innerHTML =
          '<p style="text-align: center; width: 100%;">No products found.</p>';
      }
      document
        .getElementById("new-arrivals")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });
}

// ==========================================
// 🛒 ADD TO CART LOGIC
// ==========================================
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("add-to-cart")) {
    const productID = parseInt(event.target.getAttribute("data-id"));
    const productToAdd = products.find((p) => p.id === productID);

    if (productToAdd) {
      cart.push(productToAdd);
      localStorage.setItem("purchasepalace_cart", JSON.stringify(cart));

      // Visual Feedback
      const originalText = event.target.textContent;
      event.target.textContent = "Added! ✅";
      event.target.style.backgroundColor = "#28a745";
      event.target.style.color = "white";

      setTimeout(() => {
        event.target.textContent = originalText;
        event.target.style.backgroundColor = "";
        event.target.style.color = "";
      }, 1000);

      updateCartBadge();
    }
  }
});

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? "block" : "none";
  }
}

// ==========================================
// 🎞️ HERO SLIDER LOGIC
// ==========================================
function startHeroSlider() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("slider-dots");
    let currentSlide = 0;
    const slideInterval = 5000;

    if (slides.length === 0 || !dotsContainer) return;

    // 1. Clear dots container first (prevents duplicates)
    dotsContainer.innerHTML = ""; 

    // 2. Create dots for EVERY slide found
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        
        // Add click listener
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // 2. Navigation function
    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        document.querySelectorAll(".dot")[currentSlide].classList.remove("active");
        
        currentSlide = index;
        
        slides[currentSlide].classList.add("active");
        document.querySelectorAll(".dot")[currentSlide].classList.add("active");
    }

   // 3. Auto-play
let slideTimer = setInterval(nextSlide, slideInterval);

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

// Update goToSlide to reset the timer
function goToSlide(index) {
    // Stop the current timer
    clearInterval(slideTimer);
    
    // Perform the switch
    slides[currentSlide].classList.remove("active");
    document.querySelectorAll(".dot")[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    document.querySelectorAll(".dot")[currentSlide].classList.add("active");
    
    // Restart the timer so it doesn't jump immediately after a click
    slideTimer = setInterval(nextSlide, slideInterval);
}
}

// ==========================================
// 📱 MOBILE MENU TOGGLE
// ==========================================
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    // 1. Toggle the 'active' class (Slides the menu in/out)
    navLinks.classList.toggle("active");

    // 2. Change the Icon (Bars <-> X)
    const icon = hamburgerBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times"); // Turn into an X
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars"); // Turn back to Bars
    }
  });
}


// Keep this in main.js to handle the dynamically created logout button
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout-btn") {
        e.preventDefault();
        localStorage.removeItem("purchasepalace_user");
        window.location.reload();
    }
});