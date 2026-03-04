// ==========================================
// 🛒 PURCHASEPALACE CART LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Get the cart from LocalStorage (or empty array if nothing saved)
  let cart = JSON.parse(localStorage.getItem("purchasepalace_cart")) || [];

  const cartContainer = document.getElementById("cart-items-container");
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");

  // ==========================================
  // ⚙️ RENDER FUNCTION
  // ==========================================
  function renderCart() {
    // Clear the current list
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-shopping-cart" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items yet.</p>
                    <a href="index.html" class="shop-now-btn" style="margin-top: 20px;">Start Shopping</a>
                </div>
            `;
      subtotalElement.textContent = "$0.00";
      totalElement.textContent = "$0.00";
      return;
    }

    // Loop through cart items and build HTML
    cart.forEach((product, index) => {
      totalPrice += product.price;

      const cartItemHTML = `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="item-details">
                        <h3>${product.name}</h3>
                        <p class="price">$${product.price.toLocaleString()}</p>
                        <button class="remove-btn" data-index="${index}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
      cartContainer.innerHTML += cartItemHTML;
    });

    // Update the Order Summary
    subtotalElement.textContent = `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    totalElement.textContent = `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  }

  // ==========================================
  // 🗑️ REMOVE ITEM LOGIC
  // ==========================================
  cartContainer.addEventListener("click", (event) => {
    // Check if the clicked element (or its parent) is a remove button
    const btn = event.target.closest(".remove-btn");

    if (btn) {
      const indexToRemove = parseInt(btn.getAttribute("data-index"));

      // Remove 1 item at that specific index
      cart.splice(indexToRemove, 1);

      // Save the updated list back to LocalStorage
      localStorage.setItem("purchasepalace_cart", JSON.stringify(cart));

      // Update the Red Badge in the header (from main.js)
      if (typeof updateCartBadge === "function") {
        updateCartBadge();
      } else {
        // If main.js isn't loaded correctly, force a reload to fix badge
        window.location.reload();
      }

      // Re-render the cart to show the changes
      renderCart();
    }
  });

  // Initial Render on Page Load
  renderCart();
});
