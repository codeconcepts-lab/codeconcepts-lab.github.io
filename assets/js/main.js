// assets/js/main.js
// Replace the inline <script> in index.html with:
// <script type="module" src="/assets/js/main.js"></script>

/** Scroll reveal — same IntersectionObserver logic, now testable */
const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // animate once — matches existing behaviour
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};
const initMobileNav = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('.icon-menu').style.display  = isOpen ? 'none'  : 'block';
    toggle.querySelector('.icon-close').style.display = isOpen ? 'block' : 'none';
  });

  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
};

/** Card spotlight — your existing --mouse-x / --mouse-y CSS custom prop technique */
const initCardSpotlight = () => {
  const container = document.getElementById('cards-container');
  if (!container) return;
  container.addEventListener('mousemove', e => {
    document.querySelectorAll('.service-card').forEach(card => {
      const { left, top } = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - top}px`);
    });
  });
};

/** Hero glow — improved with rAF throttling (current code fires on every mousemove) */
const initHeroGlow = () => {
  const wrapper = document.getElementById('hero-wrapper');
  const glow = document.getElementById('hero-mouse-glow');
  if (!wrapper || !glow) return;

  let rafId;
  wrapper.addEventListener('mousemove', e => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const { left, top } = wrapper.getBoundingClientRect();
      glow.style.left = `${e.clientX - left}px`;
      glow.style.top  = `${e.clientY - top}px`;
    });
  });

  wrapper.addEventListener('mouseleave', () => {
    glow.style.left = '50%';
    glow.style.top  = '50%';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCardSpotlight();
    initHeroGlow();
    initMobileNav();
});