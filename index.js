const navEl = document.getElementById("select")
const gallery = document.getElementById("prenup")

document.addEventListener('DOMContentLoaded', () => {
                const audio = document.getElementById('song') || document.querySelector('header audio');
                if (audio) audio.volume = 0.05; // value between 0.0 and 1.0
            });

const images = [
    'items/photo/1.png',
    'items/photo/2.png',
    'items/photo/3.png',
    'items/photo/4.png',
    'items/photo/5.png',
    'items/photo/6.png',
    'items/photo/7.png',
    'items/photo/8.png',
    'items/photo/9.png'
];

const container = gallery || document.querySelector('.prenup');
for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = `Prenup ${i + 1}`;
    img.loading = 'lazy';
    container.appendChild(img);
}

