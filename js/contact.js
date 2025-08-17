/* =======================================================
 * TPQ AL HIKMAH - COMPLETE WHATSAPP CONTACT SYSTEM
 * Version: 8.0 - FULL VERSION WITH CLICKABLE LINKS FIX
 * ====================================================== */

(() => {
    'use strict';
    
    /* =======================================================
     * CONFIGURATION & CONSTANTS
     * ====================================================== */
    
    const CONFIG = {
        whatsappNumber: '6285183279603',
        baseUrl: 'https://wa.me/6285183279603?text=',
        colors: {
            primary: '#2e8b57',
            secondary: '#20b2aa',
            success: '#25d366',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        }
    };
    
    /* =======================================================
     * INITIALIZATION & CSS FIXES
     * ====================================================== */
    
    document.addEventListener('DOMContentLoaded', function() {
        addModalFixCSS();
        initializeContactSystem();
    });
    
    function addModalFixCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fix SweetAlert2 z-index issues */
            .swal2-container {
                z-index: 20000 !important;
            }
            
            .swal2-popup {
                z-index: 20001 !important;
            }
            
            .swal2-backdrop-show {
                z-index: 19999 !important;
            }
            
            /* Fix clickable links in modal */
            .swal2-html-container a {
                cursor: pointer !important;
                pointer-events: auto !important;
                text-decoration: underline !important;
                color: #25D366 !important;
                font-weight: bold !important;
                transition: all 0.3s ease;
            }
            
            .swal2-html-container a:hover {
                color: #128C7E !important;
                text-decoration: underline !important;
                transform: scale(1.05);
            }
            
            /* Custom button styles in modals */
            .wa-btn-modal {
                background: linear-gradient(135deg, #25D366, #128C7E) !important;
                color: white !important;
                border: none !important;
                padding: 12px 24px !important;
                border-radius: 25px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-decoration: none !important;
                margin: 10px 0 !important;
            }
            
            .wa-btn-modal:hover {
                background: linear-gradient(135deg, #128C7E, #25D366) !important;
                transform: scale(1.05) !important;
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3) !important;
            }
            
            .wa-btn-modal i {
                margin-right: 8px !important;
                font-size: 18px !important;
            }
            
            /* Custom info boxes */
            .info-box {
                border-left: 4px solid #3498db;
                background: #ebf3fd;
                padding: 16px;
                border-radius: 0 8px 8px 0;
                margin: 16px 0;
            }
            
            .warning-box {
                border-left: 4px solid #f39c12;
                background: #fef9e7;
                padding: 16px;
                border-radius: 0 8px 8px 0;
                margin: 16px 0;
            }
            
            .success-box {
                border-left: 4px solid #27ae60;
                background: #eafaf1;
                padding: 16px;
                border-radius: 0 8px 8px 0;
                margin: 16px 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    function initializeContactSystem() {
        // Initialize any additional contact system features
        console.log('TPQ Contact System initialized');
    }
    
    /* =======================================================
     * DEVICE DETECTION & UTILITIES
     * ====================================================== */
    
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    function createWhatsAppURL(message) {
        try {
            const encodedMessage = encodeURIComponent(message);
            return CONFIG.baseUrl + encodedMessage;
        } catch (error) {
            console.warn('Error creating WhatsApp URL:', error);
            return CONFIG.baseUrl;
        }
    }
    
    function openWhatsApp(message) {
        const url = createWhatsAppURL(message);
        
        if (isMobile()) {
            window.location.href = url;
        } else {
            try {
                const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
                
                setTimeout(() => {
                    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                        window.location.href = url;
                    }
                }, 500);
                
            } catch (error) {
                window.location.href = url;
            }
        }
        
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'WhatsApp Terbuka!',
                text: 'Pesan Anda akan segera terkirim',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }, 800);
    }
    
    /* =======================================================
     * VALIDATION FUNCTIONS
     * ====================================================== */
    
    function validateWhatsAppNumber(number) {
        const cleanNumber = number.replace(/[\s\-\(\)]/g, '');
        const waRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
        return waRegex.test(cleanNumber);
    }
    
    function validateRequiredFields(fields) {
        let isValid = true;
        const missingFields = [];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                    missingFields.push(fieldId);
                    isValid = false;
                } else {
                    field.style.borderColor = '#10b981';
                    field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }
            }
        });
        
        return { isValid, missingFields };
    }
    
    /* =======================================================
     * INPUT HELPERS
     * ====================================================== */
    
    async function getInput(title, placeholder, inputType = 'text', validationFn = null) {
        const result = await Swal.fire({
            title,
            input: inputType,
            inputPlaceholder: placeholder,
            showCancelButton: true,
            confirmButtonColor: CONFIG.colors.primary,
            cancelButtonColor: CONFIG.colors.error,
            confirmButtonText: 'Lanjutkan',
            cancelButtonText: 'Batal',
            inputValidator: (value) => {
                if (!value) {
                    return 'Input tidak boleh kosong!';
                }
                if (validationFn && !validationFn(value)) {
                    return 'Format input tidak valid!';
                }
                return null;
            },
            customClass: {
                container: 'swal-high-zindex'
            }
        });
        
        if (!result.isConfirmed) {
            await Swal.fire({
                title: 'Dibatalkan',
                text: 'Aksi telah dibatalkan.',
                icon: 'info',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            return null;
        }
        return result.value.trim();
    }
    
    /* =======================================================
     * TEACHER APPLICATION SYSTEM
     * ====================================================== */
    
    async function showTeacherOptions() {
        const teacherType = await Swal.fire({
            title: '👨‍🏫 Pilih Jenis Guru Pengajar',
            text: 'Silakan pilih posisi yang Anda inginkan:',
            input: 'radio',
            inputOptions: {
                'tahfidz': '🕌 Guru Tahfidz (Hafal 30 Juz lengkap)',
                'jilid': '📖 Guru Jilid (Hafal minimal Juz 30)'
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'Silakan pilih jenis guru yang diinginkan!';
                }
            },
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-arrow-right mr-2"></i>Lanjutkan',
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Batal',
            confirmButtonColor: CONFIG.colors.primary,
            cancelButtonColor: CONFIG.colors.error,
            width: '500px',
            customClass: {
                container: 'swal-high-zindex'
            }
        });

        if (teacherType.isConfirmed) {
            if (teacherType.value === 'tahfidz') {
                return await handleTahfidzTeacher();
            } else if (teacherType.value === 'jilid') {
                return await handleJilidTeacher();
            }
        }
        
        return null;
    }
    
    async function handleTahfidzTeacher() {
        const steps = [
            { title: 'Nama Lengkap Anda', placeholder: 'Contoh: Ustadz Ahmad Fauzan, S.Pd.I' },
            { title: 'Pendidikan Terakhir', placeholder: 'Contoh: S1 Pendidikan Agama Islam / Pesantren Al-Azhar' },
            { title: 'Pengalaman Mengajar Tahfidz', placeholder: 'Contoh: 5 tahun mengajar tahfidz di Ponpes Al-Ikhlas' },
            { title: 'Detail Hafalan Al-Qur\'an', placeholder: 'Contoh: 30 Juz dengan sanad dari Syekh Abdullah, ijazah tahfidz tahun 2020' },
            { title: 'Metode Tahfidz yang Dikuasai', placeholder: 'Contoh: Metode Tilawati, Yanbu\'a, One Day One Ayat, dll.' }
        ];
        
        const data = {};
        const stepKeys = ['nama', 'pendidikan', 'pengalaman', 'hafalanDetail', 'metodeTahfidz'];
        
        for (let i = 0; i < steps.length; i++) {
            const input = await getInput(
                `${i + 1}/5 - ${steps[i].title}`,
                steps[i].placeholder
            );
            
            if (!input) return null;
            data[stepKeys[i]] = input;
        }
        
        const accepted = await confirmTahfidzTerms();
        if (!accepted) {
            await Swal.fire({
                title: 'Pendaftaran Dibatalkan',
                text: 'Anda harus memenuhi semua persyaratan untuk mendaftar sebagai Guru Tahfidz.',
                icon: 'warning',
                confirmButtonColor: CONFIG.colors.warning
            });
            return null;
        }

        const message = createTahfidzMessage(data);
        openWhatsApp(message);
        
        await Swal.fire({
            icon: 'success',
            title: 'Pendaftaran Berhasil Dikirim!',
            text: 'Data pendaftaran Guru Tahfidz telah dikirim ke WhatsApp TPQ Al Hikmah.',
            timer: 3000,
            showConfirmButton: false
        });
        
        return true;
    }
    
    async function handleJilidTeacher() {
        const steps = [
            { title: 'Nama Lengkap Anda', placeholder: 'Contoh: Ustadzah Fatimah Azzahra, S.Pd' },
            { title: 'Pendidikan Terakhir', placeholder: 'Contoh: S1 Pendidikan Guru Madrasah Ibtidaiyah' },
            { title: 'Pengalaman Mengajar Baca Tulis Al-Qur\'an', placeholder: 'Contoh: 3 tahun mengajar jilid di TPQ Al-Falah' },
            { title: 'Konfirmasi Hafalan Juz 30', placeholder: 'Contoh: Hafal Juz 30 lengkap sejak 2019, sering memimpin sholat tarawih' },
            { title: 'Metode Pembelajaran yang Dikuasai', placeholder: 'Contoh: Qira\'ati, Iqro, Tilawati, Yanbu\'a, dll.' }
        ];
        
        const data = {};
        const stepKeys = ['nama', 'pendidikan', 'pengalaman', 'hafalanJuz30', 'metodeJilid'];
        
        for (let i = 0; i < steps.length; i++) {
            const input = await getInput(
                `${i + 1}/5 - ${steps[i].title}`,
                steps[i].placeholder
            );
            
            if (!input) return null;
            data[stepKeys[i]] = input;
        }
        
        const accepted = await confirmJilidTerms();
        if (!accepted) {
            await Swal.fire({
                title: 'Pendaftaran Dibatalkan', 
                text: 'Anda harus memenuhi semua persyaratan untuk mendaftar sebagai Guru Jilid.',
                icon: 'warning',
                confirmButtonColor: CONFIG.colors.warning
            });
            return null;
        }

        const message = createJilidMessage(data);
        openWhatsApp(message);
        
        await Swal.fire({
            icon: 'success',
            title: 'Pendaftaran Berhasil Dikirim!',
            text: 'Data pendaftaran Guru Jilid telah dikirim ke WhatsApp TPQ Al Hikmah.',
            timer: 3000,
            showConfirmButton: false
        });
        
        return true;
    }
    
    /* =======================================================
     * MESSAGE CREATORS
     * ====================================================== */
    
    function createTahfidzMessage(data) {
        return `*🕌 PENDAFTARAN GURU TAHFIDZ TPQ AL HIKMAH*

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya bermaksud untuk *mendaftar sebagai Guru Tahfidz* di TPQ Al Hikmah.

*📋 DATA LENGKAP CALON GURU:*
👤 *Nama:* ${data.nama}
🎓 *Pendidikan:* ${data.pendidikan}
👨‍🏫 *Pengalaman Tahfidz:* ${data.pengalaman}
📖 *Detail Hafalan:* ${data.hafalanDetail}
🎯 *Metode yang Dikuasai:* ${data.metodeTahfidz}

*✅ PERSYARATAN YANG DIPENUHI:*
• ✅ Hafal Al-Qur'an 30 Juz dengan sanad yang jelas
• ✅ Memiliki ijazah tahfidz dari ustadz/kyai yang kompeten
• ✅ Menguasai ilmu tajwid dengan baik dan benar
• ✅ Memiliki pengalaman mengajar tahfidz
• ✅ Mampu membimbing santri dengan sabar dan telaten
• ✅ Memiliki kemampuan mengoreksi bacaan santri

*🎯 KOMITMEN SAYA:*
• Siap mengikuti tes seleksi yang diadakan TPQ
• Siap mengajar dengan penuh tanggung jawab
• Siap mengikuti program pelatihan guru
• Siap berkomitmen jangka panjang

Mohon informasi lebih lanjut terkait:
- Proses seleksi dan tahapannya
- Jadwal tes dan wawancara
- Persyaratan dokumen yang harus disiapkan
- Sistem kerja dan kompensasi

Terima kasih atas kesempatan yang diberikan.
Barakallahu fiikum.

Wassalamu'alaikum warahmatullahi wabarakatuh`;
    }
    
    function createJilidMessage(data) {
        return `*📖 PENDAFTARAN GURU JILID TPQ AL HIKMAH*

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya bermaksud untuk *mendaftar sebagai Guru Jilid* di TPQ Al Hikmah.

*📋 DATA LENGKAP CALON GURU:*
👤 *Nama:* ${data.nama}
🎓 *Pendidikan:* ${data.pendidikan}
👨‍🏫 *Pengalaman Mengajar:* ${data.pengalaman}  
📖 *Hafalan Juz 30:* ${data.hafalanJuz30}
🎯 *Metode yang Dikuasai:* ${data.metodeJilid}

*✅ PERSYARATAN YANG DIPENUHI:*
• ✅ Hafal minimal Juz 30 (Juz 'Amma) dengan lancar
• ✅ Menguasai kaidah tajwid dengan baik
• ✅ Memiliki pengalaman mengajar baca tulis Al-Qur'an
• ✅ Menguasai metode pembelajaran jilid/iqro
• ✅ Mampu mengajar anak-anak dengan sabar dan penuh kasih sayang
• ✅ Memiliki kemampuan mengoreksi bacaan santri

*🎯 KOMITMEN SAYA:*
• Siap mengikuti tes seleksi yang diadakan TPQ
• Siap mengajar dengan penuh dedikasi
• Siap mengikuti program pelatihan guru
• Siap berkomitmen jangka panjang

Mohon informasi lebih lanjut terkait:
- Proses seleksi dan tahapannya
- Jadwal tes dan wawancara
- Persyaratan dokumen yang harus disiapkan
- Sistem kerja dan kompensasi

Terima kasih atas kesempatan yang diberikan.
Barakallahu fiikum.

Wassalamu'alaikum warahmatullahi wabarakatuh`;
    }
    
    /* =======================================================
     * TERMS CONFIRMATION
     * ====================================================== */
    
    async function confirmTahfidzTerms() {
        const { isConfirmed } = await Swal.fire({
            title: '🕌 Persyaratan Guru Tahfidz',
            html: `
                <div class="text-left max-h-96 overflow-y-auto p-4">
                    <p class="font-semibold mb-4 text-center">Pastikan Anda memenuhi SEMUA kriteria khusus Guru Tahfidz:</p>
                    
                    <div class="info-box">
                        <h4 class="font-semibold text-blue-800 mb-2">
                            <i class="fas fa-book-quran mr-2"></i>Persyaratan Hafalan:
                        </h4>
                        <ul class="list-disc ml-5 text-gray-700 space-y-1">
                            <li>✅ <strong>Hafal Al-Qur'an 30 Juz lengkap tanpa kesalahan</strong></li>
                            <li>✅ Memiliki sanad hafalan yang jelas dari ustadz/kyai yang kompeten</li>
                            <li>✅ Memiliki ijazah tahfidz yang sah dan diakui</li>
                            <li>✅ Mampu membaca dengan tartil dan sesuai kaidah tajwid</li>
                            <li>✅ Hafalan masih terjaga dengan baik hingga saat ini</li>
                        </ul>
                    </div>

                    <div class="success-box">
                        <h4 class="font-semibold text-green-800 mb-2">
                            <i class="fas fa-chalkboard-teacher mr-2"></i>Kemampuan Mengajar:
                        </h4>
                        <ul class="list-disc ml-5 text-gray-700 space-y-1">
                            <li>✅ Pengalaman mengajar tahfidz minimal 2 tahun</li>
                            <li>✅ Menguasai berbagai metode tahfidz (tilawati, yanbu'a, dll)</li>
                            <li>✅ Mampu mengoreksi hafalan dan bacaan santri dengan tepat</li>
                            <li>✅ Sabar, telaten, dan penuh kasih sayang dalam membimbing</li>
                            <li>✅ Mampu memotivasi santri dalam proses menghafal</li>
                        </ul>
                    </div>

                    <div class="warning-box">
                        <h4 class="font-semibold text-orange-800 mb-2">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Komitmen yang Diperlukan:
                        </h4>
                        <ul class="list-disc ml-5 text-gray-700 space-y-1">
                            <li>⚡ Siap mengikuti tes seleksi Al-Qur'an dan wawancara</li>
                            <li>⚡ Siap bekerja dengan sistem yang sudah ditetapkan TPQ</li>
                            <li>⚡ Siap mengikuti pelatihan dan pengembangan berkelanjutan</li>
                            <li>⚡ Berkomitmen jangka panjang minimal 1 tahun</li>
                        </ul>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg mt-4 border-2 border-gray-200">
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input type="checkbox" id="tahfidzTermsCheckbox" class="mt-1">
                            <span class="font-semibold text-gray-800">
                                Saya dengan ini menyatakan bahwa telah memenuhi <strong>SEMUA</strong> 
                                persyaratan Guru Tahfidz di atas dan siap mengikuti seluruh proses seleksi 
                                yang diadakan oleh TPQ Al Hikmah.
                            </span>
                        </label>
                    </div>
                </div>
            `,
            width: '650px',
            focusConfirm: false,
            confirmButtonText: '<i class="fas fa-check mr-2"></i>Ya, Saya Memenuhi Persyaratan',
            showCancelButton: true,
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Batal',
            confirmButtonColor: CONFIG.colors.success,
            cancelButtonColor: CONFIG.colors.error,
            customClass: {
                container: 'swal-high-zindex'
            },
            preConfirm: () => {
                const checkbox = document.getElementById('tahfidzTermsCheckbox');
                if (!checkbox.checked) {
                    Swal.showValidationMessage('Anda harus menyetujui bahwa telah memenuhi semua persyaratan ini.');
                    return false;
                }
                return true;
            }
        });
        return isConfirmed;
    }
    
    async function confirmJilidTerms() {
        const { isConfirmed } = await Swal.fire({
            title: '📖 Persyaratan Guru Jilid',
            html: `
                <div class="text-left max-h-96 overflow-y-auto p-4">
                    <p class="font-semibold mb-4 text-center">Pastikan Anda memenuhi SEMUA kriteria khusus Guru Jilid:</p>
                    
                    <div class="info-box">
                        <h4 class="font-semibold text-blue-800 mb-2">
                            <i class="fas fa-book-open mr-2"></i>Persyaratan Hafalan:
                        </h4>
                        <ul class="list-disc ml-5 text-gray-700 space-y-1">
                            <li>✅ <strong>Hafal minimal Juz 30 (Juz 'Amma) lengkap dan lancar</strong></li>
                            <li>✅ Hafal surat-surat pendek yang sering dibaca dalam sholat</li>
                            <li>✅ Mampu membaca Al-Qur'an dengan lancar dan tartil</li>
                            <li>✅ Menguasai kaidah tajwid dengan baik dan benar</li>
                            <li>✅ Mampu mencontohkan bacaan yang benar untuk santri</li>
                        </ul>
                    </div>

                    <div class="success-box">
                        <h4 class="font-semibold text-green-800 mb-2">
                            <i class="fas fa-graduation-cap mr-2"></i>Kemampuan Mengajar:
                        </h4>
                        <ul class="list-disc ml-5 text-gray-700 space-y-1">
                            <li>✅ Memiliki pengalaman mengajar baca tulis Al-Qur'an</li>
                            <li>✅ Menguasai metode jilid/iqro (Qira'ati, Tilawati, dll)</li>
                            <li>✅ Mampu mengajar huruf hijaiyah dan tajwid dasar</li>
                            <li>✅ Sabar dalam mengajar anak-anak dari berbagai usia</li>
                            <li>✅ Mampu mengoreksi dan membimbing bacaan santri</li>
                        </ul>
                    </div>

                    <div class="warning-box">
                        <h4 class="font-semibold text-orange-800 mb-2">
                            <i class="fas fa-heart mr-2"></i>Kualitas Personal:
                        </h4>
                        <ul class="list-disc ml-5 text-gray-700 space-y-1">
                            <li>⚡ Memiliki akhlak yang baik dan menjadi teladan</li>
                            <li>⚡ Sabar, telaten, dan penuh kasih sayang kepada anak-anak</li>
                            <li>⚡ Mampu berkomunikasi dengan baik dengan orangtua santri</li>
                            <li>⚡ Siap berkomitmen dan mengikuti sistem TPQ</li>
                        </ul>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg mt-4 border-2 border-gray-200">
                        <label class="flex items-start space-x-3 cursor-pointer">
                            <input type="checkbox" id="jilidTermsCheckbox" class="mt-1">
                            <span class="font-semibold text-gray-800">
                                Saya dengan ini menyatakan bahwa telah memenuhi <strong>SEMUA</strong> 
                                persyaratan Guru Jilid di atas dan siap mengikuti seluruh proses seleksi 
                                yang diadakan oleh TPQ Al Hikmah.
                            </span>
                        </label>
                    </div>
                </div>
            `,
            width: '650px',
            focusConfirm: false,
            confirmButtonText: '<i class="fas fa-check mr-2"></i>Ya, Saya Memenuhi Persyaratan',
            showCancelButton: true,
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Batal',
            confirmButtonColor: CONFIG.colors.success,
            cancelButtonColor: CONFIG.colors.error,
            customClass: {
                container: 'swal-high-zindex'
            },
            preConfirm: () => {
                const checkbox = document.getElementById('jilidTermsCheckbox');
                if (!checkbox.checked) {
                    Swal.showValidationMessage('Anda harus menyetujui bahwa telah memenuhi semua persyaratan ini.');
                    return false;
                }
                return true;
            }
        });
        return isConfirmed;
    }
    
    /* =======================================================
     * LOCATION INQUIRY - SURABAYA BRANCH
     * ====================================================== */
    
    async function handleSurabayaLocationInquiry() {
        const result = await Swal.fire({
            title: '📍 Info Lokasi Cabang Surabaya',
            html: `
                <div class="text-center space-y-4">
                    <div class="warning-box">
                        <div class="flex items-center justify-center mb-2">
                            <i class="fas fa-info-circle text-orange-600 mr-2"></i>
                            <span class="font-semibold text-orange-800">Informasi Penting</span>
                        </div>
                        <p class="text-orange-700">
                            Lokasi detail cabang Surabaya belum tersedia untuk umum dan akan 
                            diinformasikan secara langsung saat konsultasi.
                        </p>
                    </div>
                    
                    <div class="info-box">
                        <h4 class="font-semibold text-blue-800 mb-3">
                            <i class="fas fa-map-marked-alt mr-2"></i>Informasi yang Akan Anda Dapatkan:
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-600 mr-2"></i>
                                <span>Alamat lengkap dan detail</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-600 mr-2"></i>
                                <span>Panduan rute terbaik</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-600 mr-2"></i>
                                <span>Akses transportasi umum</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-600 mr-2"></i>
                                <span>Foto lokasi dan fasilitas</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-600 mr-2"></i>
                                <span>Jadwal operasional</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-600 mr-2"></i>
                                <span>Program yang tersedia</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p class="text-green-800 font-medium mb-2">
                            <i class="fas fa-clock mr-2"></i>Estimasi Waktu Respons: 5-15 menit
                        </p>
                        <p class="text-green-700 text-sm">
                            Tim kami akan segera memberikan informasi lengkap tentang lokasi cabang Surabaya
                        </p>
                    </div>
                </div>
            `,
            width: '600px',
            showCancelButton: true,
            confirmButtonText: '<i class="fab fa-whatsapp mr-2"></i>Ya, Konsultasi Sekarang',
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Batal',
            confirmButtonColor: CONFIG.colors.success,
            cancelButtonColor: CONFIG.colors.error,
            customClass: {
                container: 'swal-high-zindex'
            }
        });

        if (result.isConfirmed) {
            const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui informasi *lokasi detail cabang Surabaya*.

Mohon informasi lengkap mengenai:
📍 *Alamat lengkap* cabang Surabaya
🗺️ *Panduan rute* dan akses transportasi terbaik
📸 *Foto lokasi* dan fasilitas yang tersedia
⏰ *Jadwal operasional* cabang Surabaya
📚 *Program pembelajaran* yang tersedia di cabang ini
🚗 *Fasilitas parkir* dan kemudahan akses

Saya berencana untuk mengunjungi atau mendaftarkan anak di cabang Surabaya.

Terima kasih atas informasinya.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

            openWhatsApp(message);
        }
    }
    
    /* =======================================================
     * MAIN WHATSAPP CONTACT FUNCTION
     * ====================================================== */
    
    async function whatsappContact(action) {
        try {
            switch (action) {
                case 'kelasPrivat':
                    await showRegistrationForm('privat');
                    break;
                    
                case 'kelasOffline':
                    await showRegistrationForm('offline');
                    break;
                    
                case 'guruPengajar':
                    await showTeacherOptions();
                    break;
                    
                case 'hubungi':
                    await showContactOptions();
                    break;
                    
                case 'infoLokasiSurabaya':
                    await handleSurabayaLocationInquiry();
                    break;
                    
                case 'testimonial':
                    const testimonialMessage = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin melihat *video testimonial lengkap* dari santri dan orangtua TPQ Al Hikmah.

Mohon kirimkan:
🎥 Video testimonial santri dan orangtua
📸 Foto kegiatan pembelajaran
📋 Testimoni tertulis jika ada
🏆 Prestasi santri yang pernah diraih

Saya ingin melihat bukti nyata kualitas pendidikan di TPQ Al Hikmah sebelum mendaftarkan anak.

Jazakallahu khairan 🙏
Wassalamu'alaikum warahmatullahi wabarakatuh`;
                    
                    openWhatsApp(testimonialMessage);
                    break;
                    
                default:
                    console.warn('Unknown action:', action);
                    break;
            }
        } catch (error) {
            console.error('WhatsApp contact error:', error);
            
            await Swal.fire({
                title: 'Terjadi Kesalahan',
                text: 'Mohon maaf, terjadi kesalahan sistem. Silakan coba lagi atau hubungi kami secara langsung.',
                icon: 'error',
                confirmButtonColor: CONFIG.colors.error,
                footer: `<a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" style="color: #25D366;">
                    <i class="fab fa-whatsapp mr-1"></i>Hubungi via WhatsApp Langsung
                </a>`
            });
        }
    }
    
    /* =======================================================
     * CONTACT OPTIONS MENU
     * ====================================================== */
    
    async function showContactOptions() {
        const type = await Swal.fire({
            title: '📞 Pilih Jenis Layanan',
            text: 'Apa yang ingin Anda lakukan hari ini?',
            input: 'select',
            inputOptions: {
                'daftar': '📝 Mendaftar Santri Baru',
                'bertanya': '❓ Bertanya / Konsultasi Umum',
                'guru': '👨‍🏫 Daftar Sebagai Guru Pengajar',
                'kunjungan': '🏢 Jadwal Kunjungan ke TPQ',
                'info_biaya': '💰 Info Biaya & Paket Belajar',
                'program': '📚 Info Program Pembelajaran',
                'fasilitas': '🏗️ Info Fasilitas TPQ',
                'prestasi': '🏆 Info Prestasi Santri'
            },
            inputPlaceholder: 'Silakan pilih layanan yang Anda butuhkan...',
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-arrow-right mr-2"></i>Lanjutkan',
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Batal',
            confirmButtonColor: CONFIG.colors.primary,
            cancelButtonColor: CONFIG.colors.error,
            width: '500px',
            inputValidator: (value) => {
                if (!value) {
                    return 'Silakan pilih salah satu layanan yang tersedia!';
                }
            },
            customClass: {
                container: 'swal-high-zindex'
            }
        });
        
        if (!type.isConfirmed) return;
        
        switch (type.value) {
            case 'daftar':
                await showRegistrationForm();
                break;
                
            case 'guru':
                await showTeacherOptions();
                break;
                
            case 'bertanya':
                await handleGeneralInquiry();
                break;
                
            case 'kunjungan':
                await handleVisitRequest();
                break;
                
            case 'info_biaya':
                await handlePriceInquiry();
                break;
                
            case 'program':
                await handleProgramInquiry();
                break;
                
            case 'fasilitas':
                await handleFacilityInquiry();
                break;
                
            case 'prestasi':
                await handleAchievementInquiry();
                break;
        }
    }
    
    /* =======================================================
     * INQUIRY HANDLERS
     * ====================================================== */
    
    async function handleGeneralInquiry() {
        const nama = await getInput('Nama Lengkap Anda', 'Contoh: Bapak Ahmad Wijaya');
        if (!nama) return;
        
        const pertanyaan = await getInput('Pertanyaan / Konsultasi Anda', 'Tulis pertanyaan atau hal yang ingin dikonsultasikan...', 'textarea');
        if (!pertanyaan) return;

        const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin *mengajukan pertanyaan/konsultasi*.

👤 *Nama:* ${nama}
❓ *Pertanyaan/Konsultasi:*
${pertanyaan}

Mohon bantuan informasi dan penjelasan dari tim TPQ Al Hikmah.
Terima kasih atas waktu dan perhatiannya.

Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
    }
    
    async function handleVisitRequest() {
        const nama = await getInput('Nama Lengkap', 'Contoh: Ibu Siti Nurhaliza');
        if (!nama) return;
        
        const tujuan = await getInput('Tujuan Kunjungan', 'Contoh: Survey lokasi untuk anak, melihat fasilitas pembelajaran, bertemu dengan pengajar');
        if (!tujuan) return;

        const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin *mengatur jadwal kunjungan* ke TPQ Al Hikmah.

👤 *Nama:* ${nama}
🎯 *Tujuan Kunjungan:* ${tujuan}

Mohon informasi mengenai:
⏰ Waktu kunjungan yang tersedia
📋 Fasilitas yang bisa dilihat saat kunjungan
👥 Apakah bisa bertemu dengan pengajar/pengelola
📝 Prosedur kunjungan yang harus diikuti
🚗 Info parkir dan akses lokasi

Terima kasih.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
    }
    
    async function handlePriceInquiry() {
        const nama = await getInput('Nama Lengkap', 'Contoh: Bapak Usman Hakim');
        if (!nama) return;

        const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui *informasi biaya dan paket belajar* di TPQ Al Hikmah.

👤 *Nama:* ${nama}

Mohon informasi detail mengenai:
💰 *Biaya pendaftaran* untuk santri baru
💵 *Biaya bulanan* untuk setiap program (Jilid, Tahfidz, Madrasah Diniyah)
📦 *Paket belajar* yang tersedia (privat vs offline)
💳 *Sistem pembayaran* yang diterima
🎓 *Potongan harga* atau program beasiswa yang tersedia
📚 Biaya buku dan materi pembelajaran
🏢 Perbedaan biaya antar lokasi (Sidoarjo vs Surabaya)

Terima kasih atas informasinya.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
    }
    
    async function handleProgramInquiry() {
        const nama = await getInput('Nama Lengkap', 'Contoh: Ibu Aisyah Rahmawati');
        if (!nama) return;

        const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui *informasi lengkap program pembelajaran* di TPQ Al Hikmah.

👤 *Nama:* ${nama}

Mohon informasi detail mengenai:
📖 *Program Jilid/Iqro* - metode dan durasi pembelajaran
🕌 *Program Tahfidz* - target hafalan dan metode yang digunakan
📚 *Program Madrasah Diniyah* - mata pelajaran yang diajarkan
⏰ *Jadwal pembelajaran* untuk masing-masing program
👥 *Sistem kelas* (privat vs kelompok) dan jumlah santri per kelas
📋 *Kurikulum dan materi* yang digunakan
🎯 *Target pencapaian* untuk setiap program
📊 *Sistem evaluasi* dan laporan perkembangan santri

Terima kasih atas informasinya.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
    }
    
    async function handleFacilityInquiry() {
        const nama = await getInput('Nama Lengkap', 'Contoh: Bapak Ridwan Kamil');
        if (!nama) return;

        const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui *informasi fasilitas* yang tersedia di TPQ Al Hikmah.

👤 *Nama:* ${nama}

Mohon informasi mengenai:
🏢 *Fasilitas gedung* dan ruang kelas
🌡️ *Kenyamanan ruangan* (AC, ventilasi, pencahayaan)
📚 *Perpustakaan* dan koleksi buku yang tersedia
🕌 *Mushola/tempat ibadah* untuk santri
🚗 *Fasilitas parkir* untuk orangtua
🧽 *Kebersihan dan sanitasi* lingkungan TPQ
🔒 *Keamanan* dan sistem pengawasan
📱 *Fasilitas teknologi* (proyektor, sound system, dll)
🎮 *Area bermain* atau ruang santai untuk anak
☕ *Kantin atau area makan* jika ada

Terima kasih atas informasinya.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
    }
    
    async function handleAchievementInquiry() {
        const nama = await getInput('Nama Lengkap', 'Contoh: Ibu Dewi Sartika');
        if (!nama) return;

        const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui *informasi prestasi santri* TPQ Al Hikmah.

👤 *Nama:* ${nama}

Mohon informasi mengenai:
🏆 *Prestasi santri* dalam kompetisi tilawah/tahfidz
📈 *Statistik kelulusan* santri per program
⭐ *Success story* santri alumni TPQ
🎖️ *Penghargaan* yang pernah diterima TPQ
📊 *Tingkat kepuasan* orangtua santri
💯 *Persentase santri* yang berhasil khatam Al-Qur'an
🎯 *Rata-rata waktu* penyelesaian program tahfidz
📰 *Liputan media* atau pengakuan dari pihak lain

Informasi ini akan membantu saya dalam mempertimbangkan TPQ Al Hikmah untuk anak saya.

Terima kasih atas informasinya.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
    }
    
    /* =======================================================
     * REGISTRATION FORM SYSTEM
     * ====================================================== */
    
    async function showRegistrationForm(preselectedClass = '') {
        const kelasOptions = preselectedClass === 'privat' ? 
            '<option value="privat" selected>Kelas Privat (1-on-1 dengan ustadz)</option><option value="offline">Kelas Offline (Kelompok maksimal 8 santri)</option>' :
            preselectedClass === 'offline' ?
            '<option value="offline" selected>Kelas Offline (Kelompok maksimal 8 santri)</option><option value="privat">Kelas Privat (1-on-1 dengan ustadz)</option>' :
            '<option value="">Pilih Jenis Kelas</option><option value="privat">Kelas Privat (1-on-1 dengan ustadz)</option><option value="offline">Kelas Offline (Kelompok maksimal 8 santri)</option>';

        const result = await Swal.fire({
            title: '📝 Form Pendaftaran Santri TPQ Al Hikmah',
            html: `
                <div class="text-left max-h-[75vh] overflow-y-auto">
                    <div class="space-y-4 p-2">
                        <div class="grid grid-cols-1 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-user mr-2 text-blue-600"></i>Nama Lengkap Anak <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="modal-namaAnak" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                    placeholder="Contoh: Ahmad Zaki Mubarak"
                                    required>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-birthday-cake mr-2 text-pink-600"></i>Usia Anak <span class="text-red-500">*</span>
                                    </label>
                                    <select id="modal-usiaAnak" 
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                        required>
                                        <option value="">Pilih Usia</option>
                                        <option value="4-6">4-6 tahun (Pra TK - TK)</option>
                                        <option value="7-10">7-10 tahun (SD Kelas 1-4)</option>
                                        <option value="11-15">11-15 tahun (SD Kelas 5 - SMP)</option>
                                        <option value="16+">16+ tahun (SMA ke atas)</option>
                                        <option value="dewasa">Dewasa</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-venus-mars mr-2 text-purple-600"></i>Jenis Kelamin <span class="text-red-500">*</span>
                                    </label>
                                    <select id="modal-jenisKelamin" 
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                        required>
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="laki-laki">Laki-laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-users mr-2 text-green-600"></i>Nama Orangtua/Wali <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="modal-namaOrtu" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                    placeholder="Contoh: Bapak Ahmad Susanto / Ibu Siti Fatimah"
                                    required>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fab fa-whatsapp mr-2 text-green-600"></i>No. WhatsApp <span class="text-red-500">*</span>
                                </label>
                                <input type="tel" id="modal-nomorWA" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                    placeholder="Contoh: 081234567890 atau +6281234567890"
                                    required>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-chalkboard mr-2 text-blue-600"></i>Pilih Kelas <span class="text-red-500">*</span>
                                    </label>
                                    <select id="modal-jenisKelas" 
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                        required>
                                        ${kelasOptions}
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-map-marker-alt mr-2 text-red-600"></i>Pilih Lokasi <span class="text-red-500">*</span>
                                    </label>
                                    <select id="modal-lokasi" 
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200"
                                        required>
                                        <option value="">Pilih Lokasi TPQ</option>
                                        <option value="sidoarjo">Sidoarjo (Pusat) - Jl. Kemiri</option>
                                        <option value="surabaya">Surabaya (Cabang) - Segera Dibuka Juli 2025</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-book-reader mr-2 text-indigo-600"></i>Pengalaman Mengaji Anak
                                </label>
                                <select id="modal-pengalaman" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200">
                                    <option value="">Pilih Pengalaman Mengaji</option>
                                    <option value="belum">Belum pernah belajar mengaji sama sekali</option>
                                    <option value="dasar">Sudah mengenal huruf hijaiyah dasar</option>
                                    <option value="lancar">Sudah lancar membaca Al-Qur'an</option>
                                    <option value="hafal">Sudah hafal beberapa surat pendek</option>
                                    <option value="tahfidz">Sudah menghafal lebih dari 5 juz</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-target mr-2 text-orange-600"></i>Target Pembelajaran
                                </label>
                                <select id="modal-target" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200">
                                    <option value="">Pilih Target Pembelajaran</option>
                                    <option value="baca-tulis">Belajar baca tulis Al-Qur'an dari dasar</option>
                                    <option value="lancar">Lancar membaca Al-Qur'an dengan tajwid</option>
                                    <option value="khatam">Khatam Al-Qur'an 30 juz</option>
                                    <option value="tahfidz">Menghafal Al-Qur'an (tahfidz)</option>
                                    <option value="diniyah">Belajar ilmu agama (madrasah diniyah)</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    <i class="fas fa-sticky-note mr-2 text-gray-600"></i>Catatan Tambahan
                                </label>
                                <textarea id="modal-catatan" rows="4" 
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition duration-200 resize-none"
                                    placeholder="Kondisi khusus anak, jadwal yang diinginkan, alergi, atau informasi penting lainnya..."></textarea>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <h5 class="font-semibold text-blue-800 mb-2">
                                <i class="fas fa-info-circle mr-2"></i>Informasi Penting:
                            </h5>
                            <ul class="text-sm text-blue-700 space-y-1">
                                <li>• Data yang Anda berikan akan dirahasiakan dan hanya digunakan untuk keperluan pendaftaran</li>
                                <li>• Tim TPQ Al Hikmah akan menghubungi Anda dalam 1x24 jam untuk konfirmasi</li>
                                <li>• Proses pendaftaran resmi akan dilakukan setelah konsultasi awal</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            width: '750px',
            showCancelButton: true,
            confirmButtonText: '<i class="fab fa-whatsapp mr-2"></i>Kirim Pendaftaran via WhatsApp',
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Batal',
            confirmButtonColor: CONFIG.colors.success,
            cancelButtonColor: CONFIG.colors.error,
            focusConfirm: false,
            customClass: {
                container: 'swal-high-zindex'
            },
            preConfirm: () => {
                const requiredFields = ['modal-namaAnak', 'modal-usiaAnak', 'modal-jenisKelamin', 'modal-namaOrtu', 'modal-nomorWA', 'modal-jenisKelas', 'modal-lokasi'];
                
                // Reset all field styles first
                requiredFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.style.borderColor = '#d1d5db';
                        field.style.boxShadow = 'none';
                    }
                });
                
                // Validate required fields
                const missingFields = [];
                for (const fieldId of requiredFields) {
                    const field = document.getElementById(fieldId);
                    if (!field?.value.trim()) {
                        field.style.borderColor = '#ef4444';
                        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        missingFields.push(field.previousElementSibling.textContent.replace(' *', '').replace(/^.*\s/, ''));
                    }
                }
                
                if (missingFields.length > 0) {
                    Swal.showValidationMessage(`Mohon lengkapi field berikut: ${missingFields.join(', ')}`);
                    return false;
                }
                
                // Validate WhatsApp number
                const nomorWA = document.getElementById('modal-nomorWA').value;
                if (!validateWhatsAppNumber(nomorWA)) {
                    document.getElementById('modal-nomorWA').style.borderColor = '#ef4444';
                    document.getElementById('modal-nomorWA').style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                    Swal.showValidationMessage('Format nomor WhatsApp tidak valid. Contoh yang benar: 081234567890');
                    return false;
                }
                
                return {
                    namaAnak: document.getElementById('modal-namaAnak').value.trim(),
                    usiaAnak: document.getElementById('modal-usiaAnak').value,
                    jenisKelamin: document.getElementById('modal-jenisKelamin').value,
                    namaOrtu: document.getElementById('modal-namaOrtu').value.trim(),
                    nomorWA: nomorWA.trim(),
                    jenisKelas: document.getElementById('modal-jenisKelas').value,
                    lokasi: document.getElementById('modal-lokasi').value,
                    pengalaman: document.getElementById('modal-pengalaman').value || 'Tidak disebutkan',
                    target: document.getElementById('modal-target').value || 'Akan ditentukan saat konsultasi',
                    catatan: document.getElementById('modal-catatan').value.trim() || 'Tidak ada catatan khusus'
                };
            }
        });
        
        if (result.isConfirmed && result.value) {
            await sendRegistrationToWhatsApp(result.value);
        }
    }
    
    async function sendRegistrationToWhatsApp(formData) {
        const kelasText = formData.jenisKelas === 'privat' ? 
            'Kelas Privat (1-on-1 dengan ustadz)' : 
            'Kelas Offline (Kelompok maksimal 8 santri)';
        
        const lokasiText = formData.lokasi === 'sidoarjo' ? 
            'Sidoarjo (Pusat) - Jl. Kemiri' : 
            'Surabaya (Cabang) - Segera Dibuka Juli 2025';
        
        const message = `*🕌 PENDAFTARAN SANTRI TPQ AL HIKMAH*

*📋 DATA LENGKAP CALON SANTRI:*
👦 *Nama Anak:* ${formData.namaAnak}
📅 *Usia:* ${formData.usiaAnak}
⚥ *Jenis Kelamin:* ${formData.jenisKelamin}
👨‍👩‍👧‍👦 *Nama Orangtua:* ${formData.namaOrtu}
📱 *No. WhatsApp:* ${formData.nomorWA}

*📚 PILIHAN PROGRAM:*
🎓 *Jenis Kelas:* ${kelasText}
📍 *Lokasi TPQ:* ${lokasiText}
📖 *Pengalaman Mengaji:* ${formData.pengalaman}
🎯 *Target Pembelajaran:* ${formData.target}

*📝 CATATAN TAMBAHAN:*
${formData.catatan}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya bermaksud untuk *mendaftarkan putra/putri* saya di TPQ Al Hikmah sesuai data di atas.

Mohon informasi lebih lanjut mengenai:
• Proses pendaftaran selanjutnya
• Jadwal belajar yang tersedia
• Biaya pendaftaran dan bulanan
• Kapan anak bisa mulai belajar
• Persyaratan dokumen yang perlu disiapkan

Terima kasih atas perhatian dan pelayanannya.
Jazakallahu khairan kathiran 🙏

Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(message);
        
        // Show success feedback
        setTimeout(async () => {
            await Swal.fire({
                icon: 'success',
                title: 'Pendaftaran Berhasil Dikirim!',
                html: `
                    <div class="text-center space-y-3">
                        <p class="text-gray-700">Data pendaftaran telah dikirim ke WhatsApp TPQ Al Hikmah</p>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p class="text-green-800 font-medium">
                                <i class="fas fa-clock mr-2"></i>Tim kami akan menghubungi Anda dalam 1x24 jam
                            </p>
                        </div>
                    </div>
                `,
                timer: 4000,
                showConfirmButton: false
            });
        }, 1000);
    }
    
    /* =======================================================
     * ADDITIONAL UTILITY FUNCTIONS
     * ====================================================== */
    
    function toggleFAQ(faqId) {
        const content = document.getElementById(faqId);
        const icon = document.getElementById(faqId + '-icon');
        
        if (!content || !icon) return;
        
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            icon.classList.remove('rotate-180');
        } else {
            // Close all other FAQs
            document.querySelectorAll('.expandable-content').forEach(item => {
                item.classList.remove('expanded');
            });
            document.querySelectorAll('[id$="-icon"]').forEach(item => {
                item.classList.remove('rotate-180');
            });
            
            // Open clicked FAQ
            content.classList.add('expanded');
            icon.classList.add('rotate-180');
        }
    }
    
    async function playVideo(videoId) {
        const videoData = {
            video1: {
                title: 'Testimonial Ibu Sari - Kelas Privat',
                description: 'Testimoni orangtua tentang perkembangan belajar mengaji anak di kelas privat'
            },
            video2: {
                title: 'Testimonial Alumni Program Tahfidz', 
                description: 'Cerita perjalanan menghafal Al-Qur\'an santri TPQ Al Hikmah'
            },
            video3: {
                title: 'Suasana Pembelajaran Kelas Offline',
                description: 'Dokumentasi kegiatan belajar mengajar di kelas offline TPQ Al Hikmah'
            }
        };
        
        const video = videoData[videoId] || videoData.video1;
        
        const result = await Swal.fire({
            title: '🎥 ' + video.title,
            html: `
                <div class="text-center space-y-4">
                    <div class="bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 h-64 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden shadow-lg">
                        <div class="text-center text-white z-10">
                            <i class="fas fa-play-circle text-6xl mb-4 opacity-90 cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-300"></i>
                            <h3 class="font-bold text-lg mb-2">${video.title}</h3>
                            <p class="opacity-90 text-sm px-4">${video.description}</p>
                        </div>
                        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div class="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            <i class="fas fa-video mr-1"></i>VIDEO
                        </div>
                    </div>
                    
                    <div class="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p class="text-amber-800 text-sm">
                            <i class="fas fa-info-circle mr-2"></i>
                            Video testimonial lengkap akan dikirimkan via WhatsApp
                        </p>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '<i class="fab fa-whatsapp mr-2"></i>Minta Video via WhatsApp',
            cancelButtonText: '<i class="fas fa-times mr-2"></i>Tutup',
            confirmButtonColor: CONFIG.colors.success,
            cancelButtonColor: CONFIG.colors.error,
            width: '500px',
            customClass: {
                container: 'swal-high-zindex'
            }
        });
        
        if (result.isConfirmed) {
            const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin melihat *video testimonial lengkap* TPQ Al Hikmah.

🎥 Video yang ingin saya lihat: *${video.title}*

Mohon kirimkan video testimonial dan dokumentasi lainnya seperti:
📹 Video kegiatan pembelajaran
📸 Foto suasana belajar santri
🏆 Video prestasi santri
📋 Testimoni orangtua dalam bentuk video

Terima kasih.
Jazakallahu khairan 🙏
Wassalamu'alaikum warahmatullahi wabarakatuh`;

            openWhatsApp(message);
        }
    }
    
    /* =======================================================
     * SOCIAL MEDIA FUNCTIONS
     * ====================================================== */
    
    function openInstagram() {
        window.open('https://instagram.com/tpqalhikmah', '_blank');
    }
    
    function openTikTok() {
        window.open('https://www.tiktok.com/@tpqalhikmah', '_blank');
    }
    
    function openYouTube() {
        window.open('https://youtube.com/@tpqalhikmah', '_blank');
    }
    
    function openFacebook() {
        window.open('https://facebook.com/tpqalhikmah', '_blank');
    }
    
    /* =======================================================
     * GLOBAL EXPORTS
     * ====================================================== */
    
    // Make all functions globally available
    window.whatsappContact = whatsappContact;
    window.showRegistrationForm = showRegistrationForm;
    window.sendRegistrationToWhatsApp = sendRegistrationToWhatsApp;
    window.showTeacherOptions = showTeacherOptions;
    window.handleTahfidzTeacher = handleTahfidzTeacher;
    window.handleJilidTeacher = handleJilidTeacher;
    window.handleSurabayaLocationInquiry = handleSurabayaLocationInquiry;
    window.showContactOptions = showContactOptions;
    window.toggleFAQ = toggleFAQ;
    window.playVideo = playVideo;
    window.openInstagram = openInstagram;
    window.openTikTok = openTikTok;
    window.openYouTube = openYouTube;
    window.openFacebook = openFacebook;
    
    // Additional utilities
    window.handleGeneralInquiry = handleGeneralInquiry;
    window.handleVisitRequest = handleVisitRequest;
    window.handlePriceInquiry = handlePriceInquiry;
    window.handleProgramInquiry = handleProgramInquiry;
    window.handleFacilityInquiry = handleFacilityInquiry;
    window.handleAchievementInquiry = handleAchievementInquiry;
    
})();

/* =======================================================
 * END OF TPQ AL HIKMAH CONTACT SYSTEM
 * ====================================================== */
