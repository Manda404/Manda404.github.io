async function loadSection(id, file) {
    try {
        const response = await fetch(`sections/${file}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function loadAllSections() {
    await loadSection("navbar", "navbar.html");
    await loadSection("hero", "hero.html");
    await loadSection("about", "about.html");
    await loadSection("skills", "skills.html");
    await loadSection("github", "github.html");
    await loadSection("education", "education.html");
    await loadSection("experience", "experience.html");
    await loadSection("projects", "projects.html");
    await loadSection("blog", "blog.html");
    await loadSection("testimonials", "testimonials.html");
    await loadSection("contact", "contact.html");
    await loadSection("footer", "footer.html");
}

document.addEventListener("DOMContentLoaded", loadAllSections);