/**
 * CONDO APP PWA - THEME OUTLINE ICONS (Lucide/Feather stroke-based style)
 * All icons use stroke="currentColor" and fill="none" for a modern, unified aesthetic.
 */
(function () {
    const createSvg = (paths, size = 16, stroke = 2, extraClass = '', extraStyle = '', color = 'currentColor') => {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" class="theme-icon ${extraClass}" style="${extraStyle}">${paths}</svg>`;
    };

    window.THEME_ICONS = {
        home: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', size, stroke, extraClass, extraStyle),

        clipboard: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>', size, stroke, extraClass, extraStyle),

        wrench: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>', size, stroke, extraClass, extraStyle),

        alertCircle: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', size, stroke, extraClass, extraStyle),

        alertTriangle: (size = 16, stroke = 2, extraClass = '', extraStyle = '', color = 'currentColor') =>
            createSvg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', size, stroke, extraClass, extraStyle, color),

        chart: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>', size, stroke, extraClass, extraStyle),

        users: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', size, stroke, extraClass, extraStyle),

        user: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', size, stroke, extraClass, extraStyle),

        download: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>', size, stroke, extraClass, extraStyle),

        fileText: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', size, stroke, extraClass, extraStyle),

        phone: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', size, stroke, extraClass, extraStyle),

        pen: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>', size, stroke, extraClass, extraStyle),

        circleOutline: (size = 14, stroke = 2.4, color = 'currentColor', extraClass = '', extraStyle = '') =>
            createSvg('<circle cx="12" cy="12" r="9"></circle>', size, stroke, extraClass, extraStyle, color),

        circleDot: (size = 14, stroke = 2.4, color = 'currentColor', extraClass = '', extraStyle = '') =>
            createSvg('<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle>', size, stroke, extraClass, extraStyle, color),

        circleGreen: (size = 12) =>
            createSvg('<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle>', size, 2.4, '', '', '#10B981'),

        circleRed: (size = 12) =>
            createSvg('<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle>', size, 2.4, '', '', '#EF4444'),

        circleGray: (size = 12) =>
            createSvg('<circle cx="12" cy="12" r="9"></circle>', size, 2.4, '', '', 'var(--secondary-text)'),

        circleBlack: (size = 12) =>
            createSvg('<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle>', size, 2.4, '', '', '#000'),

        cross: (size = 16, stroke = 2.4, color = 'currentColor', extraClass = '', extraStyle = '') =>
            createSvg('<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>', size, stroke, extraClass, extraStyle, color),

        crossDanger: (size = 14) =>
            createSvg('<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>', size, 2.4, '', '', '#EF4444'),

        check: (size = 16, stroke = 2.4, color = 'currentColor', extraClass = '', extraStyle = '') =>
            createSvg('<polyline points="20 6 9 17 4 12"></polyline>', size, stroke, extraClass, extraStyle, color),

        checkCircle: (size = 16, stroke = 2.2, color = 'currentColor', extraClass = '', extraStyle = '') =>
            createSvg('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', size, stroke, extraClass, extraStyle, color),

        checkSuccess: (size = 14) =>
            createSvg('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', size, 2.2, '', '', '#10B981'),

        alertWarning: (size = 16) =>
            createSvg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', size, 2, '', '', 'var(--warning)'),

        alertDanger: (size = 28) =>
            createSvg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', size, 2, '', '', '#EF4444'),

        search: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>', size, stroke, extraClass, extraStyle),

        handshake: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M11 17l-5-5a3 3 0 0 1 0-4.24l.7-.7a3 3 0 0 1 4.24 0l1.06 1.06"></path><path d="M13 7l5 5a3 3 0 0 1 0 4.24l-.7.7a3 3 0 0 1-4.24 0L12 15.88"></path><line x1="9" y1="15" x2="15" y2="9"></line>', size, stroke, extraClass, extraStyle),

        lock: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', size, stroke, extraClass, extraStyle),

        calendar: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>', size, stroke, extraClass, extraStyle),

        scroll: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M8 2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><line x1="10" y1="6" x2="14" y2="6"></line><line x1="10" y1="10" x2="14" y2="10"></line><line x1="10" y1="14" x2="14" y2="14"></line>', size, stroke, extraClass, extraStyle),

        smartphone: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', size, stroke, extraClass, extraStyle),

        pin: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.76V6a3 3 0 0 0-6 0v4.76a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24z"></path>', size, stroke, extraClass, extraStyle),

        flag: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>', size, stroke, extraClass, extraStyle),

        building: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="12"></line><line x1="15" y1="22" x2="15" y2="12"></line><line x1="9" y1="12" x2="15" y2="12"></line><line x1="9" y1="7" x2="9.01" y2="7"></line><line x1="15" y1="7" x2="15.01" y2="7"></line>', size, stroke, extraClass, extraStyle),

        layers: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>', size, stroke, extraClass, extraStyle),

        refresh: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>', size, stroke, extraClass, extraStyle),

        door: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>', size, stroke, extraClass, extraStyle),

        trash: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>', size, stroke, extraClass, extraStyle),

        scale: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<line x1="12" y1="3" x2="12" y2="21"></line><polyline points="5 6 12 3 19 6"></polyline><path d="M2 12l3-6 3 6a3 3 0 0 1-6 0z"></path><path d="M16 12l3-6 3 6a3 3 0 0 1-6 0z"></path>', size, stroke, extraClass, extraStyle),

        settings: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>', size, stroke, extraClass, extraStyle),

        thumbsUp: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>', size, stroke, extraClass, extraStyle),

        thumbsDown: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>', size, stroke, extraClass, extraStyle),

        camera: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>', size, stroke, extraClass, extraStyle),

        eye: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>', size, stroke, extraClass, extraStyle),

        lightbulb: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path>', size, stroke, extraClass, extraStyle),

        dragHandle: (size = 16, stroke = 2.2, extraClass = '', extraStyle = '') =>
            createSvg('<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>', size, stroke, extraClass, extraStyle),

        hourglass: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>', size, stroke, extraClass, extraStyle),

        clock: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', size, stroke, extraClass, extraStyle),

        play: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<polygon points="5 3 19 12 5 21 5 3"></polygon>', size, stroke, extraClass, extraStyle),

        stop: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<rect x="4" y="4" width="16" height="16" rx="2"></rect>', size, stroke, extraClass, extraStyle),

        undo: (size = 16, stroke = 2, extraClass = '', extraStyle = '') =>
            createSvg('<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>', size, stroke, extraClass, extraStyle)
    };
})();
