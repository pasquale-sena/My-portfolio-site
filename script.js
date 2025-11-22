document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Hero Content Reveal (Title, Subtitle, About)
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const aboutBlurb = document.querySelector('.about-hero-blurb');
    const navButtons = document.querySelectorAll('.dissolve-in');

    // Reveal Title
    setTimeout(() => {
        heroTitle.style.opacity = 1;
        heroTitle.style.transform = 'translateY(0)';
    }, 500);

    // Reveal Subtitle
    setTimeout(() => {
        heroSubtitle.style.opacity = 1;
        heroSubtitle.style.transform = 'translateY(0)';
    }, 1000);

    // Reveal About Blurb
    setTimeout(() => {
        aboutBlurb.classList.add('is-visible');
    }, 1500);

    // Dissolve in the buttons sequentially
    navButtons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('is-visible');
        }, 2000 + (index * 300)); // Delay each button by 300ms
    });

    // 2. Parallax Effect on Scroll
    const bg = document.querySelector('.parallax-bg');
    const mid = document.querySelector('.parallax-mid');
    const fg = document.querySelector('.parallax-fg');

    window.addEventListener('scroll', () => {
        // Use the vertical scroll position of the entire window
        const scrollY = window.scrollY;

        // **FIXED:** Layers now move using negative multipliers (-X)
        // This ensures they move UP as the user scrolls DOWN, creating the depth illusion.
        // Adjust the absolute value (0.4, 0.7, 1.0) to control speed differential.
        bg.style.transform = `translateY(${scrollY * -0.4}px)`; 
        mid.style.transform = `translateY(${scrollY * -0.7}px)`; 
        fg.style.transform = `translateY(${scrollY * -1.0}px)`; 
    });

    // 3. Smooth Scroll for Navigation Buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Scroll Reveal for Project Sections (Intersection Observer)
    const sections = document.querySelectorAll('.section-reveal');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
