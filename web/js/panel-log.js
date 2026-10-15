// panel-log.js - panel samping: ringkasan, rincian per pass, animasi, unduh .txt
const PanelLog = (() => {
  const $ = (id) => document.getElementById(id);
  const KECEPATAN = 600;               // milidetik per langkah
  let cb = {}, hasil = null, jenis = '', idx = -1, timer = null;

  function mulai(callback) {
    cb = callback;
    $('panel-tutup').onclick = tutup;
    $('btn-putar').onclick = () => (timer ? jeda() : putar());
    $('btn-lompat').onclick = lompat;
    $('btn-unduh').onclick = unduh;
    $('langkah').addEventListener('click', (e) => {
      const tombol = e.target.closest('.log-line');
      if (!tombol) return;
      jeda();
      keLangkah(Number(tombol.dataset.i));
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tutup(); });
  }

  const kotak = (label, nilai) => `<div><span>${label}</span><strong>${nilai}</strong></div>`;
  const titik = (kelas, label) => `<span><i class="${kelas}"></i>${label}</span>`;

  function gambarRingkasan() {
    const r = hasil;
    $('panel-kicker').textContent = jenis === 'sort' ? 'Proses pengurutan' : 'Proses pencarian';
    $('panel-judul').textContent = jenis === 'sort'
      ? 'Log Sorting — Harga'
      : 'Log Pencarian — “' + r.kata + '”';
    $('ringkasan').innerHTML = kotak('Metode', r.metode) + kotak('Jumlah data', r.jumlahData + ' produk') +
      kotak('Perbandingan', r.perbandingan + 'x') +
      (jenis === 'sort' ? kotak('Pergeseran', r.pergeseran + 'x') : kotak('Ditemukan', r.ditemukan + ' produk'));
    $('legenda').innerHTML = jenis === 'sort'
      ? titik('shift', 'Geser') + titik('stop', 'Stop')
      : titik('match', 'Cocok') + titik('miss', 'Tidak cocok');
  }

  // kelas warna garis kiri per jenis langkah
  const KELAS = { GESER: 'shift', STOP: 'stop', COCOK: 'match', TIDAK: 'miss' };

  function gambarLangkah() {
    const grup = {};
    hasil.log.forEach((l, i) => { (grup[l.pass] = grup[l.pass] || []).push([l, i]); });
    $('langkah').innerHTML = Object.keys(grup).map((pass, urutanGrup) => {
      const baris = grup[pass].map(([l, i]) =>
        `<button class="log-line ${KELAS[l.jenis] || 'miss'}" data-i="${i}" type="button">` +
        `<span class="no">${String(i + 1).padStart(3, '0')}</span>${l.teks}</button>`).join('');
      const judul = jenis === 'sort'
        ? `Pass ${pass} (${grup[pass].length} langkah)`
        : `Pemeriksaan data (${grup[pass].length} langkah)`;
      return `<details${urutanGrup === 0 ? ' open' : ''}><summary><span>${judul}</span><span aria-hidden="true">⌄</span></summary>` +
             `<div class="step-list">${baris}</div></details>`;
    }).join('');
  }

  function keLangkah(i) {
    idx = i;
    document.querySelectorAll('.log-line.active').forEach((el) => el.classList.remove('active'));
    const el = document.querySelector(`.log-line[data-i="${i}"]`);
    if (el) {
      el.classList.add('active');
      el.closest('details').open = true;
      el.scrollIntoView({ block: 'nearest' });
    }
    cb.saatLangkah(hasil.log[i], i, hasil, jenis);
  }

  function putar() {
    if (idx >= hasil.log.length - 1) idx = -1;
    $('btn-putar').textContent = 'Ⅱ Jeda';
    timer = setInterval(() => {
      if (idx + 1 >= hasil.log.length) { jeda(); cb.saatSelesai(hasil, jenis); return; }
      keLangkah(idx + 1);
    }, KECEPATAN);
  }
  function jeda() { clearInterval(timer); timer = null; $('btn-putar').textContent = '▶ Putar'; }
  function lompat() { jeda(); idx = hasil.log.length - 1; cb.saatSelesai(hasil, jenis); }

  function buka(hasilBaru, jenisBaru) {
    jeda(); hasil = hasilBaru; jenis = jenisBaru; idx = -1;
    gambarRingkasan(); gambarLangkah();
    $('panel').classList.add('buka');
    $('panel').setAttribute('aria-hidden', 'false');
    document.body.classList.add('panel-buka');
    putar();
  }

  function tutup() {
    if (!hasil || !$('panel').classList.contains('buka')) return;
    jeda();
    $('panel').classList.remove('buka');
    $('panel').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('panel-buka');
    cb.saatTutup(hasil, jenis);
  }

  function susunTeks() {
    const r = hasil, baris = [];
    baris.push('LOG ' + (jenis === 'sort' ? 'SORTING' : 'PENCARIAN') + ' - Tokoku');
    baris.push('Metode        : ' + r.metode);
    if (jenis === 'search') baris.push('Kata kunci    : ' + r.kata);
    baris.push('Jumlah data   : ' + r.jumlahData);
    baris.push('Perbandingan  : ' + r.perbandingan);
    baris.push(jenis === 'sort' ? 'Pergeseran    : ' + r.pergeseran : 'Ditemukan     : ' + r.ditemukan);
    baris.push('-'.repeat(60));
    r.log.forEach((l, i) => baris.push(String(i + 1).padStart(3, '0') + ' | ' + l.teks));
    return baris.join('\n') + '\n';
  }

  function unduh() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([susunTeks()], { type: 'text/plain;charset=utf-8' }));
    a.download = jenis === 'sort' ? 'log-sorting-harga.txt'
                                  : 'log-pencarian-' + hasil.kata.replace(/\W+/g, '_') + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return { mulai, buka, tutup };
})();
