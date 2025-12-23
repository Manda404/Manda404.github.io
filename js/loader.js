async function loadPartial(targetId, path) {
    const target = document.querySelector(targetId);
    if (!target) return;

    try {
        const response = await fetch(path);
        const html = await response.text();
        target.innerHTML = html;
    } catch (error) {
        console.error(`Erreur chargement ${path}`, error);
    }
}

// Charger la navbar
loadPartial('#navbar', 'partials/navbar.html');