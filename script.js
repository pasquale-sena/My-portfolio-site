document.addEventListener('DOMContentLoaded', () => {
    
    // --- NEW TYPEWRITER LOGIC ---
    const headlineElement = document.querySelector('.hero-headline');
    
    if (headlineElement) {
        // Store original text, removing the <br> marker logic completely
        const originalText = headlineElement.innerHTML.replace(/<br>/gi, '').trim();
        
        // Function to simulate typing
        const typeWriter = (element, text, speed = 50) => {
            let i = 0;
            element.innerHTML = ''; // Clear existing content
            element.classList.add('is-visible'); // Ensure it's visually active
            
            function typing() {
                if (i < text.length) {
                    
                    // The line break check logic is REMOVED.
                    // It will simply type the next character.
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


    // 1. Reveal Animations (Text & Buttons)
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

        // --- MODAL (LIGHTBOX) LOGIC ---
    
    // Select modal elements once
    const modal = document.getElementById('image-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const closeBtn = modal ? document.getElementById('modal-close-btn') : null;
    
    // Function to open the modal
    window.openModal = function(src) {
        if (!modal || !modalContent) return;
        
        // Create new image element
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Full Graphic View";
        
        // Clear previous content and insert new image
        modalContent.innerHTML = '';
        modalContent.appendChild(img);
        modalContent.appendChild(closeBtn); // Reinsert close button
        
        modal.classList.add('open');
    };
    
    // Function to close the modal
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        // Optional: clear image source
        setTimeout(() => { modalContent.innerHTML = ''; }, 300);
    }
    
    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        // Close when clicking outside the image content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Ensure close button exists even if modal content is cleared
    if (modalContent && !modalContent.querySelector('#modal-close-btn')) {
        const tempBtn = document.createElement('button');
        tempBtn.id = 'modal-close-btn';
        tempBtn.className = 'modal-close';
        tempBtn.innerHTML = '&times;';
        tempBtn.addEventListener('click', closeModal);
        modalContent.appendChild(tempBtn); 
    }
}); 
// End DOMContentLoaded
