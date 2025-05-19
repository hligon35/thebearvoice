// Basic script for future enhancements
document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio website loaded.");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for sticky header height
                    behavior: 'smooth'
                });
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

    // Portfolio audio play buttons
    const playButtons = document.querySelectorAll('.play-audio-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.dataset.targetAudio;
            const audioElement = document.getElementById(audioId);
            if (audioElement) {
                if (audioElement.paused) {
                    // Pause all other audio elements before playing a new one
                    document.querySelectorAll('.portfolio-item audio').forEach(audio => {
                        if (audio !== audioElement) {
                            audio.pause();
                            // Optionally reset other audio elements to the beginning
                            // audio.currentTime = 0;
                        }
                    });
                    audioElement.play();
                    // this.textContent = 'Pause'; // Optional: change button text
                } else {
                    audioElement.pause();
                    // this.textContent = 'Play'; // Optional: change button text
                }
            }
        });
    });

    // Optional: Update button text based on audio state (play/pause events)
    document.querySelectorAll('.portfolio-item audio').forEach(audio => {
        const button = document.querySelector(`.play-audio-button[data-target-audio="${audio.id}"]`);
        if (button) {
            audio.onplay = () => {
                // button.textContent = 'Pause';
            };
            audio.onpause = () => {
                // button.textContent = 'Play';
            };
            audio.onended = () => {
                // button.textContent = 'Play'; // Reset text when audio finishes
            };
        }
    });
});
