/* =======================================================
 * TPQ AL HIKMAH - PRODUCTION NAVIGATION SYSTEM
 * Version: 13.0 - PRODUCTION READY & OPTIMIZED
 * Developer: Expert Web Developer for TPQ Al Hikmah
 * ====================================================== */

(() => {
    'use strict';
    
    /* =======================================================
     * GLOBAL STATE & CONFIGURATION
     * ====================================================== */
    
    let menuActive = false;
    let scrollTimeout = null;
    let resizeTimeout = null;
    let isScrolling = false;
    
    const CONFIG = {
        animationDuration: 300,
        scrollDelay: 800,
        resizeDelay: 150,
        mobileBreakpoint: 768,
        tabletBreakpoint: 1024
    };
    
    /* =======================================================
     * PERFORMANCE UTILITIES
     * ====================================================== */
    
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };
    
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    const memoize = (fn) => {
        const cache = new Map();
        return (...args) => {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = fn(...args);
            cache.set(key, result);
            return result;
        };
    };
    
    /* =======================================================
     * INITIALIZATION
     * ====================================================== */
    
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initializeCSS();
            initMobileMenu();
            initNavigation();
            initScrollEffects();
            initAnimations();
            initPerformanceOptimizations();
            initAccessibilityFeatures();
            
            // Initialize after layout stabilizes
            setTimeout(validateSections, 500);
        } catch (error) {
            // Silent error handling in production
            if (window.location.hostname === 'localhost') {
                console.error('TPQ Init Error:', error);
            }
        }
    });
    
    /* =======================================================
     * CRITICAL CSS INJECTION
     * ====================================================== */
    
    function initializeCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile Menu Optimizations */
            .mobile-menu {
                transform: translateX(100%) !important;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                z-index: 9999 !important;
                will-change: transform;
                backface-visibility: hidden;
            }
            
            .mobile-menu.menu-open {
                transform: translateX(0) !important;
            }
            
            .mobile-menu-overlay {
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 9998 !important;
                backdrop-filter: blur(2px);
                will-change: opacity, visibility;
            }
            
            .mobile-menu-overlay.overlay-active {
                opacity: 1;
                visibility: visible;
            }
            
            /* Expandable Content Optimizations */
            .expandable-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                           opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0;
                will-change: max-height, opacity;
            }
            
            .expandable-content.expanded {
                max-height: 1000px !important;
                opacity: 1;
            }
            
            /* Animation Optimizations */
            .rotate-180 {
                transform: rotate(180deg) !important;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform;
            }
            
            /* Scroll Optimizations */
            html {
                scroll-behavior: smooth;
            }
            
            @media (prefers-reduced-motion: reduce) {
                html {
                    scroll-behavior: auto;
                }
                
                .mobile-menu,
                .mobile-menu-overlay,
                .expandable-content,
                .rotate-180 {
                    transition: none !important;
                }
            }
            
            /* Navigation Active States */
            .nav-link.active {
                color: #2e8b57 !important;
            }
            
            .nav-link.active span {
                width: 100% !important;
            }
            
            /* Section Scroll Margin */
            section {
                position: relative;
                display: block !important;
                visibility: visible !important;
                scroll-margin-top: 100px;
            }
            
            /* Loading States */
            .loading {
                pointer-events: none;
                opacity: 0.6;
                transition: opacity 0.2s ease;
            }
            
            /* Focus Management */
            .focus-ring:focus {
                outline: 2px solid #2e8b57;
                outline-offset: 2px;
                box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.1);
            }
            
            /* GPU Acceleration */
            .mobile-menu,
            .mobile-menu-overlay,
            .expandable-content {
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    /* =======================================================
     * DYNAMIC OFFSET CALCULATION
     * ====================================================== */
    
    const getAccurateOffset = memoize(() => {
        const header = document.getElementById('header');
        
        if (!header) return 100;
        
        const headerRect = header.getBoundingClientRect();
        const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
        const isTablet = window.innerWidth < CONFIG.tabletBreakpoint;
        
        let extraPadding = 30; // Desktop default
        if (isMobile) extraPadding = 20;
        else if (isTablet) extraPadding = 25;
        
        return Math.ceil(headerRect.height + extraPadding);
    });
    
    // Clear memoization cache on resize
    const clearOffsetCache = debounce(() => {
        getAccurateOffset.cache?.clear();
    }, CONFIG.resizeDelay);
    
    /* =======================================================
     * NAVIGATION SYSTEM
     * ====================================================== */
    
    function initNavigation() {
        // Main scroll function with optimized positioning
        window.scrollToSection = function(sectionId) {
            if (isScrolling) return false;
            
            const target = document.getElementById(sectionId);
            if (!target) return false;
            
            isScrolling = true;
            
            // Calculate position with high precision
            const targetRect = target.getBoundingClientRect();
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const targetTop = targetRect.top + currentScroll;
            const offset = getAccurateOffset();
            
            let finalPosition = targetTop - offset;
            
            // Boundary checks
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const maxScroll = Math.max(0, documentHeight - windowHeight);
            
            finalPosition = Math.max(0, Math.min(finalPosition, maxScroll));
            
            // Optimized scroll with fallback
            if ('scrollTo' in window && CSS.supports('scroll-behavior', 'smooth')) {
                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback smooth scroll for older browsers
                smoothScrollTo(finalPosition, 800);
            }
            
            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
                
                // Verify and adjust if needed
                const currentPos = window.pageYOffset || document.documentElement.scrollTop;
                const difference = Math.abs(currentPos - finalPosition);
                
                if (difference > 50) {
                    const adjustedPosition = finalPosition + (finalPosition - currentPos);
                    window.scrollTo({
                        top: Math.max(0, Math.min(adjustedPosition, maxScroll)),
                        behavior: 'smooth'
                    });
                }
            }, CONFIG.scrollDelay);
            
            return true;
        };
        
        // Class-specific navigation
        window.scrollToSpecificClass = function(classType) {
            const success = window.scrollToSection('classes');
            if (!success) return false;
            
            setTimeout(() => {
                const classesSection = document.getElementById('classes');
                if (!classesSection) return;
                
                const searchTerm = classType === 'privat' ? 'privat' : 'offline';
                const elements = classesSection.querySelectorAll('div');
                
                for (const element of elements) {
                    const text = element.textContent.toLowerCase();
                    const hasContent = element.offsetHeight > 100 && element.offsetWidth > 100;
                    
                    if (hasContent && text.includes(searchTerm)) {
                        const elementRect = element.getBoundingClientRect();
                        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                        const elementTop = elementRect.top + currentScroll;
                        const offset = getAccurateOffset();
                        const position = Math.max(0, elementTop - offset - 50);
                        
                        window.scrollTo({
                            top: position,
                            behavior: 'smooth'
                        });
                        break;
                    }
                }
            }, CONFIG.scrollDelay + 100);
            
            return true;
        };
        
        // Programs navigation
        window.scrollToPrograms = () => window.scrollToSection('programs');
        
        // Optimized anchor click handling
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            const href = link.getAttribute('href').substring(1);
            
            if (href && document.getElementById(href)) {
                window.scrollToSection(href);
            }
        }, { passive: false });
    }
    
    /* =======================================================
     * MOBILE MENU SYSTEM
     * ====================================================== */
    
    function initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const close = document.getElementById('close-mobile-menu');
        const menu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        
        if (!btn || !menu) return;
        
        const toggleMenu = () => {
            if (menuActive) return;
            menuActive = true;
            
            const isOpen = menu.classList.contains('menu-open');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
            
            setTimeout(() => { menuActive = false; }, CONFIG.animationDuration);
        };
        
        const openMenu = () => {
            document.body.style.overflow = 'hidden';
            menu.classList.add('menu-open');
            overlay?.classList.add('overlay-active');
            
            // Focus management
            const firstLink = menu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        };
        
        const closeMenu = () => {
            document.body.style.overflow = '';
            menu.classList.remove('menu-open');
            overlay?.classList.remove('overlay-active');
            
            // Return focus to button
            btn.focus();
        };
        
        // Event listeners with passive optimization
        btn.addEventListener('click', toggleMenu);
        close?.addEventListener('click', toggleMenu);
        overlay?.addEventListener('click', toggleMenu);
        
        // Auto-close on navigation
        menu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                setTimeout(toggleMenu, 100);
            }
        });
        
        // Keyboard handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
        
        // Touch gesture support
        let touchStartX = 0;
        
        menu.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        menu.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance > 100) { // Swipe right to close
                toggleMenu();
            }
        }, { passive: true });
    }
    
    /* =======================================================
     * SCROLL EFFECTS
     * ====================================================== */
    
    function initScrollEffects() {
        const header = document.getElementById('header');
        if (!header) return;
        
        const handleScroll = throttle(() => {
            try {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollY > 100) {
                    header.classList.add('bg-white/98', 'shadow-lg');
                    header.classList.remove('bg-white/95');
                } else {
                    header.classList.add('bg-white/95');
                    header.classList.remove('bg-white/98', 'shadow-lg');
                }
            } catch (error) {
                // Silent error handling
            }
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    /* =======================================================
     * ANIMATIONS
     * ====================================================== */
    
    function initAnimations() {
        // Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe elements for fade-in animation
            document.querySelectorAll('section, .bg-white').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        }
        
        // Toggle details function
        window.toggleDetails = function(type) {
            const content = document.getElementById(type + '-extra');
            const btn = document.getElementById('btn-' + type);
            
            if (!content || !btn) return;
            
            const textEl = btn.querySelector('.btn-text');
            const iconEl = btn.querySelector('i.fas');
            const isExpanded = content.classList.contains('expanded');
            
            // Add loading state
            btn.classList.add('loading');
            
            setTimeout(() => {
                if (isExpanded) {
                    content.classList.remove('expanded');
                    if (textEl) textEl.textContent = 'Lihat Lebih Banyak';
                    if (iconEl) {
                        iconEl.classList.remove('rotate-180', 'fa-chevron-up');
                        iconEl.classList.add('fa-chevron-down');
                    }
                } else {
                    content.classList.add('expanded');
                    if (textEl) textEl.textContent = 'Lihat Lebih Sedikit';
                    if (iconEl) {
                        iconEl.classList.add('rotate-180', 'fa-chevron-up');
                        iconEl.classList.remove('fa-chevron-down');
                    }
                }
                
                btn.classList.remove('loading');
            }, 50);
        };
    }
    
    /* =======================================================
     * PERFORMANCE OPTIMIZATIONS
     * ====================================================== */
    
    function initPerformanceOptimizations() {
        // Preload critical assets
        const preloadAssets = [
            'image/logo.jpg'
        ];
        
        preloadAssets.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
        
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Connection-aware optimizations
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.documentElement.style.setProperty('--animation-duration', '0.1s');
            }
        }
        
        // Memory cleanup on page unload
        window.addEventListener('beforeunload', () => {
            document.body.style.overflow = '';
            if (scrollTimeout) clearTimeout(scrollTimeout);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        });
    }
    
    /* =======================================================
     * ACCESSIBILITY FEATURES
     * ====================================================== */
    
    function initAccessibilityFeatures() {
        // Skip link for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50 focus-ring';
        skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                width: auto;
                height: auto;
                overflow: visible;
                z-index: 9999;
            `;
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add focus-ring class to interactive elements
        document.querySelectorAll('button, a, input, textarea, select').forEach(element => {
            element.classList.add('focus-ring');
        });
        
        // ARIA live region for dynamic updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }
    
    /* =======================================================
     * SMOOTH SCROLL POLYFILL
     * ====================================================== */
    
    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset || document.documentElement.scrollTop;
        const distance = target - start;
        const startTime = performance.now();
        
        function step(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, start + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    /* =======================================================
     * SECTION VALIDATION
     * ====================================================== */
    
    function validateSections() {
        const sections = ['home', 'about', 'classes', 'programs', 'testimonial', 'teacher-apply', 'location', 'contact', 'gallery'];
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (!element && window.location.hostname === 'localhost') {
                console.warn(`Section missing: ${sectionId}`);
            }
        });
    }
    
    /* =======================================================
     * RESIZE HANDLING
     * ====================================================== */
    
    window.addEventListener('resize', debounce(() => {
        clearOffsetCache();
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= CONFIG.tabletBreakpoint) {
            const menu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('mobile-menu-overlay');
            
            if (menu?.classList.contains('menu-open')) {
                menu.classList.remove('menu-open');
                overlay?.classList.remove('overlay-active');
                document.body.style.overflow = '';
                menuActive = false;
            }
        }
    }, CONFIG.resizeDelay));
    
    /* =======================================================
     * PAGE LOAD OPTIMIZATION
     * ====================================================== */
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loader with fade effect
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 300);
        }
        
        // Announce page ready to screen readers
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = 'Page loaded successfully';
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    });
    
    /* =======================================================
     * ERROR HANDLING
     * ====================================================== */
    
    window.addEventListener('error', function(e) {
        // Only log in development
        if (window.location.hostname === 'localhost') {
            console.error('TPQ Error:', e.message, e.filename, e.lineno);
        }
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        // Only log in development
        if (window.location.hostname === 'localhost') {
            console.error('TPQ Promise Rejection:', e.reason);
        }
    });
    
})();
/* =======================================================
 * NAVBAR MOBILE TEXT FIX - CRITICAL CSS
 * ====================================================== */

function fixMobileNavbarText() {
    const style = document.createElement('style');
    style.textContent = `
        /* CRITICAL: Mobile menu text visibility fix */
        #mobile-menu {
            background: white !important;
            color: #374151 !important;
        }
        
        #mobile-menu ul {
            background: transparent !important;
        }
        
        #mobile-menu li a {
            color: #374151 !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            padding: 12px 8px !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
            line-height: 1.5 !important;
        }
        
        #mobile-menu li a:hover {
            background: #f3f4f6 !important;
            color: #2e8b57 !important;
            transform: translateX(4px) !important;
        }
        
        #mobile-menu li a i {
            color: #2e8b57 !important;
            font-size: 18px !important;
            margin-right: 12px !important;
            min-width: 20px !important;
            display: inline-block !important;
        }
        
        /* Menu header */
        #mobile-menu .flex.justify-between {
            background: #f8fafc !important;
            border-bottom: 1px solid #e5e7eb !important;
        }
        
        #mobile-menu h3 {
            color: #2e8b57 !important;
            font-size: 18px !important;
            font-weight: bold !important;
        }
        
        #close-mobile-menu {
            color: #6b7280 !important;
            font-size: 20px !important;
        }
        
        #close-mobile-menu:hover {
            color: #374151 !important;
            background: #f3f4f6 !important;
        }
        
        /* Ensure visibility on all devices */
        @media (max-width: 768px) {
            #mobile-menu li a {
                font-size: 15px !important;
                padding: 14px 12px !important;
            }
            
            #mobile-menu li a i {
                font-size: 16px !important;
                margin-right: 10px !important;
            }
        }
        
        /* Fix for small screens */
        @media (max-width: 480px) {
            #mobile-menu {
                width: 280px !important;
            }
            
            #mobile-menu li a {
                font-size: 14px !important;
                padding: 12px 10px !important;
            }
        }
        
        /* Override any conflicting styles */
        #mobile-menu * {
            box-sizing: border-box !important;
        }
        
        /* Ensure text is selectable and visible */
        #mobile-menu li a span,
        #mobile-menu li a {
            -webkit-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
            text-size-adjust: 100% !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(style);
}

// Panggil function saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    fixMobileNavbarText();
});


/* =======================================================
 * END OF TPQ AL HIKMAH PRODUCTION SCRIPT
 * ====================================================== */
