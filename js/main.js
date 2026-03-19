/* ═══════════════════════════════════════════════════════════
   JamyangJewels.com — Main JS
   Handles: scroll reveal, nav state, mobile menu, filter tabs
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll Reveal via Intersection Observer ─────────────── */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observer.observe(el);
    });
  }

  /* ── Navigation: scroll state ───────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const heroHeight = window.innerHeight * 0.4;

    function updateNav() {
      if (window.scrollY > heroHeight) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile Menu ────────────────────────────────────────── */
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.querySelector('.nav__mobile-menu');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── Active Nav Link ────────────────────────────────────── */
  function initActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── Collection Filter Tabs ─────────────────────────────── */
  function initCollectionFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.collection-item');

    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        items.forEach((item) => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 350);
          }
        });
      });
    });

    // Set up item transition styles
    items.forEach((item) => {
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    });
  }

  /* ── Parallax-lite for hero ─────────────────────────────── */
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = hero.offsetHeight;
          if (scrollY < heroHeight) {
            const progress = scrollY / heroHeight;
            const inner = hero.querySelector('.hero__inner');
            if (inner) {
              inner.style.transform = `translateY(${scrollY * 0.25}px)`;
              inner.style.opacity = 1 - progress * 1.8;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Gem shimmer on hover (touch-friendly) ──────────────── */
  function initGemHover() {
    const cards = document.querySelectorAll('.piece-card, .collection-item');
    cards.forEach((card) => {
      const gemBg = card.querySelector('.gem-bg');
      if (!gemBg) return;

      card.addEventListener('mouseenter', () => {
        gemBg.style.animationPlayState = 'running';
      });
    });
  }

  /* ── Current year in footer ─────────────────────────────── */
  function initYear() {
    const yearEls = document.querySelectorAll('.js-year');
    const year = new Date().getFullYear();
    yearEls.forEach((el) => { el.textContent = year; });
  }

  /* ── Smooth scroll for anchor links ─────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Init all ───────────────────────────────────────────── */
  function init() {
    initScrollReveal();
    initNav();
    initMobileMenu();
    initActiveNavLink();
    initCollectionFilters();
    initHeroParallax();
    initGemHover();
    initYear();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
