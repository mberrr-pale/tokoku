#include <stdio.h>
#include "produk.h"

int main() {
    int perbandingan = 0, pergeseran = 0;

    resetLog();
    insertionSortHarga(produk, JUMLAH_PRODUK, &perbandingan, &pergeseran);
    tampilkanLog();
    printf("\nMetode: Insertion Sort | Jumlah data: %d | Perbandingan: %d | Pergeseran: %d\n\n",
            JUMLAH_PRODUK, perbandingan, pergeseran);

    const dtProduk* p = produk;
    for (int i = 0; i < JUMLAH_PRODUK; i++, p++) {
        printf("%2d | %-25s | %-10s | %7d | %3d\n",
               p->id, p->nama, p->kategori, p->harga, p->stok);
    }

    char kata[30];
    printf("\nMasukan Kata Kunci: ");
    scanf("%29s", kata);
    
    int cek = 0, ketemu = 0;
    resetLog();
    linearSearchProduk(produk, JUMLAH_PRODUK, kata, &cek, &ketemu);
    tampilkanLog();
    printf("\nMetode: Linear Search | Kata kunci: %s | Jumlah data: %d | Perbandingan: %d | Ditemukan: %d\n",
           kata, JUMLAH_PRODUK, cek, ketemu);
    return 0;

}

