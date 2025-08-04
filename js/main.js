document.addEventListener('DOMContentLoaded', function() {
    console.log('TPQ Al Hikmah Website Loaded Successfully');

    // Elemen mobile menu
    const menuBtn    = document.getElementById('mobile-menu-btn');
    const closeBtn   = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // Inisialisasi mobile menu toggle
    if (menuBtn && closeBtn && mobileMenu) {
        // Buka menu
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });

        // Tutup menu (tombol X)
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });

        // Tutup menu otomatis jika navigasi diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Fungsi smooth scroll section (agar tombol di hero tetap lancar)
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if(element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Fungsi toggle expandable detail kelas privat/offline
    window.toggleDetails = function(type) {
        const extraContent = document.getElementById(type + '-extra');
        const button = document.getElementById('btn-' + type);
        if (!extraContent || !button) return;

        const buttonText = button.querySelector('.btn-text');
        const chevron = button.querySelector('.fas');

        if (extraContent.classList.contains('expanded')) {
            // Collapse (tutup)
            extraContent.classList.remove('expanded');
            buttonText.textContent = 'Lihat Lebih Banyak';
            chevron.classList.remove('rotate-180', 'fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        } else {
            // Expand (buka)
            extraContent.classList.add('expanded');
            buttonText.textContent = 'Lihat Lebih Sedikit';
            chevron.classList.add('rotate-180', 'fa-chevron-up');
            chevron.classList.remove('fa-chevron-down');
        }
    };
});
