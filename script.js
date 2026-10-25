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

const projectGrid = document.querySelector('.proj-grid');

// Position each project in the shortest column, then repeat on filtering and resize.
function layoutProjects() {
  if (!projectGrid) return;

  const styles = getComputedStyle(projectGrid);
  const columns = Number.parseInt(styles.getPropertyValue('--masonry-columns'), 10) || 1;
  const gap = Number.parseFloat(styles.getPropertyValue('--masonry-gap')) || 20;
  const columnHeights = Array(columns).fill(0);

  projectGrid.querySelectorAll('.proj-card:not(.hidden)').forEach(card => {
    const column = columnHeights.indexOf(Math.min(...columnHeights));
    const x = column * (card.offsetWidth + gap);
    const y = columnHeights[column];
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    columnHeights[column] += card.offsetHeight + gap;
  });

  projectGrid.style.height = `${Math.max(...columnHeights, 0) - (columnHeights.some(Boolean) ? gap : 0)}px`;
}

const projectFilters = { format: 'all', type: 'all' };

// Filter tabs
document.querySelectorAll('.proj-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    const filterGroup = btn.dataset.filterGroup;
    document.querySelectorAll(`.proj-filter[data-filter-group="${filterGroup}"]`).forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    projectFilters[filterGroup] = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      const categories = (card.dataset.categories || '').split(' ');
      const formatMatches = projectFilters.format === 'all' || card.dataset.format === projectFilters.format;
      const typeMatches = projectFilters.type === 'all' || categories.includes(projectFilters.type);
      const match = formatMatches && typeMatches;
      card.classList.toggle('hidden', !match);
    });
    requestAnimationFrame(layoutProjects);
  });
});

let masonryResizeFrame;
window.addEventListener('resize', () => {
  cancelAnimationFrame(masonryResizeFrame);
  masonryResizeFrame = requestAnimationFrame(layoutProjects);
});

requestAnimationFrame(layoutProjects);

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
