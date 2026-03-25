document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get("category");
  const searchQuery = urlParams.get("search"); // Add this line
  const productGrid = document.getElementById("product-grid");

  if (!productGrid || (!categoryFilter && !searchQuery)) return;

  let filteredProducts = [];

  // Logic for Category
  if (categoryFilter) {
    filteredProducts = products.filter((p) => p.category === categoryFilter);
    const title = document.getElementById("category-title");
    if (title) title.textContent = categoryFilter.toUpperCase();
  } 
  // Logic for Search
  else if (searchQuery) {
    const term = searchQuery.toLowerCase();
    filteredProducts = products.filter((p) => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );
    const title = document.getElementById("category-title");
    if (title) title.textContent = `SEARCH RESULTS FOR: "${searchQuery.toUpperCase()}"`;
  }

  // CHECK: Render items or show empty state
  if (filteredProducts.length > 0) {
    renderProducts(filteredProducts);
  } else {
    productGrid.innerHTML = `
        <div class="empty-state" style="text-align: center; width: 100%; padding: 50px;">
            <i class="fas fa-search-minus" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
            <h2>No results found for "${searchQuery || categoryFilter}"</h2>
            <p>Try a different keyword or check your spelling.</p>
            <a href="index.html" class="cta-btn" style="margin-top: 20px; display: inline-block;">Back to Shopping</a>
        </div>
    `;
  }
});