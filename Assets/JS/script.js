// -----------------------------------------------------
// MOBILE MENU
// -----------------------------------------------------
const mobileBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector("header nav");

if (mobileBtn && navMenu) {
  mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// -----------------------------------------------------
// STICKY HEADER
// -----------------------------------------------------
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
});


// -----------------------------------------------------
// HOME PAGE CAROUSEL (runs only if elements exist)
// -----------------------------------------------------
function initHomeCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");

  if (slides.length === 0 || dots.length === 0) return; // do nothing on Menu page

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentIndex = Number(dot.dataset.slide);
      showSlide(currentIndex);
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 3000);
}

initHomeCarousel();


// -----------------------------------------------------
// TESTIMONIAL SLIDER (Home only)
// -----------------------------------------------------
function initTestimonialSlider() {
  const track = document.getElementById("testimonialTrack");
  const cards = document.querySelectorAll(".testimonial-card");
  const next = document.getElementById("nextBtn");
  const prev = document.getElementById("prevBtn");

  if (!track || cards.length === 0) return; // Skip on Menu page

  let index = 0;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 16;
    const perView = window.innerWidth <= 768 ? 1 : 3;
    const maxIndex = cards.length - perView;

    index = Math.min(Math.max(index, 0), maxIndex);
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  if (next) next.addEventListener("click", () => { index++; updateSlider(); });
  if (prev) prev.addEventListener("click", () => { index--; updateSlider(); });

  window.addEventListener("resize", updateSlider);
  updateSlider();
}

initTestimonialSlider();


// -----------------------------
// Menu slider (robust, uses wrapper width)
// -----------------------------
function initMenuSlider() {
  const slidesContainer = document.getElementById("menuSlides");
  const slides = document.querySelectorAll(".menu-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const nextArrow = document.getElementById("nextArrow");
  const prevArrow = document.getElementById("prevArrow");
  const wrapper = document.querySelector(".slider-wrapper");

  if (!slidesContainer || slides.length === 0 || !wrapper) return;

  let current = 0;
  let slideWidth = wrapper.clientWidth;

  // compute and apply transform by index * wrapper width
  function updateTransform() {
    // recompute width on resize
    slideWidth = wrapper.clientWidth;
    // translate becomes index * width
    slidesContainer.style.transform = `translateX(-${current * slideWidth}px)`;
    // update dots
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function next() {
    current = (current + 1) % slides.length;
    updateTransform();
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length;
    updateTransform();
  }

  // attach arrows
  if (nextArrow) nextArrow.addEventListener("click", next);
  if (prevArrow) prevArrow.addEventListener("click", prev);

  // attach dots
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const idx = Number(dot.getAttribute("data-slide"));
      if (!Number.isNaN(idx)) {
        current = idx;
        updateTransform();
      }
    });
  });

  // ensure correct size on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateTransform, 120);
  });

  // initial layout
  updateTransform();

  
}

initMenuSlider();
