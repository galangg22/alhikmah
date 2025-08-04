// WhatsApp Contact Function (Updated)
function whatsappContact(classType) {
    let message = '';
    
    if (classType === 'privat') {
        message = `Assalamu'alaikum TPQ Al Hikmah,

Saya tertarik dengan Kelas Privat yang ditawarkan.

Keunggulan yang menarik bagi saya:
✅ Santri tidak perlu berangkat ke TPQ
✅ Jam belajar lebih fleksibel sesuai kesepakatan
✅ Pembelajaran 1-on-1 dengan ustadz
✅ Metode disesuaikan dengan kemampuan anak
✅ Progress tracking individual

Mohon informasi lebih lanjut mengenai:
- Jadwal yang tersedia
- Biaya pendaftaran dan bulanan
- Proses pendaftaran
- Lokasi pembelajaran

Terima kasih.
Wassalamu'alaikum`;
    } else if (classType === 'offline') {
        message = `Assalamu'alaikum TPQ Al Hikmah,

Saya tertarik dengan Kelas Offline yang ditawarkan.

Yang menarik bagi saya:
✅ Pembelajaran berkelompok di TPQ
✅ Interaksi sosial dengan sesama santri
✅ Jadwal terstruktur dan konsisten
✅ Fasilitas lengkap di gedung TPQ
✅ Kegiatan group learning

Mohon informasi lebih lanjut mengenai:
- Jadwal kelas yang tersedia
- Biaya pendaftaran dan bulanan
- Proses pendaftaran
- Lokasi TPQ

Terima kasih.
Wassalamu'alaikum`;
    } else if (classType === 'location') {
        message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui informasi lebih lanjut tentang lokasi TPQ Al Hikmah.

Pertanyaan saya:
- Alamat lengkap kedua cabang
- Jadwal operasional
- Fasilitas yang tersedia
- Akses transportasi umum

Terima kasih.
Wassalamu'alaikum`;
    } else {
        message = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui informasi lebih lanjut mengenai:

1. Program pembelajaran yang tersedia
2. Kelas Privat dan Kelas Offline
3. Biaya pendaftaran dan bulanan
4. Jadwal pembelajaran
5. Proses pendaftaran
6. Lokasi kedua cabang

Mohon dapat diberikan informasi lengkapnya.

Terima kasih atas perhatiannya.
Wassalamu'alaikum`;
    }
    
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp TPQ yang sebenarnya
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    showToast('Mengarahkan ke WhatsApp...');
}

// Phone Call Function
function callPhone() {
    const phoneNumber = 'tel:+622198765432'; // Ganti dengan nomor telepon yang sebenarnya
    window.open(phoneNumber, '_self');
    showToast('Memanggil nomor telepon...');
}

// Email Function
function sendEmail() {
    const subject = 'Inquiry TPQ Al Hikmah - Informasi Program';
    const body = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin mengetahui informasi lebih lanjut mengenai:

1. Program pembelajaran yang tersedia
2. Kelas Privat dan Kelas Offline
3. Biaya pendaftaran dan bulanan
4. Jadwal pembelajaran
5. Proses pendaftaran
6. Lokasi kedua cabang (Sidoarjo dan Surabaya)

Mohon dapat diberikan informasi lengkapnya.

Terima kasih atas perhatiannya.
Wassalamu'alaikum

---
Email ini dikirim melalui website TPQ Al Hikmah`;

    const mailtoUrl = `mailto:info@tpqalhikmah.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
    showToast('Membuka aplikasi email...');
}

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set color based on type
    if (type === 'success') {
        toast.className = toast.className.replace(/bg-\w+-500/, 'bg-green-500');
    } else if (type === 'error') {
        toast.className = toast.className.replace(/bg-\w+-500/, 'bg-red-500');
    } else if (type === 'info') {
        toast.className = toast.className.replace(/bg-\w+-500/, 'bg-blue-500');
    }
    
    // Show toast
    toast.classList.remove('translate-x-full');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 3000);
}

// Form validation (if needed for future forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone);
}
