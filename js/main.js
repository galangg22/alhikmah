document.addEventListener('DOMContentLoaded', function() {
    console.log('TPQ Al Hikmah Website Loaded Successfully');

    // =======================================================
    // 1. NAVIGASI MOBILE
    // =======================================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (menuBtn && closeBtn && mobileMenu && overlay) {
        // Buka menu
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Mencegah scroll saat menu terbuka
        });

        // Tutup menu (tombol X)
        closeBtn.addEventListener('click', closeMenu);

        // Tutup menu (klik overlay)
        overlay.addEventListener('click', closeMenu);

        // Tutup menu otomatis jika navigasi diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Tutup menu dengan tombol Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Fungsi untuk menutup menu
        function closeMenu() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Kembalikan scroll
        }
    }

    // =======================================================
    // 2. SMOOTH SCROLL OTOMATIS
    // =======================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Offset untuk header fixed
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =======================================================
    // 3. EFEK HEADER SAAT SCROLL
    // =======================================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('bg-white/98');
                header.classList.remove('bg-white/95');
            } else {
                header.classList.add('bg-white/95');
                header.classList.remove('bg-white/98');
            }
        });
    }

    // =======================================================
    // 4. ANIMASI FADE IN SAAT SECTION TERLIHAT
    // =======================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // =======================================================
    // 5. ACCORDION / TOGGLE DETAIL KELAS
    // =======================================================
    window.toggleDetails = function(type) {
        const extraContent = document.getElementById(type + '-extra');
        const button = document.getElementById('btn-' + type);
        if (!extraContent || !button) return;

        const buttonText = button.querySelector('.btn-text');
        const chevron = button.querySelector('.fas');

        if (extraContent.classList.contains('expanded')) {
            extraContent.classList.remove('expanded');
            buttonText.textContent = 'Lihat Lebih Banyak';
            chevron.classList.remove('rotate-180', 'fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        } else {
            extraContent.classList.add('expanded');
            buttonText.textContent = 'Lihat Lebih Sedikit';
            chevron.classList.add('rotate-180', 'fa-chevron-up');
            chevron.classList.remove('fa-chevron-down');
        }
    };
});

// =======================================================
// 6. ANIMASI LOADING HALAMAN
// =======================================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
