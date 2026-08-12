// =========================================================
// SISTEMA DE TEMAS Y PERSONALIZACIÓN DE MARCA BLANCA (WHITE-LABEL)
// =========================================================

(function () {
    const THEME_DEFAULTS = {
        nombreTienda: 'Syverluma Store',
        sloganTienda: 'Tu plataforma de comercio electrónico a la medida',
        logoPrincipalUrl: 'img/Logo/logo_2.png',
        logoIsotipoUrl: 'img/Logo/isotipo_Negro.png',
        faviconUrl: 'img/Logo/isotipo_Negro.png',
        telefonoWhatsapp: '51916907657',
        emailContacto: 'contacto@syverluma.com',
        direccionFisica: 'Lima Metropolitana, Perú',
        colorPrimary: '#2563eb',
        colorSecondary: '#10b981',
        colorDarkBg: '#0f172a',
        cotizadorHabilitado: true,
        cotizadorTitulo: 'Cotizador Personalizado',
        cotizadorSubtitulo: 'Arma tu pedido ideal a la medida',
        nosotrosHabilitado: true,
        nosotrosTitulo: 'Quiénes Somos',
        nosotrosTexto: 'Somos una empresa dedicada a ofrecer productos y servicios de alta calidad, diseñados a la medida de nuestros clientes.',
        serviciosHabilitado: true,
        serviciosTitulo: 'Nuestros Servicios',
        serviciosSubtitulo: 'Soluciones integrales diseñadas para potenciar tu experiencia.',
        blogHabilitado: true
    };

    function hexToRgb(hex) {
        let c = (hex || '#2563eb').replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    }

    // Inyectar variables CSS universales para sobscribir TODOS los elementos primarios y secundarios
    function aplicarEstilosTema(config) {
        const root = document.documentElement;
        const primary = config.colorPrimary || THEME_DEFAULTS.colorPrimary;
        const secondary = config.colorSecondary || THEME_DEFAULTS.colorSecondary;
        const darkBg = config.colorDarkBg || THEME_DEFAULTS.colorDarkBg;
        const primaryRgb = hexToRgb(primary);
        const secondaryRgb = hexToRgb(secondary);

        root.style.setProperty('--brand-primary', primary);
        root.style.setProperty('--brand-secondary', secondary);
        root.style.setProperty('--brand-bg-dark', darkBg);

        let styleTag = document.getElementById('dynamic-theme-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-styles';
            document.head.appendChild(styleTag);
        }

        styleTag.innerHTML = `
            :root {
                --bs-primary: ${primary} !important;
                --bs-primary-rgb: ${primaryRgb} !important;
                --bs-success: ${secondary} !important;
                --bs-success-rgb: ${secondaryRgb} !important;
            }
            body.modo-oscuro {
                background-color: ${darkBg} !important;
            }
            .bg-primary, .bg-primary-edark { 
                background-color: ${primary} !important; 
            }
            .text-primary, .text-primary-edark { 
                color: ${primary} !important; 
            }
            .btn-primary { 
                background-color: ${primary} !important; 
                border-color: ${primary} !important; 
            }
            .btn-primary:hover, .btn-primary:focus {
                background-color: ${primary} !important;
                filter: brightness(0.9);
            }
            .btn-outline-primary { 
                color: ${primary} !important; 
                border-color: ${primary} !important; 
            }
            .btn-outline-primary:hover { 
                background-color: ${primary} !important; 
                color: #ffffff !important; 
            }
            .border-primary { 
                border-color: ${primary} !important; 
            }
            .badge.bg-primary { 
                background-color: ${primary} !important; 
            }
            .text-success { 
                color: ${secondary} !important; 
            }
            .bg-success { 
                background-color: ${secondary} !important; 
            }
            .btn-success { 
                background-color: ${secondary} !important; 
                border-color: ${secondary} !important; 
            }
            .badge.bg-success { 
                background-color: ${secondary} !important; 
            }
            /* Sobrescribir enlaces y hover en navbar */
            #mainNavbar a.nav-link:hover,
            #mainNavbar a.nav-link.active,
            .glass-navbar a.nav-link:hover,
            .glass-navbar a.nav-link.active {
                color: ${primary} !important;
            }
            body.modo-oscuro #mainNavbar a.nav-link:hover,
            body.modo-oscuro #mainNavbar a.nav-link.active,
            body.modo-oscuro .glass-navbar a.nav-link:hover,
            body.modo-oscuro .glass-navbar a.nav-link.active {
                color: ${secondary} !important;
            }
            /* Encabezados y héroe */
            header.hero-banner, header.py-5 {
                border-bottom: 2px solid ${primary} !important;
            }
        `;
    }

    // Aplicar branding en elementos HTML clave (Logos, Títulos, Nosotros, Servicios)
    function aplicarBrandingElementos(config) {
        const c = Object.assign({}, THEME_DEFAULTS, config || {});

        // 1. Título del Documento
        if (c.nombreTienda) {
            const parts = document.title.split('-');
            const pagePrefix = parts[0] ? parts[0].trim() : '';
            if (!document.title.includes(c.nombreTienda)) {
                document.title = `${pagePrefix} - ${c.nombreTienda}`;
            }
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

        // 4. Nombre Comercial & Slogan en Hero Banner y Textos
        document.querySelectorAll('.brand-name-text, .store-name-display').forEach(el => {
            el.textContent = c.nombreTienda;
        });
        
        // Banner Hero en index.html
        const heroTitle = document.querySelector('.hero-banner h1, header h1.display-4');
        if (heroTitle && c.nombreTienda) {
            heroTitle.textContent = c.nombreTienda.toUpperCase();
        }
        const heroSub = document.querySelector('.hero-banner p, header p.lead');
        if (heroSub && c.sloganTienda) {
            heroSub.textContent = c.sloganTienda;
        }

        // 5. Módulo Nosotros (Quiénes Somos)
        const nosotrosSection = document.getElementById('seccion-nosotros') || document.querySelector('.nosotros-section');
        const nosotrosNavLinks = document.querySelectorAll('a[href*="nosotros"]');
        nosotrosNavLinks.forEach(link => {
            if (c.nosotrosHabilitado === false) {
                link.style.display = 'none';
                if (link.parentElement && link.parentElement.tagName === 'LI') link.parentElement.style.display = 'none';
            } else {
                link.style.display = '';
                if (link.parentElement && link.parentElement.tagName === 'LI') link.parentElement.style.display = '';
            }
        });
        if (nosotrosSection) {
            if (c.nosotrosHabilitado === false) {
                nosotrosSection.style.display = 'none';
            } else {
                nosotrosSection.style.display = '';
                const titleEl = nosotrosSection.querySelector('h2, h3, .nosotros-titulo');
                if (titleEl && c.nosotrosTitulo) titleEl.textContent = c.nosotrosTitulo;
                const textEl = nosotrosSection.querySelector('.nosotros-texto, p.lead');
                if (textEl && c.nosotrosTexto) textEl.innerHTML = c.nosotrosTexto;
            }
        }

        // 6. Módulo Servicios
        const serviciosNavLinks = document.querySelectorAll('.nav-item-servicios, a[href*="consultoria"], a[href*="soporte"], a[href*="servicios"]');
        serviciosNavLinks.forEach(link => {
            if (c.serviciosHabilitado === false) {
                link.style.display = 'none';
                if (link.parentElement && link.parentElement.tagName === 'LI') link.parentElement.style.display = 'none';
            } else {
                link.style.display = '';
                if (link.parentElement && link.parentElement.tagName === 'LI') link.parentElement.style.display = '';
            }
        });

        // 7. Módulo Blog
        const blogNavLinks = document.querySelectorAll('a[href*="blog"]');
        blogNavLinks.forEach(link => {
            if (c.blogHabilitado === false) {
                link.style.display = 'none';
                if (link.parentElement && link.parentElement.tagName === 'LI') link.parentElement.style.display = 'none';
            } else {
                link.style.display = '';
                if (link.parentElement && link.parentElement.tagName === 'LI') link.parentElement.style.display = '';
            }
        });

        // 8. Visibilidad y Títulos del Módulo Cotizador
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
                console.warn('[Tema] No se pudo obtener la configuración de Firestore:', e);
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

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarTemaDinamico);
    } else {
        inicializarTemaDinamico();
    }

    window.inicializarTemaDinamico = inicializarTemaDinamico;
})();
