#pragma once

const int PANJANG_NAMA     = 30;
const int PANJANG_KATEGORI = 20;
const int JUMLAH_PRODUK    = 12;

struct dtProduk {
    int  id;
    char nama[PANJANG_NAMA];
    char kategori[PANJANG_KATEGORI];
    int  harga;
    int  stok;
};

extern dtProduk produk[JUMLAH_PRODUK];