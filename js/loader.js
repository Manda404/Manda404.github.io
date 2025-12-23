import { initHero } from './init/hero.init.js';

async function loadPartial(targetId, path, initFn) {
    const target = document.querySelector(targetId);
    if (!target) return;

    try {
        const response = await fetch(path);
        const html = await response.text();
        target.innerHTML = html;

        if (initFn) initFn();
    } catch (e) {
        console.error('Erreur chargement', path, e);
    }
}

// Navbar
loadPartial('#navbar', 'partials/navbar.html');

// Hero
loadPartial('#hero', 'sections/hero/hero.html', initHero);