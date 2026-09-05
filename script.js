// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 8px 40px rgba(23,105,255,0.12)'
    : '0 4px 24px rgba(23,105,255,0.08)';
});

// Burger menu
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile nav on link click
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .proj-card, .svc-card, .process-step');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseInt(el.dataset.delay) || 0;
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));
