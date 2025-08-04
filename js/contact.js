async function whatsappContact(classType) {
  // Helper SweetAlert2 Input (judul dan placeholder dinamis)
  async function getInput(title, placeholder) {
    const { value, isConfirmed } = await Swal.fire({
      title,
      input: 'text',
      inputPlaceholder: placeholder,
      showCancelButton: true,
      confirmButtonText: 'Lanjut',
      cancelButtonText: 'Batal',
      allowOutsideClick: false
    });
    if (!isConfirmed) return null;
    if (!value || value.trim() === '') {
      await Swal.fire({
        icon: 'warning',
        title: 'Harus diisi!',
        text: 'Input tidak boleh kosong.',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      });
      // Ulang input
      return await getInput(title, placeholder);
    }
    return value.trim();
  }

  // Proses input nama
  const parentName = await getInput('Masukkan nama orang tua/wali:', 'Contoh: Bapak Ahmad');
  if (!parentName) {
    await Swal.fire('Dibatalkan', 'Pengisian data orang tua dibatalkan.', 'info');
    return;
  }
  const studentName = await getInput('Masukkan nama santri:', 'Contoh: Ananda Malik');
  if (!studentName) {
    await Swal.fire('Dibatalkan', 'Pengisian data santri dibatalkan.', 'info');
    return;
  }

  // Generate pesan WhatsApp
  let message = '';
  if (classType === 'privat') {
    message = `Assalamu'alaikum TPQ Al Hikmah,

Saya bermaksud untuk *mendaftarkan santri* pada program berikut:

📘 *Kelas Privat TPQ Al Hikmah*

Berikut data calon peserta:
1. 👤 Nama Orang Tua: *${parentName}*
2. 🧒 Nama Santri: *${studentName}*

Mohon informasi lebih lanjut mengenai:
- Jadwal belajar
- Biaya pendaftaran dan bulanan
- Proses pendaftaran

Terima kasih atas bantuannya.
Wassalamu'alaikum`;
  } else if (classType === 'offline') {
    message = `Assalamu'alaikum TPQ Al Hikmah,

Saya bermaksud untuk *mendaftarkan santri* pada program berikut:

🏫 *Kelas Offline TPQ Al Hikmah*

Berikut data calon peserta:
1. 👤 Nama Orang Tua: *${parentName}*
2. 🧒 Nama Santri: *${studentName}*

Mohon informasi lebih lanjut mengenai:
- Jadwal kelas
- Biaya pendaftaran dan bulanan
- Proses pendaftaran

Terima kasih atas bantuannya.
Wassalamu'alaikum`;
  } else if (classType === 'location') {
    message = `Assalamu'alaikum TPQ Al Hikmah,

Saya, ${parentName}, ingin mengetahui informasi tentang lokasi TPQ.

Pertanyaan saya:
- Alamat lengkap cabang
- Jadwal operasional
- Fasilitas
- Akses transportasi umum

Terima kasih.
Wassalamu'alaikum`;
  } else {
    message = `Assalamu'alaikum TPQ Al Hikmah,

Saya, ${parentName}, ingin mengetahui informasi lengkap mengenai program pembelajaran di TPQ untuk santri bernama ${studentName}.

Mohon bantuan dan informasinya.

Terima kasih.
Wassalamu'alaikum`;
  }

  const phoneNumber = '6281252596062';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.location.href = whatsappUrl;
}
