document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animations
    setTimeout(() => { 
        document.querySelectorAll('.reveal-text').forEach(el => {
            el.style.opacity = '1'; 
            el.style.transform = 'translateY(0)';
        }); 
    }, 500);

    const navButtons = document.querySelectorAll('.button-wrapper');
    navButtons.forEach((button, index) => {
        setTimeout(() => { button.classList.add('is-visible'); }, 1200 + (index * 200));
    });

    // 2. PARALLAX (Updated for the new container)
    const bg = document.querySelector('.parallax-bg');
    const mid = document.querySelector('.parallax-mid');
    const fg = document.querySelector('.parallax-fg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Only move if we are near the top of the page to save performance
        if (scrollY < 800) {
            // Subtle movement is better for smaller graphics
            if(bg) bg.style.transform = `translateY(${scrollY * 0.2}px)`; 
            if(mid) mid.style.transform = `translateY(${scrollY * 0.1}px)`; 
            // Foreground stays mostly still or moves very slightly
            if(fg) fg.style.transform = `translateY(${scrollY * 0.05}px)`; 
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
});
