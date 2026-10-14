// engine.js - jembatan ke C++ (WebAssembly). Semua perhitungan dilakukan oleh kode C++.
const Mesin = (() => {
  let api = null;

  function muatScript(src) {
    return new Promise((ok, gagal) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = ok;
      s.onerror = () => gagal(new Error('File tidak ditemukan: ' + src));
      document.head.appendChild(s);
    });
  }

  async function mulai() {
    await muatScript('wasm/catalog.js');          // hasil build em++
    const M = await createCatalogModule();
    api = {
      ambilKatalog: M.cwrap('ambilKatalog', 'string', []),
      urutkanHarga: M.cwrap('urutkanHarga', 'string', []),
      cariProduk:   M.cwrap('cariProduk', 'string', ['string']),
      resetKatalog: M.cwrap('resetKatalog', null, []),
    };
  }

  return {
    mulai,
    ambilKatalog: () => JSON.parse(api.ambilKatalog()),
    urutkanHarga: () => JSON.parse(api.urutkanHarga()),
    cariProduk: (kata) => JSON.parse(api.cariProduk(kata)),
    resetKatalog: () => api.resetKatalog(),
  };
})();
