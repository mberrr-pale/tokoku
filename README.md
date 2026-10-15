\# Tokoku - Web E-commerce Fashion \& Aksesoris



Tugas Struktur Data. Web sederhana bertema e-commerce dengan logika \*\*C++\*\* yang

dijalankan di browser lewat WebAssembly (Emscripten).



\- Nama: Berlian Ananda Apriliana

\- NIM: 25050974115

\- Demo: https://github.com/mberrr-pale/tokoku.git



\## Fitur

\- Katalog 12 produk (pakaian dan aksesoris).

\- \*\*Urutkan harga\*\* dengan Insertion Sort, lengkap dengan log langkah.

\- \*\*Cari produk\*\* dengan Linear Search (nama dan kategori), lengkap dengan log langkah.

\- Panel log di sisi kanan: ringkasan di atas, rincian dilipat per pass.

\- Kartu produk yang sedang dibandingkan atau digeser disorot di katalog.

\- Tombol \*\*Unduh log (.txt)\*\*.



\## Pemenuhan ketentuan tugas

| Ketentuan | Lokasi |

|---|---|

| Struct | `dtProduk` di `src/produk.h`, `LogLangkah` di `src/log.h` |

| Array | `produk\[JUMLAH\_PRODUK]` di `src/data.cpp`, `logData\[MAX\_LOG]` di `src/log.cpp` |

| Pointer | `dtProduk\* arr` dan `\*(arr + j)` di `src/sorting.cpp`; `const dtProduk\* p` di `src/searching.cpp`; parameter `int\*` untuk penghitung |

| Sorting + log | Insertion Sort di `src/sorting.cpp` |

| Searching + log | Linear Search di `src/searching.cpp` |



\## Kompleksitas

\- Insertion Sort: O(n) terbaik, O(n²) terburuk.

\- Linear Search: O(n).



\## Struktur folder

```

src/   kode C++ (produk, log, sorting, searching, web\_api, main)

web/   halaman web (HTML, CSS, JS) dan hasil build di web/wasm/catalog.js

```



\## Cara menjalankan

\*\*Web:\*\* buka folder proyek di VS Code, klik kanan `web/index.html`, pilih

\*Open with Live Server\* (atau `cd web` lalu `python -m http.server 8000`).



\*\*Konsol C++:\*\*

```

g++ -std=c++17 src/\*.cpp -o demo

./demo

```



\*\*Build ulang WebAssembly\*\* (butuh Emscripten):

```

em++ src/data.cpp src/log.cpp src/sorting.cpp src/searching.cpp src/web\_api.cpp -std=c++17 -O2 --no-entry -sMODULARIZE=1 -sEXPORT\_NAME=createCatalogModule -sSINGLE\_FILE=1 -sEXPORTED\_RUNTIME\_METHODS=cwrap,UTF8ToString -sEXPORTED\_FUNCTIONS=\_ambilKatalog,\_urutkanHarga,\_cariProduk,\_resetKatalog -o web/wasm/catalog.js

```

File `web/wasm/catalog.js` sudah disertakan, jadi Emscripten tidak perlu diinstal

hanya untuk membuka webnya.

