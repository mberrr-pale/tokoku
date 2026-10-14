#include <stdio.h>
#include <string.h>
#include <string>
#include "produk.h"

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE   
#endif

static dtProduk asli[JUMLAH_PRODUK];   
static bool sudahSimpan = false;
static std::string hasil;              

static void pulihkan() {               
    if (!sudahSimpan) {
        for (int i = 0; i < JUMLAH_PRODUK; i++) asli[i] = produk[i];
        sudahSimpan = true;
    }
    for (int i = 0; i < JUMLAH_PRODUK; i++) produk[i] = asli[i];
}

static std::string urutanJson() {      
    std::string s = "[";
    const dtProduk* p = produk;
    for (int i = 0; i < JUMLAH_PRODUK; i++, p++) {
        if (i) s += ",";
        s += std::to_string(p->id);
    }
    return s + "]";
}

static std::string logJson() {         
    std::string s = "[";
    const LogLangkah* l = logData;
    for (int i = 0; i < jumlahLog; i++, l++) {
        if (i) s += ",";
        s += "{\"pass\":" + std::to_string(l->pass) +
             ",\"idA\":" + std::to_string(l->idA) +
             ",\"idB\":" + std::to_string(l->idB) +
             ",\"jenis\":\"" + l->jenis + "\"" +
             ",\"teks\":\"" + l->teks + "\"}";
    }
    return s + "]";
}

extern "C" {

EMSCRIPTEN_KEEPALIVE const char* ambilKatalog() {
    pulihkan();
    hasil = "[";
    const dtProduk* p = produk;
    for (int i = 0; i < JUMLAH_PRODUK; i++, p++) {
        if (i) hasil += ",";
        hasil += "{\"id\":" + std::to_string(p->id) +
                 ",\"nama\":\"" + p->nama + "\"" +
                 ",\"kategori\":\"" + p->kategori + "\"" +
                 ",\"harga\":" + std::to_string(p->harga) +
                 ",\"stok\":" + std::to_string(p->stok) + "}";
    }
    hasil += "]";
    return hasil.c_str();
}

EMSCRIPTEN_KEEPALIVE const char* urutkanHarga() {
    pulihkan();                        
    resetLog();
    int perbandingan = 0, pergeseran = 0;
    insertionSortHarga(produk, JUMLAH_PRODUK, &perbandingan, &pergeseran);

    hasil = "{\"metode\":\"Insertion Sort\"" +
            std::string(",\"jumlahData\":") + std::to_string(JUMLAH_PRODUK) +
            ",\"perbandingan\":" + std::to_string(perbandingan) +
            ",\"pergeseran\":" + std::to_string(pergeseran) +
            ",\"urutan\":" + urutanJson() +
            ",\"log\":" + logJson() + "}";
    return hasil.c_str();
}

EMSCRIPTEN_KEEPALIVE const char* cariProduk(const char* kataKunci) {
    char kata[30];                     
    strncpy(kata, kataKunci, sizeof(kata) - 1);
    kata[sizeof(kata) - 1] = '\0';

    resetLog();
    int perbandingan = 0, ditemukan = 0;
    linearSearchProduk(produk, JUMLAH_PRODUK, kata, &perbandingan, &ditemukan);

    std::string cocok = "[";           
    bool pertama = true;
    const LogLangkah* l = logData;
    for (int i = 0; i < jumlahLog; i++, l++) {
        if (strcmp(l->jenis, "COCOK") == 0) {
            if (!pertama) cocok += ",";
            cocok += std::to_string(l->idA);
            pertama = false;
        }
    }
    cocok += "]";

    hasil = "{\"metode\":\"Linear Search\"" +
            std::string(",\"jumlahData\":") + std::to_string(JUMLAH_PRODUK) +
            ",\"perbandingan\":" + std::to_string(perbandingan) +
            ",\"ditemukan\":" + std::to_string(ditemukan) +
            ",\"cocok\":" + cocok +
            ",\"urutan\":" + urutanJson() +
            ",\"log\":" + logJson() + "}";
    return hasil.c_str();
}

EMSCRIPTEN_KEEPALIVE void resetKatalog() {
    pulihkan();
}

}  