/* =====================================================
   MAIN.JS — Rostand Surel Portfolio
   Premium redesign — particles · cursor · tilt · progress
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
            setTimeout(() => document.body.classList.add('theme-ready'), 150);
        },
        apply(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            const btn = document.getElementById('theme-btn');
            if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
            // Restart particles with new theme colours
            if (HeroParticles.ctx) HeroParticles.restart();
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

            menu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('#hamburger') && !e.target.closest('#mobile-menu')) {
                    this.close();
                }
            });
        },
        close() {
            document.getElementById('hamburger')?.classList.remove('open');
            const menu = document.getElementById('mobile-menu');
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
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            if (!sections.length || !navLinks.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                        if (active) active.classList.add('active');
                    }
                });
            }, { threshold: 0.3, rootMargin: '-10% 0px -55% 0px' });

            sections.forEach(s => observer.observe(s));
        }
    };

    /* ─────────────────────────────────────────
       5. SCROLL REVEAL
    ───────────────────────────────────────── */
    const ScrollReveal = {
        init() {
            const elements = document.querySelectorAll(
                '.reveal, .reveal-left, .reveal-right, .reveal-scale'
            );
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el    = entry.target;
                        const delay = Number(el.dataset.delay || 0);
                        setTimeout(() => el.classList.add('visible'), delay);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

            elements.forEach(el => observer.observe(el));
        }
    };

    /* ─────────────────────────────────────────
       6. TYPING ANIMATION
    ───────────────────────────────────────── */
    const TypeWriter = {
        el: null, words: [], index: 0, char: 0, deleting: false, timeout: null,
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
                this.timeout = setTimeout(() => {
                    this.deleting = true;
                    this.char = word.length;
                    this.tick();
                }, 2400);
                return;
            }
            if (this.deleting && current === '') {
                this.deleting = false;
                this.char = 0;
                this.index = (this.index + 1) % this.words.length;
                this.timeout = setTimeout(() => this.tick(), 450);
                return;
            }
            this.char = this.deleting ? this.char - 1 : this.char + 1;
            this.timeout = setTimeout(() => this.tick(), this.deleting ? 42 : 88);
        }
    };

    /* ─────────────────────────────────────────
       7. COUNTER ANIMATION
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
            const duration = 1800;
            const start    = performance.now();
            const update   = (now) => {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased    = 1 - Math.pow(1 - progress, 3);
                const value    = eased * target;
                const display  = target % 1 === 0 ? Math.round(value) : value.toFixed(1);
                el.textContent = prefix + display + suffix;
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = prefix + target + suffix;
            };
            requestAnimationFrame(update);
        }
    };

    /* ─────────────────────────────────────────
       8. CONTACT FORM
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
                const body    = `Bonjour Rostand,\n\n${message}\n\n---\n${name}\n${email}`;
                window.location.href = `mailto:rostandsurel@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                const btn  = form.querySelector('.form-submit');
                const orig = btn.innerHTML;
                btn.innerHTML = '✓ Opened in your email client';
                btn.disabled  = true;
                setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 4000);
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
            window.addEventListener('scroll', () => {
                navbar.style.boxShadow = window.scrollY > 10 ? 'var(--shadow-md)' : 'none';
            }, { passive: true });
        }
    };

    /* ─────────────────────────────────────────
       10. SCROLL PROGRESS BAR
    ───────────────────────────────────────── */
    const ScrollProgress = {
        init() {
            const bar = document.getElementById('scroll-progress');
            if (!bar) return;
            window.addEventListener('scroll', () => {
                const scrollTop  = window.scrollY;
                const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
                const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                bar.style.width  = pct + '%';
            }, { passive: true });
        }
    };

    /* ─────────────────────────────────────────
       11. CUSTOM CURSOR
    ───────────────────────────────────────── */
    const CustomCursor = {
        dot: null, ring: null,
        ringX: 0, ringY: 0,
        raf: null,

        init() {
            this.dot  = document.getElementById('cursor-dot');
            this.ring = document.getElementById('cursor-ring');
            if (!this.dot || !this.ring) return;
            if (window.matchMedia('(pointer: coarse)').matches) return; // hide on touch

            document.addEventListener('mousemove', (e) => {
                const { clientX: x, clientY: y } = e;
                // Dot follows instantly
                this.dot.style.left = x + 'px';
                this.dot.style.top  = y + 'px';
                // Ring lerps
                this.targetX = x;
                this.targetY = y;
            });

            // Lerp ring
            const lerp = (a, b, t) => a + (b - a) * t;
            const tick = () => {
                this.ringX = lerp(this.ringX || this.targetX || 0, this.targetX || 0, 0.18);
                this.ringY = lerp(this.ringY || this.targetY || 0, this.targetY || 0, 0.18);
                if (this.ring) {
                    this.ring.style.left = this.ringX + 'px';
                    this.ring.style.top  = this.ringY + 'px';
                }
                this.raf = requestAnimationFrame(tick);
            };
            tick();

            // Hover states on interactive elements
            const interactives = document.querySelectorAll('a, button, .project-card, .stat-card, .bento-cell');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => this.ring?.classList.add('hovered'));
                el.addEventListener('mouseleave', () => this.ring?.classList.remove('hovered'));
            });

            // Hide/show on enter/leave
            document.addEventListener('mouseleave', () => {
                this.dot.style.opacity  = '0';
                this.ring.style.opacity = '0';
            });
            document.addEventListener('mouseenter', () => {
                this.dot.style.opacity  = '1';
                this.ring.style.opacity = '1';
            });
        }
    };

    /* ─────────────────────────────────────────
       12. HERO CANVAS PARTICLES
    ───────────────────────────────────────── */
    const HeroParticles = {
        canvas: null, ctx: null, particles: [], raf: null,
        W: 0, H: 0,

        getAccentColor() {
            const theme = document.documentElement.getAttribute('data-theme');
            return theme === 'dark'
                ? { r: 139, g: 92, b: 246 }
                : { r: 124, g: 58,  b: 237 };
        },

        init() {
            this.canvas = document.getElementById('hero-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.create();
            this.animate();
            window.addEventListener('resize', () => this.resize(), { passive: true });
        },

        restart() {
            cancelAnimationFrame(this.raf);
            this.create();
            this.animate();
        },

        resize() {
            if (!this.canvas) return;
            const section = this.canvas.parentElement;
            this.W = this.canvas.width  = section.offsetWidth;
            this.H = this.canvas.height = section.offsetHeight;
        },

        create() {
            this.particles = [];
            const count = Math.min(Math.floor((this.W * this.H) / 14000), 80);
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x:     Math.random() * this.W,
                    y:     Math.random() * this.H,
                    r:     Math.random() * 1.5 + 0.5,
                    vx:    (Math.random() - 0.5) * 0.35,
                    vy:    (Math.random() - 0.5) * 0.35,
                    alpha: Math.random() * 0.4 + 0.1
                });
            }
        },

        animate() {
            const { ctx, W, H, particles } = this;
            ctx.clearRect(0, 0, W, H);
            const c = this.getAccentColor();

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.alpha})`;
                ctx.fill();
            });

            // Draw connecting lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx   = particles[i].x - particles[j].x;
                    const dy   = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
                        ctx.lineWidth   = 0.6;
                        ctx.stroke();
                    }
                }
            }

            this.raf = requestAnimationFrame(() => this.animate());
        }
    };

    /* ─────────────────────────────────────────
       13. CARD 3D TILT
    ───────────────────────────────────────── */
    const CardTilt = {
        init() {
            const cards = document.querySelectorAll('.tilt-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect   = card.getBoundingClientRect();
                    const cx     = rect.left + rect.width / 2;
                    const cy     = rect.top  + rect.height / 2;
                    const dx     = (e.clientX - cx) / (rect.width  / 2);
                    const dy     = (e.clientY - cy) / (rect.height / 2);
                    const tiltX  = dy * -8;
                    const tiltY  = dx *  8;
                    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                    card.style.transition = 'transform 0.4s ease';
                    setTimeout(() => card.style.transition = '', 400);
                });
            });
        }
    };

    /* ─────────────────────────────────────────
       14. STAGGERED CARD REVEAL
    ───────────────────────────────────────── */
    const StaggerReveal = {
        init() {
            const grids = document.querySelectorAll('.what-grid');
            grids.forEach(grid => {
                Array.from(grid.children).forEach((item, i) => {
                    if (!item.classList.contains('reveal')) {
                        item.classList.add('reveal');
                        item.dataset.delay = i * 70;
                    }
                });
            });
        }
    };

    /* ─────────────────────────────────────────
       15. INIT
    ───────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        ThemeSwitcher.init();
        MobileMenu.init();
        SmoothScroll.init();
        NavHighlight.init();
        NavbarScroll.init();
        ScrollProgress.init();
        CustomCursor.init();
        HeroParticles.init();
        TypeWriter.init();
        StaggerReveal.init();
        ScrollReveal.init();
        CounterAnimation.init();
        ContactForm.init();
        CardTilt.init();
    });

})();
