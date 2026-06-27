import { writeFileSync } from 'node:fs';
import { ICONS, SOCIAL, HERO, px } from './sprites.mjs';
import { MODULES, BONUS, CHEATS, PROMPTS } from './content.mjs';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const icon = name => px(ICONS[name] || ICONS.star);
const id = i => String(i+1).padStart(2,'0');
const modFile = i => `module-${id(i)}.html`;

// progress: first 8 done, next show partial/locked like the mock
const progressOf = i => i < 8 ? 100 : i < 12 ? 35 : 0;
const lockedOf = i => i >= 9;

// ---------- shared chrome ----------
const head = title => `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#e9edfb" />
<title>${esc(title)} — CODE for women</title>
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon('heart'))}" />
<link rel="stylesheet" href="styles.css" />
</head>
<body>`;

const topnav = active => `
<header class="top"><div class="wrap nav">
  <a class="brand" href="index.html">CODE<span class="hb">&#10084;</span><small>for&nbsp;women</small></a>
  <nav class="nav-links">
    <a href="index.html">О курсе</a>
    <a href="index.html#modules">Модули</a>
    <a href="prompts.html">Промпты</a>
    <a href="bonus.html">Бонусы</a>
    <a href="cheatsheet.html">Шпаргалка</a>
  </nav>
  <a class="btn nav-cta" href="${active||'module-01.html'}">Начать обучение <span class="ic">&#10148;</span></a>
</div></header>`;

const sidebar = activeIdx => `
<aside class="sidebar">
  <div class="panel" style="padding:18px 14px">
    <div class="side-title"><span class="hb">&#10084;</span> Модули курса</div>
    <ul class="side-list">
      ${MODULES.map((m,i)=>`<li><a href="${modFile(i)}" class="${i===activeIdx?'active':''} ${lockedOf(i)?'lock':''}"><span class="n">${id(i)}</span> ${esc(shortTitle(m.title))}</a></li>`).join('')}
    </ul>
    <div class="side-bonus">
      <a href="prompts.html">&#128221; Промпты для бизнеса</a>
      <a href="bonus.html" style="margin-top:8px">&#127873; Бонусы</a>
    </div>
  </div>
</aside>`;

function shortTitle(t){ return t.split(/[:—]/)[0].trim(); }

const footer = `
<footer class="footer"><div class="wrap">
  <span class="hb">&#10084;</span> Сделано с любовью для тебя
  <span style="opacity:.6;margin-left:6px">© 2026 Code for Women · Claude Code Mastery</span>
  <span class="socials">
    <a href="#" aria-label="heart">${px(SOCIAL.heart)}</a>
    <a href="#" aria-label="instagram">${px(SOCIAL.ig)}</a>
    <a href="#" aria-label="telegram">${px(SOCIAL.tg)}</a>
  </span>
</div></footer>
<script src="app.js"></script>
</body></html>`;

// ---------- block renderer ----------
function renderBlock(b){
  switch(b.t){
    case 'p': return `<p>${b.html}</p>`;
    case 'h3': return `<h3>${esc(b.text)}</h3>`;
    case 'list': return `<${b.ordered?'ol':'ul'}>${b.items.map(x=>`<li>${x}</li>`).join('')}</${b.ordered?'ol':'ul'}>`;
    case 'steps': return `<div class="steps">${b.items.map(x=>`<div class="step">${x}</div>`).join('')}</div>`;
    case 'chips': return `<div class="chips">${b.items.map(x=>`<span class="chip">${x}</span>`).join('')}</div>`;
    case 'note': return `<div class="note ${b.kind}"><span class="ni">${({tip:'&#128161;',warn:'&#9888;&#65039;',key:'&#128273;'})[b.kind]||'&#128161;'}</span><div>${b.text}</div></div>`;
    case 'compare': return `<div class="compare">
        <div class="cbox bad"><span class="tag">&#10007; ${esc(b.bad.tag)}</span><p>${b.bad.text}</p></div>
        <div class="cbox good"><span class="tag">&#10003; ${esc(b.good.tag)}</span><p>${b.good.text}</p></div></div>`;
    case 'table': return `<table class="tbl"><thead><tr>${b.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'code': return codeBlock(b);
    case 'features': return `<div class="fgrid">${b.items.map(f=>`
        <div class="fcard"><div class="fi">${px(ICONS[f.icon]||ICONS.star)}</div>
          <h4>${esc(f.title)}</h4><p>${esc(f.text)}</p>${f.tag?`<span class="ft">${esc(f.tag)}</span>`:''}</div>`).join('')}</div>`;
    case 'details': return b.items.map(d=>`<details><summary>${esc(d.summary)}</summary><div class="detail">${d.code?codeBlock({code:d.code}):d.html||''}</div></details>`).join('');
    default: return '';
  }
}

function codeBlock({title,note,code}){
  return `<div class="code">
    <button class="copy" type="button">COPY</button>
    <pre><code>${esc(code)}</code></pre>
    ${note?`<div class="code-note">${note}</div>`:''}
  </div>`;
}

// ---------- INDEX ----------
function buildIndex(){
  const cards = MODULES.map((m,i)=>{
    const p = progressOf(i), lock = lockedOf(i);
    return `<a class="mcard panel" href="${modFile(i)}">
      <div class="mtop"><span class="mnum">${id(i)}</span>${lock?'<span class="mlock">&#128274;</span>':''}</div>
      <h4>${esc(shortTitle(m.title))}</h4>
      <div class="micon">${icon(m.icon)}</div>
      <div class="mbar"><i style="--p:${p}%"></i></div>
    </a>`;
  }).join('');

  const html = head('Главная') + topnav() + `
<main class="wrap"><div class="shell">
  ${sidebar(-1)}
  <div>
    <section class="hero panel">
      <div class="hero-l">
        <span class="hero-eyebrow">&#10084; Экспресс-курс</span>
        <h1>Claude.<br><span class="b">Код.</span> Ты.<span class="spk">&#10022;</span><span class="cursor"></span></h1>
        <p>Полный курс по эффективной работе с <b>Claude Code</b> — от первой команды до роя агентов. Для женщин, которые создают будущее.</p>
        <a class="btn" href="module-01.html">Начать обучение <span class="hb">&#10084;</span></a>
      </div>
      <div class="hero-r">
        <span class="spark s1" style="top:14%;left:12%">&#10022;</span>
        <span class="spark s2" style="top:26%;left:84%">&#10022;</span>
        <span class="spark s3" style="top:60%;left:8%">&#10022;</span>
        <span class="spark s4" style="top:44%;left:90%">&#10022;</span>
        ${HERO}
      </div>
    </section>

    <h2 class="block-title"><span class="hb">&#10084;</span> Все модули</h2>
    <div id="modules" class="modgrid">${cards}</div>
  </div>
</div></main>` + footer;
  writeFileSync('index.html', html);
}

// ---------- MODULE PAGES ----------
function buildModules(){
  MODULES.forEach((m,i)=>{
    const prev = i>0 ? `<a class="prev" href="${modFile(i-1)}"><span>&#8592; Назад · Модуль ${id(i-1)}</span>${esc(shortTitle(MODULES[i-1].title))}</a>` : `<a class="prev" href="index.html"><span>&#8592; На главную</span>Все модули</a>`;
    const next = i<MODULES.length-1 ? `<a class="next" href="${modFile(i+1)}"><span>Дальше · Модуль ${id(i+1)} &#8594;</span>${esc(shortTitle(MODULES[i+1].title))}</a>` : `<a class="next" href="bonus.html"><span>Дальше &#8594;</span>Бонусы и промпты</a>`;
    const p = Math.round(((i+1)/MODULES.length)*100);

    const sections = m.sections.map(s=>`<section class="section panel"><h2><span class="hb">&#10073;</span> ${esc(s.h2)}</h2>${s.blocks.map(renderBlock).join('')}</section>`).join('');

    const html = head(`Модуль ${id(i)}: ${shortTitle(m.title)}`) + topnav(modFile(i)) + `
<main class="wrap"><div class="shell">
  ${sidebar(i)}
  <div>
    <div class="mod-head panel">
      <div>
        <span class="eyebrow">Модуль ${id(i)}</span>
        <h1>${esc(m.title)}</h1>
        <p class="lead">${esc(m.lead)}</p>
      </div>
      <div class="mod-art bob">${icon(m.icon)}</div>
    </div>

    <div class="progress-wrap">
      <span class="ptxt">${id(i)}/${id(MODULES.length-1)}</span>
      <div class="pbar"><i style="width:${p}%"></i></div>
      <span class="ptxt">${p}%</span>
    </div>

    <div class="goal panel" style="box-shadow:none"><b><span>&#127919;</span> Результат модуля</b><p>${esc(m.goal)}</p></div>

    ${sections}

    <nav class="pager">${prev}${next}</nav>
  </div>
</div></main>` + footer;
    writeFileSync(modFile(i), html);
  });
}

// ---------- BONUS ----------
function buildBonus(){
  const flow = BONUS.finalFlow.map((s,i)=>`<div class="step"><b>${esc(s.n)}</b> — ${esc(s.t)}</div>`).join('');
  const plugins = BONUS.plugins.map(g=>`
    <section class="section panel"><h2><span class="hb">&#10073;</span> ${esc(g.group)}</h2>
      <div class="fgrid">${g.items.map(it=>`<div class="fcard"><div class="fi">${px(ICONS[g.icon]||ICONS.puzzle)}</div><h4>${esc(it.title)}</h4><p>${esc(it.text)}</p><span class="ft">${esc(it.tag)}</span></div>`).join('')}</div>
    </section>`).join('');
  const prompts = BONUS.prompts.map(p=>`<details><summary>${esc(p.title)}</summary><div class="detail">${codeBlock({code:p.code})}</div></details>`).join('');

  const html = head('Бонусы') + topnav() + `
<main class="wrap"><div class="shell">
  ${sidebar(-1)}
  <div>
    <div class="mod-head panel">
      <div><span class="eyebrow">&#127873; Бонусы</span><h1>${esc(BONUS.title)}</h1><p class="lead">${esc(BONUS.lead)}</p></div>
      <div class="mod-art bob">${icon('flag')}</div>
    </div>

    <section class="section panel"><h2><span class="hb">&#10073;</span> Финальный workflow: от идеи до продакшена</h2>
      <div class="steps">${flow}</div>
      <div class="note key"><span class="ni">&#128273;</span><div>Это весь курс на одной странице. Каждый шаг опирается на свой модуль — возвращайся, когда нужно.</div></div>
    </section>

    <h2 class="block-title"><span class="hb">&#10084;</span> Лучшие плагины под задачи</h2>
    ${plugins}

    <section class="section panel"><h2><span class="hb">&#10073;</span> Библиотека bulletproof-промптов</h2>
      <p>Готовые формы и intake — копируй и вставляй. Это самые надёжные шаблоны для работы с Claude Code.</p>
      ${prompts}
    </section>

    <nav class="pager">
      <a class="prev" href="module-20.html"><span>&#8592; Назад · Модуль 20</span>За пределами кода</a>
      <a class="next" href="cheatsheet.html"><span>Дальше &#8594;</span>Шпаргалка</a>
    </nav>
  </div>
</div></main>` + footer;
  writeFileSync('bonus.html', html);
}

// ---------- CHEATSHEET ----------
function buildCheatsheet(){
  const cards = CHEATS.map(c=>`<div class="cheat panel"><h3>${px(ICONS[c.icon]||ICONS.star)} ${esc(c.title)}</h3>
    <div class="cbody"><dl>${c.rows.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div></div>`).join('');

  const html = head('Шпаргалка') + topnav() + `
<main class="wrap"><div class="shell">
  ${sidebar(-1)}
  <div>
    <div class="mod-head panel">
      <div><span class="eyebrow">&#9889; Cheatsheet</span><h1>Шпаргалка Claude Code</h1><p class="lead">Всё самое нужное на одном экране. Распечатай или держи открытым рядом.</p></div>
      <div class="mod-art bob">${icon('terminal')}</div>
    </div>
    <div class="cheatgrid">${cards}</div>
    <div class="note tip" style="margin-top:18px"><span class="ni">&#128161;</span><div>Полные объяснения каждой строки — в соответствующих модулях курса. Эта страница — быстрый справочник.</div></div>
    <nav class="pager">
      <a class="prev" href="bonus.html"><span>&#8592; Назад</span>Бонусы и промпты</a>
      <a class="next" href="index.html"><span>На главную &#8594;</span>Все модули</a>
    </nav>
  </div>
</div></main>` + footer;
  writeFileSync('cheatsheet.html', html);
}

// ---------- PROMPTS LIBRARY ----------
function buildPrompts(){
  const anatomy = PROMPTS.anatomy.map(a=>`<div class="chip"><b>${esc(a.k)}</b> — ${esc(a.v)}</div>`).join('');
  const groups = PROMPTS.groups.map(g=>`
    <section class="section panel">
      <h2>${px(ICONS[g.icon]||ICONS.star)} ${esc(g.group)}</h2>
      ${g.items.map(it=>`<details><summary>${esc(it.title)}</summary><div class="detail">
        <p style="margin-top:0"><b>Когда:</b> ${esc(it.when)}</p>
        ${codeBlock({code:it.code})}
      </div></details>`).join('')}
    </section>`).join('');

  const html = head('Промпты для бизнеса') + topnav('prompts.html') + `
<main class="wrap"><div class="shell">
  ${sidebar(-1)}
  <div>
    <div class="mod-head panel">
      <div><span class="eyebrow">&#128221; Prompt Library</span><h1>${esc(PROMPTS.title)}</h1><p class="lead">${esc(PROMPTS.lead)}</p></div>
      <div class="mod-art bob">${icon('chat')}</div>
    </div>

    <section class="section panel">
      <h2><span class="hb">&#10073;</span> Анатомия модульного промпта</h2>
      <p>Любой промпт ниже — конструктор из 5 блоков. Меняй значения в <b>[КВАДРАТНЫХ СКОБКАХ]</b> под свой бизнес, переставляй и комбинируй блоки.</p>
      <div class="chips">${anatomy}</div>
      <div class="note tip"><span class="ni">&#128161;</span><div>Подключай свои данные через <code class="inline">@файл.md</code> и MCP (модуль 13) — тогда Claude отвечает не «в общем», а про <b>твой</b> продукт.</div></div>
    </section>

    ${groups}

    <nav class="pager">
      <a class="prev" href="bonus.html"><span>&#8592; Назад</span>Бонусы</a>
      <a class="next" href="cheatsheet.html"><span>Дальше &#8594;</span>Шпаргалка</a>
    </nav>
  </div>
</div></main>` + footer;
  writeFileSync('prompts.html', html);
}

buildIndex();
buildModules();
buildBonus();
buildPrompts();
buildCheatsheet();
console.log(`Built index + ${MODULES.length} modules + prompts + bonus + cheatsheet`);
