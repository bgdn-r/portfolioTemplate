"use strict";
const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".nav__btn");
const navLinks = document.querySelector(".nav__links");

const items = document.querySelectorAll(".projects__item");

const allSections = document.querySelectorAll(".section");

//Nav burger button
navBtn.addEventListener("click", function (e) {
  const burs = e.target.closest(".nav").querySelectorAll(".nav__btn--burger");
  burs.forEach((bur) => bur.classList.toggle("open"));
  navLinks.classList.toggle("open");
});
//Nav hover effect
const navHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav__link");
    siblings.forEach((sib) => {
      if (sib !== link) sib.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", navHover.bind(0.2));
nav.addEventListener("mouseout", navHover.bind(1));

items.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.children[0].classList.add("darken");
    item.children[1].classList.add("show");
    item.children[2].classList.add("show");
  });
  item.addEventListener("mouseout", () => {
    item.children[0].classList.remove("darken");
    item.children[1].classList.remove("show");
    item.children[2].classList.remove("show");
  });
});

// Section reveal

const observerFunction = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section__hidden");
    observer.unobserve(entry.target);
  }
  // console.log(entry);
};

const sectionObserver = new IntersectionObserver(observerFunction, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  section.classList.add("section__hidden");
  sectionObserver.observe(section);
});
//NOTE; /////// Test
// const allHolders = document.querySelectorAll(".projects__item");
// console.log(allHolders);

// const imgObserve = function (entries, observer) {
//   const [entry] = entries;
//   if (entry.isIntersecting) {
//     entry.target.children[0].classList.add("darken");
//     entry.target.children[1].classList.add("show");
//     entry.target.children[2].classList.add("show");
//     console.log(entry.target);
//   } else {
//     entry.target.children[0].classList.remove("darken");
//     entry.target.children[1].classList.remove("show");
//     entry.target.children[2].classList.remove("show");
//   }
// };

// const imageObserver = new IntersectionObserver(imgObserve, {
//   root: null,
//   threshold: 1,
// });
// allHolders.forEach((holder) => {
//   imageObserver.observe(holder);
// });

// Nav buttons
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const clicked = e.target.getAttribute("href");
    document.querySelector(clicked).scrollIntoView({ behavior: "smooth" });
    navLinks.classList.remove("open");
    const burs = e.target.closest(".nav").querySelectorAll(".nav__btn--burger");
    burs.forEach((bur) => bur.classList.toggle("open"));
  } else return;
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const slideFunction = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const slideRight = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else curSlide++;
    slideFunction(curSlide);
    activeDot(curSlide);
  };

  const slideLeft = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else curSlide--;
    slideFunction(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    createDots();
    slideFunction(0);
    activeDot(0);
  };
  init();

  btnRight.addEventListener("click", slideRight);
  btnLeft.addEventListener("click", slideLeft);

  document.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key === "ArrowRight") slideRight();
    e.key === "ArrowLeft" && slideLeft();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      slideFunction(slide);
      activeDot(slide);
    }
  });
};
slider();
