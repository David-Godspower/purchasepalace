document.addEventListener('DOMContentLoaded', () => {
    
    // STEP 1: READ THE URL
    // We use 'URLSearchParams' to grab the "?id=1" part from the address bar
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); // Convert string "1" to number 1

    // STEP 2: FIND THE PRODUCT
    // We look through the 'products' array (from products.js)
    const product = products.find(p => p.id === productId);

    // STEP 3: UPDATE THE PAGE
    if (product) {
        // A. Set the Image
        // We change the 'src' attribute to load the correct picture
        document.getElementById('product-img').src = product.image;
        document.getElementById('product-img').alt = product.name;

        // B. Set the Text
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('breadcrumb-title').textContent = product.name;
        
        // C. Set the Description
        // If your product has a description in the database, use it. Otherwise, use a default text.
        document.getElementById('product-desc').textContent = product.description || "Experience top-tier performance with this premium product. Designed for durability and style, it is the perfect addition to your collection.";

        // STEP 4: ACTIVATE "ADD TO CART"
        // This is a pro move! We reuse the logic from main.js.
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        
        // We stamp the ID on the button so main.js knows which product to add
        addToCartBtn.setAttribute('data-id', product.id);
        
        // We add the class 'add-to-cart' so the "Manager" in main.js listens to it
        addToCartBtn.classList.add('add-to-cart'); 

    } else {
        // If the ID doesn't exist (e.g. ?id=999)
        document.querySelector('.product-details-container').innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h1>Product Not Found 😕</h1>
                <a href="index.html" class="shop-now-btn">Go Back Home</a>
            </div>
        `;
    }
});