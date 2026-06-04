# ShopHub - E-Commerce Website

A fully functional static e-commerce website built with HTML, CSS, and JavaScript.

## Features

### Pages
1. **Home (index.html)** - Landing page with featured products and features showcase
2. **Shop (products.html)** - Complete product catalog with category filtering
3. **About (about.html)** - Company information and team details
4. **Contact (contact.html)** - Contact form and business information

### Functionality
- ✅ Add products to cart (stored in browser localStorage)
- ✅ View product details in modal
- ✅ Filter products by category
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Contact form with validation
- ✅ Persistent cart storage
- ✅ Product emoji icons for visual appeal

## File Structure

```
A/
├── index.html              # Home page
├── products.html           # Shop/Products page
├── about.html              # About Us page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # Main stylesheet
└── js/
    ├── products-data.js    # Product data
    ├── main.js             # Core functionality
    ├── shop.js             # Shop page logic
    └── contact.js          # Contact form handling
```

## How to Use

1. **View the website**: Open `index.html` in your web browser
2. **Browse products**: Click "Shop" in the navigation menu
3. **Filter products**: Use the category dropdown on the shop page
4. **Add to cart**: Click "Add to Cart" on any product
5. **View product details**: Click "View" on a product card
6. **Contact us**: Fill out the contact form on the Contact page

## Customization

### Adding Products
Edit `js/products-data.js` and add new objects to the `products` array:

```javascript
{
    id: 9,
    name: "Product Name",
    category: "Category",
    price: 99.99,
    description: "Short description",
    emoji: "🎁",
    details: "Detailed description"
}
```

### Changing Colors
Edit `css/styles.css` and modify the color variables:
- Primary: `#3498db` (blue)
- Accent: `#e74c3c` (red)
- Dark: `#2c3e50` (dark blue-gray)

### Modifying Business Info
Update contact details in:
- `contact.html` - Business information section
- `about.html` - Team section
- Navigation footer in all HTML files

## Features Explanation

### Shopping Cart
- Products are stored in browser's localStorage
- Cart persists across page refreshes
- Cart count displays in navbar

### Product Filtering
- Filter by Electronics, Clothing, Books, or All
- Live filtering without page reload

### Contact Form
- Email validation
- Form submission stored in localStorage
- Success/error messages

## Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Notes
- This is a static website (no backend server)
- Contact form submissions are stored locally in the browser
- For production use, integrate with a backend service
- Cart data is lost when browser data is cleared

## Future Enhancements
- Backend integration for real checkout
- User authentication
- Order history
- Product reviews
- Payment gateway integration
- Admin panel for product management

---

**Created**: 2024 | **Version**: 1.0