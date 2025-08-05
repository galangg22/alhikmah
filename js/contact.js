async function whatsappContact(action) {
  async function getInput(title, placeholder) {
    const res = await Swal.fire({
      title,
      input: 'text',
      inputPlaceholder: placeholder,
      showCancelButton: true,
      inputValidator: v => v ? null : 'Input tidak boleh kosong!'
    });
    if (!res.isConfirmed) {
      await Swal.fire('Dibatalkan', 'Aksi telah dibatalkan.', 'info');
      return null;
    }
    return res.value;
  }

  const baseUrl = 'https://wa.me/6285183279603?text=';

  if (action === 'kelasPrivat' || action === 'kelasOffline') {
    const ortu = await getInput('Nama orang tua/wali', 'Contoh: Bapak Ahmad');
    if (!ortu) return;

    const santri = await getInput('Nama santri', 'Contoh: Ananda Malik');
    if (!santri) return;

    const jenis = action === 'kelasPrivat' ? 'Kelas Privat' : 'Kelas Offline';
    const msg = `Assalamu'alaikum TPQ Al Hikmah,

Saya bermaksud untuk *mendaftarkan santri* pada program berikut:

📘 *${jenis} TPQ Al Hikmah*

Berikut data calon peserta:
1. 👤 Nama Orang Tua: ${ortu}
2. 🧒 Nama Santri: ${santri}

Mohon informasi lebih lanjut mengenai:
- Jadwal belajar
- Biaya pendaftaran dan bulanan
- Proses pendaftaran

Terima kasih atas bantuannya.
Wassalamu'alaikum`;

    window.open(baseUrl + encodeURIComponent(msg));
    return;
  }

  if (action === 'guruPengajar') {
    const nama = await getInput('Nama Lengkap Anda', 'Contoh: Bapak Ahmad');
    if (!nama) return;

   const msg = `Assalamu'alaikum TPQ Al Hikmah,

Saya bermaksud untuk *mendaftar sebagai Guru Pengajar* dengan data berikut:

👤 Nama: ${nama}

Saya telah memenuhi persyaratan berikut:
- Memiliki sertifikat mengajar
- Memiliki keilmuan agama Islam
- Diutamakan hafal Al-Qur’an minimal Juz 30
- Mampu bekerjasama dengan tim

Saya juga diharapkan siap melampirkan bukti dokumen pendukung apabila diminta.

Mohon informasi lebih lanjut mengenai proses pendaftaran dan persyaratan lainnya.

Terima kasih atas perhatiannya.
Wassalamu'alaikum`;


    window.open(baseUrl + encodeURIComponent(msg));
    return;
  }

  if (action === 'hubungi') {
    const type = await Swal.fire({
      title: 'Pilih aksi',
      input: 'select',
      inputOptions: {
        bertanya: 'Bertanya',
        daftar: 'Mendaftar',
        guru: 'Daftar Guru Pengajar'
      },
      inputPlaceholder: 'Silakan pilih',
      showCancelButton: true,
      inputValidator: v => v ? null : 'Pilih salah satu!'
    });

    if (!type.isConfirmed) {
      await Swal.fire('Dibatalkan', 'Aksi telah dibatalkan.', 'info');
      return;
    }

    if (type.value === 'daftar') {
      const cls = await Swal.fire({
        title: 'Pilih jenis kelas',
        input: 'radio',
        inputOptions: {
          privat: 'Kelas Privat',
          offline: 'Kelas Offline'
        },
        showCancelButton: true,
        inputValidator: v => v ? null : 'Pilih kelas!'
      });
      if (!cls.isConfirmed) {
        await Swal.fire('Dibatalkan', 'Aksi telah dibatalkan.', 'info');
        return;
      }
      const ortu = await getInput('Nama orang tua/wali', 'Contoh: Bapak Ahmad');
      if (!ortu) return;
      const santri = await getInput('Nama santri', 'Contoh: Ananda Malik');
      if (!santri) return;
      const jenis = cls.value === 'privat' ? 'Kelas Privat' : 'Kelas Offline';
      const msg = `Assalamu'alaikum TPQ Al Hikmah,

Saya bermaksud untuk *mendaftarkan santri* pada program berikut:

📘 *${jenis} TPQ Al Hikmah*

Berikut data calon peserta:
1. 👤 Nama Orang Tua: ${ortu}
2. 🧒 Nama Santri: ${santri}

Mohon informasi lebih lanjut mengenai:
- Jadwal belajar
- Biaya pendaftaran dan bulanan
- Proses pendaftaran

Terima kasih atas bantuannya.
Wassalamu'alaikum`;

      window.open(baseUrl + encodeURIComponent(msg));
      return;
    } 

    if (type.value === 'guru') {
      // Langsung panggil aksi guruPengajar
      whatsappContact('guruPengajar');
      return;
    }

    const nama = await getInput('Nama lengkap', 'Contoh: Bapak Ahmad');
    if (!nama) return;

    const pert = await getInput('Pertanyaan Anda', 'Tulis pertanyaan di sini');
    if (!pert) return;

    const msg = `Assalamu'alaikum TPQ Al Hikmah,

Saya ingin *mengajukan pertanyaan*.

👤 Nama: ${nama}
❓ Pertanyaan: ${pert}

Terima kasih atas informasinya.
Wassalamu'alaikum`;

    window.open(baseUrl + encodeURIComponent(msg));
    return;
  }

  await Swal.fire('Error', 'Aksi tidak dikenal', 'error');
}

// Fungsi untuk buka Instagram dan TikTok
function openInstagram() {
  window.open('https://instagram.com/tpqalhikmah', '_blank');
}

function openTikTok() {
  window.open('https://www.tiktok.com/@tpqalhikmah', '_blank');
}
