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
        colorCardBg: '#141c2e',
        modoPredeterminado: 'oscuro',
        frasesBanner: 'La excelencia está en los detalles\nEnvíos rápidos y seguros a todo el país\nAtención personalizada los 7 días de la semana',
        cotizadorHabilitado: true,
        cotizadorTitulo: 'Cotizador Personalizado',
        cotizadorSubtitulo: 'Arma tu pedido ideal a la medida',
        nosotrosHabilitado: true,
        nosotrosTitulo: 'Quiénes Somos',
        nosotrosTexto: 'Somos una empresa dedicada a ofrecer productos y servicios de alta calidad, diseñados a la medida de nuestros clientes.',
        nosotrosMision: 'Ofrecer productos y servicios de excelencia que mejoren la vida de nuestros clientes.',
        nosotrosVision: 'Ser líderes referentes en soluciones inteligentes e innovadoras en el mercado.',
        serviciosHabilitado: true,
        serviciosTitulo: 'Nuestros Servicios',
        serviciosSubtitulo: 'Soluciones integrales diseñadas para potenciar tu experiencia.',
        blogHabilitado: true,
        facebookUrl: '',
        instagramUrl: '',
        tiktokUrl: '',
        copyrightText: 'Desarrollado por Corporación Syverluma S.A.C. — Todos los derechos reservados.',
        ogTitle: '',
        ogDescription: '',
        ogImage: ''
    };

    function hexToRgb(hex) {
        let c = (hex || '#2563eb').replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    }

    // Inyectar variables CSS universales para armonizar el 100% de la tienda en TODAS las páginas
    function aplicarEstilosTema(config) {
        const root = document.documentElement;
        const primary = config.colorPrimary || THEME_DEFAULTS.colorPrimary;
        const secondary = config.colorSecondary || THEME_DEFAULTS.colorSecondary;
        const modo = config.modoPredeterminado || 'oscuro';
        const esModoClaro = (modo === 'claro');

        // Garantizar coherencia tonal entre el fondo general y las superficies de tarjetas
        let darkBg = config.colorDarkBg;
        if (!darkBg || darkBg === '#000000') {
            darkBg = esModoClaro ? '#f8fafc' : '#0b0f19';
        }

        let cardBg = config.colorCardBg;
        if (!cardBg || (cardBg === '#ffffff' && !esModoClaro)) {
            cardBg = esModoClaro ? '#ffffff' : '#141c2e';
        }

        const primaryRgb = hexToRgb(primary);
        const secondaryRgb = hexToRgb(secondary);
        const bgRgb = hexToRgb(darkBg);
        const cardBgRgb = hexToRgb(cardBg);

        const textColor = esModoClaro ? '#0f172a' : '#f8fafc';
        const textMutedColor = esModoClaro ? '#64748b' : '#94a3b8';

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
                --bg-dark-custom: ${darkBg} !important;
            }
            
            /* 1. Fondo Universal Unificado (Sin bloques blancos ni franjas de color desentonado) */
            body, body.modo-oscuro, body.modo-claro, html, section, .py-5, #seccionCatalogo, #servicios-marquee, .contact-section, .nosotros-section, .blog-section, main, .article-main {
                background-color: ${darkBg} !important;
                background: ${darkBg} !important;
                color: ${textColor} !important;
            }

            /* 2. Encabezado Hero Minimalista (Sin negro duro, integrado al tema) */
            header, header.gradient-bg, header.hero-banner, .gradient-bg, .blog-hero, .post-hero {
                background: linear-gradient(180deg, rgba(${primaryRgb}, 0.12) 0%, ${darkBg} 100%) !important;
                border-bottom: 1px solid rgba(${primaryRgb}, 0.15) !important;
            }

            /* 3. Tarjetas, Paneles, Filtros, Formulario de Contacto (Derivados de cardBg) */
            .card,
            .filter-card-modern,
            .control-bar-modern,
            .product-card-premium,
            .banner-card,
            .accordion-item,
            .accordion-body,
            .modal-content,
            .offcanvas,
            .dropdown-menu,
            .contact-section .card,
            .contact-card,
            .bg-white,
            .bg-light,
            .live-search-dropdown {
                background-color: ${cardBg} !important;
                background: ${cardBg} !important;
                border: 1px solid rgba(${primaryRgb}, 0.18) !important;
                color: ${textColor} !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
            }

            /* Acordeones de Filtros */
            .accordion-button,
            .filter-card-modern .accordion-button {
                background-color: ${cardBg} !important;
                color: ${textColor} !important;
                border-bottom: 1px solid rgba(${primaryRgb}, 0.12) !important;
            }

            .accordion-button:not(.collapsed),
            .filter-card-modern .accordion-button:not(.collapsed) {
                background-color: rgba(${primaryRgb}, 0.12) !important;
                color: ${primary} !important;
                box-shadow: none !important;
            }

            /* 4. Buscador, Inputs, Selects */
            .form-control,
            .form-select,
            .input-group,
            .control-bar-modern input,
            .control-bar-modern select,
            .product-card-premium .product-img-wrapper,
            #buscarProductoInput,
            #ordenarSelect {
                background-color: rgba(${primaryRgb}, 0.06) !important;
                background: rgba(${primaryRgb}, 0.06) !important;
                border-color: rgba(${primaryRgb}, 0.25) !important;
                color: ${textColor} !important;
            }

            .form-control:focus, .form-select:focus {
                background-color: rgba(${primaryRgb}, 0.1) !important;
                border-color: ${primary} !important;
                color: ${textColor} !important;
                box-shadow: 0 0 10px rgba(${primaryRgb}, 0.25) !important;
            }

            /* 5. Títulos y Textos Armoniosos */
            h1, h2, h3, h4, h5, h6, .display-4, .display-6, .section-title, .lead, .text-dark {
                color: ${textColor} !important;
            }
            .text-muted {
                color: ${textMutedColor} !important;
            }
            .text-info {
                color: ${secondary} !important;
            }

            .logo-edark, .store-name-display {
                color: ${primary} !important;
                text-shadow: 0 0 15px rgba(${primaryRgb}, 0.3) !important;
            }
            .sub-edark, .store-slogan-display {
                color: ${secondary} !important;
            }

            /* Halos de luz ambient */
            header .rounded-circle:nth-child(1) {
                background: rgba(${primaryRgb}, 0.25) !important;
            }
            header .rounded-circle:nth-child(2) {
                background: rgba(${secondaryRgb}, 0.25) !important;
            }

            /* 6. Navbar Glass Flotante (Limpio y Compatible con Bootstrap) */
            #navbar {
                position: relative;
                z-index: 1050;
            }

            .glass-navbar, #mainNavbar {
                position: fixed !important;
                top: 12px !important;
                left: 16px !important;
                right: 16px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                width: auto !important;
                max-width: 1400px !important;
                background-color: rgba(${cardBgRgb}, 0.94) !important;
                backdrop-filter: blur(16px) !important;
                border-bottom: 1px solid rgba(${primaryRgb}, 0.2) !important;
                color: ${textColor} !important;
                z-index: 1050 !important;
                pointer-events: auto !important;
            }

            #mainNavbar .nav-link, 
            #mainNavbar a, 
            #mainNavbar button, 
            .glass-navbar .nav-link, 
            .glass-navbar a,
            .navbar-toggler,
            .navbar-brand {
                position: relative !important;
                z-index: 2147483647 !important;
                pointer-events: auto !important;
                cursor: pointer !important;
            }

            .glass-navbar::before,
            .glass-navbar::after {
                pointer-events: none !important;
                z-index: -1 !important;
            }

            /* 7. Footer Armonizado */
            footer, footer.bg-dark, .py-5.bg-dark, #footer-container {
                background-color: ${darkBg} !important;
                background: ${darkBg} !important;
                border-top: 1px solid rgba(${primaryRgb}, 0.2) !important;
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
                filter: brightness(1.12);
                box-shadow: 0 0 12px rgba(${primaryRgb}, 0.4) !important;
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
                filter: brightness(1.12);
                box-shadow: 0 0 12px rgba(${secondaryRgb}, 0.4) !important;
            }
            .badge.bg-success { 
                background-color: ${secondary} !important; 
            }

            #mainNavbar a.nav-link:hover,
            #mainNavbar a.nav-link.active,
            .glass-navbar a.nav-link:hover,
            .glass-navbar a.nav-link.active {
                color: ${primary} !important;
            }
        `;
    }

    // Cargar Servicios creados dinámicamente en Firestore en el Menú y Footer
    async function cargarServiciosDinamicosMenu(c) {
        if (c.serviciosHabilitado === false) return;
        if (typeof firebase === 'undefined' || !firebase.firestore) return;
        try {
            const snap = await firebase.firestore().collection('servicios').where('activo', '==', true).get();
            if (snap.empty) return;

            const dropdown = document.querySelector('.nav-item-servicios .dropdown-menu');
            const footerLista = document.querySelector('.footer-servicios-lista');

            let dropHtml = '';
            let footHtml = '';

            snap.forEach(doc => {
                const s = doc.data();
                const id = doc.id;
                const icono = s.icono || 'bi-briefcase';
                dropHtml += `<li><a class="dropdown-item rounded-3 py-2 fw-medium" href="servicio.html?id=${id}"><i class="bi ${icono} text-primary me-2"></i>${s.titulo}</a></li>`;
                footHtml += `<li><a href="servicio.html?id=${id}" class="text-white text-decoration-none">${s.titulo}</a></li>`;
            });

            if (c.cotizadorHabilitado !== false) {
                const cotTitle = c.cotizadorTitulo || 'Cotizador Personalizado';
                dropHtml += `<li><hr class="dropdown-divider"></li><li><a class="dropdown-item rounded-3 py-2 fw-medium nav-link-cotizador cotizador-nav-title" href="pc-personalizada.html"><i class="bi bi-sliders text-warning me-2"></i>${cotTitle}</a></li>`;
            }

            if (dropdown) dropdown.innerHTML = dropHtml;
            if (footerLista) footerLista.innerHTML = footHtml;
        } catch (e) {
            console.warn('[Tema] No se pudieron cargar los servicios dinámicos:', e);
        }
    }

    // Aplicar branding en elementos HTML clave (Logos, Títulos, Frases Banner, Nosotros, Servicios, Footer, Meta OG)
    function aplicarBrandingElementos(config) {
        const c = Object.assign({}, THEME_DEFAULTS, config || {});

        // 1. Título del Documento y Meta Tags para Redes Sociales / WhatsApp
        const ogTitleText = c.ogTitle || c.nombreTienda || 'Syverluma Store';
        const ogDescText = c.ogDescription || c.sloganTienda || 'Tu plataforma de comercio electrónico a la medida.';
        const ogImgUrl = c.ogImage || c.logoPrincipalUrl || c.logoIsotipoUrl || 'img/Logo/logo_2.png';

        if (c.nombreTienda && !document.title.includes(c.nombreTienda)) {
            const pagePrefix = document.title.split('-')[0] ? document.title.split('-')[0].trim() : '';
            document.title = pagePrefix ? `${pagePrefix} - ${c.nombreTienda}` : ogTitleText;
        }

        const setMetaTag = (attrName, attrVal, contentVal) => {
            if (!contentVal) return;
            let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attrName, attrVal);
                document.head.appendChild(el);
            }
            el.setAttribute('content', contentVal);
        };

        setMetaTag('property', 'og:title', ogTitleText);
        setMetaTag('property', 'og:description', ogDescText);
        setMetaTag('property', 'og:image', ogImgUrl);
        setMetaTag('name', 'twitter:title', ogTitleText);
        setMetaTag('name', 'twitter:description', ogDescText);
        setMetaTag('name', 'twitter:image', ogImgUrl);
        setMetaTag('name', 'description', ogDescText);

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
        if (c.frasesBanner) {
            const lineas = c.frasesBanner.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            if (lineas.length > 0) {
                const list = lineas.map(txt => ({ texto: txt, autor: c.nombreTienda }));
                window.frases = list;
                if (typeof window.actualizarFrasesBanner === 'function') {
                    window.actualizarFrasesBanner(list);
                } else if (typeof window.mostrarFrase === 'function') {
                    window.mostrarFrase(0);
                }
            }
        }

        // 6. Módulo Nosotros (Quiénes Somos)
        const nosotrosSection = document.getElementById('seccion-nosotros') || document.querySelector('.nosotros-section');
        const nosotrosNavLinks = document.querySelectorAll('.nav-item-nosotros, a[href*="nosotros"]');
        nosotrosNavLinks.forEach(link => {
            const target = (link.tagName === 'LI') ? link : (link.parentElement && link.parentElement.tagName === 'LI' ? link.parentElement : link);
            if (c.nosotrosHabilitado === false) {
                target.style.display = 'none';
            } else {
                target.style.display = '';
            }
        });

        if (nosotrosSection) {
            if (c.nosotrosHabilitado === false) {
                nosotrosSection.style.display = 'none';
            } else {
                nosotrosSection.style.display = '';
                const titleEl = nosotrosSection.querySelector('h2, h3, .nosotros-titulo');
                if (titleEl && c.nosotrosTitulo) titleEl.textContent = c.nosotrosTitulo;
                const textEl = nosotrosSection.querySelector('.nosotros-texto');
                if (textEl && c.nosotrosTexto) textEl.innerHTML = c.nosotrosTexto;

                // Misión y Visión
                document.querySelectorAll('h3').forEach(h3 => {
                    if (h3.textContent.includes('Visión') && h3.nextElementSibling && c.nosotrosVision) {
                        h3.nextElementSibling.textContent = c.nosotrosVision;
                    }
                    if (h3.textContent.includes('Misión') && h3.nextElementSibling && c.nosotrosMision) {
                        h3.nextElementSibling.textContent = c.nosotrosMision;
                    }
                });
            }
        }

        // 7. Módulo Servicios (Ocultar/Mostrar Navbar y Marquee)
        const serviciosNavItems = document.querySelectorAll('.nav-item-servicios, a[href*="consultoria"], a[href*="soporte"], a[href*="servicios"]');
        serviciosNavItems.forEach(item => {
            const target = (item.tagName === 'LI' || item.classList.contains('nav-item-servicios')) ? item : (item.parentElement && item.parentElement.tagName === 'LI' ? item.parentElement : item);
            if (c.serviciosHabilitado === false) {
                target.style.setProperty('display', 'none', 'important');
            } else {
                target.style.display = '';
            }
        });

        // Cargar servicios dinámicos desde Firestore si existen
        cargarServiciosDinamicosMenu(c);

        // 8. Módulo Blog
        const blogNavItems = document.querySelectorAll('.nav-item-blog, a[href*="blog"]');
        blogNavItems.forEach(item => {
            const target = (item.tagName === 'LI' || item.classList.contains('nav-item-blog')) ? item : (item.parentElement && item.parentElement.tagName === 'LI' ? item.parentElement : item);
            if (c.blogHabilitado === false) {
                target.style.setProperty('display', 'none', 'important');
            } else {
                target.style.display = '';
            }
        });

        // 9. Visibilidad y Títulos del Módulo Cotizador
        const cotizadorNavLinks = document.querySelectorAll('.nav-link-cotizador, a[href*="pc-personalizada"]');
        cotizadorNavLinks.forEach(link => {
            const target = (link.tagName === 'LI') ? link : (link.parentElement && link.parentElement.tagName === 'LI' ? link.parentElement : link);
            if (c.cotizadorHabilitado === false) {
                target.style.setProperty('display', 'none', 'important');
            } else {
                target.style.display = '';
                if (c.cotizadorTitulo && link.classList.contains('cotizador-nav-title')) {
                    link.innerHTML = `<i class="bi bi-sliders me-1"></i> ${c.cotizadorTitulo}`;
                }
            }
        });

        // 10. Datos de Contacto y Redes Sociales en Footer
        document.querySelectorAll('.footer-email').forEach(el => {
            if (c.emailContacto) {
                el.textContent = c.emailContacto;
                el.href = `mailto:${c.emailContacto}`;
            }
        });
        document.querySelectorAll('.footer-phone').forEach(el => {
            if (c.telefonoWhatsapp) {
                el.textContent = `+${c.telefonoWhatsapp}`;
                el.href = `tel:+${c.telefonoWhatsapp}`;
            }
        });
        document.querySelectorAll('.footer-address').forEach(el => {
            if (c.direccionFisica) el.textContent = c.direccionFisica;
        });

        // Redes sociales
        const fbBtn = document.querySelector('.footer-fb-link');
        if (fbBtn) {
            if (c.facebookUrl) { fbBtn.href = c.facebookUrl; fbBtn.style.display = ''; }
            else { fbBtn.style.display = 'none'; }
        }
        const igBtn = document.querySelector('.footer-ig-link');
        if (igBtn) {
            if (c.instagramUrl) { igBtn.href = c.instagramUrl; igBtn.style.display = ''; }
            else { igBtn.style.display = 'none'; }
        }
        const tkBtn = document.querySelector('.footer-tk-link');
        if (tkBtn) {
            if (c.tiktokUrl) { tkBtn.href = c.tiktokUrl; tkBtn.style.display = ''; }
            else { tkBtn.style.display = 'none'; }
        }
        const waBtn = document.querySelector('.footer-wa-link');
        if (waBtn) {
            if (c.telefonoWhatsapp) { waBtn.href = `https://wa.me/${c.telefonoWhatsapp}`; waBtn.style.display = ''; }
        }

        // Copyright en Footer
        const copyEl = document.querySelector('.footer-copyright');
        if (copyEl && c.copyrightText) {
            copyEl.innerHTML = `&copy; ${new Date().getFullYear()} ${c.copyrightText}`;
        }
    }

    // Método principal para cargar configuración de Firestore e inicializar el tema (con Caché Inmediato Local)
    async function inicializarTemaDinamico() {
        let config = null;

        // 1. Intentar leer del Caché Local Inmediato (0ms para evitar FOUC y estilos antiguos al recargar)
        try {
            const cachedStr = localStorage.getItem('syverluma_theme_config');
            if (cachedStr) {
                config = JSON.parse(cachedStr);
                aplicarEstilosTema(config);
                aplicarBrandingElementos(config);
            }
        } catch (e) {}

        // 2. Consultar Firestore para obtener la configuración más reciente
        if (window.configGeneral) {
            config = window.configGeneral;
        } else if (typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                const snap = await firebase.firestore().collection('config').doc('general').get();
                if (snap.exists) {
                    config = snap.data();
                    window.configGeneral = config;
                    try {
                        localStorage.setItem('syverluma_theme_config', JSON.stringify(config));
                    } catch(e) {}
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

    // Auto-inicializar cuando el DOM esté listo o inmediatamente si ya cargó
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarTemaDinamico);
    } else {
        inicializarTemaDinamico();
    }

    window.inicializarTemaDinamico = inicializarTemaDinamico;
})();
