// =====================
// MAP GRID GENERATOR
// =====================
function buildMapGrid(id, cols, rows, seed) {
  const el = document.getElementById(id);
  if (!el) return;
  const types = ['', '', 'l', 'g', 'm', '', 'l', 'g'];
  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement('div');
    cell.className = 'map-cell ' + types[(i * seed + i + seed) % types.length];
    el.appendChild(cell);
  }
}

function buildThumbGrid(id, seed) {
  const el = document.getElementById(id);
  if (!el) return;
  const types = ['', '', 'l', 'g', 'm', '', 'g', ''];
  for (let i = 0; i < 80; i++) {
    const cell = document.createElement('div');
    cell.className = 'tc ' + types[(i * seed + i) % types.length];
    el.appendChild(cell);
  }
}

// =====================
// SCROLL REVEAL
// =====================
function initReveal() {
  const revealEls = document.querySelectorAll(
    '.hero-content, .hero-map, .about-grid, .stat-card, .proj-card, .contact-grid, .footer-inner'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// =====================
// SKILL BARS ANIMATION
// =====================
function initSkillBars() {
  const rows = document.querySelectorAll('.skill-row');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const row = entry.target;
        const pct = row.getAttribute('data-pct');
        const fill = row.querySelector('.skill-fill');

        setTimeout(() => {
          row.classList.add('visible');
          fill.style.width = pct + '%';
        }, i * 100);

        observer.unobserve(row);
      }
    });
  }, { threshold: 0.3 });

  rows.forEach(row => observer.observe(row));
}

// =====================
// NAVBAR SCROLL STYLE
// =====================
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.padding = '0.7rem 2.5rem';
    } else {
      nav.style.padding = '1.1rem 2.5rem';
    }
  }, { passive: true });
}

// =====================
// ACTIVE NAV LINKS
// =====================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id="top"]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          const href = link.getAttribute('href');
          if (href === '#' + entry.target.id || (href === '#about' && entry.target.id === 'about')) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  buildMapGrid('heroMap', 10, 8, 3);
  buildThumbGrid('t1', 3);
  buildThumbGrid('t2', 5);
  buildThumbGrid('t3', 7);

  initReveal();
  initSkillBars();
  initNavbar();
  initActiveNav();
});
