// Intersection Observer for Scroll Animations
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Navbar Scroll & Toggle Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    }

    // Update active nav link based on current page
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });

    // Tech Marquee Clone for seamless loop
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const items = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML += items; // Duplicate items to make scroll seamless
    }

    // Animated Number Counter for Stats
    const counters = document.querySelectorAll('.counter');
    const startCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 100; // Speed of animation

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.getElementById('statsSection');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // FAQ Interactive Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Request Callback Modal Logic
    const modal = document.getElementById('callbackModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const callbackBtn = document.getElementById('submitCallbackBtn');
    
    if (modal) {
        // Show modal after 3.5 seconds
        // DO NOT show if they already submitted their details (localStorage)
        // DO NOT show if they closed it during this browsing session (sessionStorage)
        setTimeout(() => {
            if (!localStorage.getItem('leadCaptured') && !sessionStorage.getItem('callbackModalClosed')) {
                modal.classList.add('active');
            }
        }, 3500);

        // Close modal and prevent showing again this session
        const closeModal = () => {
            modal.classList.remove('active');
            sessionStorage.setItem('callbackModalClosed', 'true');
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close if clicked outside the box
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Handle Submit to WhatsApp
        if (callbackBtn) {
            callbackBtn.addEventListener('click', () => {
                const name = document.getElementById('modalName').value.trim();
                const phone = document.getElementById('modalPhone').value.trim();

                if (!name || !phone) {
                    alert("Please enter your name and mobile number to request a call back.");
                    return;
                }

                // Construct message
                const message = `Hi Kapil! My name is ${name} and my mobile number is ${phone}. I am requesting a call back to discuss your services.`;
                const encodedMessage = encodeURIComponent(message);
                const waUrl = `https://wa.me/919828522814?text=${encodedMessage}`;
                
                // Open WhatsApp
                window.open(waUrl, '_blank');
                
                // Never show this modal again to this user
                localStorage.setItem('leadCaptured', 'true');

                // Close Modal after successful submission
                modal.classList.remove('active');
            });
        }
    }

    // Add Scroll Progress Bar (Design Feature for every page)
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
        progressBar.style.width = scrolled;
    });

    // Custom Interactive Cursor (Animation Feature)
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'custom-cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const animateCursor = () => {
            const distX = mouseX - outlineX;
            const distY = mouseY - outlineY;
            outlineX += distX * 0.15; // easing
            outlineY += distY * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, input, .faq-item, .card, .premium-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }
});
