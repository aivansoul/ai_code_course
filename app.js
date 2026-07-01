// Copy buttons + progress bar fill on view
document.addEventListener('click', e => {
  const btn = e.target.closest('.code .copy');
  if (!btn) return;
  const code = btn.parentElement.querySelector('pre code');
  const text = code ? code.innerText : '';
  navigator.clipboard.writeText(text).then(() => {
    const old = btn.textContent;
    btn.textContent = 'СКОПИРОВАНО ✓';
    btn.classList.add('done');
    setTimeout(() => { btn.textContent = old; btn.classList.remove('done'); }, 1400);
  }).catch(() => { btn.textContent = 'CTRL+C'; });
});

// scroll-driven sprite animation: advance frames as the page scrolls (gentle)
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sprites = [...document.querySelectorAll('.spr.scroll')];
  if (!sprites.length || reduce) return;
  let ticking = false;
  function update() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    for (const el of sprites) {
      const n = parseInt(getComputedStyle(el).getPropertyValue('--n')) || 4;
      const step = parseFloat(el.dataset.step) || 72;   // px of scroll per frame
      const fw = el.getBoundingClientRect().width || 1;
      // ping-pong through frames so motion eases back (0..n-1..1)
      const cycle = (n - 1) * 2 || 1;
      let p = Math.floor(y / step) % cycle;
      const f = p < n ? p : cycle - p;
      el.style.backgroundPositionX = (-(f * fw)) + 'px';
    }
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
})();

// animate module-grid bars when scrolled into view
const bars = document.querySelectorAll('.mbar i');
if (bars.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const i = en.target;
        i.style.width = getComputedStyle(i).getPropertyValue('--p') || '40%';
        io.unobserve(i);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
}
