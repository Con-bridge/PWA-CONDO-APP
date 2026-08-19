window.AssembleeModule = {
    renderMenu: function (renderHeader, renderBottomNavigation, userProfile) {
        const isAdmin = ['amministratore', 'adm'].includes(userProfile?.tipoUtente);
        const isCondomino = !isAdmin;

        const adminButtons = isAdmin ? `
            <div onclick="showCreateAssemblyModal()" class="dashboard-item">
                <div class="dashboard-card" style="position: relative;">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/></svg>
                </div>
                <p>Nuova Assemblea</p>
            </div>
            <div onclick="startQuickAdminQRScanner()" class="dashboard-item">
                <div class="dashboard-card" style="position: relative;">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm2 2v2h2V6H6zm8-2h6v6h-6V4zm2 2v2h2V6h-2zM4 14h6v6H4v-6zm2 2v2h2v-2H6zm10 0h2v2h-2v-2zm-2-2h2v2h-2v-2zm4 4h2v2h-2v-2zm-2 0h2v2h-2v-2z"/></svg>
                </div>
                <p>Scansione presenze</p>
            </div>
        ` : '';

        const admDeleteAllButton = userProfile?.tipoUtente === 'adm' ? `
            <div onclick="showDeleteAllAssembliesModal()" class="dashboard-item">
                <div class="dashboard-card">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </div>
                <p>Elimina Assemblee</p>
            </div>
        ` : '';

        // DELEGHE E TESSERA QR VISIBILI SOLO SE NON SI È AMMINISTRATORI
        const delegheButton = isCondomino ? `
            <div onclick="navigateTo('assemblea_deleghe')" class="dashboard-item">
                <div class="dashboard-card" style="position: relative;">
                    <span id="deleghe-menu-notification-badge" class="notification-badge hidden" style="top: 8px; right: 8px;"></span>
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                </div>
                <p>Le Mie Deleghe</p>
            </div>
        ` : '';

        const tesseraButton = isCondomino ? `
            <div onclick="navigateTo('assemblea_tessera')" class="dashboard-item">
                <div class="dashboard-card">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3,3H9V9H3V3M5,5V7H7V5H5M15,3H21V9H15V3M17,5V7H19V5H17M3,15H9V21H3V15M5,17V19H7V17H5M18,15H21V18H18V15M15,11H18V14H15V11M18,18H21V21H18V18M11,3H14V6H11V3M11,18H14V21H11V18M11,8H14V11H11V8M11,13H14V16H11V13M8,11H11V14H8V11Z"/></svg>
                </div>
                <p>La Mia Tessera (QR)</p>
            </div>
        ` : '';

        return `
            ${renderHeader('Assemblee')}
            <main>
                <h2 class="section-title">Gestione Assemblee</h2>
                <div class="dashboard-grid">
                    ${adminButtons}
                    <div onclick="navigateTo('assemblea_lista')" class="dashboard-item">
                        <div class="dashboard-card" style="position: relative;">
                            <span id="assemblee-menu-notification-badge" class="notification-badge hidden" style="top: 8px; right: 8px;"></span>
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/></svg>
                        </div>
                        <p>Tutte le Assemblee</p>
                    </div>
                    ${delegheButton}
                    ${tesseraButton}
                    ${admDeleteAllButton}
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    renderDeleghe: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Le Mie Deleghe')}
            <main>
                <div class="card" style="margin-bottom: 1rem; padding: 1rem;">
                    <p style="color:var(--secondary-text); margin: 0; font-size: 0.9rem;">
                        Gestisci le tue deleghe di voto per le assemblee: invia una delega a tuo nome o gestisci le deleghe ricevute dai tuoi vicini.
                    </p>
                </div>
                <div id="user-deleghe-container" class="space-y-4">
                    <p style="color:var(--secondary-text);">Caricamento deleghe in corso...</p>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    renderCrea: function (renderHeader, renderBottomNavigation) {
        setTimeout(() => showCreateAssemblyModal(), 100);
        return `
            ${renderHeader('Crea Assemblea')}
            <main>
                <div class="card text-center" style="padding: 2rem;">
                    <p style="color: var(--secondary-text);">Apertura modale di creazione assemblea in corso...</p>
                    <button onclick="showCreateAssemblyModal()" class="btn btn-primary" style="margin-top: 1rem;">Apri Modale Nuova Assemblea</button>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    renderLista: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Elenco Assemblee')}
            <main>
                <!-- FILTRI DI RICERCA ED ASSEMBLEE -->
                <div class="card" style="margin-bottom: 1rem; padding: 1rem;">
                    <div>
                        <label class="form-label" style="font-size: 0.85rem; margin-bottom: 0.25rem;">Filtra per Stato Assemblea</label>
                        <select id="assembly-search-status" onchange="filterAssembleeList()" class="form-select" style="padding: 0.5rem 0.75rem; font-size: 0.9rem;">
                            <option value="tutti">Tutti gli stati</option>
                            <option value="programmata">Programmata</option>
                            <option value="in_corso">In Corso (Live)</option>
                            <option value="conclusa">Conclusa</option>
                            <option value="annullata">Annullata</option>
                        </select>
                    </div>
                </div>

                <div id="assemblies-list-container" class="list-container">
                    <p style="color:var(--secondary-text);">Caricamento...</p>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    // LA STANZA LIVE UNIFICATA (Con Controlli Avanzati per Admin e Votazioni per Questione Stile Sondaggi)
    renderStanzaLive: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Assemblea Live')}
            <main style="padding-bottom: 2rem;">
                <!-- STRUMENTI ADMIN NELLA STANZA LIVE -->
                <div id="room-admin-bar" class="card hidden" style="margin-bottom: 1rem; padding: 1rem;">
                    <h4 style="font-size:0.85rem; color:var(--warning); text-transform:uppercase; font-weight:700; margin-bottom:0.75rem;">Strumenti Amministratore</h4>
                    <div class="grid grid-cols-2 gap-2" style="margin-bottom:0.75rem;">
                        <button onclick="toggleRoomScanner()" class="btn btn-secondary" style="font-size:0.8rem; padding:0.6rem;">Scanner QR</button>
                        <button onclick="openManualAttendanceModal()" class="btn btn-secondary" style="font-size:0.8rem; padding:0.6rem;">+ Presenza</button>
                    </div>
                    <div class="grid grid-cols-2 gap-2" style="margin-bottom:0.75rem;">
                        <button onclick="openManualProxyModal()" class="btn btn-secondary" style="font-size:0.8rem; padding:0.6rem;">+ Delega Cartacea</button>
                        <button id="btn-room-start" onclick="startLiveAssemblySession()" class="btn" style="background-color: #10B981; color: white; font-weight: 800; font-size:0.8rem; padding:0.6rem; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Inizia
                        </button>
                    </div>
                    <button onclick="exportAssemblyResults(sessionStorage.getItem('activeLiveAssemblyId'))" class="btn" style="width:100%; font-size:0.85rem; font-weight:700; padding:0.65rem 1rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; margin-bottom:1rem; background:linear-gradient(135deg, #2563EB, #1D4ED8); color:white; border:none; border-radius:8px; box-shadow:0 4px 12px rgba(37, 99, 235, 0.35); cursor:pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Esporta esito per quorum costitutivo
                    </button>

                    <!-- FOTOCAMERA SCANNER DENTRO LA STANZA -->
                    <div id="room-scanner-container" class="hidden" style="text-align:center; margin-top:1.25rem; padding-top:0.5rem;">
                        <div id="reader" style="width: 100%; max-width: 320px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 2px solid var(--accent-color); background: #000; min-height: 250px;"></div>
                        <div id="scanner-message" class="message-box" style="margin-top:0.75rem; display:none;"></div>
                    </div>
                </div>

                <!-- BANNER DI ALLARME SCIOGLIMENTO QUORUM (SE SOTTO 333.33 ‰) -->
                <div id="room-quorum-warning-banner" class="hidden card" style="background:rgba(239,68,68,0.15); border:2px solid var(--danger); padding:1rem; margin-bottom:1rem; text-align:center;">
                    <h4 style="color:var(--danger); font-weight:800; margin:0 0 0.25rem 0; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        SCIOGLIMENTO ASSEMBLEA - QUORUM COSTITUTIVO DECADUTO
                    </h4>
                    <p id="room-quorum-warning-text" style="color:var(--primary-text); font-size:0.85rem; margin:0;">A seguito dell'allontanamento di condòmini, i presenti sono scesi sotto la soglia legale di 1/3 (333.33 ‰). L'assemblea non è più idonea a deliberare e deve essere dichiarata sciolta.</p>
                </div>

                <!-- BANNER DI STATO LIVE -->
                <div class="card" style="margin-bottom: 1rem; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
                        <h3 id="room-assembly-title" class="card-title" style="margin:0; font-size: 1.1rem;">Assemblea in Corso</h3>
                        <span id="room-status-badge" class="badge" style="background-color: var(--accent-color); color: black; font-weight: 800; animation: pulse 1.5s infinite;">LIVE</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2" style="text-align: center; background: var(--surface-color-light); padding: 0.75rem 0.5rem; border-radius: 8px; margin-top: 0.85rem;">
                        <div>
                            <span style="font-size: 0.75rem; color: var(--secondary-text);">Condom. presenti:</span>
                            <strong id="room-tot-teste" style="display: block; font-size: 1rem; color: var(--accent-color);">0 Teste</strong>
                        </div>
                        <div>
                            <span style="font-size: 0.75rem; color: var(--secondary-text);">Millesimi intervenuti:</span>
                            <strong id="room-tot-millesimi" style="display: block; font-size: 1rem; color: var(--warning);">0.00 ‰</strong>
                        </div>
                    </div>
                </div>

                <!-- ELENCO PRESENTI ACCREDITATI -->
                <div class="card" style="margin-bottom: 1rem; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.3rem; cursor: pointer;" onclick="const el = document.getElementById('room-attendees-collapsible'); el.classList.toggle('hidden');">
                        <h3 class="card-title" style="margin: 0; font-size: 0.9rem; line-height: 1.3;">Elenco Presenti Accreditati (<span id="room-tot-teste-badge">0</span>)</h3>
                        <span style="font-size: 0.75rem; color: var(--accent-color); white-space: nowrap; flex-shrink: 0;">Mostra/Nascondi ▼</span>
                    </div>
                    <div id="room-attendees-collapsible" class="mt-3 hidden space-y-2">
                        <div id="room-attendees-list">
                            <p style="color: var(--secondary-text); font-size: 0.85rem;">Caricamento presenti...</p>
                        </div>
                    </div>
                </div>

                <!-- QR CODE ACCREDITO COMPATTO (VISIBILE SOLO SE NON SCANSIONATO) -->
                <div id="room-qr-accreditation" class="card hidden" style="text-align: center; margin-bottom: 1rem; padding: 1rem;">
                    <h4 style="color: var(--warning); margin-bottom: 0.25rem; font-size: 0.95rem; font-weight: 700;">Accredito Ingresso Richiesto</h4>
                    <p style="font-size: 0.8rem; color: var(--secondary-text); margin-bottom: 0.75rem;">
                        Mostra questo QR Code all'Amministratore per essere accreditato ed abilitare il voto.
                    </p>
                    <div style="background: white; padding: 0.75rem; border-radius: 8px; display: inline-block; margin-bottom: 0.25rem;">
                        <div id="room-qrcode-container"></div>
                    </div>
                    <p id="room-qr-timer" style="margin: 0; font-weight: 700; color: var(--accent-color); font-size: 0.85rem;">
                        Aggiornamento tra: 30s
                    </p>
                </div>

                <!-- LISTA DELLE QUESTIONI ODG (VOTAZIONI IN STILE SONDAGGIO) -->
                <div class="card" style="padding: 1rem; margin-bottom: 1rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                        <h3 class="card-title" style="margin:0; font-size: 1rem;">Ordine del Giorno & Votazioni</h3>
                        <button type="button" id="btn-room-reorder" onclick="showInteractiveReorderModal(sessionStorage.getItem('activeLiveAssemblyId'))" title="Modifica / Riordina Punti OdG" style="background: rgba(29, 185, 84, 0.12); border: 1px solid rgba(29, 185, 84, 0.3); color: var(--accent-color); cursor: pointer; padding: 0.25rem 0.55rem; border-radius: 6px; display: flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; font-weight: 700;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            <span>Modifica</span>
                        </button>
                    </div>
                    <div id="room-odg-poll-list" class="space-y-4">
                        <p style="color:var(--secondary-text); text-align:center;">Caricamento questioni OdG...</p>
                    </div>
                </div>

                <!-- REGISTRO EVENTI ASSEMBLEA (AUDIT LOG) -->
                <div class="card" style="padding: 1rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.3rem; cursor: pointer;" onclick="const el = document.getElementById('room-event-log-collapsible'); el.classList.toggle('hidden');">
                        <h3 class="card-title" style="margin: 0; font-size: 0.9rem; line-height: 1.3; display:flex; align-items:center; gap:0.4rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                            Registro Eventi Assemblea (Audit Log)
                        </h3>
                        <span style="font-size: 0.75rem; color: var(--accent-color); white-space: nowrap; flex-shrink: 0;">Mostra/Nascondi ▼</span>
                    </div>
                    <div id="room-event-log-collapsible" class="mt-3 hidden space-y-2">
                        <div id="room-event-log-list">
                            <p style="color: var(--secondary-text); font-size: 0.85rem;">Caricamento registro eventi...</p>
                        </div>
                    </div>
                </div>

                <!-- PULSANTE CONCLUDI ASSEMBLEA (POSIZIONATO IN FONDO ALLA SCHERMATA) -->
                <div id="room-admin-conclude-bottom" class="hidden card" style="padding: 1rem; text-align: center; background: rgba(239,68,68,0.08); border: 1px dashed var(--danger);">
                    <p style="font-size: 0.85rem; color: var(--secondary-text); margin-bottom: 0.75rem;">Al termine di tutte le discussioni e votazioni dell'Ordine del Giorno, concludi ufficialmente la seduta live.</p>
                    <button id="btn-room-conclude" onclick="concludeLiveRoom()" class="btn" style="background-color: var(--danger); color: white; font-weight: 800; font-size:0.9rem; padding:0.75rem 1.5rem; width:100%; max-width:340px; margin:0 auto; display:flex; align-items:center; justify-content:center; gap:0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                        Concludi Assemblea
                    </button>
                </div>
            </main>
            ${renderBottomNavigation()}
        `;
    },

    renderTessera: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('La Mia Tessera')}
            <main>
                <div class="card" style="text-align: center; margin-bottom: 2rem;">
                    <h3 class="card-title">Il tuo codice di accesso</h3>
                    <p style="color: var(--secondary-text); margin-bottom: 1.5rem; font-size: 0.9rem;">
                        Mostra questo codice all'amministratore all'ingresso. Il codice <strong>cambia ogni 30 secondi</strong>.
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

    qrInterval: null,
    initQR: function (currentUser, containerId = "qrcode-container", timerId = "qr-timer") {
        const container = document.getElementById(containerId);
        const timerEl = document.getElementById(timerId);
        if (!container) return;
        let timer = 30;
        if (this.qrInterval) clearInterval(this.qrInterval);
        const generateQR = () => {
            container.innerHTML = "";
            const timestamp = Date.now();
            const securityData = { uid: currentUser.uid, ts: timestamp };
            const dataString = btoa(JSON.stringify(securityData));
            const qrSize = containerId === "room-qrcode-container" ? 160 : 220;

            new QRCode(container, {
                text: dataString, width: qrSize, height: qrSize, colorDark: "#000000", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H
            });
            timer = 30;
        };
        generateQR();
        this.qrInterval = setInterval(() => {
            timer--;
            if (timerEl) {
                timerEl.textContent = `Aggiornamento tra: ${timer}s`;
                if (timer <= 10) timerEl.style.color = "var(--danger)";
                else timerEl.style.color = "var(--accent-color)";
            }
            if (timer <= 0) generateQR();
        }, 1000);
    },
    cleanup: function () {
        if (this.qrInterval) { clearInterval(this.qrInterval); this.qrInterval = null; }
    }
};
