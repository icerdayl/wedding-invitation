
/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');

hamburger.addEventListener('click', () => {
    const open = navDrawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
});

// Close drawer on link click
navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navDrawer.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

/* ── Audio ── */
const songEl = document.getElementById('song');
function tryPlay() {
    if (!songEl) return;
    songEl.muted = false;
    songEl.volume = 0.05;
    songEl.play().catch(() => {});
}
window.addEventListener('load', tryPlay);
document.addEventListener('click', tryPlay, { once: true });

/* ── Countdown ── */
const target = new Date('Aug 30, 2026 15:00:00').getTime();
function tick() {
    const now = Date.now();
    const dist = target - now;
    if (dist < 0) {
        document.getElementById('cd-d').textContent = '0';
        document.getElementById('cd-h').textContent = '0';
        document.getElementById('cd-m').textContent = '0';
        document.getElementById('cd-s').textContent = '0';
        return;
    }
    document.getElementById('cd-d').textContent = Math.floor(dist / 86400000);
    document.getElementById('cd-h').textContent = Math.floor((dist % 86400000) / 3600000);
    document.getElementById('cd-m').textContent = Math.floor((dist % 3600000) / 60000);
    document.getElementById('cd-s').textContent = Math.floor((dist % 60000) / 1000);
}
tick();
setInterval(tick, 1000);

/* ── Prenup images ── */
const prenupGrid = document.getElementById('prenupGrid');
const images = [
    'items/photo/1.jpg','items/photo/2.jpg','items/photo/3.jpg',
    'items/photo/4.jpg','items/photo/5.jpg','items/photo/6.jpeg',
    'items/photo/7.jpg','items/photo/8.jpg','items/photo/9.jpg',
    'items/photo/10.jpg','items/photo/11.jpg','items/photo/12.jpg', 
];
images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Prenup ${i + 1}`;
    img.loading = 'lazy';
    prenupGrid.appendChild(img);
});

/* ── Fade-in on scroll ── */
const faders = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
faders.forEach(el => io.observe(el));
