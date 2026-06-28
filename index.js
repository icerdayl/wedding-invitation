/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');

hamburger.addEventListener('click', () => {
    const open = navDrawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
});

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
    'items/photo/1.jpg',
    'items/photo/2.jpg',
    'items/photo/3.jpg',
    'items/photo/4.jpg',
    'items/photo/5.jpg',
    'items/photo/6.jpeg',
    'items/photo/7.jpg',
    'items/photo/8.jpg',
    'items/photo/9.jpg',
    'items/photo/10.jpg',
    'items/photo/11.jpg',
    'items/photo/12.jpg',
    'items/photo/13.jpg',
    'items/photo/14.jpg',
    'items/photo/15.jpg',
    'items/photo/16.jpg',
    'items/photo/17.jpg',
    'items/photo/18.jpg',
    'items/photo/19.jpeg',
    'items/photo/20.jpg',
    'items/photo/21.jpg',
    'items/photo/22.jpg',
    'items/photo/23.jpg',
    'items/photo/24.jpg',
    'items/photo/25.jpg',
    'items/photo/26.jpg',
    'items/photo/27.jpg',
];
images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Prenup ${i + 1}`;
    img.loading = 'lazy';
    img.style.cursor = 'pointer';
    img.className='lb-trigger'
    img.addEventListener('click', () => openLightbox(src, images, i));
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

/* ── Lightbox ── */
// Build lightbox DOM once
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
  <div id="lb-backdrop"></div>
  <button id="lb-close" aria-label="Close">&#x2715;</button>
  <button id="lb-prev" aria-label="Previous">&#x2039;</button>
  <button id="lb-next" aria-label="Next">&#x203A;</button>
  <div id="lb-img-wrap">
    <img id="lb-img" src="" alt="">
  </div>
  <div id="lb-counter"></div>
`;
document.body.appendChild(lightbox);

const lbEl       = document.getElementById('lightbox');
const lbImg      = document.getElementById('lb-img');
const lbCounter  = document.getElementById('lb-counter');
const lbClose    = document.getElementById('lb-close');
const lbPrev     = document.getElementById('lb-prev');
const lbNext     = document.getElementById('lb-next');
const lbBackdrop = document.getElementById('lb-backdrop');

let lbList  = [];   // array of src strings currently loaded
let lbIndex = 0;

function openLightbox(src, list, index) {
    lbList  = list;
    lbIndex = index;
    setLbImage(lbIndex);
    lbEl.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lbEl.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
}

function setLbImage(i) {
    lbImg.src = lbList[i];
    lbCounter.textContent = `${i + 1} / ${lbList.length}`;
    lbPrev.style.display = lbList.length > 1 ? '' : 'none';
    lbNext.style.display = lbList.length > 1 ? '' : 'none';
}

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);

lbPrev.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbList.length) % lbList.length;
    setLbImage(lbIndex);
});

lbNext.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbList.length;
    setLbImage(lbIndex);
});

// Keyboard nav
document.addEventListener('keydown', e => {
    if (!lbEl.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbList.length) % lbList.length; setLbImage(lbIndex); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbList.length;                 setLbImage(lbIndex); }
});

// Touch swipe support
let tsX = null;
lbEl.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
lbEl.addEventListener('touchend',   e => {
    if (tsX === null) return;
    const dx = e.changedTouches[0].clientX - tsX;
    if (Math.abs(dx) > 40) {
        if (dx < 0) { lbIndex = (lbIndex + 1) % lbList.length; }
        else        { lbIndex = (lbIndex - 1 + lbList.length) % lbList.length; }
        setLbImage(lbIndex);
    }
    tsX = null;
});

/* ── QR / Gift images — single-image lightbox ── */
document.querySelectorAll('.lb-trigger').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(img.src, [img.src], 0));
});