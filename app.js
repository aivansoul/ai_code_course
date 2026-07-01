// Copy buttons
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

// ---- Progress tracking (localStorage): module completion + self-checks ----
(function () {
  const KEY = 'cfw-progress', CKEY = 'cfw-checks';
  const load = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { return new Set(); } };
  const save = s => localStorage.setItem(KEY, JSON.stringify([...s]));
  let done = load();

  function apply() {
    document.querySelectorAll('.mcard[data-mod]').forEach(c => c.classList.toggle('done', done.has(+c.dataset.mod)));
    document.querySelectorAll('.side-list a[data-mod]').forEach(a => a.classList.toggle('done', done.has(+a.dataset.mod)));
    document.querySelectorAll('.done-btn[data-mod]').forEach(b => {
      const on = done.has(+b.dataset.mod);
      b.classList.toggle('is-done', on);
      const t = b.querySelector('.db-txt'); if (t) t.textContent = on ? 'Сделано!' : 'Отметить сделанным';
    });
    const banner = document.querySelector('.prog-banner');
    if (banner) {
      const total = +banner.dataset.total || 20, n = done.size, pct = Math.round(n / total * 100);
      banner.querySelector('.pb-count').textContent = n;
      banner.querySelector('.pb-pct').textContent = pct + '%';
      banner.querySelector('.pb-fill').style.width = pct + '%';
      banner.classList.toggle('complete', n >= total);
      const r = banner.querySelector('.pb-reset'); if (r) r.hidden = n === 0;
    }
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('.done-btn');
    if (b) {
      const m = +b.dataset.mod;
      done.has(m) ? done.delete(m) : done.add(m);
      save(done); apply();
      return;
    }
    const r = e.target.closest('.pb-reset');
    if (r && confirm('Сбросить весь прогресс курса?')) {
      done = new Set(); save(done); apply();
      localStorage.removeItem(CKEY);
      document.querySelectorAll('.checklist .ck').forEach(c => c.checked = false);
    }
  });
  apply();

  // self-check checkboxes persist per page
  let cs = {}; try { cs = JSON.parse(localStorage.getItem(CKEY) || '{}'); } catch (e) {}
  const pid = (location.pathname.split('/').pop() || 'index');
  document.querySelectorAll('.checklist .ck').forEach((cb, i) => {
    const k = pid + ':' + i;
    if (cs[k]) cb.checked = true;
    cb.addEventListener('change', () => { cs[k] = cb.checked; localStorage.setItem(CKEY, JSON.stringify(cs)); });
  });
})();
