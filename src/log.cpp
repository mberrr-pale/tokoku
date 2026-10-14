#include <stdio.h>
#include <string.h>
#include "produk.h"

LogLangkah logData[MAX_LOG];
int jumlahLog = 0;

void resetLog() {
    jumlahLog = 0;
}

void catatLog(int pass, int idA, int idB, const char* jenis, const char* teks) {
    if (jumlahLog >= MAX_LOG) return;          
    LogLangkah* lg = logData + jumlahLog;      
    lg->pass = pass;
    lg->idA = idA;
    lg->idB = idB;
    strncpy(lg->jenis, jenis, sizeof(lg->jenis) - 1);
    lg->jenis[sizeof(lg->jenis) - 1] = '\0';
    strncpy(lg->teks, teks, sizeof(lg->teks) - 1);
    lg->teks[sizeof(lg->teks) - 1] = '\0';
    jumlahLog++;
}

void tampilkanLog() {
    const LogLangkah* lg = logData;
    for (int i = 0; i < jumlahLog; i++, lg++) {
        printf("%03d | %s\n", i + 1, lg->teks);
    }
}