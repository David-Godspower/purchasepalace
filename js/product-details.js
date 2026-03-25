document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // 🚪 GATEKEEPER: If we are searching or browsing a category, stop here.
    if (urlParams.has('search') || urlParams.has('category')) {
        const singleView = document.getElementById("single-product-view");
        const categoryView = document.getElementById("category-view");
        if (singleView) singleView.style.display = "none";
        if (categoryView) categoryView.style.display = "block";
        return; 
    }

    // 🔍 DETAIL MODE
    if (productId) {
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            // Update the UI with product data
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
            document.getElementById("main-product-img").src = product.image;
            document.getElementById("product-badge").textContent = product.badge || "";
            document.getElementById("breadcrumb-name").textContent = product.name;

            // --- 🛒 FIX: ADD TO CART BUTTON ---
            const addBtn = document.getElementById("add-to-cart-btn");
            if (addBtn) {
                // Remove any old listeners to prevent double-adding
                addBtn.onclick = () => {
                    // Use the global 'cart' array from main.js
                    cart.push(product);
                    localStorage.setItem("purchasepalace_cart", JSON.stringify(cart));
                    
                    // Visual feedback using your showToast from main.js
                    if (typeof showToast === "function") {
                        showToast(`${product.name} added! 🛒`);
                    }
                    if (typeof updateCartBadge === "function") {
                        updateCartBadge();
                    }
                };
            }

            // --- 💳 FIX: BUY NOW BUTTON ---
            const buyBtn = document.getElementById("buy-now-btn");
            if (buyBtn) {
                buyBtn.onclick = () => {
                    cart.push(product);
                    localStorage.setItem("purchasepalace_cart", JSON.stringify(cart));
                    window.location.href = "checkout.html";
                };
            }
        }
    }
});



