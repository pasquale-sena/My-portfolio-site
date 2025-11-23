// Function for the Glitch effect (Pasquale Sena)
function animateGlitch() {
    const nameElement = document.querySelector('.glitch-text');
    if (!nameElement) return;

    // Start with a small delay for staggered effect
    setTimeout(() => {
        // 1. Initial appearance (opacity transition from CSS is enough here)
        nameElement.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        nameElement.style.opacity = '1';
        nameElement.style.transform = 'translateY(0)';
        
        // 2. Start the glitching animation using the CSS class
        nameElement.classList.add('is-glitching');

        // 3. Stop the glitching after a short time (e.g., 2.5 seconds)
        setTimeout(() => {
            nameElement.classList.remove('is-glitching');
            // Ensure final style is clean
            nameElement.style.animation = 'none';
            nameElement.style.filter = 'drop-shadow(0 0 10px rgba(85, 255, 255, 0.3))';
        }, 2500); 

    }, 300); // 300ms delay for name animation to start
}


// Function for the Typing effect (Senior Instructional Designer)
function animateTyping() {
    const typeElement = document.querySelector('.type-text');
    if (!typeElement) return;

    // Get the full, original text content (including <br>)
    const fullText = typeElement.innerHTML;
    typeElement.innerHTML = ''; // Clear the text to start the animation
    
    // Calculate the total number of characters, replacing <br> with a single "character" step
    const visibleText = fullText.replace(/<br>/gi, '\n');
    const totalLength = visibleText.length;
    let charIndex = 0;
    
    // Add the typing class to enable the cursor blink animation
    typeElement.classList.add('is-typing');
    typeElement.style.opacity = '1';

    function step() {
        if (charIndex < totalLength) {
            // Check if the current "character" is a line break
            if (visibleText[charIndex] === '\n') {
                typeElement.innerHTML += '<br>';
                charIndex++;
            } else {
                // Add the next character
                typeElement.innerHTML += visibleText[charIndex];
                charIndex++;
            }
            // Use a smooth, fast pace
            setTimeout(() => {
                requestAnimationFrame(step);
            }, 30); // Speed of typing (30ms per character)
        } else {
            // Animation complete: remove cursor blink
            typeElement.classList.remove('is-typing');
        }
    }

    // Start the typing animation after the glitch starts
    setTimeout(() => {
        requestAnimationFrame(step);
    }, 700); // 700ms delay to start after the name is mostly visible
}


document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. START HERO ANIMATIONS ---
    animateGlitch();
    animateTyping();


    // 1. Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-text, .dissolve-in, .section-reveal');
    
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
