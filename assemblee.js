window.AssembleeModule = {
    renderMenu: function (renderHeader, renderBottomNavigation, userProfile) {
        const isAdmin = ['amministratore', 'adm'].includes(userProfile?.tipoUtente);
        const isCondomino = !isAdmin;

        const adminButtons = isAdmin ? `
            <div onclick="showCreateAssemblyModal()" class="dashboard-item">
                <div class="dashboard-card" style="position: relative;">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/></svg>
                </div>
                <p>Pianifica Assemblea</p>
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
            ${renderHeader('Pianifica Assemblea')}
            <main>
                <div class="card text-center" style="padding: 2rem;">
                    <p style="color: var(--secondary-text);">Apertura pianificazione assemblea in corso...</p>
                    <button onclick="showCreateAssemblyModal()" class="btn btn-primary" style="margin-top: 1rem;">Apri Pianifica Assemblea</button>
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

    // LA STANZA LIVE UNIFICATA (Con Controlli Avanzati per gli Admin e Votazioni per Questione Stile Sondaggi)
    renderStanzaLive: function (renderHeader, renderBottomNavigation) {
        return `
            ${renderHeader('Assemblea Live')}
            <main style="padding-bottom: 2rem;">
                <!-- STRUMENTI ADMIN NELLA STANZA LIVE -->
                <div id="room-admin-bar" class="card hidden" style="margin-bottom: 1rem; padding: 1rem;">
                    <h4 style="font-size:0.85rem; color:var(--warning); text-transform:uppercase; font-weight:700; margin-bottom:0.75rem;">Strumenti Amministratore</h4>
                    <div class="grid grid-cols-2 gap-2" style="margin-bottom:0.75rem;">
                        <button id="btn-toggle-room-scanner" onclick="toggleRoomScanner()" class="btn btn-secondary" style="font-size:0.8rem; padding:0.6rem;">Scanner QR</button>
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
                        <div style="position: relative; width: 100%; max-width: 320px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 2px solid var(--accent-color); background: #000; min-height: 250px;">
                            <!-- PULSANTE RAPIDO X NELL'ANGOLO IN ALTO A DESTRA -->
                            <button type="button" onclick="toggleRoomScanner()" title="Chiudi fotocamera scanner" style="position: absolute; top: 8px; right: 8px; z-index: 45; background: rgba(0, 0, 0, 0.7); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div id="reader" style="width: 100%; min-height: 250px;"></div>
                            <!-- FEEDBACK POPUP IN OVERLAY SOVRIMPRESSO AL QUADRANTE SCANNER -->
                            <div id="scanner-feedback-popup" class="hidden" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 50; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(4px); padding: 0.85rem; box-sizing: border-box;"></div>
                        </div>

                        <!-- MICRO-COPY ED ISTRUZIONI ESPLICITE DI CHIUSURA SOTTO IL FRAME -->
                        <div style="margin-top: 0.65rem; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                            <p style="font-size: 0.8rem; color: var(--secondary-text); margin: 0; line-height: 1.4; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path></svg>
                                <em>Premi la <strong>X</strong> o il tasto <strong>"Scanner QR"</strong> per chiudere la fotocamera.</em>
                            </p>
                            <button type="button" onclick="toggleRoomScanner()" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.85rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem; margin-top: 0.2rem;">
                                <span style="display:inline-flex; align-items:center; gap:0.35rem;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Chiudi Fotocamera</span>
                            </button>
                        </div>

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
                <div class="card" style="margin-bottom: 1.25rem; padding: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.6rem; border-bottom: 1px solid var(--surface-color-light);">
                        <div>
                            <h3 id="room-assembly-title" class="card-title" style="margin:0; font-size: 1.1rem; font-weight: 800; color: var(--primary-text); display:flex; align-items:center; gap:0.4rem;"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><line x1="12" y1="3" x2="12" y2="21"></line><polyline points="5 6 12 3 19 6"></polyline><path d="M2 12l3-6 3 6a3 3 0 0 1-6 0z"></path><path d="M16 12l3-6 3 6a3 3 0 0 1-6 0z"></path></svg> Quorum</h3>
                        </div>
                        <span id="room-status-badge" class="badge" style="background-color: #1DB954; color: black; font-weight: 800; animation: pulse 1.5s infinite; flex-shrink:0; display:inline-flex; align-items:center; gap:0.35rem;">LIVE <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="8"></circle></svg></span>
                    </div>

                    <!-- BADGE PRESIDENTE ELETTO -->
                    <div id="room-president-badge-container" class="hidden" style="margin-bottom: 1rem; padding: 0.9rem 1rem; background: rgba(37, 99, 235, 0.08); border: 1.5px solid rgba(37, 99, 235, 0.3); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 0.35rem; width: 100%; box-sizing: border-box;">
                        <!-- 1. Stella centrata in alto -->
                        <span style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: #2563EB; color: white; flex-shrink: 0; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); margin-bottom: 0.1rem;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 2l3 6 6 1-4.5 4.5 1 6.5-5.5-3-5.5 3 1-6.5-4.5-4.5 6-1z"/></svg>
                        </span>

                        <!-- 2. Scritta Presidente dell'Assemblea -->
                        <span style="font-size: 0.74rem; color: var(--secondary-text); font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; line-height: 1.2;">Presidente dell'Assemblea</span>

                        <!-- 3. Nome del Presidente Eletto -->
                        <strong id="room-president-name" style="font-size: 1.05rem; font-weight: 800; color: var(--primary-text); line-height: 1.3; word-break: break-word; max-width: 100%; margin-bottom: 0.2rem;">-</strong>

                        <!-- 4. Badge Modalità di Elezione -->
                        <span id="room-president-mode-badge" class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.74rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 99px; white-space: nowrap; display: inline-block;">-</span>
                    </div>

                    <!-- SEZIONE 1: QUORUM GENERALE (Intero Fabbricato) -->
                    <div id="room-general-quorum-section" style="background: rgba(255, 255, 255, 0.02); border: 1.5px solid var(--surface-color-light); border-radius: 10px; padding: 0.85rem; margin-bottom: 1.25rem;">
                        <div style="font-size: 0.8rem; font-weight: 800; color: var(--primary-text); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.55rem; display: flex; align-items: center; gap: 0.4rem;">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="12"></line><line x1="15" y1="22" x2="15" y2="12"></line><line x1="9" y1="12" x2="15" y2="12"></line><line x1="9" y1="7" x2="9.01" y2="7"></line><line x1="15" y1="7" x2="15.01" y2="7"></line></svg><span>Quorum Intero Condominio</span>
                        </div>
                        <div id="room-general-quorum-box" class="grid grid-cols-2 gap-2" style="text-align: center; background: var(--surface-color); padding: 0.75rem 0.5rem; border-radius: 8px; align-items: start;">
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 0;">
                                <span id="room-label-tot-teste" style="font-size: 0.75rem; color: var(--secondary-text); white-space: nowrap;">Condomini pres.:</span>
                                <strong id="room-tot-teste" style="display: block; font-size: 0.98rem; color: var(--accent-color); margin-top: 0.2rem; word-break: break-word;">0 Teste</strong>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 0;">
                                <span id="room-label-tot-millesimi" style="font-size: 0.75rem; color: var(--secondary-text); white-space: nowrap;">Millesimi pres.:</span>
                                <strong id="room-tot-millesimi" style="display: block; font-size: 0.98rem; color: var(--warning); margin-top: 0.2rem; word-break: break-word;">0.00 ‰</strong>
                            </div>
                        </div>
                        <!-- BADGE REGOLA LIMITE DELEGHE -->
                        <div id="room-proxy-limit-badge" style="margin-top: 0.6rem; padding: 0.45rem 0.65rem; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 6px; display: flex; align-items: center; gap: 0.45rem; font-size: 0.76rem; line-height: 1.35;">
                            <span style="color: var(--accent-color); display: inline-flex; align-items: center; flex-shrink: 0;">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </span>
                            <span style="color: var(--primary-text); min-width: 0; word-break: break-word;">
                                <strong style="color: var(--accent-color); font-weight: 700;">Regola Deleghe:</strong> <span id="room-proxy-limit-text">Caricamento regola...</span>
                            </span>
                        </div>
                    </div>

                    <!-- SEZIONE 2: CONTENITORE QUORUM CONDOMINIO PARZIALE (SCALE / GRUPPI) -->
                    <div id="room-partial-quorum-section" class="hidden" style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1.5px dashed var(--surface-color-light);">
                        <div style="cursor: pointer; user-select: none; margin-bottom: 0.85rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 0.6rem 0.75rem; transition: background 0.2s;" onclick="window.togglePartialQuorumCollapsible()">
                            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
                                <div style="font-size: 0.84rem; font-weight: 800; color: var(--primary-text); text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.35rem;">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg><span>Condominio Parziale</span>
                                </div>
                                <span id="room-partial-toggle-btn" style="font-size: 0.75rem; color: var(--accent-color); font-weight: 800; flex-shrink: 0;">Nascondi ▲</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.4rem; margin-top: 0.45rem; flex-wrap: wrap;">
                                <span id="room-partial-groups-count" class="badge" style="background: #1E293B; color: #FFFFFF; border: 1px solid #475569; font-size: 0.72rem; padding: 0.18rem 0.5rem; border-radius: 4px; font-weight: 800;">0 Scale</span>
                                <span id="room-partial-status-summary" class="badge" style="font-size: 0.72rem; padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 700; display: none;"></span>
                            </div>
                        </div>
                        <div id="room-partial-quorum-container" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
                    </div>
                </div>

                <!-- Presenti -->
                <div class="card" style="margin-bottom: 1rem; padding: 1rem;">
                    <div style="cursor: pointer; margin-bottom: 0.5rem;" onclick="window.toggleRoomAttendeesCollapsible ? window.toggleRoomAttendeesCollapsible() : (function(){ const el = document.getElementById('room-attendees-collapsible'); const isHid = el.classList.toggle('hidden'); const t = document.getElementById('room-attendees-toggle-text'); if(t) t.textContent = isHid ? 'Mostra/Nascondi ▼' : 'Mostra/Nascondi ▲'; })()">
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; width: 100%;">
                            <h3 class="card-title" style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--primary-text);">Elenco Presenti</h3>
                            <span id="room-attendees-toggle-text" style="font-size: 0.75rem; color: var(--accent-color); white-space: nowrap; flex-shrink: 0; font-weight: 600;">Mostra/Nascondi ▼</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; width: 100%; margin-top: 0.6rem;">
                            <div class="badge" style="background: rgba(29, 185, 84, 0.15); color: #1DB954; font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.6rem; border-radius: 8px; border: 1px solid rgba(29, 185, 84, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.35rem; width: 100%; box-sizing: border-box; text-align: center;">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span id="room-badge-in-aula">0</span> in aula
                            </div>
                            <div class="badge" style="background: rgba(59, 130, 246, 0.15); color: var(--accent-color); font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.6rem; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.35rem; width: 100%; box-sizing: border-box; text-align: center;">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg><span id="room-badge-deleghe">0</span> deleghe
                            </div>
                        </div>
                    </div>
                    <div id="room-attendees-collapsible" class="mt-3 hidden space-y-2">
                        <!-- Barra di ricerca Elenco Presenti -->
                        <div style="position: relative; margin-bottom: 0.65rem;">
                            <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--secondary-text); pointer-events: none; display: flex; align-items: center;">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <input type="text" id="input-search-room-attendees" placeholder="Cerca presente o delega..." oninput="window.filterRoomAttendeesList(this.value)" class="form-input" style="width: 100%; box-sizing: border-box; padding: 0.42rem 1.8rem 0.42rem 2.05rem; font-size: 0.82rem; border-radius: 8px;" autocomplete="off">
                            <button type="button" id="btn-clear-search-room-attendees" onclick="document.getElementById('input-search-room-attendees').value = ''; window.filterRoomAttendeesList(''); this.style.display = 'none';" style="display: none; position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--secondary-text); cursor: pointer; padding: 0.2rem; font-size: 0.9rem; line-height: 1;" title="Cancella ricerca">✕</button>
                        </div>
                        <div id="room-attendees-list">
                            <p style="color: var(--secondary-text); font-size: 0.85rem;">Caricamento presenti...</p>
                        </div>
                        <p id="room-attendees-no-results" class="hidden" style="color: var(--secondary-text); font-size: 0.85rem; text-align: center; padding: 0.6rem 0; margin: 0;">Nessun condòmino presente trovato con i criteri di ricerca.</p>
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
                        <h3 class="card-title" style="margin:0; font-size: 1rem;">Punti di discussione</h3>
                    </div>
                    <div id="room-odg-poll-list" class="space-y-4">
                        <p style="color:var(--secondary-text); text-align:center;">Caricamento questioni OdG...</p>
                    </div>
                </div>

                <!-- Log Assemblea -->
                <div class="card" style="padding: 1rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; width: 100%; cursor: pointer; margin-bottom: 0.5rem;" onclick="const el = document.getElementById('room-event-log-collapsible'); el.classList.toggle('hidden');">
                        <h3 class="card-title" style="margin: 0; font-size: 0.9rem; line-height: 1.3; display:flex; align-items:center; gap:0.4rem; flex: 1; min-width: 0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                            <span>Log Assemblea</span>
                        </h3>
                        <span style="font-size: 0.75rem; color: var(--accent-color); white-space: nowrap; flex-shrink: 0; margin-left: 0.5rem;">Mostra/Nascondi ▼</span>
                    </div>
                    <div id="room-event-log-collapsible" class="mt-3 hidden space-y-2" style="margin-top: 0.75rem;">
                        <div id="room-event-log-list">
                            <p style="color: var(--secondary-text); font-size: 0.85rem;">Caricamento registro eventi...</p>
                        </div>
                    </div>
                </div>

                <!-- PULSANTE CONCLUDI ASSEMBLEA (POSIZIONATO IN FONDO ALLA SCHERMATA) -->
                <div id="room-admin-conclude-bottom" class="hidden card" style="padding: 1rem; text-align: center; background: rgba(239,68,68,0.08); border: 1px dashed var(--danger);">
                    <p style="font-size: 0.85rem; color: var(--secondary-text); margin-bottom: 0.75rem;">Al termine di tutte le discussioni e votazioni, concludi ufficialmente l'assemblea.</p>
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
    },

    getProxyLimitConfig: function (assembly, totalCondoCount = 20) {
        const config = assembly?.proxyLimitConfig;
        if (!config || !config.type) {
            const heads = Math.floor(totalCondoCount / 5);
            return {
                type: 'legge_oltre_20',
                maxHeads: heads > 0 ? heads : 1,
                maxMillesimi: 200.00
            };
        }
        if (config.type === 'legge_oltre_20') {
            const heads = totalCondoCount
                ? Math.floor(totalCondoCount / 5)
                : (config.maxHeads !== undefined && config.maxHeads !== null ? config.maxHeads : 1);
            return {
                type: 'legge_oltre_20',
                maxHeads: heads > 0 ? heads : 1,
                maxMillesimi: config.maxMillesimi !== undefined && config.maxMillesimi !== null ? config.maxMillesimi : 200.00
            };
        }
        if (config.type === 'regolamento') {
            return {
                type: 'regolamento',
                maxHeads: config.maxHeads !== undefined && config.maxHeads !== null ? parseInt(config.maxHeads, 10) : null,
                maxMillesimi: config.maxMillesimi !== undefined && config.maxMillesimi !== null ? parseFloat(config.maxMillesimi) : null
            };
        }
        if (config.type === 'nessun_limite') {
            return {
                type: 'nessun_limite',
                maxHeads: null,
                maxMillesimi: null
            };
        }
        return {
            type: 'legge_oltre_20',
            maxHeads: Math.floor(totalCondoCount / 5) || 1,
            maxMillesimi: 200.00
        };
    },

    getProxyLimitDescription: function (assembly, totalCondoCount = 20) {
        const config = this.getProxyLimitConfig(assembly, totalCondoCount);
        if (config.type === 'nessun_limite') {
            return "Nessun limite di legge (Fino a 20 condòmini)";
        }
        if (config.type === 'regolamento') {
            const parts = [];
            if (config.maxHeads !== null && config.maxHeads !== undefined) {
                parts.push(`Max ${config.maxHeads} ${config.maxHeads === 1 ? 'testa' : 'teste'}`);
            }
            if (config.maxMillesimi !== null && config.maxMillesimi !== undefined) {
                if (parts.length > 0) {
                    parts.push(`${parseFloat(config.maxMillesimi).toFixed(2)} ‰`);
                } else {
                    parts.push(`Max ${parseFloat(config.maxMillesimi).toFixed(2)} ‰`);
                }
            }
            const limits = parts.length > 0 ? ` (${parts.join(' / ')})` : '';
            return `Regolamento${limits}`;
        }
        // Fallback e default: legge_oltre_20 (Art. 67 disp. att. c.c.)
        const heads = config.maxHeads !== null && config.maxHeads !== undefined ? config.maxHeads : (totalCondoCount ? Math.floor(totalCondoCount / 5) : 0);
        const headsPart = heads > 0 ? ` - Max ${heads} ${heads === 1 ? 'testa' : 'teste'} / 200.00 ‰` : ' - Max 200.00 ‰';
        return `Legge (Max 1/5 teste e 1/5 millesimi - Art. 67 disp. att. c.c.${headsPart})`;
    },

    validateProxyLimit: function (assembly, delegate, existingHeldProxies = [], newDelegators = [], totalCondoCount = 20) {
        const config = this.getProxyLimitConfig(assembly, totalCondoCount);
        if (config.type === 'nessun_limite') {
            return { valid: true };
        }

        // Conteggio delle deleghe: deleghe già attive/accettate + nuove deleghe da assegnare (esclusa la presenza personale del delegato)
        const totalProxies = (existingHeldProxies ? existingHeldProxies.length : 0) + (newDelegators ? newDelegators.length : 0);

        // Millesimi deleghe già detenute
        let heldProxiesMillesimi = 0;
        (existingHeldProxies || []).forEach(p => {
            heldProxiesMillesimi += (parseFloat(p.delegatorMillesimi) || 0);
        });

        // Millesimi nuovi deleganti
        let newDelegatorsMillesimi = 0;
        (newDelegators || []).forEach(d => {
            let dMil = parseFloat(d.millesimiTotali) || parseFloat(d.delegatorMillesimi) || 0;
            if (dMil <= 0 && Array.isArray(d.proprieta)) {
                dMil = d.proprieta.reduce((sum, p) => sum + (parseFloat(p.millesimi) || 0), 0);
            }
            newDelegatorsMillesimi += dMil;
        });

        // Totale millesimi rappresentati per delega (il limite si applica al valore rappresentato, non alla proprietà personale del delegato)
        const totalDelegatedMillesimi = heldProxiesMillesimi + newDelegatorsMillesimi;

        const maxHeads = config.maxHeads;
        const maxMillesimi = config.maxMillesimi;

        const headsExceeded = maxHeads !== null && maxHeads !== undefined && totalProxies > maxHeads;
        const millesimiExceeded = maxMillesimi !== null && maxMillesimi !== undefined && totalDelegatedMillesimi > (maxMillesimi + 0.001);

        if (headsExceeded || millesimiExceeded) {
            const headsLimitStr = maxHeads !== null ? `${maxHeads} ${maxHeads === 1 ? 'delega' : 'deleghe'}` : 'Nessun limite';
            const millesimiLimitStr = maxMillesimi !== null ? `${maxMillesimi.toFixed(2)} ‰` : 'Nessun limite';
            const proxiesStr = `${totalProxies} ${totalProxies === 1 ? 'delega' : 'deleghe'}`;
            return {
                valid: false,
                totalProxies,
                totalHeads: totalProxies,
                totalMillesimi: totalDelegatedMillesimi,
                totalDelegatedMillesimi,
                maxHeads,
                maxMillesimi,
                errorMessage: `Impossibile assegnare la delega: per questo delegato verrebbe superato il limite massimo consentito di deleghe rappresentate (Limite: ${headsLimitStr} / ${millesimiLimitStr}. Deleghe rappresentate con questa operazione: ${proxiesStr} / ${totalDelegatedMillesimi.toFixed(2)} ‰).`
            };
        }

        return {
            valid: true,
            totalProxies,
            totalHeads: totalProxies,
            totalMillesimi: totalDelegatedMillesimi,
            totalDelegatedMillesimi,
            maxHeads,
            maxMillesimi
        };
    },

    isScaleInTargetGroup: function (propGroup, targetGroup) {
        if (!targetGroup) return true;
        if (targetGroup === 'Tutte le scale' || targetGroup === 'Intero Condominio' || targetGroup === 'Intero condominio') return true;
        if (!propGroup) return false;
        const pNorm = propGroup.trim().toLowerCase();
        const allowed = targetGroup.split(',').map(s => s.trim().toLowerCase());
        if (allowed.includes(pNorm)) return true;
        return allowed.some(a => {
            const aClean = a.replace(/^(scala|gruppo|palazzina|fabbricato)\s+/i, '').trim();
            const pClean = pNorm.replace(/^(scala|gruppo|palazzina|fabbricato)\s+/i, '').trim();
            if (aClean === pClean) return true;

            const aWords = aClean.split(/\s+/);
            const pWords = pClean.split(/\s+/);

            if (aWords.length >= 2) {
                const aInitial = aWords[0][0];
                const aNum = aWords.slice(1).join('');
                if (`${aInitial}${aNum}` === pWords.join('')) return true;
            }
            if (pWords.length >= 2) {
                const pInitial = pWords[0][0];
                const pNum = pWords.slice(1).join('');
                if (`${pInitial}${pNum}` === aWords.join('')) return true;
            }
            return false;
        });
    },

    extractPropsFromTableData: function (tableData, nominativoOrId, rawNom) {
        if (!tableData || !Array.isArray(tableData) || tableData.length === 0) return [];
        const headers = Object.keys(tableData[0] || {});
        const cleanHeader = (h) => (h || '').toString().trim().toLowerCase();
        const findH = (keys) => {
            let found = headers.find(h => keys.some(k => cleanHeader(h) === k.toLowerCase()));
            if (found) return found;
            return headers.find(h => keys.some(k => cleanHeader(h).includes(k.toLowerCase()))) || null;
        };

        const nomHeader = findH(['nominativo', 'condomino', 'condòmino', 'proprietario', 'intestatario', 'cognome e nome', 'nome e cognome']);
        const unitHeader = findH(['interno', 'appartamento', 'unita', 'unità', 'sub', 'immobile', 'ui']);
        const milHeader = findH(['millesimi', 'millesimo', 'quota', 'valore', 'quota millesimale', 'valore millesimale', 'mm', 'carico']);
        const grpHHeader = findH(['raggruppamento', 'gruppo', 'scala', 'palazzina', 'fabbricato']);

        if (!nomHeader) return [];

        const cleanTarget = (rawNom || nominativoOrId || '').toString().toLowerCase().replace(/[^a-z0-9]/gi, ' ').replace(/\s+/g, ' ').trim();
        if (!cleanTarget) return [];

        const matchedRows = tableData.filter(row => {
            const rNom = (row[nomHeader] || '').toString().toLowerCase().replace(/[^a-z0-9]/gi, ' ').replace(/\s+/g, ' ').trim();
            if (!rNom) return false;
            if (rNom === cleanTarget) return true;
            const rWords = rNom.split(' ').filter(w => w.length > 2);
            const tWords = cleanTarget.split(' ').filter(w => w.length > 2);
            return (rWords.length > 0 && rWords.every(w => cleanTarget.includes(w))) ||
                (tWords.length > 0 && tWords.every(w => rNom.includes(w)));
        });

        return matchedRows.map(row => {
            const rawMil = milHeader && row[milHeader] ? row[milHeader].toString().replace(',', '.').replace(/[^\d.-]/g, '').trim() : '0';
            return {
                interno: unitHeader && row[unitHeader] ? row[unitHeader].toString().trim() : '',
                millesimi: parseFloat(rawMil) || 0,
                gruppo: grpHHeader && row[grpHHeader] ? row[grpHHeader].toString().trim() : ''
            };
        });
    },

    getEffectiveUnitMillesimi: function (userOrAttendee, targetGroup, allUsers = null, tableData = null) {
        if (!userOrAttendee) return 0;

        const checkGroup = window.isScaleInTargetGroup || AssembleeModule.isScaleInTargetGroup;
        const isGlobal = !targetGroup ||
            targetGroup === 'Tutte le scale' ||
            targetGroup === 'Intero Condominio' ||
            targetGroup === 'Intero condominio' ||
            targetGroup.trim().toLowerCase() === 'intero';

        if (isGlobal) {
            if (userOrAttendee.baseMillesimi !== undefined && userOrAttendee.baseMillesimi !== null) {
                return parseFloat(userOrAttendee.baseMillesimi) || 0;
            }
            if (userOrAttendee.millesimiTotali !== undefined && userOrAttendee.millesimiTotali !== null) {
                return parseFloat(userOrAttendee.millesimiTotali) || 0;
            }
            if (userOrAttendee.millesimi !== undefined && userOrAttendee.millesimi !== null) {
                return parseFloat(userOrAttendee.millesimi) || 0;
            }
            if (Array.isArray(userOrAttendee.proprieta) && userOrAttendee.proprieta.length > 0) {
                return userOrAttendee.proprieta.reduce((sum, p) => sum + (parseFloat(p.millesimi) || 0), 0);
            }
            return 0;
        }

        let props = [];
        if (Array.isArray(userOrAttendee.proprieta) && userOrAttendee.proprieta.length > 0) {
            props = userOrAttendee.proprieta;
        } else if (Array.isArray(userOrAttendee.properties) && userOrAttendee.properties.length > 0) {
            props = userOrAttendee.properties;
        } else if (allUsers && (userOrAttendee.uid || userOrAttendee.id)) {
            const uId = userOrAttendee.uid || userOrAttendee.id;
            const matched = allUsers.find(u => u.id === uId || u.uid === uId);
            if (matched && Array.isArray(matched.proprieta) && matched.proprieta.length > 0) {
                props = matched.proprieta;
            }
        }

        if (props.length === 0 && typeof window !== 'undefined' && window._unifiedCondominiumRegistryCache?.data?.allCondomini) {
            const uId = userOrAttendee.uid || userOrAttendee.id;
            const uName = userOrAttendee.nome || userOrAttendee.nominativo;
            const cachedUser = window._unifiedCondominiumRegistryCache.data.allCondomini.find(c =>
                (uId && c.id === uId) ||
                (uName && c.nominativo && c.nominativo.trim().toLowerCase() === uName.trim().toLowerCase())
            );
            if (cachedUser && Array.isArray(cachedUser.proprieta) && cachedUser.proprieta.length > 0) {
                props = cachedUser.proprieta;
            }
        }

        if (props.length === 0 && typeof window !== 'undefined') {
            const tData = (tableData && tableData.length > 0) ? tableData : (window._liveAssemblyStaticCache?.tableData || window._currentTableData);
            if (tData && tData.length > 0) {
                props = AssembleeModule.extractPropsFromTableData(tData, userOrAttendee.uid || userOrAttendee.id, userOrAttendee.nome || userOrAttendee.nominativo);
            }
        }

        if (props.length > 0) {
            const matchingProps = props.filter(p => checkGroup(p.gruppo, targetGroup));
            return matchingProps.reduce((sum, p) => sum + (parseFloat(p.millesimi) || 0), 0);
        }

        const singleGroup = userOrAttendee.gruppo || userOrAttendee.delegatorGroup || '';
        if (checkGroup(singleGroup, targetGroup)) {
            const rawMil = userOrAttendee.baseMillesimi !== undefined ? userOrAttendee.baseMillesimi : (userOrAttendee.delegatorMillesimi !== undefined ? userOrAttendee.delegatorMillesimi : (userOrAttendee.millesimiTotali !== undefined ? userOrAttendee.millesimiTotali : userOrAttendee.millesimi));
            return parseFloat(rawMil) || 0;
        }

        return 0;
    },

    getEffectiveProxyMillesimi: function (proxy, targetGroup, allUsers = null, tableData = null) {
        if (!proxy || proxy.status === 'rejected') return 0;

        const checkGroup = window.isScaleInTargetGroup || AssembleeModule.isScaleInTargetGroup;
        const isGlobal = !targetGroup ||
            targetGroup === 'Tutte le scale' ||
            targetGroup === 'Intero Condominio' ||
            targetGroup === 'Intero condominio' ||
            targetGroup.trim().toLowerCase() === 'intero';

        if (isGlobal) {
            return parseFloat(proxy.delegatorMillesimi) || 0;
        }

        let delegatorProps = [];
        if (Array.isArray(proxy.proprieta) && proxy.proprieta.length > 0) {
            delegatorProps = proxy.proprieta;
        } else if (allUsers && proxy.delegatorId) {
            const delegatorUser = allUsers.find(u => u.id === proxy.delegatorId || u.uid === proxy.delegatorId);
            if (delegatorUser && Array.isArray(delegatorUser.proprieta) && delegatorUser.proprieta.length > 0) {
                delegatorProps = delegatorUser.proprieta;
            }
        }

        if (delegatorProps.length === 0 && typeof window !== 'undefined' && window._unifiedCondominiumRegistryCache?.data?.allCondomini) {
            const dId = proxy.delegatorId || proxy.id;
            const dName = proxy.delegatorName;
            const cached = window._unifiedCondominiumRegistryCache.data.allCondomini.find(c =>
                (dId && c.id === dId) ||
                (dName && c.nominativo && c.nominativo.trim().toLowerCase() === dName.trim().toLowerCase())
            );
            if (cached && Array.isArray(cached.proprieta) && cached.proprieta.length > 0) {
                delegatorProps = cached.proprieta;
            }
        }

        if (delegatorProps.length === 0 && typeof window !== 'undefined') {
            const tData = (tableData && tableData.length > 0) ? tableData : (window._liveAssemblyStaticCache?.tableData || window._currentTableData);
            if (tData && tData.length > 0) {
                delegatorProps = AssembleeModule.extractPropsFromTableData(tData, proxy.delegatorId || proxy.id, proxy.delegatorName);
            }
        }

        if (delegatorProps.length > 0) {
            const matchingProps = delegatorProps.filter(p => checkGroup(p.gruppo, targetGroup));
            return matchingProps.reduce((sum, p) => sum + (parseFloat(p.millesimi) || 0), 0);
        }

        if (checkGroup(proxy.delegatorGroup, targetGroup)) {
            return parseFloat(proxy.delegatorMillesimi) || 0;
        }

        return 0;
    },

    getOfficialImportNominativo: function (entity, userObj = null, tableData = null, allCondomini = null) {
        if (!entity) return '';

        const cleanUnit = (u) => (u || '').toString().trim().toLowerCase().replace(/\s+/g, '');
        const cleanName = (n) => (n || '').toString().toLowerCase().replace(/[^a-z0-9]/gi, ' ').replace(/\s+/g, ' ').trim();

        // 1. Cerca direttamente nelle righe del file/dataset importato (tableData)
        const tData = (tableData && tableData.length > 0)
            ? tableData
            : (typeof window !== 'undefined' ? (window._liveAssemblyStaticCache?.tableData || window._currentTableData || []) : []);

        const condominiList = (allCondomini && allCondomini.length > 0)
            ? allCondomini
            : (typeof window !== 'undefined' ? (window._liveAssemblyStaticCache?.allCondomini || window._unifiedCondominiumRegistryCache?.data?.allCondomini || []) : []);

        // Priority 1: Se l'entità specifica una singola unità immobiliare (interno / unita / appartamento)
        const singleUnit = entity.interno || entity.unitaImmobiliare || entity.unita || entity.apartment || (typeof entity === 'string' ? entity : null);

        if (singleUnit && typeof singleUnit === 'string' && tData.length > 0) {
            const headers = Object.keys(tData[0] || {});
            const cleanH = (h) => (h || '').toString().trim().toLowerCase();
            const findH = (keys) => {
                let found = headers.find(h => keys.some(k => cleanH(h) === k.toLowerCase()));
                if (found) return found;
                return headers.find(h => keys.some(k => cleanH(h).includes(k.toLowerCase()))) || null;
            };
            const nomH = findH(['nominativo', 'condomino', 'condòmino', 'proprietario', 'proprietario/a', 'intestatario', 'cognome e nome', 'nome e cognome', 'cognome nome', 'anagrafica', 'utente', 'cliente', 'intestazione']);
            const unitH = findH(['interno', 'appartamento', 'unita', 'unità', 'sub', 'immobile', 'ui', 'piano']);

            if (unitH && nomH) {
                const targetU = cleanUnit(singleUnit);
                // Match ESATTO sull'unità
                const matchedRow = tData.find(r => cleanUnit(r[unitH]) === targetU);
                if (matchedRow && matchedRow[nomH]) {
                    return matchedRow[nomH].toString().trim();
                }
            }
        }

        // Priority 2: Cerca per ID utente registrato nella cache unificata allCondomini
        const targetId = entity.uid || entity.id || entity.delegatorId;
        if (targetId && condominiList.length > 0) {
            const matchById = condominiList.find(c => c.id === targetId || c.registeredUid === targetId);
            if (matchById && matchById.nominativo) {
                return matchById.nominativo.trim();
            }
        }

        // Priority 3: Cerca per Nome/Cognome in tableData
        const rawRawName = (entity.delegatorName || entity.nominativo || `${userObj?.cognome || ''} ${userObj?.nome || ''}` || `${entity.cognome || ''} ${entity.nome || ''}` || entity.nome || '');
        const targetName = rawRawName.replace(/\s*\(\+\d+\s+deleghe?.*?\)/gi, '').trim();
        const normTarget = cleanName(targetName);
        const targetWords = normTarget.split(' ').filter(w => w.length >= 2);

        if (tData.length > 0 && targetWords.length > 0) {
            const headers = Object.keys(tData[0] || {});
            const cleanH = (h) => (h || '').toString().trim().toLowerCase();
            const findH = (keys) => {
                let found = headers.find(h => keys.some(k => cleanH(h) === k.toLowerCase()));
                if (found) return found;
                return headers.find(h => keys.some(k => cleanH(h).includes(k.toLowerCase()))) || null;
            };
            const nomH = findH(['nominativo', 'condomino', 'condòmino', 'proprietario', 'proprietario/a', 'intestatario', 'cognome e nome', 'nome e cognome', 'cognome nome', 'anagrafica', 'utente', 'cliente', 'intestazione']);

            if (nomH) {
                // Match esatto stringa nome
                const exactRow = tData.find(r => cleanName(r[nomH]) === normTarget);
                if (exactRow && exactRow[nomH]) return exactRow[nomH].toString().trim();

                // Match tutte le parole significative del nome
                const allWordsRow = tData.find(r => {
                    const rNom = cleanName(r[nomH]);
                    return rNom && targetWords.every(w => rNom.includes(w));
                });
                if (allWordsRow && allWordsRow[nomH]) return allWordsRow[nomH].toString().trim();
            }
        }

        // Priority 4: Cerca per Nome in condominiList
        if (condominiList.length > 0 && targetWords.length > 0) {
            const matchByName = condominiList.find(c => {
                const cNom = cleanName(c.nominativo);
                if (cNom && (cNom === normTarget || targetWords.every(w => cNom.includes(w)))) return true;
                const cFull = cleanName(`${c.cognome || ''} ${c.nome || ''}`);
                if (cFull && (cFull === normTarget || targetWords.every(w => cFull.includes(w)))) return true;
                return false;
            });
            if (matchByName && matchByName.nominativo) {
                return matchByName.nominativo.trim();
            }
        }

        // Priority 5: Fallback
        if (entity.delegatorName) return entity.delegatorName.replace(/\s*\(\+\d+\s+deleghe?.*?\)/gi, '').trim();
        if (entity.nominativo) return entity.nominativo.trim();
        if (userObj) return `${userObj.cognome || ''} ${userObj.nome || ''}`.trim() || userObj.nome || 'Condòmino';
        if (entity.cognome || entity.nome) return `${entity.cognome || ''} ${entity.nome || ''}`.trim() || 'Condòmino';
        return 'Condòmino';
    }
};

window.isScaleInTargetGroup = window.AssembleeModule.isScaleInTargetGroup.bind(window.AssembleeModule);
window.extractPropsFromTableData = window.AssembleeModule.extractPropsFromTableData.bind(window.AssembleeModule);
window.getEffectiveUnitMillesimi = window.AssembleeModule.getEffectiveUnitMillesimi.bind(window.AssembleeModule);
window.getEffectiveProxyMillesimi = window.AssembleeModule.getEffectiveProxyMillesimi.bind(window.AssembleeModule);
window.getOfficialImportNominativo = window.AssembleeModule.getOfficialImportNominativo.bind(window.AssembleeModule);
window.getProxyLimitConfig = window.AssembleeModule.getProxyLimitConfig.bind(window.AssembleeModule);
window.getProxyLimitDescription = window.AssembleeModule.getProxyLimitDescription.bind(window.AssembleeModule);
window.validateProxyLimit = window.AssembleeModule.validateProxyLimit.bind(window.AssembleeModule);


