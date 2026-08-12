// =========================================================
// SISTEMA DE TEMAS Y PERSONALIZACIÓN DE MARCA BLANCA (WHITE-LABEL)
// =========================================================

(function () {
    const THEME_DEFAULTS = {
        nombreTienda: 'eDark Import',
        sloganTienda: 'Tu tienda de tecnología e importaciones',
        logoPrincipalUrl: 'img/Logo/logo_completo.png',
        logoIsotipoUrl: 'img/Logo/isotipo_Negro.png',
        faviconUrl: 'img/Logo/isotipo_Negro.png',
        telefonoWhatsapp: '51916907657',
        emailContacto: 'contacto@edark.pe',
        direccionFisica: 'Lima Metropolitana, Perú',
        colorPrimary: '#2563eb',
        colorSecondary: '#10b981',
        colorDarkBg: '#0f172a',
        cotizadorHabilitado: true,
        cotizadorTitulo: 'Cotizador Personalizado',
        cotizadorSubtitulo: 'Arma tu pedido ideal a la medida'
    };

    // Función para inyectar variables CSS en el elemento :root de la página
    function aplicarEstilosTema(config) {
        const root = document.documentElement;
        const primary = config.colorPrimary || THEME_DEFAULTS.colorPrimary;
        const secondary = config.colorSecondary || THEME_DEFAULTS.colorSecondary;
        const darkBg = config.colorDarkBg || THEME_DEFAULTS.colorDarkBg;

        root.style.setProperty('--brand-primary', primary);
        root.style.setProperty('--brand-secondary', secondary);
        root.style.setProperty('--brand-bg-dark', darkBg);

        // Generar estilo dinámico para sobrescribir clases Bootstrap si se desea
        let styleTag = document.getElementById('dynamic-theme-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-styles';
            document.head.appendChild(styleTag);
        }

        styleTag.innerHTML = `
            :root {
                --bs-primary: ${primary} !important;
                --bs-primary-rgb: ${hexToRgb(primary)} !important;
                --bs-success: ${secondary} !important;
                --bs-success-rgb: ${hexToRgb(secondary)} !important;
            }
            .bg-primary { background-color: ${primary} !important; }
            .text-primary { color: ${primary} !important; }
            .btn-primary { background-color: ${primary} !important; border-color: ${primary} !important; }
            .btn-outline-primary { color: ${primary} !important; border-color: ${primary} !important; }
            .btn-outline-primary:hover { background-color: ${primary} !important; color: #ffffff !important; }
            .border-primary { border-color: ${primary} !important; }
            .badge.bg-primary { background-color: ${primary} !important; }
            .badge.bg-success { background-color: ${secondary} !important; }
            .text-success { color: ${secondary} !important; }
            .btn-success { background-color: ${secondary} !important; border-color: ${secondary} !important; }
        `;
    }

    function hexToRgb(hex) {
        let c = (hex || '#2563eb').replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    }

    // Aplicar branding en elementos HTML clave (Logos, Título, Favicon, Cotizador)
    function aplicarBrandingElementos(config) {
        const c = Object.assign({}, THEME_DEFAULTS, config || {});

        // 1. Título del Documento
        if (c.nombreTienda && !document.title.includes(c.nombreTienda)) {
            const pageName = document.title.split('-')[0].trim();
            document.title = `${pageName} - ${c.nombreTienda}`;
        }

        // 2. Favicon
        const faviconUrl = c.faviconUrl || c.logoIsotipoUrl;
        if (faviconUrl) {
            let fav = document.querySelector("link[rel*='icon']");
            if (!fav) {
                fav = document.createElement('link');
                fav.rel = 'icon';
                document.head.appendChild(fav);
            }
            fav.href = faviconUrl;
        }

        // 3. Logos en Navbar y Footers
        document.querySelectorAll('.brand-logo-img, #navLogoImg, .navbar-brand img').forEach(img => {
            if (c.logoPrincipalUrl) img.src = c.logoPrincipalUrl;
            if (c.nombreTienda) img.alt = c.nombreTienda;
        });

        // 4. Nombre Comercial en textos estáticos
        document.querySelectorAll('.brand-name-text, .store-name-display').forEach(el => {
            el.textContent = c.nombreTienda;
        });

        // 5. Visibilidad y Títulos del Módulo Cotizador
        const cotizadorNavLinks = document.querySelectorAll('.nav-link-cotizador, a[href*="pc-personalizada"]');
        cotizadorNavLinks.forEach(link => {
            if (c.cotizadorHabilitado === false) {
                link.style.display = 'none';
                if (link.parentElement && link.parentElement.tagName === 'LI') {
                    link.parentElement.style.display = 'none';
                }
            } else {
                link.style.display = '';
                if (link.parentElement && link.parentElement.tagName === 'LI') {
                    link.parentElement.style.display = '';
                }
                if (c.cotizadorTitulo && link.classList.contains('cotizador-nav-title')) {
                    link.innerHTML = `<i class="bi bi-sliders me-1"></i> ${c.cotizadorTitulo}`;
                }
            }
        });
    }

    // Método principal para cargar configuración de Firestore e inicializar el tema
    async function inicializarTemaDinamico() {
        let config = null;
        if (window.configGeneral) {
            config = window.configGeneral;
        } else if (typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                const snap = await firebase.firestore().collection('config').doc('general').get();
                if (snap.exists) {
                    config = snap.data();
                    window.configGeneral = config;
                }
            } catch (e) {
                console.warn('[Tema] No se pudo obtener la configuración de Firestore, usando valores base:', e);
            }
        }

        const mergedConfig = Object.assign({}, THEME_DEFAULTS, config || {});
        window.configGeneral = mergedConfig;
        if (mergedConfig.telefonoWhatsapp) {
            window.phone = mergedConfig.telefonoWhatsapp;
        }

        aplicarEstilosTema(mergedConfig);
        aplicarBrandingElementos(mergedConfig);
    }

    // Exponer globalmente
    window.inicializarTemaDinamico = inicializarTemaDinamico;
    window.aplicarEstilosTema = aplicarEstilosTema;
    window.aplicarBrandingElementos = aplicarBrandingElementos;
    window.THEME_DEFAULTS = THEME_DEFAULTS;

    // Ejecutar al cargar la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarTemaDinamico);
    } else {
        inicializarTemaDinamico();
    }
})();
