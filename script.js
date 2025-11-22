console.log("Script loaded successfully!"); // DEBUG CHECK

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hero Animations
    setTimeout(() => { document.querySelector('.hero-title').style.opacity = 1; document.querySelector('.hero-title').style.transform = 'translateY(0)'; }, 500);
    setTimeout(() => { document.querySelector('.hero-subtitle').style.opacity = 1; document.querySelector('.hero-subtitle').style.transform = 'translateY(0)'; }, 1000);
    setTimeout(() => { document.querySelector('.about-hero-blurb').classList.add('is-visible'); }, 1500);
    
    const navButtons = document.querySelectorAll('.button-wrapper'); // Note: changed class selector slightly for robustness
    navButtons.forEach((button, index) => {
        setTimeout(() => { button.classList.add('is-visible'); }, 2000 + (index * 300));
    });

    // 2. PARALLAX LOGIC
    const bg = document.querySelector('.parallax-bg');
    const mid = document.querySelector('.parallax-mid');
    const fg = document.querySelector('.parallax-fg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // If these logs appear in your console as you scroll, the code is working!
        // console.log("Scrolling:", scrollY); 

        // Move layers at different speeds
        // The 'Me' layer (fg) moves slowest to stay anchored longer, background moves fastest
        if(bg) bg.style.transform = `translateY(${scrollY * 0.5}px)`; 
        if(mid) mid.style.transform = `translateY(${scrollY * 0.2}px)`; 
        if(fg) fg.style.transform = `translateY(${scrollY * 0.05}px)`; 
    });

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. Section Reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-reveal').forEach(section => {
        observer.observe(section);
    });
});
