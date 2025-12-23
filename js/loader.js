async function loadPartial(targetId, path) {
    const target = document.querySelector(targetId);
    if (!target) return;

    try {
        const response = await fetch(path);
        const html = await response.text();
        target.innerHTML = html;
    } catch (e) {
        console.error('Erreur chargement', path, e);
    }
}

// Navbar
loadPartial('#navbar', 'partials/navbar.html');

// Hero section
loadPartial('#hero', 'sections/hero/hero.html');