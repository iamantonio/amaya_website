/**
 * Amaya Vargas - Youth Soccer Player Portfolio
 * Main JavaScript
 *
 * Features:
 * - Scroll reveal animations
 * - Smooth scrolling navigation
 * - Dynamic navigation background
 * - Mobile navigation toggle
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
        reveals: document.querySelectorAll('.reveal'),
        contactForm: document.querySelector('.contact-form'),
        smoothScrollLinks: document.querySelectorAll('a[href^="#"]'),
        statValues: document.querySelectorAll('[data-count]')
    };

    /**
     * Configuration
     */
    const config = {
        revealPoint: 150,
        navScrollThreshold: 100,
        navStyles: {
            default: {
                background: 'rgba(250, 249, 247, 0.9)',
                boxShadow: 'none'
            },
            scrolled: {
                background: 'rgba(250, 249, 247, 0.98)',
                boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
            }
        }
    };

    /**
     * Scroll Reveal Animation
     * Adds 'active' class to elements when they enter viewport
     */
    function initScrollReveal() {
        function revealOnScroll() {
            elements.reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - config.revealPoint) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll, { passive: true });
        window.addEventListener('load', revealOnScroll);

        // Initial check
        revealOnScroll();
    }

    /**
     * Smooth Scroll Navigation
     * Handles smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        elements.smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Only handle internal links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        // Close mobile nav if open
                        if (elements.mobileMenu && !elements.mobileMenu.classList.contains('hidden')) {
                            elements.mobileMenu.classList.add('hidden');
                            document.body.style.overflow = '';
                            if (elements.navToggle) {
                                const spans = elements.navToggle.querySelectorAll('span');
                                spans[0].style.transform = '';
                                spans[1].style.opacity = '';
                                spans[2].style.transform = '';
                            }
                        }

                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * Dynamic Navigation Background
     * Changes navigation style on scroll
     */
    function initNavScroll() {
        function updateNavStyle() {
            if (window.scrollY > 100) {
                elements.nav.classList.add('bg-navy/95', 'backdrop-blur-md', 'shadow-lg');
            } else {
                elements.nav.classList.remove('bg-navy/95', 'backdrop-blur-md', 'shadow-lg');
            }
        }

        window.addEventListener('scroll', updateNavStyle, { passive: true });
        updateNavStyle();
    }

    /**
     * Mobile Navigation Toggle
     * Handles hamburger menu open/close
     */
    function initMobileNav() {
        if (elements.navToggle && elements.mobileMenu) {
            elements.navToggle.addEventListener('click', () => {
                const isOpen = elements.mobileMenu.classList.contains('hidden');
                elements.mobileMenu.classList.toggle('hidden');
                elements.navToggle.setAttribute('aria-expanded', isOpen);

                // Animate hamburger to X
                const spans = elements.navToggle.querySelectorAll('span');
                if (isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                    document.body.style.overflow = 'hidden';
                } else {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking a link
            elements.mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    elements.mobileMenu.classList.add('hidden');
                    const spans = elements.navToggle.querySelectorAll('span');
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                    document.body.style.overflow = '';
                });
            });
        }
    }

    /**
     * Contact Form Handler
     * Handles form submission with validation
     */
    function initContactForm() {
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', handleFormSubmit);
        }
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Simulate form submission
        // In production, replace this with actual API call
        submitForm(data)
            .then(response => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                e.target.reset();
            })
            .catch(error => {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            });
    }

    /**
     * Validate form data
     * @param {Object} data - Form data object
     * @returns {boolean} - Whether form is valid
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
     * @param {string} email - Email to validate
     * @returns {boolean} - Whether email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Submit form data (placeholder for API integration)
     * @param {Object} data - Form data
     * @returns {Promise} - Promise resolving on success
     */
    function submitForm(data) {
        // Placeholder: Replace with actual API call
        // Example:
        // return fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });

        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 500);
        });
    }

    /**
     * Show notification message
     * @param {string} message - Message to display
     * @param {string} type - Notification type ('success' or 'error')
     */
    function showNotification(message, type = 'success') {
        // Simple alert for now - can be replaced with custom notification UI
        alert(message);

        // TODO: Implement custom notification component
        // Example:
        // const notification = document.createElement('div');
        // notification.className = `notification notification--${type}`;
        // notification.textContent = message;
        // document.body.appendChild(notification);
        // setTimeout(() => notification.remove(), 5000);
    }

    /**
     * Initialize all modules
     */
    function init() {
        initScrollReveal();
        initSmoothScroll();
        initNavScroll();
        initMobileNav();
        initContactForm();

        console.log('Amaya Vargas Portfolio - Initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();