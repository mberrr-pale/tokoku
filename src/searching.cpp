#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "searching.h"
#include "log.h"

static void keKecil(const char* asal, char* tujuan, int ukuranTujuan) {
    int i = 0;
    for (; asal[i] != '\0' && i < ukuranTujuan - 1; i++) {
        tujuan[i] = (char)tolower((unsigned char)asal[i]);
    }
    tujuan[i] = '\0';
}

void linearSearchProduk(const dtProduk* arr, int n, const char* kataKunci,
                        int* perbandingan, int* ditemukan) {
    char kunci[PANJANG_KATA];
    char baris[PANJANG_TEKS];
    keKecil(kataKunci, kunci, sizeof(kunci));

    const dtProduk* p = arr;                 
    for (int i = 0; i < n; i++, p++) {
        char teks[PANJANG_NAMA + PANJANG_KATEGORI + 1];
        char kecil[PANJANG_NAMA + PANJANG_KATEGORI + 1];
        snprintf(teks, sizeof(teks), "%s %s", p->nama, p->kategori);
        keKecil(teks, kecil, sizeof(kecil));

        (*perbandingan)++;
        bool cocok = strstr(kecil, kunci) != NULL;
        if (cocok) (*ditemukan)++;

        snprintf(baris, sizeof(baris), "Cek %d/%d | [%s] [%s] -> %s",
                i + 1, n, p->nama, p->kategori, cocok ? "COCOK" : "tidak cocok");
        catatLog(0, p->id, -1, cocok ? "COCOK" : "TIDAK", baris);
    }
}