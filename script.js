document.addEventListener('DOMContentLoaded', () => {
    
    // --- TYPEWRITER LOGIC ---
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


    // 1. Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-text, .dissolve-in, .section-reveal');
    
    // Function to instantly reveal elements in the #hero section, bypassing the Intersection Observer
    const instantReveal = (elements) => {
        elements.forEach(el => {
            if (el.closest('#hero')) {
                // Now, only activate non-typing elements instantly
                if (!el.classList.contains('hero-headline')) { 
                    el.classList.add('is-visible');
                }
            }
        });
    };
    
    // Activate the non-typing hero elements immediately upon load
    instantReveal(revealElements);

    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Only process elements *not* already revealed
                if (!entry.target.classList.contains('is-visible')) { 
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100); 
                }
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
