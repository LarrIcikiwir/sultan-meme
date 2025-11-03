const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsContainer = document.getElementById('dots');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');

let index = 0;
const captions = [
  "Foto 1 - Sultan Sikap Lilin",
  "Foto 2 - Sultan Nonton Hent**",
  "Foto 3 - Sultan Saltoan Kudus",
  "Foto 4 - Sultan Ketawa Karir"
];

function updateCarousel() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  subtitle.textContent = captions[index];
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

// swipe gesture
let startX = 0;
slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slides.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) next.click();
  else if (endX - startX > 50) prev.click();
});

updateCarousel();
