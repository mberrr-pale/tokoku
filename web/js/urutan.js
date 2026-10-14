// urutan.js - menyusun urutan kartu setelah SETIAP langkah sorting, dari log C++.
// Pada Insertion Sort, tiap langkah GESER sama dengan: produk yang disisipkan (idA)
// bertukar tempat dengan tetangga kirinya (idB). Langkah STOP tidak mengubah urutan.
function hitungUrutan(urutanAwal, log) {
  const arr = urutanAwal.slice();
  const hasil = [];
  log.forEach((langkah) => {
    if (langkah.jenis === 'GESER') {
      const a = arr.indexOf(langkah.idA);
      const b = arr.indexOf(langkah.idB);
      [arr[a], arr[b]] = [arr[b], arr[a]];
    }
    hasil.push(arr.slice());
  });
  return hasil;
}
