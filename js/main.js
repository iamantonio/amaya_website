/**
 * Amaya Vargas - Youth Soccer Player Portfolio
 * Premium Sports Editorial JavaScript
 *
 * Features:
 * - Scroll progress indicator
 * - Enhanced scroll reveal animations
 * - Animated stat counters
 * - Smooth scrolling navigation
 * - Dynamic navigation background
 * - Mobile navigation toggle
 * - Title underline animations
 * - Contact form handling
 */

(function() {
    'use strict';

    /**
     * DOM Elements
     */
    const elements = {
        nav: document.getElementById('nav'),
        navToggle: document.getElementById('nav-toggle'),
        navLinks: document.getElementById('nav-links'),
        mobileMenu: document.getElementById('mobile-menu'),
        scrollProgress: document.getElementById('scroll-progress'),
        reveals: document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale'),
        titleUnderlines: document.querySelectorAll('.title-underline'),
        statCounters: document.querySelectorAll('.stat-counter'),
        contactForm: document.querySelector('.contact-form'),
        smoothScrollLinks: document.querySelectorAll('a[href^="#"]')
    };

    /**
     * Configuration
     */
    const config = {
        revealThreshold: 0.15,
        counterDuration: 2000,
        counterEasing: 'easeOutExpo'
    };

    /**
     * Easing functions for animations
     */
    const easings = {
        easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
        easeOutCubic: (t) => 1 - Math.pow(1 - t, 3)
    };

    /**
     * Scroll Progress Indicator
     */
    function initScrollProgress() {
        if (!elements.scrollProgress) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            elements.scrollProgress.style.width = `${progress}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /**
     * Intersection Observer for Reveal Animations
     */
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: config.revealThreshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optionally unobserve after revealing
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.reveals.forEach(el => observer.observe(el));
    }

    /**
     * Title Underline Animation
     */
    function initTitleUnderlines() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, 300);
                }
            });
        }, observerOptions);

        elements.titleUnderlines.forEach(el => observer.observe(el));
    }

    /**
     * Animated Stat Counters
     */
    function initStatCounters() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        elements.statCounters.forEach(el => observer.observe(el));
    }

    /**
     * Animate a single counter
     */
    function animateCounter(element) {
        const target = parseInt(element.dataset.count, 10);
        const suffix = element.dataset.suffix || '';
        const duration = config.counterDuration;
        const easing = easings[config.counterEasing];
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const current = Math.round(easedProgress * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    /**
     * Smooth Scroll Navigation
     */
    function initSmoothScroll() {
        elements.smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        // Close mobile nav if open
                        closeMobileNav();

                        // Calculate offset for fixed nav
                        const navHeight = elements.nav ? elements.nav.offsetHeight : 0;
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    /**
     * Dynamic Navigation Background
     */
    function initNavScroll() {
        if (!elements.nav) return;

        function updateNavStyle() {
            if (window.scrollY > 100) {
                elements.nav.classList.add('shadow-lg', 'py-3');
                elements.nav.classList.remove('py-5');
            } else {
                elements.nav.classList.remove('shadow-lg', 'py-3');
                elements.nav.classList.add('py-5');
            }
        }

        window.addEventListener('scroll', updateNavStyle, { passive: true });
        updateNavStyle();
    }

    /**
     * Mobile Navigation Toggle
     */
    function initMobileNav() {
        if (!elements.navToggle || !elements.mobileMenu) return;

        elements.navToggle.addEventListener('click', () => {
            const isOpen = elements.mobileMenu.classList.contains('hidden');

            if (isOpen) {
                openMobileNav();
            } else {
                closeMobileNav();
            }
        });

        // Close menu when clicking a link
        elements.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    function openMobileNav() {
        elements.mobileMenu.classList.remove('hidden');
        elements.navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Animate hamburger to X
        const spans = elements.navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }

    function closeMobileNav() {
        if (!elements.mobileMenu || !elements.navToggle) return;

        elements.mobileMenu.classList.add('hidden');
        elements.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        const spans = elements.navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }

    /**
     * Contact Form Handler
     */
    function initContactForm() {
        if (!elements.contactForm) return;

        elements.contactForm.addEventListener('submit', handleFormSubmit);
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="animate-pulse">Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission
        submitForm(data)
            .then(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                e.target.reset();
            })
            .catch(() => {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }

    /**
     * Validate form data
     */
    function validateForm(data) {
        const { name, email, subject, message } = data;

        if (!name || name.trim().length < 2) {
            showNotification('Please enter a valid name.', 'error');
            return false;
        }

        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        if (!subject || subject.trim().length < 2) {
            showNotification('Please enter a subject.', 'error');
            return false;
        }

        if (!message || message.trim().length < 10) {
            showNotification('Please enter a message (at least 10 characters).', 'error');
            return false;
        }

        return true;
    }

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Submit form data
     */
    function submitForm(data) {
        // Placeholder: Replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 1000);
        });
    }

    /**
     * Show notification message
     */
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `
            fixed bottom-6 right-6 z-[9999] px-6 py-4 rounded-lg shadow-xl
            transform translate-y-full opacity-0
            transition-all duration-400 ease-smooth
            font-heading text-sm
            ${type === 'success' ? 'bg-green-600 text-white' : 'bg-accent-red text-white'}
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateY(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    /**
     * Gallery hover effects
     */
    function initGalleryEffects() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('group');
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('group');
            });
        });
    }

    /**
     * Parallax effect for background elements
     */
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        function updateParallax() {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }

        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    /**
     * Initialize all modules
     */
    function init() {
        initScrollProgress();
        initScrollReveal();
        initTitleUnderlines();
        initStatCounters();
        initSmoothScroll();
        initNavScroll();
        initMobileNav();
        initContactForm();
        initGalleryEffects();
        initParallax();

        console.log('Amaya Vargas Portfolio - Premium Sports Editorial - Initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
