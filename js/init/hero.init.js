export function initHero() {
    const changingWord = document.querySelector('.changing-word');
    if (!changingWord) return;

    const words = changingWord.dataset.words.split(',');
    let index = 0;

    setInterval(() => {
        index = (index + 1) % words.length;
        changingWord.textContent = words[index];
    }, 2500);
}