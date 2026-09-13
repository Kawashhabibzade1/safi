// ============================================================
//  SAFI AKUSTIK & TROCKENBAU — Script
//  Effects: scroll-reveal, counter, parallax, typewriter,
//           particle dust, card tilt, header shrink, cursor glow
// ============================================================

// --- Project Images Configuration ---
const DEFAULT_PROJECT_IMAGES = [
    { src: "1.JPG",  title: "Trockenbau & Wandverkleidung" },
    { src: "2.JPG",  title: "Innenausbau & Deckensysteme" },
    { src: "3.JPG",  title: "Akustikdecken Montage" },
    { src: "4.JPG",  title: "Präzise Detailarbeit" },
    { src: "5.JPG",  title: "Bodenverlegung & Ausbau" },
    { src: "6th.webp", title: "Komplettrenovierung" },
    { src: "7.JPG",  title: "Modernisierung & Raumgestaltung" },
    { src: "8.JPG",  title: "Leichtbauwände & Isolation" },
    { src: "9.JPG",  title: "Zargen- & Türeinbau" }
];

let currentGalleryImages = DEFAULT_PROJECT_IMAGES;

async function loadGalleryData() {
    try {
        const res = await fetch('gallery.json?t=' + Date.now());
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                currentGalleryImages = data;
                try {
                    localStorage.setItem('safi_gallery_images', JSON.stringify(data));
                } catch(e) {}
                return data;
            }
        }
    } catch(e) {
        // Use local fallback
    }
    return getProjectImages();
}

function getProjectImages() {
    try {
        const stored = localStorage.getItem('safi_gallery_images');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch(e) {
        console.warn('Fehler beim Laden der Galerie:', e);
    }
    return currentGalleryImages || DEFAULT_PROJECT_IMAGES;
}

// Make accessible globally
window.safiGetProjectImages = getProjectImages;
window.safiLoadGalleryData = loadGalleryData;
window.safiDefaultImages = DEFAULT_PROJECT_IMAGES;

// --- Google Reviews Configuration ---
const googleReviews = [
    {
        name: "Evelyn Williams",
        date: "vor 5 Monaten",
        rating: 5,
        text: "Sehr gute, professionelle und schnelle Erledigung der Arbeiten. Wir sind sehr zufrieden. Außerdem hat Herr Nazari sehr gute Umgangsformen und ist zuverlässig!!",
        url: "https://share.google/pBkHGIoJLDv3Db0xM"
    },
    {
        name: "Jan-Peter Thielmann",
        date: "vor 8 Monaten",
        rating: 5,
        text: "Safi Akustik- und Trockenbau hat sehr gute Arbeit geleistet und ich habe noch einiges lernen können. Mit Geduld und Ruhe hat er unsere Wünsche und Ideen umgesetzt und uns bestens beraten. Nur zu empfehlen.",
        url: "https://share.google/ORIn6RudQ8TrkfhdB"
    },
    {
        name: "Sven Alber",
        date: "vor 8 Monaten",
        rating: 5,
        text: "Sehr gute Arbeit, selbstständig, sauber mit allem sehr zufrieden. Wer Fragen hat oder sich seine Arbeit anschauen möchte jederzeit gerne melden.",
        url: "https://share.google/uuiW9Jk407JeY8R6D"
    },
    {
        name: "Matein Safdari",
        date: "vor 11 Monaten",
        rating: 5,
        text: "Top Arbeit! Die neue Decke sieht klasse aus der Trockenbauer war super freundlich und pünktlich. Kann ich nur empfehlen!",
        url: "https://share.google/bBegqWwzvpvEN7p6Q"
    },
    {
        name: "Stefan Thielmann",
        date: "vor einem Jahr",
        rating: 5,
        text: "Super Arbeit, sehr freundlich und kompetent... absolut zu empfehlen.",
        url: "https://share.google/MuFf23Gijcar39oir"
    }
];

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

    // ── 1. RENDER CAROUSEL & LIGHTBOX ──────────────────────
    const track = document.getElementById('carousel-track');
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn    = document.querySelector('.close');

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderCarousel() {
        if (!track) return;
        track.innerHTML = '';
        const currentImages = getProjectImages();
        currentImages.forEach((image, index) => {
            const safeTitle = escapeHtml(image.title || 'Projekt ' + (index + 1));
            const safeSrc = encodeURI(image.src || '');

            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${safeSrc}" alt="${safeTitle}" loading="lazy">
                <div class="slide-content">
                    <h3>${safeTitle}</h3>
                </div>
            `;
            track.appendChild(slide);

            const img = slide.querySelector('img');
            img.addEventListener('click', function () {
                if (lightbox && lightboxImg) {
                    lightbox.style.display = 'block';
                    lightboxImg.src = safeSrc;
                    if (captionText) {
                        captionText.textContent = image.title || '';
                    }
                }
            });
        });
    }

    renderCarousel();
    loadGalleryData().then(() => {
        renderCarousel();
    });

    // Listen for gallery updates from login/admin page
    window.addEventListener('storage', function (e) {
        if (e.key === 'safi_gallery_images') {
            renderCarousel();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', () => { if (lightbox) lightbox.style.display = 'none'; });
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) lightbox.style.display = 'none';
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.style.display === 'block') {
            lightbox.style.display = 'none';
        }
    });

    // ── 2. CAROUSEL NAVIGATION ──────────────────────────────
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');

    const getScrollAmount = () => {
        const firstSlide = track?.querySelector('.carousel-slide');
        if (!firstSlide) return 300;
        return firstSlide.getBoundingClientRect().width + 16;
    };

    if (nextButton && track) {
        nextButton.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }
    if (prevButton && track) {
        prevButton.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // ── 3. RENDER REVIEWS ───────────────────────────────────
    const reviewsTrack = document.getElementById('reviews-track');
    if (reviewsTrack) {
        reviewsTrack.innerHTML = '';
        googleReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card reveal';
            card.innerHTML = `
                <a href="${review.url}" target="_blank" rel="noopener noreferrer">
                <div class="review-header">
                    <div class="review-avatar">${review.name.charAt(0)}</div>
                    <div class="review-info">
                        <div class="review-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="google-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google">
                    </div>
                </div>
                <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="review-text">"${review.text}"</div>
                </a>
            `;
            reviewsTrack.appendChild(card);
        });
    }

    // ── 5. MOBILE MENU ──────────────────────────────────────
    const mobileMenu = document.querySelector('.menu-toggle');
    const navMenu    = document.querySelector('nav ul');
    const headerEl   = document.querySelector('header');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            if (headerEl) headerEl.classList.toggle('menu-open');
        });

        document.querySelectorAll('nav a').forEach(n => n.addEventListener('click', (e) => {
            if (n.parentElement.classList.contains('dropdown') && n.getAttribute('href') === '#about') {
                if (!n.parentElement.classList.contains('active')) {
                    e.preventDefault();
                    n.parentElement.classList.add('active');
                    return;
                }
            }
            mobileMenu.classList.remove('is-active');
            navMenu.classList.remove('active');
            if (headerEl) headerEl.classList.remove('menu-open');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }));

        // Close mobile dropdown when tapping anywhere outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                if (headerEl) headerEl.classList.remove('menu-open');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });
    }

    // ── 6. HEADER SHRINK ON SCROLL ──────────────────────────
    window.addEventListener('scroll', () => {
        if (headerEl) {
            headerEl.classList.toggle('scrolled', window.scrollY > 60);
        }
    }, { passive: true });

    // ── 7. SCROLL-REVEAL (Intersection Observer) ────────────
    // Mark elements with class "reveal" or "reveal-left" / "reveal-right"
    const revealEls = document.querySelectorAll(
        '.service-card, .feature-item, .review-card, .logo-card, ' +
        '.about-content, .contact-info, form, .mini-services .service-item, ' +
        '.hero-stat, .section-title, #profil .description, #profil h2'
    );

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${(i % 6) * 80}ms`);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── 8. COUNTER ANIMATION for hero stats ─────────────────
    function animateCounter(el) {
        const text   = el.textContent.trim();
        const suffix = text.replace(/[\d.]/g, '');   // e.g. '+', '%', '★'
        const raw    = parseFloat(text);
        if (isNaN(raw)) return;

        const duration = 1800;
        const start    = performance.now();

        function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased    = 1 - Math.pow(1 - progress, 3);
            const value    = Math.round(raw * eased);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.hero-stat-num').forEach(animateCounter);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    // ── 9. PARALLAX on HERO background ──────────────────────
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight * 1.5) {
                heroSection.style.backgroundPositionY = `calc(50% + ${scrollY * 0.35}px)`;
            }
        }, { passive: true });
    }

    // ── 10. TYPEWRITER on hero h1 ────────────────────────────
    const heroH1 = document.querySelector('#hero h1');
    if (heroH1) {
        // Store full HTML, then animate text nodes only
        const lines = [
            'Wir bauen Räume,',
            'die begeistern.'
        ];
        heroH1.innerHTML = '';

        let lineIdx = 0, charIdx = 0;
        let currentEl = null;

        function typeLine() {
            if (lineIdx >= lines.length) return;

            if (charIdx === 0) {
                if (lineIdx === 0) {
                    currentEl = document.createTextNode('');
                    heroH1.appendChild(currentEl);
                } else {
                    heroH1.appendChild(document.createElement('br'));
                    const span = document.createElement('span');
                    heroH1.appendChild(span);
                    currentEl = span;
                    // span is the gold word
                }
            }

            const line = lines[lineIdx];
            if (charIdx < line.length) {
                if (currentEl.nodeType === Node.TEXT_NODE) {
                    currentEl.textContent += line[charIdx];
                } else {
                    currentEl.textContent += line[charIdx];
                }
                charIdx++;
                setTimeout(typeLine, 45);
            } else {
                lineIdx++;
                charIdx = 0;
                setTimeout(typeLine, 180);
            }
        }
        // slight delay so page paints first
        setTimeout(typeLine, 600);
    }

    // ── 11. PARTICLE DUST on HERO ────────────────────────────
    const heroContainer = document.querySelector('#hero .container');
    if (heroContainer) {
        const canvas = document.createElement('canvas');
        canvas.id = 'hero-particles';
        canvas.style.cssText = `
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        if (heroSection) heroSection.style.position = 'relative';
        heroSection.insertBefore(canvas, heroSection.firstChild);

        const ctx = canvas.getContext('2d');
        const GOLD = [245, 197, 24];
        let W, H, particles = [];

        function resize() {
            W = canvas.width  = heroSection.offsetWidth;
            H = canvas.height = heroSection.offsetHeight;
        }

        function createParticle() {
            return {
                x:     Math.random() * W,
                y:     Math.random() * H,
                r:     Math.random() * 2 + 0.5,
                vx:    (Math.random() - 0.5) * 0.4,
                vy:    -Math.random() * 0.6 - 0.2,
                alpha: Math.random() * 0.5 + 0.1,
                life:  0,
                maxLife: Math.random() * 200 + 100
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 60; i++) {
                const p = createParticle();
                p.life = Math.random() * p.maxLife; // stagger
                particles.push(p);
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;

                const t = p.life / p.maxLife;
                const a = t < 0.3 ? t / 0.3 : t > 0.7 ? (1 - t) / 0.3 : 1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${p.alpha * a})`;
                ctx.fill();

                if (p.life >= p.maxLife) {
                    particles[idx] = createParticle();
                    particles[idx].life = 0;
                }
            });
            requestAnimationFrame(drawParticles);
        }

        resize();
        initParticles();
        drawParticles();
        window.addEventListener('resize', () => { resize(); initParticles(); }, { passive: true });
    }

    // ── 12. CARD TILT effect on service cards ────────────────
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const x      = e.clientX - rect.left - rect.width  / 2;
            const y      = e.clientY - rect.top  - rect.height / 2;
            const tiltX  = -(y / (rect.height / 2)) * 5;
            const tiltY  =  (x / (rect.width  / 2)) * 5;
            card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });

    // ── 13. CURSOR GLOW (desktop only) ───────────────────────
    if (window.matchMedia('(pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.id = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px; height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            top: 0; left: 0;
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top  = e.clientY + 'px';
        }, { passive: true });

        // Hide glow when mouse leaves window
        document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
    }

    // ── 14. SMOOTH SECTION HIGHLIGHT (active nav) ────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('nav a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'nav-active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    // ── 15. RIPPLE effect on buttons ─────────────────────────
    document.querySelectorAll('.btn-elegant, .btn-new-primary').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function (e) {
            const rect   = this.getBoundingClientRect();
            const x      = e.clientX - rect.left;
            const y      = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                width: 4px; height: 4px;
                background: rgba(0,0,0,0.3);
                transform: scale(0);
                animation: ripple-anim 0.6s linear;
                left: ${x}px; top: ${y}px;
                pointer-events: none;
            `;
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // Inject ripple keyframe if not already present
    if (!document.getElementById('ripple-style')) {
        const s = document.createElement('style');
        s.id = 'ripple-style';
        s.textContent = `
            @keyframes ripple-anim {
                to { transform: scale(120); opacity: 0; }
            }
            /* Scroll reveal base state */
            .reveal {
                opacity: 0;
                transform: translateY(28px);
                transition: opacity 0.65s ease var(--reveal-delay, 0ms),
                            transform 0.65s ease var(--reveal-delay, 0ms);
            }
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            /* Active nav link gold underline */
            nav a.nav-active {
                color: #C89600 !important;
            }
            nav a.nav-active::after {
                width: 100% !important;
                background: #C89600 !important;
            }
            /* Glowing gold shadow on review card hover */
            .review-card:hover {
                box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 0 16px rgba(245,197,24,0.25) !important;
            }
            /* Feature item entrance */
            .feature-item.revealed {
                transform: translateY(0) scale(1) !important;
            }
            .feature-item {
                transform: translateY(28px) scale(0.97);
            }
            /* Pulse glow on WhatsApp button */
            .whatsapp-float {
                will-change: box-shadow;
            }
        `;
        document.head.appendChild(s);
    }

}); // end DOMContentLoaded
