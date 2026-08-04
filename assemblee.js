// File: assemblee.js
// Modulo esterno per la gestione delle Assemblee Condominiali

window.AssembleeModule = {
    // 1. Rende il menu principale (Modificato per ruoli)
    renderMenu: function (renderHeader, renderBottomNavigation, userProfile) {
        const isAdmin = ['amministratore', 'adm'].includes(userProfile?.tipoUtente);

        const adminButtons = isAdmin ? `
            <div onclick="navigateTo('assemblea_crea')" class="dashboard-item">
                <div class="dashboard-card" style="border: 2px solid var(--warning);">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/></svg>
                </div>
                <p>Crea Assemblea</p>
            </div>
            <div onclick="navigateTo('assemblea_gestione')" class="dashboard-item">
                <div class="dashboard-card" style="border: 2px solid var(--danger);">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-2h-2v2zm0-4h2V8h-2v5z"/></svg>
                </div>
                <p>Console Admin (Live)</p>
            </div>
        ` : '';

        return `
            ${renderHeader('Assemblee')}
            <main>
                <div class="card" style="margin-bottom: 2rem;">
                    <p class="form-label" style="color: var(--secondary-text);">
                        Gestione delle presenze e delle votazioni in tempo reale.
                    </p>
                </div>
                <div class="dashboard-grid">
                    ${adminButtons}
                    <div onclick="navigateTo('assemblea_lista')" class="dashboard-item">
                        <div class="dashboard-card">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/></svg>
                        </div>
                        <p>Elenco Assemblee</p>
                    </div>
                    <div onclick="navigateTo('assemblea_tessera')" class="dashboard-item">
                        <div class="dashboard-card" style="border: 2px solid var(--accent-color);">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3,3H9V9H3V3M5,5V7H7V5H5M15,3H21V9H15V3M17,5V7H19V5H17M3,15H9V21H3V15M5,17V19H7V17H5M18,15H21V18H18V15M15,11H18V14H15V11M18,18H21V21H18V18M11,3H14V6H11V3M11,18H14V21H11V18M11,8H14V11H11V8M11,13H14V16H11V13M8,11H11V14H8V11Z"/></svg>
                        </div>
                        <p>La Mia Tessera (QR)</p>
                    </div>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    // 2. Rende il Form di creazione
    renderCrea: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Crea Assemblea')}
            <main>
                <div class="card">
                    <h3 class="card-title">Pianifica Nuova Assemblea</h3>
                    <div id="assembly-creation-message" class="message-box"></div>
                    <form id="create-assembly-form" class="space-y-4">
                        <div>
                            <label class="form-label">Titolo Assemblea</label>
                            <input type="text" id="assembly-title" required class="form-input" placeholder="Es. Assemblea Ordinaria 2025">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">Data</label>
                                <input type="date" id="assembly-date" required class="form-input">
                            </div>
                            <div>
                                <label class="form-label">Ora d'inizio</label>
                                <input type="time" id="assembly-time" required class="form-input">
                            </div>
                        </div>
                        
                        <hr style="border-color: var(--surface-color-light); margin: 1.5rem 0;">
                        
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <label class="form-label" style="margin-bottom:0;">Ordine del Giorno (OdG)</label>
                                <button type="button" id="add-agenda-btn" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size:0.8rem;">+ Aggiungi Punto</button>
                            </div>
                            <div id="agenda-list" class="space-y-4">
                                <!-- Punti aggiunti dinamicamente -->
                            </div>
                        </div>

                        <div class="flex justify-end pt-4">
                            <button type="submit" id="btn-save-assembly" class="btn btn-primary">Salva Assemblea</button>
                        </div>
                    </form>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    // 3. Rende la lista delle assemblee
    renderLista: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Elenco Assemblee')}
            <main>
                <div id="assemblies-list-container" class="list-container">
                    <p style="color:var(--secondary-text);">Caricamento...</p>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    // 4. Rende la Console Admin (Scanner e Presenze)
    renderGestione: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Console Assemblea Live')}
            <main>
                <div class="card" style="margin-bottom: 1.5rem; text-align: center;">
                    <h3 class="card-title">Scanner Ingressi</h3>
                    <p style="color: var(--secondary-text); font-size: 0.85rem; margin-bottom: 1rem;">
                        Inquadra il QR Code del condomino per registrarne la presenza.
                    </p>
                    
                    <!-- Contenitore della telecamera -->
                    <div id="reader" style="width: 100%; max-width: 400px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 2px solid var(--surface-color-light);"></div>
                    
                    <div id="scanner-message" class="message-box mt-4"></div>
                </div>

                <div class="grid grid-cols-2 gap-4" style="margin-bottom: 1.5rem;">
                    <div class="card" style="text-align: center; padding: 1rem;">
                        <div id="tot-teste" style="font-size: 2rem; font-weight: 800; color: var(--accent-color);">0</div>
                        <div style="font-size: 0.8rem; color: var(--secondary-text); text-transform: uppercase;">Condomini</div>
                    </div>
                    <div class="card" style="text-align: center; padding: 1rem;">
                        <div id="tot-millesimi" style="font-size: 2rem; font-weight: 800; color: var(--warning);">0.00</div>
                        <div style="font-size: 0.8rem; color: var(--secondary-text); text-transform: uppercase;">Millesimi</div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Elenco Presenti</h3>
                    <div id="attendees-list" class="list-container">
                        <p style="color:var(--secondary-text);">Nessun condomino ancora registrato.</p>
                    </div>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    // 5. Rende la pagina con il QR Code (La Mia Tessera)
    renderTessera: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('La Mia Tessera')}
            <main>
                <div class="card" style="text-align: center; margin-bottom: 2rem;">
                    <h3 class="card-title">Il tuo codice di accesso</h3>
                    <p style="color: var(--secondary-text); margin-bottom: 1.5rem; font-size: 0.9rem;">
                        Mostra questo codice all'amministratore all'ingresso. 
                        Per motivi di sicurezza, il codice <strong>cambia ogni 30 secondi</strong>. Non usare screenshot.
                    </p>
                    
                    <div style="background: white; padding: 1.5rem; border-radius: 12px; display: inline-block; margin-bottom: 1rem;">
                        <div id="qrcode-container"></div>
                    </div>
                    
                    <div style="margin-top: 1rem; padding: 0.75rem; background-color: var(--surface-color-light); border-radius: 8px;">
                        <p id="qr-timer" style="margin: 0; font-weight: 700; font-size: 1.1rem; color: var(--accent-color);">
                            Aggiornamento tra: 30s
                        </p>
                    </div>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    // 6. Logica per far girare il QR Code dinamicamente
    qrInterval: null,

    initQR: function (currentUser) {
        const container = document.getElementById("qrcode-container");
        const timerEl = document.getElementById("qr-timer");
        if (!container || !timerEl) return;

        let timer = 30;

        // Assicuriamoci di pulire intervalli precedenti
        if (this.qrInterval) clearInterval(this.qrInterval);

        const generateQR = () => {
            container.innerHTML = ""; // Pulisce il QR precedente

            // Creiamo il Token di sicurezza
            const timestamp = Date.now();
            const securityData = {
                uid: currentUser.uid,
                ts: timestamp
            };

            // Convertiamo in stringa base64 per comodità e pulizia del QR
            const dataString = btoa(JSON.stringify(securityData));

            new QRCode(container, {
                text: dataString,
                width: 220,
                height: 220,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H // Alta correzione per lettura rapida
            });
            timer = 30; // Resetta il timer
        };

        generateQR(); // Genera il primo QR Code subito

        this.qrInterval = setInterval(() => {
            timer--;
            if (timerEl) {
                timerEl.textContent = `Aggiornamento tra: ${timer}s`;

                if (timer <= 10) {
                    timerEl.style.color = "var(--danger)"; // Diventa rosso negli ultimi 10 secondi
                } else {
                    timerEl.style.color = "var(--accent-color)";
                }
            }

            if (timer <= 0) {
                generateQR();
            }
        }, 1000);
    },

    // 7. Pulizia per quando si cambia pagina
    cleanup: function () {
        if (this.qrInterval) {
            clearInterval(this.qrInterval);
            this.qrInterval = null;
        }
    }
};