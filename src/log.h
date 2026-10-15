#pragma once

const int PANJANG_JENIS = 12;
const int PANJANG_TEKS  = 200;
const int MAX_LOG       = 200;   

struct LogLangkah {
    int  pass;                   
    int  idA;                    
    int  idB;
    char jenis[PANJANG_JENIS];   
    char teks[PANJANG_TEKS];     
};

extern LogLangkah logData[MAX_LOG];
extern int jumlahLog;

void resetLog();
void catatLog(int pass, int idA, int idB, const char* jenis, const char* teks);
void tampilkanLog();