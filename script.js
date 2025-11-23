// Function for the Typing effect (Senior Instructional Designer)
function animateTyping() {
    const typeElement = document.querySelector('.type-text');
    if (!typeElement) return;

    // Get original HTML (including <br>) and clean text string for counting
    const fullTextHTML = typeElement.innerHTML;
    const visibleText = fullTextHTML.replace(/<br>/gi, '\n');
    const totalLength = visibleText.length;
    
    // Clear the element before starting
    typeElement.innerHTML = ''; 
    
    // State object for timing control
    const typingState = {
        charIndex: 0,
        lastTimestamp: 0,
        frameTime: 30, // Speed: 30ms per character
    };

    // Make the element visible and start the typing cursor animation
    typeElement.classList.add('is-typing');
    typeElement.style.opacity = '1';

    function step(timestamp) {
        if (!typingState.lastTimestamp) typingState.lastTimestamp = timestamp;
        
        const elapsed = timestamp - typingState.lastTimestamp;

        if (typingState.charIndex < totalLength) {
            
            if (elapsed > typingState.frameTime) {
                // Time for the next character
                let char = visibleText[typingState.charIndex];
                
                if (char === '\n') {
                    typeElement.innerHTML += '<br>';
                } else {
                    typeElement.innerHTML += char;
                }
                typingState.charIndex++;
                typingState.lastTimestamp = timestamp; // Reset timer
            }

            // Continue the animation loop
            requestAnimationFrame(step);

        } else {
            // Animation complete: remove cursor blink border
            setTimeout(() => {
                 typeElement.classList.remove('is-typing');
            }, 50); // Small delay to show final cursor blink
        }
    }

    // Start the animation immediately on load
    requestAnimationFrame(step);
}


document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. START HERO ANIMATIONS ---
    // Removed animateGlitch()
    animateTyping();


    // 1. Reveal Animations
    // NOTE: revealElements selection is simplified for robust loading
    const revealElements = document.querySelectorAll('.about-glass.reveal-text, .section-label.reveal-text, .dissolve-in, .section-reveal');
    
    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Use a standard delay for the projects/sections
                let delay = entry.target.classList.contains('section-reveal') ? 300 : index * 100;

                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay); 
                observerReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observerReveal.observe(el));


    // 2. PARALLAX LOGIC
    const bg = document.querySelector('.parallax-bg');
    const mid = document.querySelector('.parallax-mid');
    const fg = document.querySelector('.parallax-fg');

    if (bg && mid && fg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (window.innerWidth > 900) {
                bg.style.transform = `translateY(${scrollY * -0.05}px)`;
                mid.style.transform = `translateY(${scrollY * -0.1}px)`;
                fg.style.transform = `translateY(${scrollY * -0.15}px)`;
            }
        });
    }


    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#' || !targetId.startsWith('#')) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // 4. AJAX FORM HANDLING (No Redirect)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop the redirect
            
            const status = document.getElementById("my-form-status");
            const data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Message Received! I'll be in touch soon.";
                    status.className = "form-status success";
                    contactForm.reset(); // Clear the form
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form";
                        }
                        status.className = "form-status error";
                    })
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem submitting your form";
                status.className = "form-status error";
            });
        });
    }
});
