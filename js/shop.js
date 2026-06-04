// Display all products
function displayProducts(productsToDisplay = products) {
    const container = document.getElementById('products-list');
    if (!container) return;

    if (productsToDisplay.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No products found.</p>';
        return;
    }
    
    container.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">\$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-view" onclick="showProductDetail(${product.id})">View</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products by category
function filterByCategory(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    // Display all products initially
    displayProducts(products);
    
    // Set up category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            filterByCategory(e.target.value);
        });
    }
    
    // Update cart count
    updateCartCount();
});