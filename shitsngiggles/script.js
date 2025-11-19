

const openBtn = document.getElementById("openLetter");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("closeLetter");

// define elements for the carousel

const track = document.getElementById("caroTrack");
const slides = Array.from(document.querySelectorAll(".caro-slide"));
const prevBtn = document.querySelector(".caro-arrow.prev");
const nextBtn = document.querySelector(".caro-arrow.next");
//----------------------------------------------------------
// Carousel functions
//----------------------------------------------------------
// remember the current active slide

let currentIndex = slides.findIndex((slide) =>
  slide.classList.contains("active")
);

if (currentIndex === -1) {
  currentIndex = 1;
}

// set up automatic timing for the rotation

const Auto_Interval = 4000; // 4 seconds rotations

let autoTimer = null; // store timer

// updating the visiable photo----------

function updateActiveSlide() {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentIndex);
  });

  const slide = slides[currentIndex];
  const trackRect = track.getBoundingClientRect();
  const slideRect = slide.getBoundingClientRect();
  const scrollAmount =
    slideRect.left -
    trackRect.left -
    (trackRect.width / 2 - slideRect.width / 2);

  track.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}

// Navigation functions----------

function goPrev() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // circular 1)
  updateActiveSlide();
  resetAutoRotate();
}
function goNext() {
  currentIndex = (currentIndex + 1) % slides.length; // circular 2)
  updateActiveSlide();
  resetAutoRotate();
}

// Auto rotation ------------

function StartAutoRotate() {
  stopAutoRotate();
  autoTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateActiveSlide();
  }, Auto_Interval);
}

// Stopping auto rotation
function stopAutoRotate() {
  //clears current timer
  if (autoTimer) {
    clearInterval(autoTimer);
  }
}

function resetAutoRotate() {
  stopAutoRotate();
  StartAutoRotate();
}

//----- Clone first and last picture for circular movement

const firstClone = slides[0].cloneNode(true); // make a copy if the first and last images
const lastClone = slides[slides.length-1].cloneNode(true); // including all the child elements

firstClone.classList.remove("active"); // remove the active id to make the images not pop out
lastClone.classList.remove("active");

track.appendChild(firstClone); //add the first picture to the end of the track
track.insertBefore(lastClone, track.firstElementChild);

const allSlides = Array.from(track.children);
let slideWidth = slides[0].getBoundingClientRect().width + 30;
track.scrollLeft = slideWidth;


//----------------------------------------------------------
// Open/Close functions for the letter
//----------------------------------------------------------
function openLetter() {
  backdrop.hidden = false; // show modal
  closeBtn?.focus(); 
}
function closeLetter() {
  backdrop.hidden = true; 
  openBtn?.focus(); 
}

openBtn.addEventListener("click", openLetter);
closeBtn.addEventListener("click", closeLetter);

// Close on escape button
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !backdrop.hidden) closeLetter();
});

// Close if clicking the dark backdrop 
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeLetter();
});
//----------------------------------------------------------

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);
StartAutoRotate();

updateActiveSlide();
StartAutoRotate();
