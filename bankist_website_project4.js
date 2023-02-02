'use strict';

//Elements
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const allSection = document.querySelectorAll('.section');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

const dotContainer = document.querySelector('.dots');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scrolling
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

//Implement content field in section 2
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard missing click
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animations
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//Sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Lazy loading image
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src wit data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
Ŕ;
