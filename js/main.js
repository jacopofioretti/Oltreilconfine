/* ============================================
   OLTRECONFINE UNGARETTI — main.js
   ============================================ */

'use strict';

// ── Page Loader ──────────────────────────────
(function () {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loader-progress');
  const count = document.getElementById('loader-count');
  if (!loader) return;

  let p = 0;
  const tick = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(tick); }
    progress.style.width = p + '%';
    if (count) count.textContent = Math.floor(p) + '%';
    if (p === 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger hero bg animation
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) heroBg.classList.add('loaded');
      }, 400);
    }
  }, 60);

  document.body.style.overflow = 'hidden';
})();

// ── Custom Cursor ──────────────────────────────
(function () {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  let raf;
  function updateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(updateRing);
  }
  updateRing();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

// ── Navigation ──────────────────────────────
(function () {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (!nav) return;

  // Scroll behaviour
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

// ── Reveal on Scroll ──────────────────────────
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
})();

// ── Parallax Dividers ──────────────────────────
(function () {
  const dividers = document.querySelectorAll('.parallax-divider img');
  if (!dividers.length) return;

  const onScroll = () => {
    dividers.forEach(img => {
      const rect = img.closest('.parallax-divider').getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset = (progress - 0.5) * 80;
      img.style.transform = `translateY(${offset}px)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Number Counter Animation ──────────────────
(function () {
  const stats = document.querySelectorAll('.stat-number[data-count]');
  if (!stats.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const dur = 1600;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => io.observe(el));
})();

// ── Gallery Infinite Scroll ──────────────────
(function () {
  const track = document.querySelector('.gallery-track');
  if (!track) return;
  // Duplicate items for seamless loop
  const items = track.innerHTML;
  track.innerHTML = items + items;
})();

// ── Smooth Anchor Scroll ─────────────────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72');
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ── Text Split Reveal (hero title) ───────────
(function () {
  // Already handled via CSS animations — nothing needed here
  // Could enhance with SplitType if library added
})();

// ── Active Nav Link ─────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();

// ── Contact Form Validation ──────────────────
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit span');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Invio in corso…';
    setTimeout(() => {
      btn.textContent = '✓ Inviato';
      setTimeout(() => { btn.textContent = orig; }, 3000);
    }, 1200);
  });
})();

// ── Timeline Item Hover Effect ────────────────
(function () {
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'background 0.3s';
    });
  });
})();

// ── PDF Modal ─────────────────────────────────
function openPdfModal(pdfUrl, title) {
  const modal = document.getElementById('pdf-modal');
  const iframe = document.getElementById('pdf-modal-iframe');
  const titleEl = document.getElementById('pdf-modal-title');
  const dlBtn = document.getElementById('pdf-modal-download');
  if (!modal || !iframe) return;

  iframe.src = pdfUrl;
  if (titleEl) titleEl.textContent = title || 'Documento PDF';
  if (dlBtn) { dlBtn.href = pdfUrl; dlBtn.download = pdfUrl.split('/').pop(); }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

(function () {
  const closeBtn = document.getElementById('pdf-modal-close');
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  function closePdfModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // Slight delay before clearing src to avoid flash
    setTimeout(() => {
      const iframe = document.getElementById('pdf-modal-iframe');
      if (iframe) iframe.src = '';
    }, 400);
  }

  if (closeBtn) closeBtn.addEventListener('click', closePdfModal);

  // Close on backdrop click
  modal.addEventListener('click', e => {
    if (e.target === modal) closePdfModal();
  });

  // Keyboard: Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closePdfModal();
  });

  // Card keyboard accessibility
  document.querySelectorAll('.locandina-card[role="button"]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });
})();

// ── Keyboard accessibility ─────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const mobileMenu = document.querySelector('.nav-mobile.open');
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.querySelector('.nav-burger')?.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});
