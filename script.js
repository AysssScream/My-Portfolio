// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');

    // Scroll variables
    let lastScroll = 0;
    const scrollThreshold = 50;
    let headerVisible = true;

    // Enhanced Scroll Effect with throttle
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Basic scroll effect
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
            header.style.opacity = '0.98';
        } else {
            header.classList.remove('scrolled');
            header.style.opacity = '1';
        }

        // Hide header when scrolling down rapidly
        if (currentScroll > lastScroll && currentScroll > 150 && headerVisible) {
            header.style.transform = 'translateY(-100%) translateX(-50%)';
            header.style.opacity = '0';
            headerVisible = false;
        } 
        // Show header when scrolling up
        else if (currentScroll < lastScroll && !headerVisible) {
            header.style.transform = 'translateY(0) translateX(-50%)';
            header.style.opacity = '1';
            headerVisible = true;
        }

        // Reset position when at top
        if (currentScroll === 0) {
            header.style.transform = 'translateX(-50%)';
        }

        lastScroll = currentScroll;
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Logo hover effect
    logo.addEventListener('mouseover', () => {
        logo.style.transform = 'scale(1.05)';
        logo.style.transition = 'transform 0.3s ease';
    });

    logo.addEventListener('mouseout', () => {
        logo.style.transform = 'scale(1)';
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initial check for scroll position
    handleScroll();
});


document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        // Show the indicator
        scrollIndicator.classList.remove('hidden');
        
        // Clear the existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a new timeout to hide the indicator
        scrollTimeout = setTimeout(() => {
            scrollIndicator.classList.add('hidden');
        }, 1500);

        const heroSection = document.querySelector('.hero-section');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.pageYOffset > heroBottom - 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.8';
        }
    });
});


