/* =======================================================
 * FUNGSI KONTAK WHATSAPP TPQ AL HIKMAH 
 * Version: 6.0 (Complete & Enhanced - FULLY FIXED)
 * Developer: Expert Web Developer for TPQ Al Hikmah
 * ====================================================== */

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
        warning: '#f39c12'
    }
};

/* =======================================================
 * UTILITY FUNCTIONS
 * ====================================================== */

// Debug logging function
function debugLog(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[TPQ Debug] ${message}`, data || '');
    }
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Format WhatsApp URL with fallback
function createWhatsAppURL(message) {
    try {
        const encodedMessage = encodeURIComponent(message);
        const url = CONFIG.baseUrl + encodedMessage;
        debugLog('WhatsApp URL created', url);
        return url;
    } catch (error) {
        debugLog('Error creating WhatsApp URL', error);
        return CONFIG.baseUrl;
    }
}

// Open WhatsApp with multiple fallback methods
function openWhatsApp(message) {
    const url = createWhatsAppURL(message);
    
    debugLog('Attempting to open WhatsApp', { message: message.substring(0, 100) + '...', url });
    
    // Method 1: Try window.open first
    try {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        
        // Check if pop-up was blocked
        setTimeout(() => {
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                debugLog('Pop-up blocked, trying alternative method');
                fallbackWhatsApp(url);
            } else {
                debugLog('WhatsApp opened successfully via window.open');
                showSuccessMessage();
            }
        }, 1000);
        
    } catch (error) {
        debugLog('Error with window.open', error);
        fallbackWhatsApp(url);
    }
}

// Fallback method for opening WhatsApp
function fallbackWhatsApp(url) {
    debugLog('Using fallback method');
    
    Swal.fire({
        title: 'Buka WhatsApp',
        text: 'Klik tombol di bawah untuk membuka WhatsApp',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '<i class="fab fa-whatsapp mr-2"></i>Buka WhatsApp',
        cancelButtonText: 'Salin Pesan',
        confirmButtonColor: CONFIG.colors.success,
        cancelButtonColor: CONFIG.colors.warning
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = url;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            copyToClipboard(url);
        }
    });
}

// Copy to clipboard function
function copyToClipboard(text) {
    try {
        navigator.clipboard.writeText(text).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Link WhatsApp telah disalin ke clipboard',
                timer: 2000,
                showConfirmButton: false
            });
        });
    } catch (error) {
        debugLog('Clipboard API not available', error);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Link WhatsApp telah disalin',
            timer: 2000,
            showConfirmButton: false
        });
    }
}

// Show success message
function showSuccessMessage() {
    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'WhatsApp akan segera terbuka. Jika tidak, silakan coba lagi.',
            timer: 3000,
            showConfirmButton: false
        });
    }, 1500);
}

/* =======================================================
 * FORM VALIDATION FUNCTIONS
 * ====================================================== */

// Validate WhatsApp number
function validateWhatsAppNumber(number) {
    const cleanNumber = number.replace(/[\s\-\(\)]/g, '');
    const waRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    return waRegex.test(cleanNumber);
}

// Validate required fields
function validateRequiredFields(fields) {
    let isValid = true;
    const missingFields = [];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                field.style.borderColor = '#ef4444';
                missingFields.push(fieldId);
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
                field.style.borderColor = '#d1d5db';
            }
        }
    });
    
    debugLog('Field validation result', { isValid, missingFields });
    return { isValid, missingFields };
}

/* =======================================================
 * FORM PENDAFTARAN HANDLER
 * ====================================================== */

document.addEventListener('DOMContentLoaded', function() {
    debugLog('DOM Content Loaded - Initializing form handlers');
    
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        debugLog('Registration form found, attaching event listener');
        
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            debugLog('Registration form submitted');
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
            submitButton.disabled = true;
            
            // Validate form
            const requiredFields = ['namaAnak', 'usiaAnak', 'namaOrtu', 'nomorWA', 'jenisKelas', 'lokasi'];
            const validation = validateRequiredFields(requiredFields);
            
            if (!validation.isValid) {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Form Belum Lengkap',
                    text: `Mohon lengkapi field: ${validation.missingFields.join(', ')}`,
                    confirmButtonColor: CONFIG.colors.error
                });
                return;
            }
            
            // Validate WhatsApp number
            const nomorWA = document.getElementById('nomorWA').value;
            if (!validateWhatsAppNumber(nomorWA)) {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Nomor WhatsApp Tidak Valid',
                    text: 'Contoh format yang benar: 081234567890 atau +6281234567890',
                    confirmButtonColor: CONFIG.colors.error
                });
                return;
            }
            
            // Collect form data
            const formData = {
                namaAnak: document.getElementById('namaAnak').value.trim(),
                usiaAnak: document.getElementById('usiaAnak').value,
                namaOrtu: document.getElementById('namaOrtu').value.trim(),
                nomorWA: nomorWA.trim(),
                jenisKelas: document.getElementById('jenisKelas').value,
                lokasi: document.getElementById('lokasi').value,
                pengalaman: document.getElementById('pengalaman')?.value || 'Tidak disebutkan',
                catatan: document.getElementById('catatan')?.value.trim() || 'Tidak ada'
            };
            
            debugLog('Form data collected', formData);
            
            // Send to WhatsApp
            setTimeout(() => {
                sendRegistrationToWhatsApp(formData);
                
                // Reset form after successful submission
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1000);
        });
    } else {
        debugLog('Registration form not found on this page');
    }
});

/* =======================================================
 * UTILITY FUNCTIONS FOR SWEETALERT
 * ====================================================== */

async function getInput(title, placeholder, inputType = 'text') {
    const res = await Swal.fire({
        title,
        input: inputType,
        inputPlaceholder: placeholder,
        showCancelButton: true,
        confirmButtonColor: CONFIG.colors.primary,
        cancelButtonColor: CONFIG.colors.error,
        inputValidator: v => v ? null : 'Input tidak boleh kosong!'
    });
    
    if (!res.isConfirmed) {
        await Swal.fire({
            title: 'Dibatalkan',
            text: 'Aksi telah dibatalkan.',
            icon: 'info',
            timer: 2000,
            showConfirmButton: false
        });
        return null;
    }
    return res.value.trim();
}

/* =======================================================
 * GURU REGISTRATION FUNCTIONS - UPDATED & FIXED
 * ====================================================== */

// Function to show teacher registration options
async function showTeacherOptions() {
    const teacherType = await Swal.fire({
        title: '👨‍🏫 Pilih Jenis Guru Pengajar',
        text: 'Silakan pilih posisi yang Anda inginkan:',
        input: 'radio',
        inputOptions: {
            'tahfidz': '🕌 Guru Tahfidz (Hafal 30 Juz)',
            'jilid': '📖 Guru Jilid (Hafal Min. Juz 30)'
        },
        inputValidator: (value) => {
            if (!value) {
                return 'Silakan pilih jenis guru!';
            }
        },
        showCancelButton: true,
        confirmButtonText: 'Lanjutkan',
        cancelButtonText: 'Batal',
        confirmButtonColor: CONFIG.colors.primary,
        cancelButtonColor: CONFIG.colors.error,
        width: '450px'
    });

    if (teacherType.isConfirmed) {
        if (teacherType.value === 'tahfidz') {
            return handleTahfidzTeacher();
        } else if (teacherType.value === 'jilid') {
            return handleJilidTeacher();
        }
    }
    
    return null;
}

// Handle Tahfidz Teacher Registration
async function handleTahfidzTeacher() {
    debugLog('Processing Tahfidz Teacher application');
    
    const nama = await getInput('Nama Lengkap Anda', 'Contoh: Ustadz Ahmad Fauzan, S.Pd.I');
    if (!nama) return;

    const pendidikan = await getInput('Pendidikan Terakhir', 'Contoh: S1 Pendidikan Agama Islam / Pesantren');
    if (!pendidikan) return;

    const pengalaman = await getInput('Pengalaman Mengajar Tahfidz', 'Contoh: 5 tahun mengajar tahfidz di Ponpes Al-Ikhlas');
    if (!pengalaman) return;

    const hafalanDetail = await getInput('Detail Hafalan Al-Qur\'an', 'Contoh: 30 Juz dengan sanad dari Syekh Abdullah, ijazah tahfidz tahun 2020');
    if (!hafalanDetail) return;

    const metodeTahfidz = await getInput('Metode Tahfidz yang Dikuasai', 'Contoh: Metode Tilawati, Yanbu\'a, One Day One Ayat, dll.');
    if (!metodeTahfidz) return;

    const accepted = await confirmTahfidzTerms();
    if (!accepted) {
        await Swal.fire({
            title: 'Pendaftaran Dibatalkan',
            text: 'Anda harus memenuhi persyaratan untuk mendaftar sebagai Guru Tahfidz.',
            icon: 'warning',
            confirmButtonColor: CONFIG.colors.warning
        });
        return;
    }

    const message = `*🕌 PENDAFTARAN GURU TAHFIDZ TPQ AL HIKMAH*

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya bermaksud untuk *mendaftar sebagai Guru Tahfidz* di TPQ Al Hikmah.

*📋 DATA LENGKAP CALON GURU:*
👤 *Nama:* ${nama}
🎓 *Pendidikan:* ${pendidikan}
👨‍🏫 *Pengalaman Tahfidz:* ${pengalaman}
📖 *Detail Hafalan:* ${hafalanDetail}
🎯 *Metode yang Dikuasai:* ${metodeTahfidz}

*✅ PERSYARATAN YANG DIPENUHI:*
• ✅ Hafal Al-Qur'an 30 Juz dengan sanad yang jelas
• ✅ Memiliki ijazah tahfidz dari ustadz/kyai yang kompeten
• ✅ Menguasai ilmu tajwid dengan baik
• ✅ Memiliki pengalaman mengajar tahfidz
• ✅ Mampu membimbing santri dengan sabar dan telaten
• ✅ Memiliki kemampuan mengoreksi bacaan santri

*🎯 SIAP UNTUK:*
• Mengajar program tahfidz Al-Qur'an
• Membimbing santri dari tingkat pemula hingga lanjutan  
• Menerapkan metode tahfidz yang efektif
• Melakukan evaluasi dan monitoring hafalan santri
• Bekerjasama dengan tim pengajar lainnya

Saya siap melampirkan:
📄 Ijazah tahfidz dan sertifikat pendukung
📄 CV lengkap dan foto
📄 Surat keterangan sehat
📄 Surat keterangan berkelakuan baik

Mohon informasi lebih lanjut terkait:
• Proses seleksi dan tes hafalan
• Jadwal mengajar yang tersedia
• Sistem kompensasi guru tahfidz
• Kurikulum dan target pembelajaran

Terima kasih atas kesempatan yang diberikan.
Barakallahu fiikum.

Wassalamu'alaikum warahmatullahi wabarakatuh`;

    openWhatsApp(message);
}

// Handle Jilid Teacher Registration  
async function handleJilidTeacher() {
    debugLog('Processing Jilid Teacher application');
    
    const nama = await getInput('Nama Lengkap Anda', 'Contoh: Ustadzah Fatimah Azzahra, S.Pd');
    if (!nama) return;

    const pendidikan = await getInput('Pendidikan Terakhir', 'Contoh: S1 Pendidikan Guru Madrasah Ibtidaiyah');
    if (!pendidikan) return;

    const pengalaman = await getInput('Pengalaman Mengajar Baca Tulis Al-Qur\'an', 'Contoh: 3 tahun mengajar jilid di TPQ Al-Falah');
    if (!pengalaman) return;

    const hafalanJuz30 = await getInput('Konfirmasi Hafalan Juz 30', 'Contoh: Hafal Juz 30 lengkap sejak 2019, sering memimpin sholat tarawih');
    if (!hafalanJuz30) return;

    const metodeJilid = await getInput('Metode Pembelajaran yang Dikuasai', 'Contoh: Qira\'ati, Iqro, Tilawati, Yanbu\'a, dll.');
    if (!metodeJilid) return;

    const accepted = await confirmJilidTerms();
    if (!accepted) {
        await Swal.fire({
            title: 'Pendaftaran Dibatalkan', 
            text: 'Anda harus memenuhi persyaratan untuk mendaftar sebagai Guru Jilid.',
            icon: 'warning',
            confirmButtonColor: CONFIG.colors.warning
        });
        return;
    }

    const message = `*📖 PENDAFTARAN GURU JILID TPQ AL HIKMAH*

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya bermaksud untuk *mendaftar sebagai Guru Jilid* di TPQ Al Hikmah.

*📋 DATA LENGKAP CALON GURU:*
👤 *Nama:* ${nama}
🎓 *Pendidikan:* ${pendidikan}
👨‍🏫 *Pengalaman Mengajar:* ${pengalaman}  
📖 *Hafalan Juz 30:* ${hafalanJuz30}
🎯 *Metode yang Dikuasai:* ${metodeJilid}

*✅ PERSYARATAN YANG DIPENUHI:*
• ✅ Hafal minimal Juz 30 (Juz 'Amma) dengan lancar
• ✅ Menguasai kaidah tajwid dengan baik
• ✅ Memiliki pengalaman mengajar baca tulis Al-Qur'an
• ✅ Menguasai metode pembelajaran jilid/iqro
• ✅ Mampu mengajar anak-anak dengan sabar
• ✅ Memiliki kemampuan mengoreksi bacaan dan tajwid

*🎯 SIAP UNTUK:*
• Mengajar jilid 1-6 / Iqro 1-6
• Membimbing santri belajar huruf hijaiyah
• Mengajarkan kaidah tajwid dasar
• Melatih kelancaran membaca Al-Qur'an
• Mempersiapkan santri untuk program lanjutan

Saya siap melampirkan:
📄 Ijazah pendidikan dan sertifikat mengajar
📄 CV lengkap dan foto
📄 Surat keterangan sehat  
📄 Surat keterangan berkelakuan baik

Mohon informasi lebih lanjut terkait:
• Proses seleksi dan tes kemampuan mengajar
• Jadwal mengajar yang tersedia
• Sistem kompensasi guru jilid
• Kurikulum dan bahan ajar yang digunakan

Terima kasih atas kesempatan yang diberikan.
Barakallahu fiikum.

Wassalamu'alaikum warahmatullahi wabarakatuh`;

    openWhatsApp(message);
}

// Terms confirmation for Tahfidz Teacher - FIXED HTML
async function confirmTahfidzTerms() {
    const { isConfirmed } = await Swal.fire({
        title: '🕌 Persyaratan Guru Tahfidz',
        html: `
            <div class="text-left max-h-96 overflow-y-auto p-4">
                <p class="font-semibold mb-4">Pastikan Anda memenuhi kriteria khusus Guru Tahfidz:</p>
                
                <div class="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                    <h4 class="font-semibold text-blue-800 mb-2">📖 Persyaratan Hafalan:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>✅ <strong>Hafal Al-Qur'an 30 Juz lengkap</strong></li>
                        <li>✅ Memiliki sanad hafalan yang jelas dari ustadz/kyai</li>
                        <li>✅ Memiliki ijazah tahfidz yang sah</li>
                        <li>✅ Mampu membaca dengan tartil dan sesuai kaidah tajwid</li>
                    </ul>
                </div>

                <div class="bg-green-50 p-4 rounded-lg mb-4 border-l-4 border-green-500">
                    <h4 class="font-semibold text-green-800 mb-2">🎯 Kemampuan Mengajar:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>✅ Pengalaman mengajar tahfidz minimal 2 tahun</li>
                        <li>✅ Menguasai metode tahfidz (tilawati, yanbu'a, dll)</li>
                        <li>✅ Mampu mengoreksi hafalan dan bacaan santri</li>
                        <li>✅ Sabar dan telaten dalam membimbing</li>
                    </ul>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg mb-4 border-l-4 border-yellow-500">
                    <h4 class="font-semibold text-yellow-800 mb-2">📋 Persyaratan Umum:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>✅ Pendidikan minimal SMA/MA (diutamakan S1)</li>
                        <li>✅ Berkelakuan baik dan berakhlak mulia</li>
                        <li>✅ Sehat jasmani dan rohani</li>
                        <li>✅ Mampu bekerjasama dalam tim</li>
                    </ul>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mt-4">
                    <input type="checkbox" id="tahfidzTermsCheckbox" class="mr-2">
                    <label for="tahfidzTermsCheckbox" class="font-semibold">Saya menyatakan telah memenuhi SEMUA persyaratan Guru Tahfidz di atas dan siap mengikuti tes seleksi.</label>
                </div>
            </div>
        `,
        width: '600px',
        focusConfirm: false,
        confirmButtonText: 'Lanjutkan Pendaftaran',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: CONFIG.colors.success,
        cancelButtonColor: CONFIG.colors.error,
        preConfirm: () => {
            const checkbox = document.getElementById('tahfidzTermsCheckbox');
            if (!checkbox.checked) {
                Swal.showValidationMessage('Anda harus menyetujui bahwa telah memenuhi persyaratan ini.');
                return false;
            }
            return true;
        }
    });
    return isConfirmed;
}

// Terms confirmation for Jilid Teacher - FIXED HTML
async function confirmJilidTerms() {
    const { isConfirmed } = await Swal.fire({
        title: '📖 Persyaratan Guru Jilid',
        html: `
            <div class="text-left max-h-96 overflow-y-auto p-4">
                <p class="font-semibold mb-4">Pastikan Anda memenuhi kriteria khusus Guru Jilid:</p>
                
                <div class="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                    <h4 class="font-semibold text-blue-800 mb-2">📖 Persyaratan Hafalan:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>✅ <strong>Hafal minimal Juz 30 (Juz 'Amma) lengkap</strong></li>
                        <li>✅ Hafal surat-surat pendek yang sering dibaca</li>
                        <li>✅ Mampu membaca Al-Qur'an dengan lancar dan tartil</li>
                        <li>✅ Menguasai kaidah tajwid dengan baik</li>
                    </ul>
                </div>

                <div class="bg-green-50 p-4 rounded-lg mb-4 border-l-4 border-green-500">
                    <h4 class="font-semibold text-green-800 mb-2">🎯 Kemampuan Mengajar:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>✅ Pengalaman mengajar baca tulis Al-Qur'an</li>
                        <li>✅ Menguasai metode jilid/iqro (Qira'ati, Tilawati, dll)</li>
                        <li>✅ Mampu mengajar huruf hijaiyah dan tajwid dasar</li>
                        <li>✅ Sabar dalam mengajar anak-anak</li>
                    </ul>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg mb-4 border-l-4 border-yellow-500">
                    <h4 class="font-semibold text-yellow-800 mb-2">📋 Persyaratan Umum:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>✅ Pendidikan minimal SMA/MA</li>
                        <li>✅ Berkelakuan baik dan berakhlak mulia</li>
                        <li>✅ Sehat jasmani dan rohani</li>
                        <li>✅ Mampu bekerjasama dalam tim</li>
                        <li>✅ Diutamakan memiliki sertifikat mengajar</li>
                    </ul>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg mt-4">
                    <input type="checkbox" id="jilidTermsCheckbox" class="mr-2">
                    <label for="jilidTermsCheckbox" class="font-semibold">Saya menyatakan telah memenuhi SEMUA persyaratan Guru Jilid di atas dan siap mengikuti tes seleksi.</label>
                </div>
            </div>
        `,
        width: '600px',
        focusConfirm: false,
        confirmButtonText: 'Lanjutkan Pendaftaran',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: CONFIG.colors.success,
        cancelButtonColor: CONFIG.colors.error,
        preConfirm: () => {
            const checkbox = document.getElementById('jilidTermsCheckbox');
            if (!checkbox.checked) {
                Swal.showValidationMessage('Anda harus menyetujui bahwa telah memenuhi persyaratan ini.');
                return false;
            }
            return true;
        }
    });
    return isConfirmed;
}

/* =======================================================
 * WHATSAPP CONTACT MAIN FUNCTION
 * ====================================================== */

async function whatsappContact(action) {
    debugLog('whatsappContact called with action:', action);
    
    /* Action Handlers */
    
    // 1. Kelas Privat
    if (action === 'kelasPrivat') {
        debugLog('Showing registration form for Kelas Privat');
        showRegistrationForm('privat');
        return;
    }

    // 2. Kelas Offline  
    if (action === 'kelasOffline') {
        debugLog('Showing registration form for Kelas Offline');
        showRegistrationForm('offline');
        return;
    }

    // 3. Guru Pengajar - UPDATED
    if (action === 'guruPengajar') {
        debugLog('Processing Guru Pengajar application - showing options');
        await showTeacherOptions();
        return;
    }

    // 4. Hubungi (Multi-purpose)
    if (action === 'hubungi') {
        debugLog('Showing contact options menu');
        
        const type = await Swal.fire({
            title: 'Pilih Jenis Layanan',
            text: 'Apa yang ingin Anda lakukan?',
            input: 'select',
            inputOptions: {
                daftar: '📝 Mendaftar Santri (Form Lengkap)',
                bertanya: '❓ Bertanya / Konsultasi',
                guru: '👨‍🏫 Daftar Guru Pengajar',
                kunjungan: '🏢 Jadwal Kunjungan ke TPQ',
                info_biaya: '💰 Info Biaya & Paket Belajar'
            },
            inputPlaceholder: 'Silakan pilih layanan yang dibutuhkan',
            showCancelButton: true,
            confirmButtonColor: CONFIG.colors.primary,
            cancelButtonColor: CONFIG.colors.error,
            inputValidator: v => v ? null : 'Pilih salah satu layanan!'
        });
        
        if (!type.isConfirmed) {
            await Swal.fire({
                title: 'Dibatalkan',
                text: 'Tidak ada layanan yang dipilih.',
                icon: 'info',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Handle different service types
        switch (type.value) {
            case 'daftar':
                showRegistrationForm();
                return;
                
            case 'guru':
                await showTeacherOptions();
                return;
                
            case 'bertanya':
                const nama = await getInput('Nama Lengkap', 'Contoh: Bapak Ahmad Wijaya');
                if (!nama) return;
                
                const pertanyaan = await getInput('Pertanyaan Anda', 'Tulis pertanyaan atau konsultasi yang ingin disampaikan', 'textarea');
                if (!pertanyaan) return;

                const message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin *mengajukan pertanyaan/konsultasi*.

👤 *Nama:* ${nama}
❓ *Pertanyaan:* ${pertanyaan}

Mohon bantuan informasi dan penjelasannya.
Terima kasih atas waktu dan perhatiannya.

Wassalamu'alaikum warahmatullahi wabarakatuh`;

                openWhatsApp(message);
                return;
                
            case 'kunjungan':
                const namaKunjungan = await getInput('Nama Lengkap', 'Contoh: Ibu Siti Nurhaliza');
                if (!namaKunjungan) return;
                
                const tujuan = await getInput('Tujuan Kunjungan', 'Contoh: Survey lokasi untuk anak, melihat fasilitas');
                if (!tujuan) return;

                const messageKunjungan = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin *mengatur jadwal kunjungan* ke TPQ Al Hikmah.

👤 *Nama:* ${namaKunjungan}
🎯 *Tujuan Kunjungan:* ${tujuan}

Mohon informasi:
- Waktu kunjungan yang tersedia
- Fasilitas yang bisa dilihat
- Prosedur kunjungan

Terima kasih.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

                openWhatsApp(messageKunjungan);
                return;
                
            case 'info_biaya':
                const namaInfo = await getInput('Nama Lengkap', 'Contoh: Bapak Usman Hakim');
                if (!namaInfo) return;

                const messageInfo = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui *informasi biaya dan paket belajar* di TPQ Al Hikmah.

👤 *Nama:* ${namaInfo}

Mohon informasi detail mengenai:
- Biaya pendaftaran
- Biaya bulanan untuk setiap program
- Paket belajar yang tersedia
- Sistem pembayaran
- Potongan harga atau beasiswa yang tersedia

Terima kasih atas informasinya.
Wassalamu'alaikum warahmatullahi wabarakatuh`;

                openWhatsApp(messageInfo);
                return;
        }
    }

    // 5. Testimonial
    if (action === 'testimonial') {
        const message = 'Assalamu\'alaikum TPQ Al Hikmah,\n\nSaya ingin melihat *video testimonial* lengkap dari santri dan orangtua TPQ Al Hikmah.\n\nMohon kirimkan link atau video testimonial yang tersedia.\n\nJazakallahu khairan 🙏\nWassalamu\'alaikum warahmatullahi wabarakatuh';
        openWhatsApp(message);
        return;
    }

    // 6. Info Lokasi Surabaya - NEW FEATURE
    if (action === 'infoLokasiSurabaya') {
        debugLog('Processing Surabaya location inquiry');
        
        const nama = await getInput('Nama Lengkap', 'Contoh: Ibu Siti Khadijah');
        if (!nama) return;
        
        const keperluan = await Swal.fire({
            title: 'Keperluan Anda',
            text: 'Apa yang ingin Anda ketahui tentang cabang Surabaya?',
            input: 'select',
            inputOptions: {
                'alamat': 'Alamat lengkap cabang Surabaya',
                'daftar': 'Mendaftar santri di cabang Surabaya',
                'kunjungan': 'Jadwal kunjungan ke lokasi',
                'progress': 'Update progress pembukaan cabang',
                'fasilitas': 'Detail fasilitas yang tersedia'
            },
            inputPlaceholder: 'Pilih keperluan Anda',
            showCancelButton: true,
            confirmButtonColor: CONFIG.colors.primary,
            cancelButtonColor: CONFIG.colors.error,
            inputValidator: v => v ? null : 'Pilih salah satu keperluan!'
        });
        
        if (!keperluan.isConfirmed) {
            await Swal.fire({
                title: 'Dibatalkan',
                text: 'Konsultasi dibatalkan.',
                icon: 'info',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
        
        const keperluanText = {
            'alamat': 'alamat lengkap cabang Surabaya',
            'daftar': 'mendaftar santri di cabang Surabaya',
            'kunjungan': 'mengatur jadwal kunjungan ke lokasi',
            'progress': 'update progress pembukaan cabang',
            'fasilitas': 'detail fasilitas yang tersedia'
        };

        const messageLokasiSurabaya = `*🏢 KONSULTASI CABANG SURABAYA TPQ AL HIKMAH*

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya ingin mendapatkan informasi tentang *cabang Surabaya* TPQ Al Hikmah.

*📋 DATA KONSULTAN:*
👤 *Nama:* ${nama}
📞 *Keperluan:* Informasi ${keperluanText[keperluan.value]}

*❓ INFORMASI YANG DIBUTUHKAN:*
• Alamat lengkap cabang Surabaya
• Jadwal pembukaan resmi
• Proses pendaftaran santri
• Fasilitas yang tersedia
• Jadwal kunjungan lokasi
• Program pembelajaran yang ditawarkan

Mohon informasi lengkap mengenai cabang Surabaya ini.
Terima kasih atas waktu dan informasinya.

Jazakallahu khairan kathiran 🙏
Wassalamu'alaikum warahmatullahi wabarakatuh`;

        openWhatsApp(messageLokasiSurabaya);
        return;
    }

    // Fallback for unknown action
    debugLog('Unknown action received:', action);
    await Swal.fire({
        title: 'Error',
        text: 'Aksi tidak dikenal. Silakan coba lagi.',
        icon: 'error',
        confirmButtonColor: CONFIG.colors.error
    });
}

/* =======================================================
 * MODAL REGISTRATION FORM - FIXED HTML
 * ====================================================== */

function showRegistrationForm(preselectedClass = '') {
    debugLog('Showing registration form modal', { preselectedClass });
    
    const kelasOptions = preselectedClass === 'privat' ? 
        '<option value="privat" selected>Kelas Privat (1-on-1)</option><option value="offline">Kelas Offline (Kelompok)</option>' :
        preselectedClass === 'offline' ?
        '<option value="offline" selected>Kelas Offline (Kelompok)</option><option value="privat">Kelas Privat (1-on-1)</option>' :
        '<option value="">Pilih Jenis Kelas</option><option value="privat">Kelas Privat (1-on-1)</option><option value="offline">Kelas Offline (Kelompok)</option>';

    Swal.fire({
        title: '📝 Form Pendaftaran Santri TPQ Al Hikmah',
        html: `
            <div class="text-left max-h-[70vh] overflow-y-auto">
                <form id="modalRegistrationForm" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap Anak <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="modal-namaAnak" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                                placeholder="Contoh: Ahmad Zaki Mubarak"
                                required>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Usia Anak <span class="text-red-500">*</span>
                            </label>
                            <select id="modal-usiaAnak" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                                required>
                                <option value="">Pilih Usia</option>
                                <option value="4-6">4-6 tahun</option>
                                <option value="7-10">7-10 tahun</option>
                                <option value="11-15">11-15 tahun</option>
                                <option value="16+">16+ tahun</option>
                                <option value="dewasa">Dewasa</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Nama Orangtua/Wali <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="modal-namaOrtu" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                                placeholder="Contoh: Bapak Ahmad Susanto"
                                required>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                No. WhatsApp <span class="text-red-500">*</span>
                            </label>
                            <input type="tel" id="modal-nomorWA" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                                placeholder="Contoh: 081234567890 atau +6281234567890"
                                required>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Pilih Kelas <span class="text-red-500">*</span>
                            </label>
                            <select id="modal-jenisKelas" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                                required>
                                ${kelasOptions}
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Pilih Lokasi <span class="text-red-500">*</span>
                            </label>
                            <select id="modal-lokasi" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                                required>
                                <option value="">Pilih Lokasi</option>
                                <option value="sidoarjo">Sidoarjo (Pusat)</option>
                                <option value="surabaya">Surabaya (Cabang)</option>
                            </select>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Pengalaman Mengaji Anak
                            </label>
                            <select id="modal-pengalaman" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition">
                                <option value="">Pilih Pengalaman</option>
                                <option value="belum">Belum pernah belajar mengaji</option>
                                <option value="dasar">Sudah bisa hijaiyah dasar</option>
                                <option value="lancar">Sudah lancar membaca Al-Qur'an</option>
                                <option value="hafal">Sudah hafal beberapa surat</option>
                                <option value="tahfidz">Sudah menghafal lebih dari 5 juz</option>
                            </select>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Catatan Tambahan
                            </label>
                            <textarea id="modal-catatan" rows="4" 
                                class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition resize-none"
                                placeholder="Kondisi khusus anak, target pembelajaran, jadwal yang diinginkan, atau informasi lainnya..."></textarea>
                        </div>
                    </div>
                </form>
                <div class="bg-gray-50 p-4 rounded-lg mt-4 text-xs text-gray-600">
                    <strong>📋 Catatan:</strong><br>
                    • Fields dengan tanda <span class="text-red-500">*</span> wajib diisi<br>
                    • Data akan dikirim langsung ke WhatsApp TPQ Al Hikmah<br>
                    • Tim kami akan menghubungi Anda dalam 24 jam
                </div>
            </div>
        `,
        width: '700px',
        showCancelButton: true,
        confirmButtonText: '<i class="fab fa-whatsapp mr-2"></i>Kirim via WhatsApp',
        cancelButtonText: 'Batal',
        confirmButtonColor: CONFIG.colors.success,
        cancelButtonColor: CONFIG.colors.error,
        focusConfirm: false,
        preConfirm: () => {
            // Validate required fields
            const requiredFields = ['modal-namaAnak', 'modal-usiaAnak', 'modal-namaOrtu', 'modal-nomorWA', 'modal-jenisKelas', 'modal-lokasi'];
            let isValid = true;
            const missingFields = [];
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    if (!field.value.trim()) {
                        field.style.borderColor = '#ef4444';
                        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        missingFields.push(field.previousElementSibling.textContent.replace(' *', ''));
                        isValid = false;
                    } else {
                        field.style.borderColor = '#10b981';
                        field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                    }
                }
            });
            
            if (!isValid) {
                Swal.showValidationMessage(`Mohon lengkapi field: ${missingFields.join(', ')}`);
                return false;
            }
            
            // Validate WhatsApp number
            const nomorWA = document.getElementById('modal-nomorWA').value;
            if (!validateWhatsAppNumber(nomorWA)) {
                document.getElementById('modal-nomorWA').style.borderColor = '#ef4444';
                Swal.showValidationMessage('Format nomor WhatsApp tidak valid. Contoh: 081234567890');
                return false;
            }
            
            return {
                namaAnak: document.getElementById('modal-namaAnak').value.trim(),
                usiaAnak: document.getElementById('modal-usiaAnak').value,
                namaOrtu: document.getElementById('modal-namaOrtu').value.trim(),
                nomorWA: nomorWA.trim(),
                jenisKelas: document.getElementById('modal-jenisKelas').value,
                lokasi: document.getElementById('modal-lokasi').value,
                pengalaman: document.getElementById('modal-pengalaman').value || 'Tidak disebutkan',
                catatan: document.getElementById('modal-catatan').value.trim() || 'Tidak ada catatan khusus'
            };
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            debugLog('Modal form submitted', result.value);
            sendRegistrationToWhatsApp(result.value);
        }
    });
}

/* =======================================================
 * SEND REGISTRATION TO WHATSAPP
 * ====================================================== */

function sendRegistrationToWhatsApp(formData) {
    debugLog('Sending registration to WhatsApp', formData);
    
    const kelasText = formData.jenisKelas === 'privat' ? 'Kelas Privat (1-on-1)' : 'Kelas Offline (Kelompok)';
    const lokasiText = formData.lokasi === 'sidoarjo' ? 'Sidoarjo (Pusat)' : 'Surabaya (Cabang)';
    
    const message = `*🕌 PENDAFTARAN TPQ AL HIKMAH*

*📋 DATA CALON SANTRI:*
👦 *Nama Anak:* ${formData.namaAnak}
📅 *Usia:* ${formData.usiaAnak} tahun
👨‍👩‍👧‍👦 *Nama Orangtua:* ${formData.namaOrtu}
📱 *No. WhatsApp:* ${formData.nomorWA}

*📚 PILIHAN PROGRAM:*
🎓 *Jenis Kelas:* ${kelasText}
📍 *Lokasi:* ${lokasiText}
📖 *Pengalaman Mengaji:* ${formData.pengalaman}

*📝 CATATAN TAMBAHAN:*
${formData.catatan}

━━━━━━━━━━━━━━━━━━━━━

Assalamu'alaikum warahmatullahi wabarakatuh,

Saya bermaksud untuk *mendaftarkan putra/putri* saya di TPQ Al Hikmah sesuai data di atas.

Mohon informasi lebih lanjut mengenai:
✅ Jadwal belajar yang tersedia
✅ Biaya pendaftaran dan bulanan
✅ Proses seleksi (jika ada)
✅ Materi pembelajaran
✅ Jadwal trial class GRATIS

Terima kasih atas perhatian dan pelayanannya.

Jazakallahu khairan kathiran 🙏
Wassalamu'alaikum warahmatullahi wabarakatuh`;

    try {
        openWhatsApp(message);
        
        // Show success feedback
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Pendaftaran Berhasil Dikirim!',
                html: `
                    <div class="text-left">
                        <p class="font-semibold mb-4">✅ Data pendaftaran telah dikirim ke WhatsApp TPQ Al Hikmah</p>
                        
                        <p class="font-semibold mb-2">📞 Selanjutnya:</p>
                        <ul class="list-disc ml-5 mb-4">
                            <li>Tim kami akan menghubungi Anda dalam 24 jam</li>
                            <li>Anda akan mendapat informasi detail program</li>
                            <li>Jadwal trial class GRATIS akan diatur</li>
                            <li>Konsultasi gratis dengan ustadz/ustadzah</li>
                        </ul>
                        
                        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p class="font-semibold">💡 Tips:</p>
                            <p>Siapkan pertanyaan Anda untuk sesi konsultasi nanti!</p>
                        </div>
                    </div>
                `,
                confirmButtonText: 'Baik, Terima Kasih!',
                confirmButtonColor: CONFIG.colors.success,
                width: '500px'
            });
        }, 2000);
        
    } catch (error) {
        debugLog('Error sending registration', error);
        
        Swal.fire({
            icon: 'error',
            title: 'Gagal Mengirim Pendaftaran',
            html: `
                <p>Maaf, terjadi kesalahan saat mengirim data pendaftaran.</p>
                <br>
                <p><strong>Silakan hubungi langsung:</strong></p>
                <p>📱 WhatsApp: <a href="https://wa.me/6285183279603" target="_blank" class="text-green-600">+62 851-8327-9603</a></p>
                <br>
                <p>Atau salin pesan berikut dan kirim manual:</p>
                <textarea readonly class="w-full h-32 mt-2 p-2 border rounded text-xs">${message}</textarea>
            `,
            confirmButtonText: 'OK',
            confirmButtonColor: CONFIG.colors.primary,
            width: '600px'
        });
    }
}

/* =======================================================
 * ADDITIONAL FUNCTIONS
 * ====================================================== */

// Toggle FAQ function
function toggleFAQ(faqId) {
    debugLog('Toggling FAQ:', faqId);
    
    const content = document.getElementById(faqId);
    const icon = document.getElementById(faqId + '-icon');
    
    if (!content || !icon) {
        debugLog('FAQ elements not found', { content, icon });
        return;
    }
    
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

// Video player function
function playVideo(videoId) {
    debugLog('Playing video:', videoId);
    
    const videoData = {
        video1: {
            title: 'Testimonial Ibu Sari',
            subtitle: 'Orangtua Santri Kelas Privat',
            description: 'Testimoni tentang perkembangan belajar mengaji anak'
        },
        video2: {
            title: 'Testimonial Santri Alumni', 
            subtitle: 'Program Tahfidz Al-Qur\'an',
            description: 'Cerita perjalanan menghafal Al-Qur\'an di TPQ Al Hikmah'
        }
    };
    
    const video = videoData[videoId] || videoData.video1;
    
    Swal.fire({
        title: '🎥 ' + video.title,
        html: `
            <div class="text-center">
                <div class="bg-gradient-to-br from-blue-400 to-purple-600 h-64 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                    <div class="text-center text-white z-10">
                        <i class="fas fa-play-circle text-6xl mb-4 opacity-90 cursor-pointer hover:opacity-100 hover:scale-110 transition-all"></i>
                        <h3 class="font-bold text-lg">${video.subtitle}</h3>
                        <p class="opacity-80 text-sm mt-2">${video.description}</p>
                    </div>
                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg text-left">
                    <h4 class="font-semibold mb-3">🎯 Video Testimonial Tersedia:</h4>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>Testimonial orangtua santri</li>
                        <li>Cerita sukses program tahfidz</li> 
                        <li>Review metode pembelajaran</li>
                        <li>Progress santri dari nol hingga lancar</li>
                    </ul>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="fab fa-youtube mr-2"></i>Tonton di YouTube',
        cancelButtonText: 'Minta Video via WhatsApp',
        confirmButtonColor: '#ff0000',
        cancelButtonColor: CONFIG.colors.success,
        width: '500px'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open('https://youtube.com/@tpqalhikmah', '_blank');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            whatsappContact('testimonial');
        }
    });
}

// Maps function for Sidoarjo location
function openMaps(location) {
    debugLog('Opening maps for location:', location);
    
    if (location === 'sidoarjo') {
        // Replace with actual coordinates or address
        const mapsUrl = 'https://maps.google.com/maps?q=Jl.+Kemiri+No.+123,+Kemiri,+Sidoarjo,+Jawa+Timur';
        window.open(mapsUrl, '_blank');
    } else {
        debugLog('Unknown location for maps:', location);
    }
}

// Social media functions
function openInstagram() {
    debugLog('Opening Instagram');
    window.open('https://instagram.com/tpqalhikmah', '_blank');
}

function openTikTok() {
    debugLog('Opening TikTok');
    window.open('https://www.tiktok.com/@tpqalhikmah', '_blank');
}

function openYouTube() {
    debugLog('Opening YouTube');
    window.open('https://youtube.com/@tpqalhikmah', '_blank');
}

function openFacebook() {
    debugLog('Opening Facebook');
    window.open('https://facebook.com/tpqalhikmah', '_blank');
}

/* =======================================================
 * NAVIGATION AND UI FUNCTIONS
 * ====================================================== */

// Scroll to specific section
function scrollToSection(sectionId) {
    debugLog('Scrolling to section:', sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to specific class in classes section
function scrollToSpecificClass(classType) {
    debugLog('Scrolling to specific class:', classType);
    
    // First scroll to classes section
    scrollToSection('classes');
    
    // Then trigger the appropriate action after a short delay
    setTimeout(() => {
        if (classType === 'privat') {
            whatsappContact('kelasPrivat');
        } else if (classType === 'offline') {
            whatsappContact('kelasOffline');
        }
    }, 1000);
}

// Scroll to programs section
function scrollToPrograms() {
    debugLog('Scrolling to programs section');
    scrollToSection('programs');
}

// Toggle details for class cards
function toggleDetails(classType) {
    debugLog('Toggling details for class:', classType);
    
    const content = document.getElementById(classType + '-extra');
    const button = document.getElementById('btn-' + classType);
    const icon = button.querySelector('i.fa-chevron-down');
    
    if (content && button) {
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            button.querySelector('.btn-text').textContent = 'Lihat Lebih Banyak';
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.classList.add('expanded');
            button.querySelector('.btn-text').textContent = 'Lihat Lebih Sedikit';
            icon.style.transform = 'rotate(180deg)';
        }
    }
}

/* =======================================================
 * INITIALIZATION & ERROR HANDLING
 * ====================================================== */

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    debugLog('TPQ Al Hikmah Contact System Initialized');
    
    // Check for required dependencies
    if (typeof Swal === 'undefined') {
        console.error('[TPQ] SweetAlert2 library not found. Please include SweetAlert2.');
        return;
    }
    
    // Set up global error handler
    window.addEventListener('error', function(e) {
        debugLog('Global error caught:', e.error);
    });
    
    // Set up unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        debugLog('Unhandled promise rejection:', e.reason);
    });
    
    // Initialize CSS for expandable content
    const style = document.createElement('style');
    style.textContent = `
        .expandable-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
            opacity: 0;
        }
        .expandable-content.expanded {
            max-height: 1000px;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    debugLog('All systems ready ✅');
});

/* =======================================================
 * EXPORT FUNCTIONS (if using modules)
 * ====================================================== */

// Make functions globally available
window.whatsappContact = whatsappContact;
window.showRegistrationForm = showRegistrationForm;
window.sendRegistrationToWhatsApp = sendRegistrationToWhatsApp;
window.showTeacherOptions = showTeacherOptions;
window.handleTahfidzTeacher = handleTahfidzTeacher;
window.handleJilidTeacher = handleJilidTeacher;
window.toggleFAQ = toggleFAQ;
window.playVideo = playVideo;
window.openMaps = openMaps;
window.openInstagram = openInstagram;
window.openTikTok = openTikTok;
window.openYouTube = openYouTube;
window.openFacebook = openFacebook;
window.scrollToSection = scrollToSection;
window.scrollToSpecificClass = scrollToSpecificClass;
window.scrollToPrograms = scrollToPrograms;
window.toggleDetails = toggleDetails;

/* =======================================================
 * END OF FILE
 * ====================================================== */
