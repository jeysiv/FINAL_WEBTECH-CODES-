// ─── NAV PILL ─────────────────────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav ul li a');
const pill = document.querySelector('.nav-pill');
const nav = document.querySelector('.nav');

function movePill(link) {
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    pill.style.left = (linkRect.left - navRect.left) + 'px';
    pill.style.width = linkRect.width + 'px';
}

const activeLink = document.querySelector('.nav ul li a.active');
if (activeLink) movePill(activeLink);

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        movePill(this);
    });
});


// ─── HOME LINK — smooth scroll to top ────────────────────────────────────────
document.querySelectorAll('a[href="#HOME"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


// ─── PARALLAX TILT ───────────────────────────────────────────────────────────
const floatingObjects = document.querySelector('.floating_objects');
const heroSection = document.querySelector('.hero-section');

heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const strength = 15;
    const rotateY = (x - centerX) / strength;
    const rotateX = -(y - centerY) / strength;
    floatingObjects.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

heroSection.addEventListener('mouseleave', () => {
    floatingObjects.style.transform = `rotateX(0deg) rotateY(0deg)`;
});


// ─── SCROLL — hero shrink + header expand + nav spy (all in one) ──────────────
const hero = document.querySelector('.hero-section');
const game = document.querySelector('.game');
const header = document.querySelector('.header');

const sections = [
    document.getElementById("HOME"),
    document.getElementById("GAME"),
    document.getElementById("GALLERY"),
    document.getElementById("TEAM")
].filter(Boolean);

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    // Hero shrink + fade
    const progress = Math.min(scrollY / heroHeight, 1);
    const scale = 1 - (progress * 0.12);
    const opacity = 1 - progress * 1.5;
    hero.style.transform = `translateY(0) scale(${scale})`;
    hero.style.opacity = opacity;

    // Header expand
    const gameTop = game.getBoundingClientRect().top;
    header.classList.toggle('expanded', gameTop <= 70);

    // Active nav link — HOME resets when near top
    let current = scrollY < heroHeight * 0.5 ? "HOME" : "HOME";

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight * 0.4) {
            current = section.id;
        }
    });

    // HOME snaps back when scrolled to very top
    if (scrollY < 50) current = "HOME";

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            movePill(link);
        }
    });
});

// ─── PLAY BUTTON — smooth scroll to game ─────────────────────────────────────
document.querySelector('.play-button a').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('GAME').scrollIntoView({ behavior: 'smooth' });
});


// ─── GAME SECTION TABS ────────────────────────────────────────────────────────
const navGameLinks = document.querySelectorAll('.nav-game ul li a');

navGameLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navGameLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(panel => panel.classList.remove('active'));
        link.classList.add('active');
        document.getElementById(link.getAttribute('data-tab')).classList.add('active');
    });
});


// ─── TEAM SECTION TABS ────────────────────────────────────────────────────────
const navTeamLinks = document.querySelectorAll('.nav-team ul li a');

navTeamLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navTeamLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.team-tab').forEach(panel => panel.classList.remove('active'));
        link.classList.add('active');
        document.getElementById(link.getAttribute('data-tab')).classList.add('active');
    });
});


// ─── DEV CARD ACCORDION ───────────────────────────────────────────────────────
function toggleDevCard(id) {
    const card = document.getElementById(id);
    const isOpen = card.classList.contains('open');

    document.querySelectorAll('.dev-card').forEach(c => {
        c.classList.remove('open');
        c.querySelectorAll('.skill-bar-fill').forEach(bar => bar.style.width = '0%');
    });

    if (!isOpen) {
        card.classList.add('open');
        setTimeout(() => {
            card.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 50);
    }
}


// ─── CAROUSEL ─────────────────────────────────────────────────────────────────
let index = 0;

function moveSlide(direction) {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const total = cards.length;

    index = Math.max(0, Math.min(index + direction, total - 1));
    track.style.transform = `translateX(${-index * 300}px)`;

    document.querySelector('.carousel-btn.left').style.visibility = index === 0 ? 'hidden' : 'visible';
    document.querySelector('.carousel-btn.right').style.visibility = index === total - 1 ? 'hidden' : 'visible';
}

moveSlide(0);


// ─── GALLERY INFINITE SCROLL — pause on hover ────────────────────────────────
document.querySelectorAll('.scroll-row').forEach(row => {
    const track = row.querySelector('.track');
    row.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    row.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});