// app.js - menyambungkan tombol, mesin C++, katalog, dan panel log
(async () => {
  const $ = (id) => document.getElementById(id);
  const status = (teks) => { $('status').textContent = teks; };

  try {
    await Mesin.mulai();
  } catch (e) {
    $('badge').textContent = 'Gagal memuat mesin C++';
    status('Pastikan web/wasm/catalog.js ada dan halaman dibuka lewat Live Server (http://), bukan klik dua kali. ' + e.message);
    return;
  }
  $('badge').textContent = 'Mesin: C++ → WebAssembly';

  const katalog = Mesin.ambilKatalog();
  const semuaId = katalog.map((p) => p.id);
  TampilanKatalog.mulai($('grid'), katalog);
  TampilanKatalog.gambar(semuaId);

  PanelLog.mulai({
    saatLangkah(l, i, hasil, jenis) {
      if (jenis === 'sort') {
        TampilanKatalog.gambar(hasil.urutanLangkah[i],
          { aktif: [l.idA, l.idB], jenis: l.jenis === 'GESER' ? 'swap' : 'compare' });
      } else {
        const cocok = hasil.log.slice(0, i + 1).filter((x) => x.jenis === 'COCOK').map((x) => x.idA);
        TampilanKatalog.gambar(hasil.urutan,
          { aktif: [l.idA], jenis: l.jenis === 'COCOK' ? 'found' : 'miss', cocok });
      }
    },
    saatSelesai(hasil, jenis) {
      if (jenis === 'sort') TampilanKatalog.gambar(hasil.urutan);
      else TampilanKatalog.gambar(hasil.urutan, { cocok: hasil.cocok, redup: true });
    },
    saatTutup(hasil, jenis) {
      if (jenis === 'sort') {
        TampilanKatalog.gambar(hasil.urutan);
        status('Diurutkan berdasarkan harga (termurah → termahal).');
      } else {
        TampilanKatalog.gambar(hasil.cocok);
        status(`Menampilkan ${hasil.ditemukan} dari ${hasil.jumlahData} produk untuk "${hasil.kata}".`);
      }
    },
  });

  $('btn-urut').onclick = () => {
    const hasil = Mesin.urutkanHarga();                    // dijalankan oleh C++
    hasil.urutanLangkah = hitungUrutan(semuaId, hasil.log);
    PanelLog.buka(hasil, 'sort');
  };

  $('form-cari').onsubmit = (e) => {
    e.preventDefault();
    const kata = $('kata').value.trim();
    if (!kata) { $('kata').focus(); return; }
    const hasil = Mesin.cariProduk(kata);                  // dijalankan oleh C++
    hasil.kata = kata;
    PanelLog.buka(hasil, 'search');
  };

  $('btn-reset').onclick = () => {
    PanelLog.tutup();
    Mesin.resetKatalog();
    $('kata').value = '';
    TampilanKatalog.gambar(semuaId);
    status('');
  };
})();
