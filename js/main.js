// ==========================================
// 🌍 GLOBAL STATE & SETTINGS
// ==========================================
let currentCurrency = localStorage.getItem("pp_currency") || "USD";
const EXCHANGE_RATE = 1500; 
let cart = JSON.parse(localStorage.getItem("purchasepalace_cart")) || [];

// --- 🍞 TOAST NOTIFICATION SYSTEM ---
const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    const icon = `<svg viewBox="0 0 24 24" width="20"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>`;
    toast.innerHTML = `${icon} <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==========================================
// ⚙️ RENDER ENGINE (Badges, Prices, Stock)
// ==========================================
function renderProducts(productsToDisplay = products) {
    const arrivalsGrid = document.getElementById("arrivals-grid");
    const popularGrid = document.getElementById("popular-grid");
    const categoryGrid = document.getElementById("product-grid"); 

    if (arrivalsGrid) arrivalsGrid.innerHTML = "";
    if (popularGrid) popularGrid.innerHTML = "";
    if (categoryGrid) categoryGrid.innerHTML = ""; 

    productsToDisplay.forEach((product) => {
        // 1. Currency Math
        const priceDisplay = currentCurrency === "USD" 
            ? `$${product.price.toFixed(2)}` 
            : `₦${(product.price * EXCHANGE_RATE).toLocaleString()}`;
        const oldPriceDisplay = product.oldPrice ? (currentCurrency === "USD" 
            ? `$${product.oldPrice.toFixed(2)}` 
            : `₦${(product.oldPrice * EXCHANGE_RATE).toLocaleString()}`) : "";

        // 2. Discount & Label Logic
        let badgeHTML = "";
        if (product.oldPrice && product.oldPrice > product.price) {
            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            badgeHTML = `<span class="label sale-badge">-${discount}% OFF</span>`;
        } else if (product.badge) {
            badgeHTML = `<span class="label">${product.badge}</span>`;
        }

        // 3. Stock Scarcity Bar
        const stockPercent = product.stockPercent || Math.floor(Math.random() * 30) + 70; 
        const isCategoryView = !!categoryGrid;
        const stockBarHTML = (product.section === "arrivals" || isCategoryView) ? `
            <div class="stock-container" style="margin: 10px 0;">
                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:bold; color:#ff4d4d;">
                    <span>STOCKS LEFT</span><span>${100 - stockPercent}%</span>
                </div>
                <div style="width:100%; background:#eee; height:5px; border-radius:10px; margin-top:3px;">
                    <div style="width:${stockPercent}%; background:#ff4d4d; height:100%; border-radius:10px;"></div>
                </div>
            </div>` : "";

        // 4. Wishlist Check
        const wishlist = JSON.parse(localStorage.getItem("pp_wishlist")) || [];
        const isWishlisted = wishlist.includes(product.id) ? "active" : "";

        const productHTML = `
            <div class="product-card" style="position:relative;">
                <i class="fas fa-heart wishlist-heart ${isWishlisted}" data-id="${product.id}"></i>
                ${badgeHTML}
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
                <h3>${product.name}</h3>
                <div class="price-container">
                    <span class="price" style="color:#007bff; font-weight:bold;">${priceDisplay}</span>
                    ${product.oldPrice ? `<span class="old-price" style="text-decoration:line-through; color:#888; font-size:13px; margin-left:8px;">${oldPriceDisplay}</span>` : ''}
                </div>
                ${stockBarHTML}
                <div class="card-actions" style="display: flex; gap: 8px; margin-top: auto;">
                    <button class="add-to-cart" data-id="${product.id}" style="flex: 1;">Add to Cart</button>
                    ${isCategoryView ? `<button class="buy-now-card-btn" data-id="${product.id}" style="flex: 1; background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; font-weight: bold;">Buy Now</button>` : ''}
                </div>
            </div>`;

        if (categoryGrid) categoryGrid.innerHTML += productHTML;
        else if (product.section === "arrivals" && arrivalsGrid) arrivalsGrid.innerHTML += productHTML;
        else if (product.section === "popular" && popularGrid) popularGrid.innerHTML += productHTML;
    });
}

// ==========================================
// 🎞️ HERO SLIDER & 🔍 SEARCH
// ==========================================
function startHeroSlider() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("slider-dots");
    let currentSlide = 0;
    if (slides.length === 0 || !dotsContainer) return;

    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    let slideTimer = setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

    function goToSlide(index) {
        clearInterval(slideTimer);
        slides[currentSlide].classList.remove("active");
        document.querySelectorAll(".dot")[currentSlide].classList.remove("active");
        currentSlide = index;
        slides[currentSlide].classList.add("active");
        document.querySelectorAll(".dot")[currentSlide].classList.add("active");
        slideTimer = setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);
    }
}

function performSearch() {
    const input = document.getElementById("search-input");
    const query = input ? input.value.toLowerCase().trim() : "";
    if (!query) return showToast("Please enter a search term! 🔍");
    window.location.href = `product.html?search=${encodeURIComponent(query)}`;
}

// ==========================================
// ⏳ FLASH SALE TIMER
// ==========================================
function initFlashSale() {
    const targetDate = new Date("March 30, 2026 23:59:59").getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) {
            clearInterval(timer);
            const el = document.getElementById("countdown");
            if (el) el.innerHTML = "<h2 style='color:white;'>SALE ENDED</h2>";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = d.toString().padStart(2, '0');
            document.getElementById("hours").innerText = h.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
        }
    }, 1000);
}

// ==========================================
// 👤 AUTH & HELPERS
// ==========================================
function checkAuthStatus() {
    const guestView = document.getElementById("guest-view");
    const userView = document.getElementById("user-view");
    const currentUser = JSON.parse(localStorage.getItem("purchasepalace_user"));
    if (!guestView || !userView) return;

    if (currentUser) {
        guestView.style.display = "none";
        userView.style.display = "block";
        userView.querySelector(".user-btn").textContent = `Hi, ${currentUser.name} ▾`;
    } else {
        guestView.style.display = "block";
        userView.style.display = "none";
    }
}

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? "block" : "none";
    }
}

function toggleCurrency() {
    currentCurrency = currentCurrency === "USD" ? "NGN" : "USD";
    localStorage.setItem("pp_currency", currentCurrency);
    const btn = document.getElementById("currency-toggle");
    if (btn) btn.innerHTML = currentCurrency === "USD" ? "🇺🇸 USD" : "🇳🇬 NGN";
    renderProducts(); 
}

// 📧 NEWSLETTER LOGIC 
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Subscribed successfully! 📧");
            newsletterForm.reset();
        });
    }

// ==========================================
// 🚀 DOM CONTENT LOADED
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartBadge();
    startHeroSlider();
    initFlashSale();
    checkAuthStatus();

    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    const mybutton = document.getElementById("myBtn");
    if (mybutton) {
        window.onscroll = () => mybutton.classList.toggle("show", window.pageYOffset > 300);
        mybutton.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const currBtn = document.getElementById("currency-toggle");
    if (currBtn) currBtn.innerHTML = currentCurrency === "USD" ? "🇺🇸 USD" : "🇳🇬 NGN";
});

// ==========================================
// 🖱️ GLOBAL CLICK DELEGATION
// ==========================================
document.addEventListener("click", (e) => {
    // Wishlist Toggle
    if (e.target.classList.contains("wishlist-heart")) {
        const id = parseInt(e.target.dataset.id);
        let wishlist = JSON.parse(localStorage.getItem("pp_wishlist")) || [];
        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(i => i !== id);
            e.target.classList.remove("active");
            showToast("Removed from Wishlist 💔");
            if (window.location.pathname.includes("wishlist.html")) location.reload();
        } else {
            wishlist.push(id);
            e.target.classList.add("active");
            showToast("Added to Wishlist! ❤️");
        }
        localStorage.setItem("pp_wishlist", JSON.stringify(wishlist));
    }

    // Add to Cart / Buy Now
    if (e.target.classList.contains("add-to-cart") || e.target.classList.contains("buy-now-card-btn")) {
        const id = parseInt(e.target.dataset.id);
        const p = products.find(prod => prod.id === id);
        if (p) {
            cart.push(p);
            localStorage.setItem("purchasepalace_cart", JSON.stringify(cart));
            updateCartBadge();
            if (e.target.classList.contains("buy-now-card-btn")) {
                window.location.href = "checkout.html";
            } else {
                showToast("Item added to cart! 🛒");
            }
        }
    }

    // Auth & Search Buttons
    if (e.target.id === "search-btn" || e.target.closest("#search-btn")) performSearch();
    if (e.target.id === "logout-btn") {
        localStorage.removeItem("purchasepalace_user");
        location.reload();
    }
    
    // Hamburger Menu
    if (e.target.closest("#hamburger-btn")) {
        const nav = document.getElementById("nav-links");
        const icon = document.querySelector("#hamburger-btn i");
        const isOpen = nav.classList.toggle("active");
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-times", isOpen);
    }
});

// Search Keypress
const inputField = document.getElementById("search-input");
if (inputField) {
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") performSearch();
    });
}