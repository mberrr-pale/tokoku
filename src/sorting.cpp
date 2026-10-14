#include <stdio.h>
#include "produk.h"

void tukarProduk(dtProduk* a, dtProduk* b) {
    dtProduk tmp = *a;
    *a = *b;
    *b = tmp;
}

void insertionSortHarga(dtProduk* arr, int n, int* perbandingan, int* pergeseran) {
    char baris[200];
    for (int i = 1; i < n; i++) {
        dtProduk temp = *(arr + i);
        int j = i - 1;
        while (j >= 0) {
            (*perbandingan)++;
            if ((arr + j)->harga > temp.harga) {
                snprintf(baris, sizeof(baris),
                         "Pass %d | Banding [%s %d] dengan [%s %d] -> GESER",
                         i, temp.nama, temp.harga, (arr + j)->nama, (arr + j)->harga);
                catatLog(i, temp.id, (arr + j)->id, "GESER", baris);
                *(arr + j + 1) = *(arr + j);
                (*pergeseran)++;
                j--;
            } else {
                snprintf(baris, sizeof(baris),
                         "Pass %d | Banding [%s %d] dengan [%s %d] -> STOP",
                         i, temp.nama, temp.harga, (arr + j)->nama, (arr + j)->harga);
                catatLog(i, temp.id, (arr + j)->id, "STOP", baris);
                break;
            }
        }
        *(arr + j + 1) = temp;
    }
}