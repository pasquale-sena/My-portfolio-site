document.addEventListener('DOMContentLoaded', () => {
    
    // --- TYPEWRITER LOGIC (Conditional) ---
    // This code only runs if the .hero-headline element exists on the page.
    const headlineElement = document.querySelector('.hero-headline');
    
    if (headlineElement) {
        // Store original text, removing the <br> marker entirely for single-line typing
        const originalText = headlineElement.innerHTML.replace(/<br>/gi, '').trim();
        
        // Function to simulate typing
        const typeWriter = (element, text, speed = 50) => {
            let i = 0;
            element.innerHTML = ''; // Clear existing content
            element.classList.add('is-visible'); // Ensure it's visually active
            
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        };

        // Activate the typewriter logic immediately on load
        typeWriter(headlineElement, originalText, 50);
    }
    // --- END TYPEWRITER LOGIC ---

    // ----------------------------------------------------
    // 1. MODAL LOGIC (Required for graphic-showcase.html)
    // ----------------------------------------------------

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    // Expose openModal globally (or attach to window) so HTML onclick works
    window.openModal = function(src) {
        if (modal && modalImg) {
            modalImg.src = src;
            modal.classList.add("active");
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.onclick = () => {
            modal.classList.remove("active");
        };
    }
    
    if (modal) {
        // Close modal if user clicks outside the image
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                modal.classList.remove('active');
            }
        });
    }

    // ----------------------------------------------------
    // 2. Reveal Animations (Intersection Observer)
    // ----------------------------------------------------

    const revealElements = document.querySelectorAll('.reveal-text, .dissolve-in, .section-reveal');
    
    // Function to instantly reveal elements that are likely in the initial viewport
    const instantReveal = (elements) => {
        elements.forEach(el => {
            // Check for hero-intro section, which is present on both pages but for different content
            if (el.closest('.hero-intro') || el.closest('.about-hero-section')) {
                // Now, only activate non-typing elements instantly
                if (!el.classList.contains('hero-headline')) {
                    el.classList.add('is-visible');
                }
            }
        });
    };
    
    // Activate the instant reveals based on simplified logic for other pages
    instantReveal(revealElements);

    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Only process elements *not* already revealed
                if (!entry.target.classList.contains('is-visible')) {
                    // Stagger the reveal slightly
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100);
                }
                observerReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Target all elements, including the graphic sections which have 'section-reveal'
    revealElements.forEach(el => observerReveal.observe(el));


    // ----------------------------------------------------
    // 3. PARALLAX LOGIC
    // ----------------------------------------------------
    const bg = document.querySelector('.parallax-bg');
    const mid = document.querySelector('.parallax-mid');
    const fg = document.querySelector('.parallax-fg');

    if (bg && mid && fg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (window.innerWidth > 900) {
                bg.style.transform = `translateY(${scrollY * -0.05}px)`;
                mid.style.transform = `translateY(${scrollY * -0.1}px)`;
            }
        });
    }


    // ----------------------------------------------------
    // 4. Smooth Scroll
    // ----------------------------------------------------
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


    // ----------------------------------------------------
    // 5. AJAX FORM HANDLING (No Redirect)
    // ----------------------------------------------------
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
