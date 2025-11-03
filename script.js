/* script.js */
/* Simple swipeable carousel with buttons, dots, keyboard navigation, and touch-friendly behavior */

const slidesEl = document.getElementById('slides');
const images = Array.from(slidesEl.querySelectorAll('img'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsEl = document.getElementById('dots');
let index = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = null;

// create dots
images.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'dot' + (i===0? ' active' : '');
  d.addEventListener('click', ()=>goTo(i));
  dotsEl.appendChild(d);
});

function updateDots(){
  dotsEl.querySelectorAll('.dot').forEach((d, i)=> d.classList.toggle('active', i===index));
}

function setPositionByIndex(){
  currentTranslate = -index * slidesEl.clientWidth;
  prevTranslate = currentTranslate;
  slidesEl.style.transform = `translateX(${currentTranslate}px)`;
  updateDots();
}

// buttons
prevBtn.addEventListener('click', ()=>{ index = Math.max(0, index-1); setPositionByIndex(); });
nextBtn.addEventListener('click', ()=>{ index = Math.min(images.length-1, index+1); setPositionByIndex(); });

// keyboard
window.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowLeft') prevBtn.click();
  if(e.key === 'ArrowRight') nextBtn.click();
});

// touch / mouse events
images.forEach((img, idx)=>{
  // disable native drag
  img.addEventListener('dragstart', (e)=> e.preventDefault());
  // touch mouse events
  img.addEventListener('pointerdown', pointerDown(idx));
  img.addEventListener('pointerup', pointerUp);
  img.addEventListener('pointermove', pointerMove);
  img.addEventListener('pointercancel', pointerUp);
  img.addEventListener('pointerleave', pointerUp);

  // add visual 'touching' class
  img.addEventListener('pointerdown', ()=> img.classList.add('touching'));
  img.addEventListener('pointerup', ()=> img.classList.remove('touching'));
  img.addEventListener('pointercancel', ()=> img.classList.remove('touching'));
  img.addEventListener('pointerleave', ()=> img.classList.remove('touching'));
});

function pointerDown(idx){
  return function(event){
    isDragging = true;
    startX = event.clientX;
    slidesEl.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
    this.setPointerCapture(event.pointerId);
  }
}

function pointerMove(event){
  if(isDragging){
    const currentX = event.clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
  }
}

function pointerUp(event){
  if(!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);
  slidesEl.style.transition = 'transform 600ms cubic-bezier(.2,.9,.1,1)';
  const movedBy = currentTranslate - prevTranslate;
  // swipe threshold
  if(movedBy < -100 && index < images.length-1) index += 1;
  if(movedBy > 100 && index > 0) index -= 1;
  setPositionByIndex();
}

function animation(){
  setSliderPosition();
  if(isDragging) requestAnimationFrame(animation);
}

function setSliderPosition(){
  slidesEl.style.transform = `translateX(${currentTranslate}px)`;
}

function goTo(i){
  index = i;
  setPositionByIndex();
}

// make carousel responsive on resize
window.addEventListener('resize', ()=> setPositionByIndex());

// init
setPositionByIndex();