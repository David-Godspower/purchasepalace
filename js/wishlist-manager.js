document.addEventListener("DOMContentLoaded", () => {
    const wishlistGrid = document.getElementById("wishlist-grid");
    const emptyMsg = document.getElementById("empty-wishlist");

    // 1. Get the list of IDs from LocalStorage
    const wishlistIDs = JSON.parse(localStorage.getItem("pp_wishlist")) || [];

    // 2. Filter the master products array
    const wishlistedProducts = products.filter(p => wishlistIDs.includes(p.id));

    // 3. Handle Empty State
    if (wishlistedProducts.length === 0) {
        if (wishlistGrid) wishlistGrid.style.display = "none";
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    }

    // 4. Render the items using your existing main.js function
    // We temporarily point 'product-grid' to our wishlist-grid ID
    const originalGrid = document.getElementById("product-grid");
    
    // Trick: Create a temporary ID link so renderProducts works
    wishlistGrid.setAttribute("id", "product-grid");
    renderProducts(wishlistedProducts);
});