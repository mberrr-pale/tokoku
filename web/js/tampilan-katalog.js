// tampilan-katalog.js - menggambar kartu produk dan sorotannya
const TampilanKatalog = (() => {
  let grid = null;
  const produkById = {};
  const EMOJI = { Jaket: '🧥', Aksesoris: '🧢', Pakaian: '👕', Celana: '👖' };
  const rupiah = (v) => 'Rp' + v.toLocaleString('id-ID');

  function mulai(elemenGrid, katalog) {
    grid = elemenGrid;
    katalog.forEach((p) => { produkById[p.id] = p; });
  }

  // sorot = { aktif:[id], jenis:'compare|swap|found|miss', cocok:[id], redup:true/false }
  function gambar(urutan, sorot = {}) {
    const aktif = new Set(sorot.aktif || []);
    const cocok = new Set(sorot.cocok || []);
    if (urutan.length === 0) {
      grid.innerHTML = '<p class="kosong">Tidak ada produk yang cocok. Klik Reset untuk menampilkan semua.</p>';
      return;
    }
    grid.innerHTML = urutan.map((id, i) => {
      const p = produkById[id];
      let kelas = 'kartu';
      if (aktif.has(id)) kelas += ' is-' + (sorot.jenis || 'compare');
      if (cocok.has(id)) kelas += ' is-match';
      if (sorot.redup && !cocok.has(id)) kelas += ' is-dim';
      return `<article class="${kelas}">
        <span class="nomor">${i + 1}</span>
        <div class="gambar">${EMOJI[p.kategori] || '🛍️'}</div>
        <div class="kategori">${p.kategori}</div>
        <h3>${p.nama}</h3>
        <div class="harga">${rupiah(p.harga)}</div>
        <div class="stok">Stok ${p.stok}</div>
      </article>`;
    }).join('');
  }

  return { mulai, gambar };
})();
