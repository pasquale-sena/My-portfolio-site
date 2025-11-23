document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animations (Text & Buttons)
    const revealElements = document.querySelectorAll('.reveal-text, .dissolve-in');
    
    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                    // Ensure styles apply
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); 
                observerReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observerReveal.observe(el));


    // 2. PARALLAX LOGIC (Only runs if element is visible)
    const tallBg = document.querySelector('.parallax-tall-bg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // This check ensures no errors on mobile when element is hidden
        if (tallBg && tallBg.offsetParent !== null) {
            tallBg.style.transform = `translateY(${scrollY * -0.5}px)`;
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
