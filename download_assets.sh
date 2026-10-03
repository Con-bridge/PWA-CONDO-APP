#!/usr/bin/env bash
# ==============================================================================
# Script di download e configurazione offline per Con-bridge PWA
# Scarica librerie JS esterne e font Poppins (WOFF2) in locale
# ==============================================================================

set -euo pipefail

# Colori per l'output nel terminale
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directory di destinazione (relative alla radice del progetto)
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIBS_DIR="${BASE_DIR}/libs"
FONTS_DIR="${BASE_DIR}/fonts"

echo -e "${BLUE}=== Inizio configurazione risorse locali per Con-bridge ===${NC}"

# Verifica presenza di curl
if ! command -v curl &> /dev/null; then
    echo -e "${RED}[ERRORE] 'curl' non è installato o non è presente nel PATH.${NC}" >&2
    exit 1
fi

# 1. Creazione cartelle
echo -e "\n${BLUE}[1/4] Creazione cartelle 'libs' e 'fonts'...${NC}"
mkdir -p "${LIBS_DIR}"
mkdir -p "${FONTS_DIR}"
echo -e "${GREEN}[OK] Cartelle pronte:${NC}\n - ${LIBS_DIR}\n - ${FONTS_DIR}"

# Funzione per il download sicuro con verifica validità
download_and_verify() {
    local url="$1"
    local dest="$2"
    local min_size="$3" # dimensione minima in byte
    local expected_type="$4" # 'js' oppure 'woff2'
    local tmp_file="${dest}.tmp"

    local filename
    filename="$(basename "${dest}")"
    echo -e "\n--> Scaricamento di ${YELLOW}${filename}${NC}..."
    echo "    Sorgente: ${url}"

    # Download tramite curl (segue redirect, silenzioso con barra errori)
    if ! curl -sSL -f "${url}" -o "${tmp_file}"; then
        echo -e "${RED}[ERRORE] Impossibile scaricare ${url}.${NC}" >&2
        rm -f "${tmp_file}"
        return 1
    fi

    # Controllo che il file esista
    if [[ ! -f "${tmp_file}" ]]; then
        echo -e "${RED}[ERRORE] File temporaneo non creato per ${filename}.${NC}" >&2
        return 1
    fi

    # Controllo dimensione
    local file_size
    # Compatibilità stat Linux / macOS / Git Bash
    if stat -c%s "${tmp_file}" &>/dev/null; then
        file_size=$(stat -c%s "${tmp_file}")
    else
        file_size=$(stat -f%z "${tmp_file}")
    fi

    if [[ "${file_size}" -lt "${min_size}" ]]; then
        echo -e "${RED}[ERRORE] Il file scaricato ha dimensione anomala (${file_size} byte < min ${min_size} byte).${NC}" >&2
        rm -f "${tmp_file}"
        return 1
    fi

    # Controllo che non sia una pagina HTML di errore (404/403 camuffato)
    if head -n 5 "${tmp_file}" | grep -qiE "<!doctype html|<html"; then
        echo -e "${RED}[ERRORE] Il file scaricato è una pagina HTML invece che un asset binario/JS.${NC}" >&2
        rm -f "${tmp_file}"
        return 1
    fi

    # Per font WOFF2, verifica 'magic bytes' wOF2 all'inizio
    if [[ "${expected_type}" == "woff2" ]]; then
        local magic
        magic=$(head -c 4 "${tmp_file}" 2>/dev/null || true)
        if [[ "${magic}" != "wOF2" ]]; then
            echo -e "${RED}[ERRORE] Il file non contiene l'header valido WOFF2 ('wOF2').${NC}" >&2
            rm -f "${tmp_file}"
            return 1
        fi
    fi

    # Spostamento atomico al file di destinazione
    mv "${tmp_file}" "${dest}"
    echo -e "${GREEN}[OK] ${filename} salvato con successo (${file_size} byte).${NC}"
}

# 2. Download Librerie JS in libs/
echo -e "\n${BLUE}[2/4] Download librerie JavaScript in 'libs/'...${NC}"

# jsPDF (v2.5.1)
download_and_verify \
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" \
    "${LIBS_DIR}/jspdf.umd.min.js" \
    200000 \
    "js"

# jsPDF-AutoTable (v3.5.31)
download_and_verify \
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js" \
    "${LIBS_DIR}/jspdf.plugin.autotable.min.js" \
    20000 \
    "js"

# SheetJS / xlsx (v0.18.5)
download_and_verify \
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" \
    "${LIBS_DIR}/xlsx.full.min.js" \
    500000 \
    "js"

# QRCode.js (v1.0.0)
download_and_verify \
    "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" \
    "${LIBS_DIR}/qrcode.min.js" \
    15000 \
    "js"

# html5-qrcode (v2.3.8 stabile)
download_and_verify \
    "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js" \
    "${LIBS_DIR}/html5-qrcode.min.js" \
    100000 \
    "js"

# 3. Download Font Poppins WOFF2 in fonts/
echo -e "\n${BLUE}[3/4] Download font Poppins (WOFF2) in 'fonts/'...${NC}"

# Poppins 400 (Regular)
download_and_verify \
    "https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2" \
    "${FONTS_DIR}/poppins-400.woff2" \
    5000 \
    "woff2"

# Poppins 500 (Medium)
download_and_verify \
    "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2" \
    "${FONTS_DIR}/poppins-500.woff2" \
    5000 \
    "woff2"

# Poppins 600 (Semi-Bold)
download_and_verify \
    "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2" \
    "${FONTS_DIR}/poppins-600.woff2" \
    5000 \
    "woff2"

# Poppins 700 (Bold)
download_and_verify \
    "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2" \
    "${FONTS_DIR}/poppins-700.woff2" \
    5000 \
    "woff2"

# Poppins 800 (Extra-Bold)
download_and_verify \
    "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2" \
    "${FONTS_DIR}/poppins-800.woff2" \
    5000 \
    "woff2"

# 4. Creazione fonts/poppins.css
echo -e "\n${BLUE}[4/4] Creazione file 'fonts/poppins.css'...${NC}"
cat << 'EOF' > "${FONTS_DIR}/poppins.css"
/* ==========================================================================
   Poppins Font Face Definitions (Self-Hosted WOFF2)
   Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold)
   font-display: swap garantisce caricamento rapido e nessun blocco del rendering
   ========================================================================== */

/* poppins-400 - regular */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./poppins-400.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* poppins-500 - medium */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('./poppins-500.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* poppins-600 - semi-bold */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('./poppins-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* poppins-700 - bold */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('./poppins-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* poppins-800 - extra-bold */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('./poppins-800.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
EOF

echo -e "${GREEN}[OK] File 'fonts/poppins.css' generato con successo.${NC}"

# Riepilogo finale
echo -e "\n${BLUE}=== RIEPILOGO ASSET LOCALI SCARICATI ===${NC}"
echo -e "${YELLOW}Librerie JS ('libs/'):${NC}"
ls -lh "${LIBS_DIR}"
echo -e "\n${YELLOW}Font Poppins ('fonts/'):${NC}"
ls -lh "${FONTS_DIR}"

echo -e "\n${GREEN}Operazione completata con successo al 100%!${NC}"
