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
        modoPredeterminado: 'oscuro', // 'oscuro' o 'claro'
        frasesBanner: 'La excelencia está en los detalles\nEnvíos rápidos y seguros a todo el país\nAtención personalizada y garantía asegurada',
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

    // Inyectar variables CSS universales para sobrescribir el fondo completo y TODOS los colores del sitio
    function aplicarEstilosTema(config) {
        const root = document.documentElement;
        const primary = config.colorPrimary || THEME_DEFAULTS.colorPrimary;
        const secondary = config.colorSecondary || THEME_DEFAULTS.colorSecondary;
        const darkBg = config.colorDarkBg || THEME_DEFAULTS.colorDarkBg;
        const modo = config.modoPredeterminado || 'oscuro';
        const esModoClaro = (modo === 'claro');

        const primaryRgb = hexToRgb(primary);
        const secondaryRgb = hexToRgb(secondary);
        const darkBgRgb = hexToRgb(darkBg);

        root.style.setProperty('--brand-primary', primary);
        root.style.setProperty('--brand-secondary', secondary);
        root.style.setProperty('--brand-bg-dark', darkBg);

        let styleTag = document.getElementById('dynamic-theme-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-styles';
            document.head.appendChild(styleTag);
        }

        const bgBase = esModoClaro ? '#f8fafc' : darkBg;
        const bgBaseRgb = esModoClaro ? '248, 250, 252' : darkBgRgb;
        const textColor = esModoClaro ? '#0f172a' : '#ffffff';
        const cardBg = esModoClaro ? '#ffffff' : `rgba(${darkBgRgb}, 0.92)`;

        styleTag.innerHTML = `
            :root {
                --bs-primary: ${primary} !important;
                --bs-primary-rgb: ${primaryRgb} !important;
                --bs-success: ${secondary} !important;
                --bs-success-rgb: ${secondaryRgb} !important;
                --bg-dark-custom: ${darkBg} !important;
            }
            
            /* Fondo Universal de la Tienda (Soporte Modo Claro y Modo Oscuro) */
            body, body.modo-oscuro, body.modo-claro, html {
                background-color: ${bgBase} !important;
                background-image: radial-gradient(ellipse at 50% -10%, rgba(${primaryRgb}, 0.2) 0%, ${bgBase} 75%) !important;
                color: ${textColor} !important;
            }

            /* Header Hero Banner Principal */
            header.gradient-bg, header.hero-banner, .gradient-bg {
                background: linear-gradient(135deg, rgba(${primaryRgb}, 0.3) 0%, ${bgBase} 100%) !important;
                border-bottom: 2px solid ${primary} !important;
            }

            /* Tarjetas de Encabezado (Hero Card) */
            .banner-card {
                background: rgba(${bgBaseRgb}, 0.85) !important;
                border: 1px solid rgba(${primaryRgb}, 0.35) !important;
                box-shadow: 0 10px 40px rgba(${primaryRgb}, 0.25) !important;
                backdrop-filter: blur(12px) !important;
                color: ${textColor} !important;
            }

            /* Títulos principales y luces ambientales */
            .logo-edark, .store-name-display {
                color: ${primary} !important;
                text-shadow: 0 0 20px rgba(${primaryRgb}, 0.5) !important;
            }
            .sub-edark, .store-slogan-display {
                color: ${secondary} !important;
            }

            /* Halos de luz ambient */
            header .rounded-circle:nth-child(1) {
                background: rgba(${primaryRgb}, 0.35) !important;
            }
            header .rounded-circle:nth-child(2) {
                background: rgba(${secondaryRgb}, 0.35) !important;
            }

            /* Tarjetas de Producto y Paneles */
            .card, .modal-content, .offcanvas, .dropdown-menu {
                background-color: ${cardBg} !important;
                border-color: rgba(${primaryRgb}, 0.25) !important;
                color: ${textColor} !important;
            }

            /* Sobrescribir Clases de Color de Bootstrap */
            .bg-primary, .bg-primary-edark { 
                background-color: ${primary} !important; 
            }
            .text-primary, .text-primary-edark { 
                color: ${primary} !important; 
            }
            .btn-primary { 
                background-color: ${primary} !important; 
                border-color: ${primary} !important; 
                color: #ffffff !important;
            }
            .btn-primary:hover, .btn-primary:focus {
                background-color: ${primary} !important;
                filter: brightness(1.15);
                box-shadow: 0 0 15px rgba(${primaryRgb}, 0.5) !important;
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

            /* Color Secundario */
            .text-success { 
                color: ${secondary} !important; 
            }
            .bg-success { 
                background-color: ${secondary} !important; 
            }
            .btn-success { 
                background-color: ${secondary} !important; 
                border-color: ${secondary} !important; 
                color: #ffffff !important;
            }
            .btn-success:hover {
                filter: brightness(1.15);
                box-shadow: 0 0 15px rgba(${secondaryRgb}, 0.5) !important;
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
        `;
    }

    // Aplicar branding en elementos HTML clave (Logos, Títulos, Frases Banner, Nosotros, Servicios)
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
        const heroTitle = document.querySelector('.hero-banner h1, header h1.display-4, .logo-edark');
        if (heroTitle && c.nombreTienda) {
            heroTitle.textContent = c.nombreTienda.toUpperCase();
        }
        const heroSub = document.querySelector('.hero-banner p, header p.lead, .sub-edark');
        if (heroSub && c.sloganTienda) {
            heroSub.textContent = c.sloganTienda;
        }

        // 5. Frases Personalizadas del Banner
        if (c.frasesBanner && window.frases) {
            const lineas = c.frasesBanner.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            if (lineas.length > 0) {
                window.frases = lineas.map(txt => ({ texto: txt, autor: c.nombreTienda }));
                if (window.mostrarFrase) window.mostrarFrase(0);
            }
        }

        // 6. Módulo Nosotros (Quiénes Somos)
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

        // 7. Módulo Servicios
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

        // 8. Módulo Blog
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

        // 9. Visibilidad y Títulos del Módulo Cotizador
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
