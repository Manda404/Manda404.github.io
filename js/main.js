(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeQuery = window.matchMedia('(prefers-color-scheme: light)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const readTheme = () => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  };
  const saveTheme = (theme) => {
    try { localStorage.setItem('theme', theme); } catch { /* Storage can be disabled. */ }
  };

  const setMenu = (open) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.sr-only').textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
    navigation.classList.toggle('is-open', open);
  };

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
      setMenu(false);
      menuButton?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation?.classList.contains('is-open')) return;
    if (!navigation.contains(event.target) && !menuButton?.contains(event.target)) setMenu(false);
  });

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const nextTheme = root.dataset.theme === 'dark' ? 'clair' : 'sombre';
    themeButton.querySelector('.sr-only').textContent = `Activer le thème ${nextTheme}`;
  };

  themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    saveTheme(nextTheme);
    updateThemeLabel();
  });

  themeQuery.addEventListener('change', (event) => {
    if (readTheme()) return;
    root.dataset.theme = event.matches ? 'light' : 'dark';
    updateThemeLabel();
  });

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  let scrollTicking = false;
  const updateScrollEffects = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 10);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    progress.style.setProperty('--scroll-progress', ratio.toFixed(4));
    scrollTicking = false;
  };
  const requestScrollUpdate = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollEffects);
  };
  updateScrollEffects();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  const revealElements = document.querySelectorAll([
    '.section-heading', '.recruiter-grid > div', '.signature-card',
    '.accomplishment-card', '.expertise-card', '.case-card', '.method-list > li',
    '.timeline > article', '.cert-grid > li', '.concept-links > a',
    '.contact-card', '.case-article > section', '.case-facts > div'
  ].join(','));

  revealElements.forEach((element, index) => {
    element.classList.add('reveal-item');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  if (motionQuery.matches || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const tiltCards = document.querySelectorAll('.signature-card, .accomplishment-card, .expertise-card');
  if (!motionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach((card) => {
      card.classList.add('tilt-card');
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--tilt-x', `${(-y * 3.5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 4.5).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  updateThemeLabel();
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
})();
