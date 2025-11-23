document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animations (Text & Buttons)
    const revealElements = document.querySelectorAll('.reveal-text, .dissolve-in');
    
    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
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

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Only run parallax on desktop (where sidebar is visible)
        if (window.innerWidth > 900) {
            // Use negative values to move layers UP as you scroll DOWN
            // Speeds are subtle for long scrolling
            if(bg) bg.style.transform = `translateY(${scrollY * -0.05}px)`; // Slowest
            if(mid) mid.style.transform = `translateY(${scrollY * -0.1}px)`;
            if(fg) fg.style.transform = `translateY(${scrollY * -0.15}px)`; // Fastest
        }
    });


    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
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
