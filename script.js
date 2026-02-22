// --- Project Images Configuration ---
// Add, remove, or reorder images here.
const projectImages = [
    { src: "1.JPG", title: "Trockenbau" },
    { src: "2.JPG", title: "Innenausbau" },
    { src: "3.JPG", title: "Akustik" },
    { src: "4.JPG", title: "Details" },
    { src: "6th.webp", title: "Renovierung" },
    { src: "7.JPG", title: "Modernisierung" },
    { src: "9.JPG", title: "Projekt 9" },
    { src: "10.JPG", title: "Projekt 10" },
    { src: "images/11.JPG", title: "Projekt 11" },
    { src: "images/12.JPG", title: "Projekt 12" },
    { src: "images/13.JPG", title: "Projekt 13" },
    { src: "images/14.JPG", title: "Projekt 14" },
    { src: "images/15.JPG", title: "Projekt 15" },
    { src: "images/16.JPG", title: "Projekt 16" },
    { src: "images/17.JPG", title: "Projekt 17" },
    { src: "images/18.JPG", title: "Projekt 18" },
    { src: "images/19.JPG", title: "Projekt 19" },
    { src: "images/20.JPG", title: "Projekt 20" },
    { src: "images/21.JPG", title: "Projekt 21" },
    { src: "images/22.webp", title: "Projekt 22" },
    { src: "images/23.jpg", title: "Projekt 23" },
    { src: "images/24.jpg", title: "Projekt 24" },
    { src: "images/25.jpg", title: "Projekt 25" },
    { src: "images/26.jpg", title: "Projekt 26" },
    { src: "images/29.jpg", title: "Projekt 29" },
    { src: "images/30.jpg", title: "Projekt 30" },
    { src: "images/31.jpg", title: "Projekt 31" },
    { src: "images/32.jpg", title: "Projekt 32" },
    { src: "images/36.jpg", title: "Projekt 36" },
    { src: "images/38.jpg", title: "Projekt 38" },
    { src: "images/40.jpg", title: "Projekt 40" },
];

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

document.addEventListener('DOMContentLoaded', function () {
    // --- Render Projects Carousel ---
    const track = document.getElementById('carousel-track');
    if (track) {
        track.innerHTML = '';
        projectImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${image.src}" alt="${image.title}">
                <div class="slide-content">
                    <h3>${image.title}</h3>
                </div>
            `;
            track.appendChild(slide);
        });
    }

    // --- Render Google Reviews ---
    const reviewsTrack = document.getElementById('reviews-track');
    if (reviewsTrack) {
        reviewsTrack.innerHTML = '';
        googleReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <a href="${review.url}"><div class="review-header">
                    <div class="review-avatar">${review.name.charAt(0)}</div>
                    <div class="review-info">
                        <div class="review-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="google-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google">
                    </div>
                </div>
                <div class="review-stars">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
                <div class="review-text">
                    "${review.text}"
                </div></a>
            `;
            reviewsTrack.appendChild(card);
        });
    }

    // --- Carousel Logic ---
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');

    // Scroll amount based on slide width + gap
    const getScrollAmount = () => {
        if (slides.length === 0) return 300;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 20; // Matches CSS gap
        return slideWidth + gap;
    };

    if (nextButton && track) {
        nextButton.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    if (prevButton && track) {
        prevButton.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    // Add click event to all carousel images
    const projectImagesElements = document.querySelectorAll('.carousel-slide img');

    projectImagesElements.forEach(img => {
        img.addEventListener('click', function () {
            if (lightbox && lightboxImg) {
                lightbox.style.display = "block";
                lightboxImg.src = this.src;

                // Try to get title from the sibling slide-content
                const slideContent = this.nextElementSibling;
                if (slideContent) {
                    const title = slideContent.querySelector('h3').innerText;
                    if (captionText) captionText.innerHTML = title;
                }
            }
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });
    }

    // Close when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            if (header) header.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('nav a').forEach(n => n.addEventListener('click', (e) => {
            // Wenn man auf den Dropdown-Header ("Über uns") klickt...
            if (n.parentElement.classList.contains('dropdown') && n.getAttribute('href') === '#about') {
                // ...und das Dropdown NOCH NICHT offen ist, öffne es (und navigiere NICHT)
                if (!n.parentElement.classList.contains('active')) {
                    e.preventDefault();
                    n.parentElement.classList.add('active');
                    return;
                }
                // ...ist es BEREITS offen, wird das Menü ganz normal geschlossen und zu #about navigiert
            }

            // Bei allen anderen Links (oder wenn Dropdown schon offen war): Menü schließen
            mobileMenu.classList.remove('is-active');
            navMenu.classList.remove('active');
            if (header) header.classList.remove('menu-open');

            // Auch alle offene Dropdowns schließen
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }));
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox && lightbox.style.display === "block") {
            lightbox.style.display = "none";
        }
    });

});
