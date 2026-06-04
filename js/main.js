// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = count);
}

// Display featured products on home page
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    // Show only first 4 products as featured
    const featured = products.slice(0, 4);
    
    container.innerHTML = featured.map(product => `
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

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Show product detail modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal) return;

    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin: 1rem 0;">${product.emoji}</div>
            <h2>${product.name}</h2>
            <p style="color: #7f8c8d; margin: 0.5rem 0;">${product.category}</p>
            <p style="font-size: 1.8rem; color: #e74c3c; font-weight: bold; margin: 1rem 0;">\$${product.price.toFixed(2)}</p>
            <p style="line-height: 1.8; margin: 1.5rem 0;">${product.description}</p>
            <p style="color: #555; margin: 1rem 0;">${product.details}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal()">Add to Cart</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.style.display = 'none';
}

// Close modal when clicking the X or outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}

const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.onclick = closeModal;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayFeaturedProducts();
});