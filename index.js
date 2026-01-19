const navEl = document.getElementById("select")
const gallery = document.getElementById("prenup")
const songEl = document.getElementById("song")

const clickBtn = document.getElementById("click");
if (clickBtn) {
    clickBtn.addEventListener("click", () => {
        if (!songEl) return;
        songEl.muted = false;      // unmute
        songEl.volume = 0.05;     // set desired volume
        const p = songEl.play();
        if (p && p.catch) p.catch(() => {}); // swallow play promise rejection
    });
}

// Attempt to unmute & autoplay on load; also try once on first user gesture as a fallback
function tryAutoplayUnmute() {
    if (!songEl) return;
    songEl.muted = false;
    songEl.volume = 0.05;
    const p = songEl.play();
    if (p && p.catch) p.catch(() => {});
}

window.addEventListener('load', tryAutoplayUnmute);
document.addEventListener('click', tryAutoplayUnmute, { once: true });

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

// Set the date we're counting down to
var countDownDate = new Date("Aug 30, 2026 16:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d: " + hours + "h: "
  + minutes + "m: " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);