/* =====================================================
   MAIN.JS — Rostand Surel Portfolio
   Consolidated from 8 separate files → single clean module
   ===================================================== */

(function () {
    'use strict';

    /* ─────────────────────────────────────────
       1. THEME SWITCHER
    ───────────────────────────────────────── */
    const ThemeSwitcher = {
        init() {
            const saved = localStorage.getItem('theme') || 'dark';
            this.apply(saved);

            const btn = document.getElementById('theme-btn');
            if (btn) btn.addEventListener('click', () => this.toggle());

            // Enable transitions after first render (avoids flash)
            setTimeout(() => document.body.classList.add('theme-ready'), 100);
        },

        apply(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            const btn = document.getElementById('theme-btn');
            if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        },

        toggle() {
            const current = document.documentElement.getAttribute('data-theme');
            this.apply(current === 'dark' ? 'light' : 'dark');
        }
    };

    /* ─────────────────────────────────────────
       2. MOBILE MENU
    ───────────────────────────────────────── */
    const MobileMenu = {
        init() {
            const hamburger = document.getElementById('hamburger');
            const menu      = document.getElementById('mobile-menu');

            if (!hamburger || !menu) return;

            hamburger.addEventListener('click', () => {
                const open = menu.classList.toggle('open');
                hamburger.classList.toggle('open', open);
                document.body.style.overflow = open ? 'hidden' : '';
            });

            // Close on link click
            menu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#hamburger') && !e.target.closest('#mobile-menu')) {
                    this.close();
                }
            });
        },

        close() {
            const hamburger = document.getElementById('hamburger');
            const menu      = document.getElementById('mobile-menu');
            hamburger?.classList.remove('open');
            menu?.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    /* ─────────────────────────────────────────
       3. SMOOTH SCROLL
    ───────────────────────────────────────── */
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href').slice(1);
                    const target   = document.getElementById(targetId);
                    if (!target) return;
                    e.preventDefault();
                    MobileMenu.close();
                    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                });
            });
        }
    };

    /* ─────────────────────────────────────────
       4. ACTIVE NAV ON SCROLL
    ───────────────────────────────────────── */
    const NavHighlight = {
        init() {
            const sections  = document.querySelectorAll('section[id]');
            const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

            if (!sections.length || !navLinks.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                        if (active) active.classList.add('active');
                    }
                });
            }, { threshold: 0.35, rootMargin: '-10% 0px -55% 0px' });

            sections.forEach(s => observer.observe(s));
        }
    };

    /* ─────────────────────────────────────────
       5. SCROLL REVEAL
    ───────────────────────────────────────── */
    const ScrollReveal = {
        init() {
            const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        const el    = entry.target;
                        const delay = el.dataset.delay || 0;
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, Number(delay));
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

            elements.forEach(el => observer.observe(el));
        }
    };

    /* ─────────────────────────────────────────
       6. TYPING ANIMATION (Hero)
    ───────────────────────────────────────── */
    const TypeWriter = {
        el: null,
        words: [],
        index: 0,
        char: 0,
        deleting: false,
        timeout: null,

        init() {
            this.el = document.getElementById('typed-text');
            if (!this.el) return;

            const raw = this.el.dataset.words;
            if (!raw) return;
            this.words = raw.split(',').map(w => w.trim());
            this.tick();
        },

        tick() {
            const word    = this.words[this.index];
            const current = this.deleting
                ? word.substring(0, this.char - 1)
                : word.substring(0, this.char + 1);

            this.el.textContent = current;

            if (!this.deleting && current === word) {
                // Pause at end
                this.timeout = setTimeout(() => {
                    this.deleting = true;
                    this.char = word.length;
                    this.tick();
                }, 2200);
                return;
            }

            if (this.deleting && current === '') {
                this.deleting = false;
                this.char = 0;
                this.index = (this.index + 1) % this.words.length;
                this.timeout = setTimeout(() => this.tick(), 400);
                return;
            }

            this.char = this.deleting ? this.char - 1 : this.char + 1;
            const speed = this.deleting ? 45 : 90;
            this.timeout = setTimeout(() => this.tick(), speed);
        }
    };

    /* ─────────────────────────────────────────
       7. COUNTER ANIMATION (Stats)
    ───────────────────────────────────────── */
    const CounterAnimation = {
        init() {
            const counters = document.querySelectorAll('[data-count]');
            if (!counters.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const el     = entry.target;
                    const target = parseFloat(el.dataset.count);
                    const suffix = el.dataset.suffix || '';
                    const prefix = el.dataset.prefix || '';
                    this.animate(el, target, suffix, prefix);
                    observer.unobserve(el);
                });
            }, { threshold: 0.5 });

            counters.forEach(c => observer.observe(c));
        },

        animate(el, target, suffix, prefix) {
            const duration = 1600;
            const start    = performance.now();

            const update = (now) => {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased   = 1 - Math.pow(1 - progress, 3);
                const value   = eased * target;

                // Display as integer or 1 decimal
                const display = target % 1 === 0
                    ? Math.round(value)
                    : value.toFixed(1);

                el.textContent = prefix + display + suffix;

                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = prefix + target + suffix;
            };

            requestAnimationFrame(update);
        }
    };

    /* ─────────────────────────────────────────
       8. CONTACT FORM (mailto fallback)
    ───────────────────────────────────────── */
    const ContactForm = {
        init() {
            const form = document.getElementById('contact-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name    = form.querySelector('[name="name"]')?.value || '';
                const email   = form.querySelector('[name="email"]')?.value || '';
                const subject = form.querySelector('[name="subject"]')?.value || 'Message from portfolio';
                const message = form.querySelector('[name="message"]')?.value || '';

                const body = `Bonjour Rostand,\n\n${message}\n\n---\n${name}\n${email}`;
                const mailto = `mailto:rostandsurel@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                window.location.href = mailto;

                // Visual feedback
                const btn = form.querySelector('.form-submit');
                const orig = btn.innerHTML;
                btn.innerHTML = '✓ Message ouvert dans votre client mail';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.disabled = false;
                }, 4000);
            });
        }
    };

    /* ─────────────────────────────────────────
       9. NAVBAR SCROLL EFFECT
    ───────────────────────────────────────── */
    const NavbarScroll = {
        init() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY;

                // Add subtle shadow when scrolled
                if (currentScroll > 10) {
                    navbar.style.boxShadow = 'var(--shadow-md)';
                } else {
                    navbar.style.boxShadow = 'none';
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }
    };

    /* ─────────────────────────────────────────
       10. STAGGERED CARD REVEAL
    ───────────────────────────────────────── */
    const StaggerReveal = {
        init() {
            const grids = document.querySelectorAll(
                '.skills-grid, .projects-grid, .stats-grid, .what-grid'
            );

            grids.forEach(grid => {
                const items = grid.children;
                Array.from(items).forEach((item, i) => {
                    item.classList.add('reveal');
                    item.dataset.delay = i * 80;
                });
            });

            // Re-run ScrollReveal for newly added .reveal elements
            // (ScrollReveal.init already handles all .reveal at DOMContentLoaded,
            //  but we call it again after stagger setup)
        }
    };

    /* ─────────────────────────────────────────
       11. INIT
    ───────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        ThemeSwitcher.init();
        MobileMenu.init();
        SmoothScroll.init();
        NavHighlight.init();
        NavbarScroll.init();
        TypeWriter.init();

        // Setup stagger BEFORE scroll reveal so delays are set
        StaggerReveal.init();
        ScrollReveal.init();

        CounterAnimation.init();
        ContactForm.init();
    });

})();
