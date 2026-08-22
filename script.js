// Staggered scroll-reveal for project cards
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.dataset.index) * 100;
      setTimeout(() => card.classList.add('visible'), delay);
      observer.unobserve(card);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));
