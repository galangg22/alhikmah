/* -------------------------------------------------
 * FUNGSI KONTAK WHATSAPP TPQ AL HIKMAH
 * ------------------------------------------------ */
async function whatsappContact(action) {

  /* Util input satu kolom teks */
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

  /* Modal konfirmasi persyaratan guru */
  async function confirmTerms() {
    const { isConfirmed } = await Swal.fire({
      title: 'Persyaratan Guru Pengajar',
      html: `
        <p>Pastikan Anda memenuhi kriteria berikut:</p>
        <ul style="text-align:left;margin-top:10px">
          <li>✅ Memiliki sertifikat mengajar</li>
          <li>✅ Memiliki keilmuan agama Islam</li>
          <li>✅ Diutamakan hafal Al-Qur’an minimal Juz 30</li>
          <li>✅ Mampu bekerjasama dengan tim</li>
        </ul><br/>
        <input type="checkbox" id="termsCheckbox" />
        <label for="termsCheckbox"> Saya telah membaca dan memenuhi persyaratan di atas.</label>
      `,
      focusConfirm: false,
      confirmButtonText: 'Lanjutkan',
      showCancelButton: true,
      preConfirm: () => {
        if (!document.getElementById('termsCheckbox').checked) {
          Swal.showValidationMessage('Anda harus menyetujui persyaratan ini.');
          return false;
        }
        return true; // value akan bernilai true jika lolos
      }
    });
    return isConfirmed;     // true jika tombol Lanjutkan ditekan & checkbox dicentang
  }

  /* Nomor WhatsApp resmi */
  const baseUrl = 'https://wa.me/6285183279603?text=';

  /* ---------- A. TOMBOL LANGSUNG ---------- */
  /* 1. Kelas Privat & Offline */
  if (action === 'kelasPrivat' || action === 'kelasOffline') {
    const ortu   = await getInput('Nama orang tua/wali', 'Contoh: Bapak Ahmad');
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

  /* 2. Guru Pengajar */
  if (action === 'guruPengajar') {
    const nama = await getInput('Nama Lengkap Anda', 'Contoh: Bapak Ahmad');
    if (!nama) return;

    const accepted = await confirmTerms();
    if (!accepted) {
      await Swal.fire('Dibatalkan', 'Anda harus menyetujui persyaratan untuk mendaftar sebagai guru pengajar.', 'warning');
      return;
    }

    const msg = `Assalamu'alaikum TPQ Al Hikmah,

Saya bermaksud untuk *mendaftar sebagai Guru Pengajar* di TPQ Al Hikmah.

Berikut data singkat saya:
👤 Nama: ${nama}

Saya telah memahami dan memenuhi persyaratan:
- Memiliki sertifikat mengajar
- Memiliki keilmuan agama Islam
- Diutamakan hafal Al-Qur’an minimal Juz 30
- Mampu bekerja sama dalam tim

Saya siap melampirkan dokumen pendukung apabila diperlukan.

Mohon informasi lebih lanjut terkait proses pendaftaran.

Terima kasih atas perhatiannya.
Wassalamu'alaikum`;

    window.open(baseUrl + encodeURIComponent(msg));
    return;
  }

  /* ---------- B. MENU SERBAGUNA HUBUNGI ---------- */
  if (action === 'hubungi') {

    /* Pilih jenis aksi */
    const type = await Swal.fire({
      title: 'Pilih aksi',
      input: 'select',
      inputOptions: {
        bertanya: 'Bertanya',
        daftar:   'Mendaftar',
        guru:     'Daftar Guru Pengajar'
      },
      inputPlaceholder: 'Silakan pilih',
      showCancelButton: true,
      inputValidator: v => v ? null : 'Pilih salah satu!'
    });
    if (!type.isConfirmed) {
      await Swal.fire('Dibatalkan', 'Aksi telah dibatalkan.', 'info');
      return;
    }

    /* --- 1. Daftar kelas --- */
    if (type.value === 'daftar') {
      const cls = await Swal.fire({
        title: 'Pilih jenis kelas',
        input: 'radio',
        inputOptions: {
          privat:  'Kelas Privat',
          offline: 'Kelas Offline'
        },
        showCancelButton: true,
        inputValidator: v => v ? null : 'Pilih kelas!'
      });
      if (!cls.isConfirmed) {
        await Swal.fire('Dibatalkan', 'Aksi telah dibatalkan.', 'info');
        return;
      }
      const ortu   = await getInput('Nama orang tua/wali', 'Contoh: Bapak Ahmad');
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

    /* --- 2. Daftar Guru Pengajar --- */
    if (type.value === 'guru') {
      whatsappContact('guruPengajar');  // panggil proses guru di atas
      return;
    }

    /* --- 3. Bertanya --- */
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

  /* ---------- C. Fallback ---------- */
  await Swal.fire('Error', 'Aksi tidak dikenal', 'error');
}

/* Fungsi buka media sosial */
function openInstagram() {
  window.open('https://instagram.com/tpqalhikmah', '_blank');
}
function openTikTok() {
  window.open('https://www.tiktok.com/@tpqalhikmah', '_blank');
}
