document.addEventListener("DOMContentLoaded", () => {
  // --- JOB 1: LOAD THE CART ---
  // We grab the list from the browser's safe
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("purchasepalace_cart")) || [];
  } catch (error) {
    cart = [];
  }

  const orderList = document.getElementById("order-items-list");
  const totalElement = document.getElementById("checkout-total");
  const checkoutForm = document.getElementById("checkout-form");

  // Safety Check: If cart is empty, kick them back to Home
  if (cart.length === 0) {
    alert("Your cart is empty! Redirecting to home...");
    window.location.href = "index.html";
    return;
  }

  // --- JOB 2 & 3: CALCULATE & RENDER SUMMARY ---
  let total = 0;

  // Clear the list first
  if (orderList) orderList.innerHTML = "";

  cart.forEach((item) => {
    total += item.price;

    // Create a simple text row for each item
    if (orderList) {
      orderList.innerHTML += `
                <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <span>${item.name}</span>
                    <span style="font-weight: bold;">$${item.price.toFixed(2)}</span>
                </div>
            `;
    }
  });

  // Update the Big Total Price
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // --- JOB 4: HANDLE PAYMENT (The "Pay Now" Button) ---
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      // A. STOP the page from reloading (Critical!)
      e.preventDefault();

      const btn = document.querySelector(".place-order-btn");
      const originalText = btn.textContent;

      // B. Simulate "Processing..."
      btn.textContent = "Processing...";
      btn.style.backgroundColor = "#6c757d"; // Grey color
      btn.disabled = true; // Stop double-clicking

      // C. Wait 2 seconds (Fake Payment Delay)
      setTimeout(() => {
        alert("Success! Your order has been placed. 🚀");

        // D. CLEAR THE CART (Wipe the memory)
        localStorage.removeItem("purchasepalace_cart");

        // E. GO HOME
        window.location.href = "index.html";
      }, 2000);
    });
  }
});
