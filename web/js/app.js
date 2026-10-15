// app.js - menyambungkan tombol, mesin C++, katalog, dan panel log
(async () => {
  const $ = (id) => document.getElementById(id);

  // baris status di atas katalog: teks, warna titik (sorting / search), dan label metode
  function status(teks, mode = '', metode = 'Data awal') {
    $('status').textContent = teks;
    $('status-dot').className = 'status-dot ' + mode;
    $('status-metode').textContent = metode;
  }

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
  const awal = () => status(`${katalog.length} produk tersedia — siap untuk dicari atau diurutkan.`);
  TampilanKatalog.mulai($('grid'), katalog);
  TampilanKatalog.gambar(semuaId);
  awal();

  PanelLog.mulai({
    saatLangkah(l, i, hasil, jenis) {
      const keadaan = {};
      if (jenis === 'sort') {
        keadaan[l.idA] = 'checking';                           // produk yang sedang disisipkan
        keadaan[l.idB] = l.jenis === 'GESER' ? 'shift' : 'stop';
        TampilanKatalog.gambar(hasil.urutanLangkah[i], keadaan);
      } else {
        hasil.log.slice(0, i + 1).forEach((x) => { if (x.jenis === 'COCOK') keadaan[x.idA] = 'match'; });
        if (l.jenis !== 'COCOK') keadaan[l.idA] = 'checking';
        TampilanKatalog.gambar(hasil.urutan, keadaan);
      }
    },
    saatSelesai(hasil, jenis) {
      if (jenis === 'sort') {
        TampilanKatalog.gambar(hasil.urutan);
      } else {
        const keadaan = {};
        hasil.cocok.forEach((id) => { keadaan[id] = 'match'; });
        TampilanKatalog.gambar(hasil.urutan, keadaan, 'dimmed');
      }
    },
    saatTutup(hasil, jenis) {
      if (jenis === 'sort') {
        TampilanKatalog.gambar(hasil.urutan);
        status('Diurutkan berdasarkan harga (termurah → termahal).', 'sorting', 'Insertion Sort');
      } else {
        TampilanKatalog.gambar(hasil.cocok);
        status(`Hasil pencarian “${hasil.kata}” — ${hasil.ditemukan} produk ditemukan.`, 'search', 'Linear Search');
      }
    },
  });

  $('btn-urut').onclick = () => {
    const hasil = Mesin.urutkanHarga();                    // dijalankan oleh C++
    hasil.urutanLangkah = hitungUrutan(semuaId, hasil.log);
    status('Mengurutkan berdasarkan harga (termurah → termahal).', 'sorting', 'Insertion Sort');
    PanelLog.buka(hasil, 'sort');
  };

  $('form-cari').onsubmit = (e) => {
    e.preventDefault();
    const kata = $('kata').value.trim();
    if (!kata) { $('kata').focus(); return; }
    const hasil = Mesin.cariProduk(kata);                  // dijalankan oleh C++
    hasil.kata = kata;
    status(`Mencari “${kata}” di ${hasil.jumlahData} produk...`, 'search', 'Linear Search');
    PanelLog.buka(hasil, 'search');
  };

  $('btn-reset').onclick = () => {
    PanelLog.tutup();
    Mesin.resetKatalog();
    $('kata').value = '';
    TampilanKatalog.gambar(semuaId);
    awal();
  };
})();
