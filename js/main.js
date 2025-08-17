/* =======================================================
 * TPQ AL HIKMAH - CLEAN VERSION (NO GREEN EFFECTS)
 * Version: 8.2 - Clean & Elegant
 * ====================================================== */

(() => {
    'use strict';
    
    let menuActive = false;
    
    // Initialize when DOM ready
    document.addEventListener('DOMContentLoaded', init);
    
    function init() {
        try {
            initMobileMenu();
            initHeroNav();
            initScrollEffects();
            initAnimations();
        } catch (error) {
            console.warn('TPQ Init Error:', error);
        }
    }
    
    /* =======================================================
     * MOBILE MENU - STABLE VERSION
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
            
            const isOpen = menu.classList.contains('active');
            
            if (isOpen) {
                document.body.style.overflow = '';
                menu.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            } else {
                document.body.style.overflow = 'hidden';
                menu.classList.add('active');
                if (overlay) overlay.classList.add('active');
            }
            
            setTimeout(() => menuActive = false, 300);
        };
        
        btn.addEventListener('click', toggleMenu);
        if (close) close.addEventListener('click', toggleMenu);
        if (overlay) overlay.addEventListener('click', toggleMenu);
        
        // Auto-close on link click
        menu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                setTimeout(toggleMenu, 100);
            }
        });
        
        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
    
    /* =======================================================
     * HERO NAVIGATION - CLEAN VERSION (NO GREEN EFFECTS)
     * ====================================================== */
    
    function initHeroNav() {
        // Global functions
        window.scrollToSpecificClass = (classType) => {
            try {
                const target = document.getElementById('classes') || document.getElementById('programs');
                if (!target) return;
                
                const header = document.getElementById('header');
                const offset = (header ? header.offsetHeight : 80) + 30;
                
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // FIXED: Hanya scroll tanpa highlight hijau
                setTimeout(() => focusOnCard(classType), 600);
            } catch (error) {
                console.warn('ScrollToSpecificClass Error:', error);
            }
        };
        
        window.scrollToPrograms = () => {
            try {
                const target = document.getElementById('programs');
                if (!target) return;
                
                const header = document.getElementById('header');
                const offset = (header ? header.offsetHeight : 80) + 20;
                
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.warn('ScrollToPrograms Error:', error);
            }
        };
        
        window.scrollToSection = (id) => {
            try {
                const target = document.getElementById(id);
                if (!target) return;
                
                const header = document.getElementById('header');
                const offset = (header ? header.offsetHeight : 80) + 20;
                
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.warn('ScrollToSection Error:', error);
            }
        };
        
        window.navigateToClass = window.scrollToSpecificClass;
    }
    
    // FIXED: Clean focus function tanpa efek hijau yang mengganggu
    function focusOnCard(type) {
        try {
            let card = document.querySelector(`[data-class="${type}"]`);
            
            if (!card) {
                const searchTerms = type === 'privat' ? 
                    ['privat', 'individual', 'personal'] : 
                    ['offline', 'kelompok', 'group'];
                
                const containers = [
                    document.getElementById('classes'), 
                    document.getElementById('programs')
                ].filter(Boolean);
                
                for (const container of containers) {
                    const elements = container.querySelectorAll('div');
                    
                    for (const el of elements) {
                        if (el.offsetHeight > 100 && el.offsetWidth > 200) {
                            const text = el.textContent.toLowerCase();
                            if (searchTerms.some(term => text.includes(term))) {
                                card = el;
                                break;
                            }
                        }
                    }
                    if (card) break;
                }
            }
            
            if (card) {
                // FIXED: Hanya scroll ke center tanpa efek visual apapun
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // REMOVED: Semua styling hijau yang mengganggu
                // Tidak ada border, shadow, atau transform
            }
        } catch (error) {
            console.warn('Focus Error:', error);
        }
    }
    
    /* =======================================================
     * SCROLL EFFECTS - STABLE
     * ====================================================== */
    
    function initScrollEffects() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let ticking = false;
        
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            
            requestAnimationFrame(() => {
                try {
                    if (window.scrollY > 100) {
                        header.classList.add('bg-white/98', 'shadow-lg');
                        header.classList.remove('bg-white/95');
                    } else {
                        header.classList.add('bg-white/95');
                        header.classList.remove('bg-white/98', 'shadow-lg');
                    }
                } catch (error) {
                    console.warn('Header scroll error:', error);
                }
                ticking = false;
            });
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Anchor link handling
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    const offset = (header.offsetHeight || 80) + 20;
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    /* =======================================================
     * ANIMATIONS - STABLE
     * ====================================================== */
    
    function initAnimations() {
        // Intersection Observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('section').forEach((section) => {
                observer.observe(section);
            });
        }
        
        // Accordion function
        window.toggleDetails = (type) => {
            try {
                const content = document.getElementById(type + '-extra');
                const btn = document.getElementById('btn-' + type);
                if (!content || !btn) return;
                
                const text = btn.querySelector('.btn-text');
                const icon = btn.querySelector('.fas');
                const isExpanded = content.classList.contains('expanded');
                
                if (isExpanded) {
                    content.classList.remove('expanded');
                    if (text) text.textContent = 'Lihat Lebih Banyak';
                    if (icon) {
                        icon.classList.remove('rotate-180', 'fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                } else {
                    content.classList.add('expanded');
                    if (text) text.textContent = 'Lihat Lebih Sedikit';
                    if (icon) {
                        icon.classList.add('rotate-180', 'fa-chevron-up');
                        icon.classList.remove('fa-chevron-down');
                    }
                }
            } catch (error) {
                console.warn('Toggle details error:', error);
            }
        };
    }
    
    /* =======================================================
     * UTILITIES & SHORTCUTS
     * ====================================================== */
    
    // Toast notification
    window.showToast = (message, type = 'info', duration = 3000) => {
        try {
            const existing = document.querySelector('.toast-notification');
            if (existing) existing.remove();
            
            const colors = {
                success: '#10b981',
                error: '#ef4444', 
                warning: '#f59e0b',
                info: '#3b82f6'
            };
            
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.textContent = message;
            
            Object.assign(toast.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: colors[type] || colors.info,
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                zIndex: '9999',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease'
            });
            
            document.body.appendChild(toast);
            
            requestAnimationFrame(() => {
                toast.style.transform = 'translateX(0)';
            });
            
            setTimeout(() => {
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }, duration);
            
        } catch (error) {
            console.warn('Toast error:', error);
        }
    };
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea, select')) return;
        
        if (e.ctrlKey || e.metaKey) {
            const keyMap = {
                '1': 'home',
                '2': 'classes', 
                '3': 'programs',
                '4': 'about',
                '5': 'contact'
            };
            
            if (keyMap[e.key]) {
                e.preventDefault();
                window.scrollToSection(keyMap[e.key]);
            }
        }
        
        if (e.shiftKey) {
            if (e.key === 'P') {
                e.preventDefault();
                window.scrollToSpecificClass('privat');
            }
            if (e.key === 'O') {
                e.preventDefault();
                window.scrollToSpecificClass('offline');
            }
        }
    });
    
    /* =======================================================
     * PAGE LOAD
     * ====================================================== */
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 300);
        }
    });
    
    // Global error handler
    window.addEventListener('error', (e) => {
        console.warn('JS Error caught:', e.message);
    });
    
})();
