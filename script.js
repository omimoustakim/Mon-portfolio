/* =====================================================
   OMIDIDJI MOUSTAKIM — PORTFOLIO JS
   Fonctionnalités :
   - Curseur personnalisé
   - Navbar scroll
   - Typed text effect
   - Scroll reveal animations
   - Compteurs animés
   - Menu burger mobile
   - Formulaire de contact
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // CURSEUR PERSONNALISÉ
  // =====================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor scale on hover
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cursor.style.background = 'var(--cyan)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
      follower.style.borderColor = 'var(--cyan)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--pink)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.borderColor = 'var(--pink)';
    });
  });

  // =====================
  // NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Navigation active link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--pink)' : '';
    });
  }, { passive: true });

  // =====================
  // TYPED TEXT EFFECT
  // =====================
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'Ingénieur Logiciel',
    'Développeur Full-stack',
    'Architecte d\'applications',
    'Passionné du code propre',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 800);

  // =====================
  // SCROLL REVEAL
  // =====================
  const revealElements = document.querySelectorAll('.reveal, .skill-card, .project-card, .about-grid, .contact-grid, .section-header');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grouped elements
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards in grid
    if (el.classList.contains('skill-card') || el.classList.contains('project-card')) {
      el.dataset.delay = (i % 4) * 100;
    }
    revealObserver.observe(el);
  });

  // =====================
  // COMPTEURS ANIMÉS
  // =====================
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // =====================
  // MENU BURGER MOBILE
  // =====================
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.style.display = 'flex';
    mobileMenu.classList.toggle('open', menuOpen);
    // Burger animation
    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      setTimeout(() => { mobileMenu.style.display = 'none'; }, 350);
    });
  });

  // =====================
  // FORMULAIRE CONTACT
  // =====================
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      shakeForm();
      return;
    }
    if (!isValidEmail(email)) {
      form.email.style.borderColor = '#FF3CAC';
      form.email.focus();
      return;
    }

    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span:first-child').textContent = 'Envoi en cours...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.querySelector('span:first-child').textContent = 'Envoyer le message';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });

  // Reset error styles on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.style.borderColor = '';
    });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeForm() {
    form.style.animation = 'none';
    form.offsetHeight; // reflow
    form.style.animation = 'shake 0.4s ease';
  }

  // Shake keyframe via JS (si absent du CSS)
  if (!document.querySelector('#shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
      @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%      { transform: translateX(-8px); }
        40%      { transform: translateX(8px); }
        60%      { transform: translateX(-5px); }
        80%      { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }

  // =====================
  // SMOOTH SCROLL NAV
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =====================
  // FOOTER ANNÉE
  // =====================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =====================
  // PARALLAX BLOBS (léger)
  // =====================
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelector('.blob-1') &&
      (document.querySelector('.blob-1').style.transform = `translateY(${y * 0.15}px)`);
    document.querySelector('.blob-2') &&
      (document.querySelector('.blob-2').style.transform = `translateY(${y * -0.10}px)`);
  }, { passive: true });

});
