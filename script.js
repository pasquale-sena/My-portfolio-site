document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animations (Text & Buttons)
    const revealElements = document.querySelectorAll('.reveal-text, .dissolve-in');
    
    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // We add the class and let CSS handle the transition
                // This prevents JS from fighting with your CSS styles
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); 
                observerReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observerReveal.observe(el));


    // 2. PARALLAX LOGIC (Left Sidebar - 3 Layers)
    const bg = document.querySelector('.parallax-bg');
    const mid = document.querySelector('.parallax-mid');
    const fg = document.querySelector('.parallax-fg');

    // Only add the event listener if the elements actually exist
    if (bg && mid && fg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Only run parallax on desktop (where sidebar is visible)
            if (window.innerWidth > 900) {
                // Use negative values to move layers UP as you scroll DOWN
                bg.style.transform = `translateY(${scrollY * -0.05}px)`; // Slowest
                mid.style.transform = `translateY(${scrollY * -0.1}px)`;
                fg.style.transform = `translateY(${scrollY * -0.15}px)`; // Fastest
            }
        });
    }


    // 3. Smooth Scroll (With Safety Check)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip empty links
            if(targetId === '#') return;

            const target = document.querySelector(targetId);
            
            // Only prevent default if the target actually exists on this page
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // 4. Section Scroll Reveal
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-reveal').forEach(section => {
        sectionObserver.observe(section);
    });
});
