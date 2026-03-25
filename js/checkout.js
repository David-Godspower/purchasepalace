document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("purchasepalace_user"));
    if (currentUser) {
        // Auto-fill form if user is logged in
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        if (nameField) nameField.value = currentUser.name || "";
        if (emailField) emailField.value = currentUser.email || "";
    }

    // --- JOB 1: LOAD THE CART ---
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("purchasepalace_cart")) || [];
    } catch (error) {
        cart = [];
    }

    const orderList = document.getElementById("order-items-list");
    const subtotalElement = document.getElementById("checkout-subtotal");
    const savingsElement = document.getElementById("checkout-savings");
    const totalElement = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");

    if (cart.length === 0) {
        alert("Your cart is empty! Redirecting to home...");
        window.location.href = "index.html";
        return;
    }

    // --- JOB 2: CALCULATE & RENDER SUMMARY ---
    let subtotal = 0;
    let totalSavings = 0;

    if (orderList) orderList.innerHTML = "";

    cart.forEach((item) => {
        subtotal += item.price;
        
        // Calculate savings if oldPrice exists
        if (item.oldPrice && item.oldPrice > item.price) {
            totalSavings += (item.oldPrice - item.price);
        }

        if (orderList) {
            orderList.innerHTML += `
                <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <span>${item.name}</span>
                    <span style="font-weight: bold;">$${item.price.toFixed(2)}</span>
                </div>
            `;
        }
    });

    // --- JOB 3: UPDATE THE PRICE LABELS ---
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    
    if (savingsElement) {
        if (totalSavings > 0) {
            savingsElement.textContent = `-$${totalSavings.toFixed(2)}`;
            savingsElement.parentElement.style.display = "flex"; // Show row
        } else {
            savingsElement.parentElement.style.display = "none"; // Hide if no savings
        }
    }

    if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;

    // --- JOB 4: HANDLE PAYMENT ---
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = document.querySelector(".place-order-btn");
            btn.textContent = "Processing Payment...";
            btn.style.backgroundColor = "#6c757d";
            btn.disabled = true;

            setTimeout(() => {
                localStorage.removeItem("purchasepalace_cart");
                window.location.href = "thankyou.html";
            }, 2500);
        });
    }
});

// --- INPUT VALIDATION ---
const cardInput = document.querySelector('input[placeholder="0000 0000 0000 0000"]');
const cvvInput = document.querySelector('input[placeholder="123"]');

[cardInput, cvvInput].forEach(input => {
    if(input) {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
});


const cardNumberInput = document.getElementById("card-number");
const cardIcon = document.getElementById("card-icon");

if (cardNumberInput && cardIcon) {
    cardNumberInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        // --- 1. DETECT BRAND ---
        if (value.startsWith('4')) {
            // VISA starts with 4
            cardIcon.className = "fab fa-cc-visa";
            cardIcon.style.color = "#1a1f71"; // Visa Blue
        } else if (value.match(/^5[1-5]/) || value.match(/^2[2-7]/)) {
            // MASTERCARD starts with 51-55 or 2221-2720
            cardIcon.className = "fab fa-cc-mastercard";
            cardIcon.style.color = "#eb001b"; // Mastercard Red
        } else if (value.startsWith('34') || value.startsWith('37')) {
            // AMEX starts with 34 or 37
            cardIcon.className = "fab fa-cc-amex";
            cardIcon.style.color = "#006fcf"; 
        } else {
            // DEFAULT icon
            cardIcon.className = "fas fa-credit-card";
            cardIcon.style.color = "#ccc";
        }

        // --- 2. AUTO-FORMAT (0000 0000 0000 0000) ---
        // This makes it easier for David to read his card number
        let formattedValue = value.match(/.{1,4}/g);
        if (formattedValue) {
            e.target.value = formattedValue.join(' ');
        }
    });
}