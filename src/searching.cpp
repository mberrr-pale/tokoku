#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "produk.h"

static void keKecil(const char* asal, char* tujuan) {
    int i = 0;
    for (; asal[i] != '\0'; i++) {
        tujuan[i] = (char)tolower((unsigned char)asal[i]);
    }
    tujuan[i] = '\0';
}

void linearSearchProduk(const dtProduk* arr, int n, const char* kataKunci,
                        int* perbandingan, int* ditemukan) {
    char kunci[30];
    char baris [200];
    keKecil(kataKunci, kunci);

    const dtProduk* p = arr;                 
    for (int i = 0; i < n; i++, p++) {
        char teks[60], kecil[60];
        snprintf(teks, sizeof(teks), "%s %s", p->nama, p->kategori);
        keKecil(teks, kecil);

        (*perbandingan)++;
        bool cocok = strstr(kecil, kunci) != NULL;
        if (cocok) (*ditemukan)++;

        snprintf(baris, sizeof(baris), "Cek %d/%d | [%s] [%s] -> %s",
                i + 1, n, p->nama, p->kategori, cocok ? "COCOK" : "tidak cocok");
        catatLog(0, p->id, -1, cocok ? "COCOK" : "TIDAK", baris);
    }
}