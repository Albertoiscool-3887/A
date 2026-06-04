// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Create message object
            const contactMessage = {
                name,
                email,
                phone,
                subject,
                message,
                timestamp: new Date().toLocaleString()
            };
            
            // Save to localStorage (in a real app, this would go to a server)
            let messages = JSON.parse(localStorage.getItem('contact_messages')) || [];
            messages.push(contactMessage);
            localStorage.setItem('contact_messages', JSON.stringify(messages));
            
            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Update cart count
    updateCartCount();
});

function showMessage(text, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        formMessage.style.color = type === 'success' ? '#155724' : '#721c24';
        formMessage.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}