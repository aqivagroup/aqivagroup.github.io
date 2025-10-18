// Mobile nav toggle script
(function() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;

  function closeNav() {
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
  }

  function openNav() {
    btn.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    nav.setAttribute('aria-hidden', 'false');
  }

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeNav(); else openNav();
  });

  // close on link click for mobile
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 768) closeNav();
    });
  });

  // ensure nav state on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('open');
      nav.style.display = '';
      nav.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      nav.setAttribute('aria-hidden', 'true');
    }
  });
})();
