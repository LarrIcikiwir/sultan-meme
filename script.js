const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsContainer = document.getElementById('dots');
const subtitle = document.getElementById('subtitle');

let index = 0;

// Teks tiap foto
const captions = [
  "Sultan sikap lilin",
  "Sultan nonton hent**",
  "Sultan tendang langit",
  "Sultan ketawa karir"
];

function updateCarousel() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  subtitle.style.opacity = 0;
  setTimeout(() => {
    subtitle.textContent = captions[index];
    subtitle.style.opacity = 1;
  }, 300);
}

// buat titik navigasi
images.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
  dotsContainer.appendChild(dot);
});

prev.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateCarousel();
});

next.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateCarousel();
});

// swipe gesture (mobile)
let startX = 0;
slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slides.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) next.click();
  else if (endX - startX > 50) prev.click();
});

updateCarousel();
