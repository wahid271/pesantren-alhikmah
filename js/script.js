/**
 * PESANTREN MODERN AL-HIKMAH - MAIN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Scroll reveal animation
        revealOnScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Add reveal class to elements that should animate
    function addRevealClasses() {
        const elementsToReveal = document.querySelectorAll(
            '.keunggulan-card, .program-card, .ekstra-card, ' +
            '.galeri-item, .ppdb-info-card, .persyaratan-card, ' +
            '.alur-item, .kontak-info-card'
        );
        
        elementsToReveal.forEach(el => {
            el.classList.add('reveal');
        });
    }

    addRevealClasses();
    revealOnScroll(); // Initial check

    // ============================================
    // STATISTIC COUNTER ANIMATION
    // ============================================
    function animateCounter() {
        const counters = document.querySelectorAll('.statistik-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }

    // Start counter animation when statistik section is in view
    function checkStatistikVisibility() {
        const statistikSection = document.querySelector('.statistik');
        if (statistikSection) {
            const sectionTop = statistikSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                animateCounter();
                window.removeEventListener('scroll', checkStatistikVisibility);
            }
        }
    }

    window.addEventListener('scroll', checkStatistikVisibility);
    checkStatistikVisibility(); // Initial check

    // ============================================
    // GALERI FILTER
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galeriItems = document.querySelectorAll('.galeri-item[data-category]');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galeriItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================
    // LIGHTBOX FUNCTIONALITY
    // ============================================
    let currentImageIndex = 0;
    let lightboxImages = [];

    function updateLightboxImages() {
        lightboxImages = [];
        const visibleItems = document.querySelectorAll('.galeri-item[data-category]:not([style*="display: none"]) .galeri-card');
        
        visibleItems.forEach(item => {
            const title = item.querySelector('.galeri-info h3')?.textContent || '';
            const desc = item.querySelector('.galeri-info p')?.textContent || '';
            lightboxImages.push({
                title: title,
                desc: desc,
                element: item
            });
        });
    }

    window.openLightbox = function(element) {
        updateLightboxImages();
        
        const galeriCard = element.closest('.galeri-card');
        const index = lightboxImages.findIndex(img => img.element === galeriCard);
        
        if (index !== -1) {
            currentImageIndex = index;
            showLightboxImage();
        }

        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    };

    window.changeImage = function(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex < 0) {
            currentImageIndex = lightboxImages.length - 1;
        } else if (currentImageIndex >= lightboxImages.length) {
            currentImageIndex = 0;
        }
        
        showLightboxImage();
    };

    function showLightboxImage() {
        const image = lightboxImages[currentImageIndex];
        document.getElementById('lightboxTitle').textContent = image.title;
        document.getElementById('lightboxDesc').textContent = image.desc;
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        }
        if (event.key === 'ArrowRight') {
            changeImage(1);
        }
    });

    // Close lightbox when clicking outside image
    document.getElementById('lightbox')?.addEventListener('click', function(event) {
        if (event.target === this) {
            closeLightbox();
        }
    });

    // ============================================
    // KONTAK FORM HANDLING
    // ============================================
    const kontakForm = document.getElementById('kontakForm');
    
    if (kontakForm) {
        kontakForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const nama = formData.get('nama');
            const email = formData.get('email');
            const subjek = formData.get('subjek');
            const pesan = formData.get('pesan');

            // Simple validation
            if (!nama || !email || !subjek || !pesan) {
                showFormMessage('Mohon lengkapi semua field yang wajib diisi.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Mohon masukkan alamat email yang valid.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showFormMessage('Pesan Anda telah berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;

        // Style the message
        messageEl.style.cssText = `
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 500;
            animation: fadeInUp 0.3s ease;
            ${type === 'success' 
                ? 'background: #E8F5E9; color: #1B5E20; border: 1px solid #4CAF50;' 
                : 'background: #FFF3F0; color: #C62828; border: 1px solid #EF5350;'}
        `;

        // Insert before form
        const form = document.getElementById('kontakForm');
        form.parentNode.insertBefore(messageEl, form);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === 'index.html' && currentSection === 'hero') {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ============================================
    // INITIALIZATION
    // ============================================
    console.log('Pesantren Modern Al-Hikmah - Website Initialized');
    console.log('© 2026 Pesantren Modern Al-Hikmah. All rights reserved.');
});
