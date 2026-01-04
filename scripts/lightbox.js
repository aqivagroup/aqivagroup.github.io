// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = Array.from(document.querySelectorAll('.dealership-img'));
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || thumbs.length === 0) return;

  const lbImg = lightbox.querySelector('.lightbox-content img');
  const lbBox = lightbox.querySelector('.lightbox-content');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnNext = lightbox.querySelector('.lightbox-next');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  let currentIndex = -1;
  let lastFocused = null;

  thumbs.forEach(t => { if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex','0'); });

  function openAt(index) {
    const img = thumbs[index];
    if (!img) return;
    currentIndex = index;
    lastFocused = document.activeElement;
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';

    // floating window sizing (7in x 5in) with responsive fallback
    lbBox.style.width = '7in';
    lbBox.style.height = '5in';
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const px7in = 7 * 96;
    const px5in = 5 * 96;
    if (vw < px7in + 80 || vh < px5in + 80) {
      lbBox.style.width = 'calc(100% - 40px)';
      lbBox.style.height = 'auto';
    }

    // accessibility + focus management
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    if (btnClose) btnClose.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.removeAttribute('aria-modal');
    document.body.style.overflow = '';
    lbImg.src = '';
    lbBox.style.width = '';
    lbBox.style.height = '';
    currentIndex = -1;
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  function next() {
    if (currentIndex < thumbs.length - 1) openAt(currentIndex + 1);
  }

  function prev() {
    if (currentIndex > 0) openAt(currentIndex - 1);
  }

  thumbs.forEach((t, i) => {
    t.addEventListener('click', () => openAt(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
    });
  });

  if (btnClose) btnClose.addEventListener('click', close);
  if (btnNext) btnNext.addEventListener('click', next);
  if (btnPrev) btnPrev.addEventListener('click', prev);

  // click outside content closes
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // stop propagation for clicks inside the content
  lbBox.addEventListener('click', (e) => e.stopPropagation());

  // keyboard navigation and escape
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
});
// ...existing code...