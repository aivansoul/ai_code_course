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
