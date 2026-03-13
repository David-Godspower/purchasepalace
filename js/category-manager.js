document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    // Convert to lowercase to ensure it matches your database keys
    const categoryQuery = params.get('category')?.toLowerCase();

    const grid = document.getElementById('category-grid');
    const title = document.getElementById('category-title');

    // 1. Filter logic with case-insensitive check
    let filteredProducts = products; 
    
    if (categoryQuery) {
        filteredProducts = products.filter(p => p.category.toLowerCase() === categoryQuery);
        // Formats "baby-products" to "BABY PRODUCTS"
        title.textContent = categoryQuery.replace('-', ' ').toUpperCase();
    }

    // 2. Render logic
    if (filteredProducts.length > 0) {
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="label" style="background: ${product.badge === 'Hot' ? '#ff4d4d' : '#007bff'}">
                        ${product.badge}
                    </span>
                    <p class="price">$${product.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');
    } else {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <h2>No items found in "${categoryQuery}"</h2>
                <p>We're currently restocking this section. Check back soon!</p>
                <a href="index.html" class="cta-btn" style="display:inline-block; margin-top:20px;">Back to Home</a>
            </div>`;
    }
});