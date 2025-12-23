/**
 * GitHub-like Contributions Component
 * ----------------------------------
 * - Navigation par année
 * - Données simulées simples
 * - Code lisible et maintenable
 * - Pas de sur-ingénierie
 */

class GitHubContributions {
    constructor() {
        this.years = ['2025', '2024', '2023'];
        this.currentYear = '2025';

        // Cache des données par année
        this.yearData = {};

        // Références DOM
        this.grid = document.getElementById('contribution-grid');
        this.yearTitle = document.getElementById('contribution-year');
        this.totalEl = document.querySelector('.total-contributions');
        this.streakEl = document.querySelector('.longest-streak');
        this.prevBtn = document.getElementById('prev-slide');
        this.nextBtn = document.getElementById('next-slide');
        this.indicators = document.querySelectorAll('.indicator');

        this.init();
    }

    /* ---------- INIT ---------- */

    init() {
        this.bindEvents();
        this.goToYear(this.currentYear);
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousYear());
        this.nextBtn.addEventListener('click', () => this.nextYear());

        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                this.goToYear(indicator.dataset.year);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousYear();
            if (e.key === 'ArrowRight') this.nextYear();
        });
    }

    /* ---------- NAVIGATION ---------- */

    nextYear() {
        const index = this.years.indexOf(this.currentYear);
        const next = (index + 1) % this.years.length;
        this.goToYear(this.years[next]);
    }

    previousYear() {
        const index = this.years.indexOf(this.currentYear);
        const prev = index === 0 ? this.years.length - 1 : index - 1;
        this.goToYear(this.years[prev]);
    }

    goToYear(year) {
        this.currentYear = year;
        this.updateHeader();
        this.updateIndicators();

        if (!this.yearData[year]) {
            this.yearData[year] = this.generateYearData(year);
        }

        const data = this.yearData[year];
        this.renderGrid(data);
        this.updateStats(data);
    }

    /* ---------- UI ---------- */

    updateHeader() {
        this.yearTitle.textContent = `${this.currentYear} Contributions`;
        this.yearTitle.classList.add('fade');

        setTimeout(() => {
            this.yearTitle.classList.remove('fade');
        }, 200);
    }

    updateIndicators() {
        this.indicators.forEach(indicator => {
            indicator.classList.toggle(
                'active',
                indicator.dataset.year === this.currentYear
            );
        });
    }

    /* ---------- DATA ---------- */

    generateYearData(year) {
        const daysInYear = this.isLeapYear(year) ? 366 : 365;
        const data = [];

        for (let i = 0; i < daysInYear; i++) {
            const active = Math.random() < 0.55;
            const count = active ? this.randomInt(1, 6) : 0;
            const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 2));

            data.push({
                date: this.dateFromDay(year, i),
                count,
                level
            });
        }

        return data;
    }

    /* ---------- RENDER ---------- */

    renderGrid(data) {
        this.grid.innerHTML = '';

        data.forEach(day => {
            const el = document.createElement('div');
            el.className = `contribution-day level-${day.level}`;
            el.dataset.date = day.date;
            el.dataset.count = day.count;

            el.addEventListener('mouseenter', (e) => this.showTooltip(e, day));
            el.addEventListener('mouseleave', () => this.hideTooltip());

            this.grid.appendChild(el);
        });
    }

    updateStats(data) {
        const total = data.reduce((sum, d) => sum + d.count, 0);
        const streak = this.longestActiveRun(data);

        this.totalEl.textContent = `${total} contributions`;
        this.streakEl.textContent = `${streak} days active in a row`;
    }

    /* ---------- HELPERS ---------- */

    longestActiveRun(data) {
        let max = 0;
        let current = 0;

        data.forEach(day => {
            if (day.count > 0) {
                current++;
                max = Math.max(max, current);
            } else {
                current = 0;
            }
        });

        return max;
    }

    isLeapYear(year) {
        const y = parseInt(year, 10);
        return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    dateFromDay(year, dayIndex) {
        const date = new Date(`${year}-01-01`);
        date.setDate(date.getDate() + dayIndex);
        return date.toISOString().split('T')[0];
    }

    /* ---------- TOOLTIP ---------- */

    showTooltip(event, day) {
        const tooltip = document.createElement('div');
        tooltip.className = 'contribution-tooltip';
        tooltip.textContent = `${day.count} contributions on ${day.date}`;

        document.body.appendChild(tooltip);

        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 8}px`;
    }

    hideTooltip() {
        const tooltip = document.querySelector('.contribution-tooltip');
        if (tooltip) tooltip.remove();
    }
}

/* ---------- INIT ---------- */

document.addEventListener('DOMContentLoaded', () => {
    window.GitHubContributions = new GitHubContributions();
});