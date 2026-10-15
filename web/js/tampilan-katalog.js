// tampilan-katalog.js - menggambar kartu produk beserta keadaannya (normal, shift, stop, match, checking, dimmed)
const TampilanKatalog = (() => {
  let grid = null;
  const produkById = {};
  const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
  const LABEL = { shift: 'GESER', stop: 'STOP', match: 'COCOK', checking: 'DIPERIKSA' };

  // ikon sederhana per kategori
  const IKON = {
    Celana: '<svg class="product-icon trousers" aria-hidden="true" viewBox="0 0 100 100"><path d="M31 14h38l5 70-21 3-3-44-3 44-21-3 5-70Z"/><path d="M32 24h36M50 15v28"/></svg>',
    Jaket: '<svg class="product-icon jacket" aria-hidden="true" viewBox="0 0 100 100"><path d="m34 19 16 7 16-7 15 13-10 14-5-5v42H34V41l-5 5-10-14 15-13Z"/><path d="M50 26v57M39 63h7M54 63h7"/></svg>',
    Pakaian: '<svg class="product-icon shirt" aria-hidden="true" viewBox="0 0 100 100"><path d="m34 19 16 7 16-7 17 15-11 14-7-7v43H35V41l-7 7-11-14 17-15Z"/><path d="M42 22c1 8 15 8 16 0"/></svg>',
    Aksesoris: '<svg class="product-icon accessory" aria-hidden="true" viewBox="0 0 100 100"><path d="M25 48c5-18 45-21 54 1-17-5-36-3-54-1Z"/><path d="M38 47v8c0 8-7 14-15 14h-7c13-5 11-14 9-21M62 47c-1 13-10 24-22 28"/></svg>',
  };

  function mulai(elemenGrid, katalog) {
    grid = elemenGrid;
    katalog.forEach((p) => { produkById[p.id] = p; });
  }

  // keadaan = { idProduk: 'shift' | 'stop' | 'match' | 'checking' }
  // lainnya = keadaan untuk produk yang tidak disebut di `keadaan` ('normal' atau 'dimmed')
  function gambar(urutan, keadaan = {}, lainnya = 'normal') {
    if (urutan.length === 0) {
      grid.innerHTML = '<p class="empty">Tidak ada produk yang cocok. Klik Reset untuk menampilkan semua.</p>';
      return;
    }
    grid.innerHTML = urutan.map((id, i) => {
      const p = produkById[id];
      const state = keadaan[id] || lainnya;
      const label = LABEL[state] ? `<span class="state-label ${state}">${LABEL[state]}</span>` : '';
      return `<article class="product-card ${state}">
        <span class="card-number">${String(i + 1).padStart(2, '0')}</span>
        <div class="illustration-area category-${p.kategori.toLowerCase()}">${IKON[p.kategori] || ''}${label}</div>
        <div class="product-copy">
          <p>${p.kategori}</p>
          <h3>${p.nama}</h3>
          <strong>${rupiah.format(p.harga)}</strong>
          <span>Stok ${p.stok}</span>
        </div>
      </article>`;
    }).join('');
  }

  return { mulai, gambar };
})();
