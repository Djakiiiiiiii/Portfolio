/* ═══════════════════════════════════════════
   PORTFOLIO JAVASCRIPT
   Animations · Navigation · Interactions
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleNavScroll);

  // ── Mobile Navigation ──
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ──
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(num => counterObserver.observe(num));

  function animateCounter(el, target) {
    let current = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 30));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 30);
  }

  // ── Skill Bar Animation ──
  const skillBars = document.querySelectorAll('.skill-bar');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level');
          bar.style.setProperty('--bar-width', `${level}%`);
          bar.classList.add('animate');
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ── Smooth Scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-primary');
    const originalHTML = btn.innerHTML;

    // Show success state
    btn.innerHTML = `<span>Pesan Terkirim! ✓</span>`;
    btn.style.background = 'linear-gradient(135deg, #28c840, #20a834)';

    // Reset form
    contactForm.reset();

    // Restore button after 3 seconds
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      lucide.createIcons();
    }, 3000);
  });

  // ── Parallax Effect on Hero Shapes ──
  const shapes = document.querySelectorAll('.shape');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 15;
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ── Tilt Effect on Hero Card ──
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroCard.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateY(-3deg) rotateX(2deg)';
    });
  }

  // ── Typing Effect on Code Block ──
  const codeBlock = document.querySelector('.hero-card-body code');
  if (codeBlock) {
    const cursor = document.querySelector('.code-cursor');
    if (cursor) {
      // Add subtle glow animation to cursor
      cursor.style.textShadow = '0 0 8px rgba(122, 162, 247, 0.6)';
    }
  }
});
