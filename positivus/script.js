// Mobile menu
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('.nav__menu a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// Working process accordion (one open at a time)
const steps = document.querySelectorAll('.step');
steps.forEach(step => {
  step.querySelector('.step__head').addEventListener('click', () => {
    const willOpen = !step.classList.contains('is-open');
    steps.forEach(s => {
      s.classList.remove('is-open');
      s.querySelector('.step__head').setAttribute('aria-expanded', false);
    });
    if (willOpen) {
      step.classList.add('is-open');
      step.querySelector('.step__head').setAttribute('aria-expanded', true);
    }
  });
});

// Testimonials slider: keeps the active card centred
const testi = document.querySelector('.testi');
const track = testi.querySelector('.testi__track');
const quotes = [...track.querySelectorAll('.quote')];
let current = 1;

function layout() {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const w = quotes[0].offsetWidth;
  const tx = (testi.clientWidth - w) / 2 - current * (w + gap);
  track.style.setProperty('--tx', tx + 'px');
  quotes.forEach((q, i) => q.classList.toggle('is-active', i === current));
}
function go(delta) {
  current = (current + delta + quotes.length) % quotes.length;
  layout();
}
testi.querySelector('.testi__prev').addEventListener('click', () => go(-1));
testi.querySelector('.testi__next').addEventListener('click', () => go(1));
window.addEventListener('resize', layout);
layout();
