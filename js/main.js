(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeQuery = window.matchMedia('(prefers-color-scheme: light)');
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

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  updateThemeLabel();
})();
