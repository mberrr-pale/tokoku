#pragma once

struct dtProduk {
    int id;
    char nama [30];
    char kategori [20];
    int harga;
    int stok;
};

const int JUMLAH_PRODUK = 12;
extern dtProduk produk[JUMLAH_PRODUK];
struct LogLangkah {
    int pass;
    int idA;
    int idB;
    char jenis[12];
    char teks[200];
};
const int MAX_LOG = 200;
extern LogLangkah logData[MAX_LOG];
extern int jumlahLog;

void resetLog();
void catatLog(int pass, int idA, int idB, const char* jenis, const char* teks);
void tampilkanLog();

void tukarProduk(dtProduk* a, dtProduk* b);

void insertionSortHarga(dtProduk* arr, int n, int* perbandingan, int* pergeseran);

void linearSearchProduk(const dtProduk* arr, int n, const char* kataKunci,
                        int* perbandingan, int* ditemukan);

