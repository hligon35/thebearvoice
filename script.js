// Basic script for future enhancements
document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio website loaded.");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Basic contact form submission handling (prevents default and logs to console)
    // For a real form, you would send data to a backend or email service.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message || 'Thank you for your message! I will get back to you soon.');
                    this.reset();
                } else {
                    alert(result.message || 'There was an error submitting the form. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        });
    }
});
