#pragma once
#include "produk.h"

const int PANJANG_KATA = 30;

void linearSearchProduk(const dtProduk* arr, int n, const char* kataKunci,
                        int* perbandingan, int* ditemukan);