// Pixel-art sprite library — text grids rendered to crisp SVG <rect> pixels.
// Each char maps to a colour; '.' = transparent.

const PAL = {
  '.': null,
  B: '#4d63d8', // blue
  D: '#3a4fc4', // deep blue
  L: '#dbe4ff', // light blue
  l: '#aebcf0', // mid light
  W: '#ffffff',
  K: '#2a2e57', // ink
  k: '#4b5286',
  Y: '#e6a23c', // yellow
  y: '#f6d79a',
  G: '#43b88c', // green
  g: '#bde6d6',
  P: '#6d7be6', // heart/purple
  R: '#e0698a', // pink
  r: '#f3c1d2',
  S: '#f1c9a5', // skin
  H: '#8a5a3a', // hair
  C: '#c3cdf3', // cloud
  T: '#28306e', // terminal bg
  o: '#ff9d57', // orange accent
};

export function px(grid, scale) {
  const w = grid[0].length, h = grid.length;
  let r = '';
  grid.forEach((row, y) => {
    [...row].forEach((c, x) => {
      const col = PAL[c];
      if (col) r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${col}"/>`;
    });
  });
  return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${r}</svg>`;
}

// ---- 12x12 module icons ----
export const ICONS = {
  // 01 rocket — new paradigm
  rocket: [
    '....WW......','...WBBW.....','...WBBW.....','..WBDDBW....','..WBDDBW....',
    '..WBLLBW....','.WBBDDBBW...','WB.WBBW.BW..','...oYo......','..oYYYo.....','...oYo......','....o.......'],
  // 02 download — install
  install: [
    '............','...WWWWWW...','...WBBBBW...','...WBBBBW...','...WBBBBW...',
    '.WWBBBBBBWW.','..WBBBBBBW..','...WBBBBW...','....WBBW....','.....WW.....','WWWWWWWWWWWW','WLLLLLLLLLLW'],
  // 03 terminal — CLI
  terminal: [
    'WWWWWWWWWWWW','WTTTTTTTTTTW','WTGGTTTTTTTW','WTTTTTTTTTTW','WTWGTTTTTTTW',
    'WTWWGTTTTTTW','WTWGTTTTTTTW','WTTTTTTYYYTW','WTTTTTTTTTTW','WTTTTTTTTTTW','WTTTTTTTTTTW','WWWWWWWWWWWW'],
  // 04 toggle — modes
  toggle: [
    '............','............','.WWWWWWWWWW.','WLLLLLLBBBBW','WLLLLLBBBBBW',
    'WLLLLBBDDBBW','WLLLLBBDDBBW','WLLLLLBBBBBW','WLLLLLLBBBBW','.WWWWWWWWWW.','............','............'],
  // 05 slash — commands
  slash: [
    'WWWWWWWWWWWW','WTTTTTTTTTTW','WTTTTTTBBTTW','WTTTTTBBTTTW','WTTTTBBTTTTW',
    'WTTTBBTTTTTW','WTTBBTTTTTTW','WTBBTTTTTTTW','WTTTTTTTTTTW','WTTTTBBBBBTW','WTTTTTTTTTTW','WWWWWWWWWWWW'],
  // 06 brain/memory — CLAUDE.md
  memory: [
    '...WWWW.....','..WBBBBW....','.WBLLLLBW...','WBLBLBLBLW..','WBLLLLLLBW..',
    'WBLBLBLBLW..','WBLLLLLLBW..','.WBLLLLBW...','..WBBBBW.WW.','...WBBW.WPPW','........WPPW','.........WW.'],
  // 07 broom — compact/context
  broom: [
    '..........W.','.........WB.','........WBW.','.......WBW..','......WBW...',
    '.....WBW....','....WYYW....','...WYYYYW...','..WYYYYYYW..','..YGYGYGY...','.YGYGYGYG...','YGYGYGYGY...'],
  // 08 chat — prompts
  chat: [
    '.WWWWWWWWWW.','WLLLLLLLLLLW','WLBBLLLLLLLW','WLLLLLLLLLLW','WLBBBBBBLLLW',
    'WLLLLLLLLLLW','WLBBBBLLLLLW','WLLLLLLLLLLW','.WWWWWWLWWW.','......WLW...','.......WW...','............'],
  // 09 clipboard — plan
  plan: [
    '...WWWWWW...','..WLBBBBLW..','.WLLLLLLLLW.','WLLWWWWWWLLW','WLLWGLLLLWLW',
    'WLLWLGLLLWLW','WLLWLLGLLWLW','WLLWGLLLLWLW','WLLWLLLLLWLW','WLLWWWWWWWLW','WLLLLLLLLLLW','.WWWWWWWWWW.'],
  // 10 star — skills
  star: [
    '......W.....','.....WBW....','.....WBW....','....WBDBW...','WWWWBDDDBWWW',
    '.WBDDDDDDBW.','..WBDDDDBW..','...WBDDBW...','..WBDWWDBW..','.WBW....WBW.','WW........WW','............'],
  // 11 robots — subagents
  robots: [
    '.WBBW..WBBW.','WBLLBWWBLLBW','WBWBBWWBWBBW','WBLLBWWBLLBW','.WBBWWWWBBW.',
    '..WWBWWBWW..','.WBBBWWBBBW.','WBLLBWWBLLBW','WBLLBWWBLLBW','WBBBWWWWBBBW','.WW......WW.','............'],
  // 12 puzzle — plugins
  puzzle: [
    '.WWWW..WWWW.','WBBBW..WBBBW','WBBBWWWWBBBW','WBBBBBBBBBBW','WBBBBBBBBBBW',
    'WWWBBBBBBWWW','..WBBBBBBW..','WWWBBBBBBWWW','WBBBBBBBBBBW','WBBBWWWWBBBW','WBBBW..WBBBW','.WWWW..WWWW.'],
  // 13 plug — MCP
  plug: [
    '...W..W.....','...W..W.....','..WBBBBW....','..WBBBBW....','..WBBBBW....',
    '...WBBW.....','....WW......','....WW......','.WWWWWWWW...','WLLLLLLLLW..','WLLGGGGLLW..','.WWWWWWWW...'],
  // 14 hook
  hook: [
    '....WWW.....','...WBBBW....','...WBLBW....','...WBLBW....','...WBLBW....',
    '...WBLBW....','...WBLBW....','..WBLLBW....','WBBLLLBW....','WBLLLBW.....','WBBBBW......','.WWWW.......'],
  // 15 clock — cron
  clock: [
    '...WWWWWW...','.WWBBBBBBWW.','WBLLLLLLLLBW','WBLLLWLLLLBW','WBLLLWLLLLBW',
    'WBLLLWLLLLBW','WBLLLWWWWLBW','WBLLLLLLLLBW','WBLLLLLLLLBW','.WWBBBBBBWW.','...WWWWWW...','............'],
  // 16 loop — refresh
  loop: [
    '...WWWWW....','..WBBBBBW...','.WBW...WBW..','WBW.....WBWY','WBW......WWY',
    'WBW.....YYYY','WBW......YY.','.WBW...WBW..','..WBBBBBW...','...WWWWW....','............','............'],
  // 17 bee — hivemind
  bee: [
    '....WW..WW..','...WBW..WBW.','....WWWWWW...','...WYKYKYW...','..WKYKYKYKW..',
    '.LWYKYKYKYWL','LWLKYKYKYKWL','.LWYKYKYKYWL','..WKYKYKYKW..','...WYYKYYW...','....WKKW....','.....WW.....'],
  // 18 shield — security
  shield: [
    '..WWWWWWWW..','.WBBBBBBBBW.','WBLLLLLLLLBW','WBLLLGGLLLBW','WBLLGGGGLLBW',
    'WBLGGWWGGLBW','WBLLGGGGLLBW','WBLLLGGLLLBW','.WBLLLLLLBW.','..WBLLLLBW..','...WBLLBW...','....WBBW....'],
  // 19 cloud — backup
  cloud: [
    '............','.....WWWW...','...WWLLLLWW..','..WLLLLLLLLW.','.WLLLBBBBLLW.',
    'WLLLBWWWWBLLW','WLLBWGGGGWBLW','WLLLBWWWWBLLW','.WLLLBBBBLLW.','..WWLLLLLLWW.','....WWWWWW...','............'],
  // 20 target — audience/analytics
  target: [
    '...WWWWWW...','.WWBBBBBBWW.','WBLLLLLLLLBW','WBLWWWWWWLBW','WBLWRRRRWLBW',
    'WBLWRWWRWLBW','WBLWRWWRWLBW','WBLWRRRRWLBW','WBLWWWWWWLBW','WBLLLLLLLLBW','.WWBBBBBBWW.','...WWWWWW...'],
  // finish — flag
  flag: [
    '.W..........','.WWWWWWWW...','.WBDBDBDBW..','.WDBDBDBDW..','.WBDBDBDBW..',
    '.WDBDBDBDW..','.WWWWWWWW...','.W..........','.W..........','.W..........','.WWWW.......','............'],
  // heart
  heart: [
    '............','.WPPW.WPPW..','WPRRPWPRRPW.','WPRRRPRRRPW.','WPRRRRRRRPW.',
    '.WPRRRRRPW..','..WPRRRPW...','...WPRPW....','....WPW.....','.....W......','............','............'],
  // cat
  cat: [
    '.W....W.....','WBW..WBW....','WBBWWBBW....','WBLLLLBW....','WBKLLKBW....',
    'WBLLLLBW....','WBLooLBW....','.WBLLBW..WW.','.WBBBBW.WBW.','.WBBBBWWBW..','.WWWWWWWW...','............'],
};

// social icons (sidebar/footer) — simple 12x12
export const SOCIAL = {
  heart: ICONS.heart,
  tg: [
    '............','.WWWWWWWWWW.','WLLLLLLLLLLW','WLLLLLLWLLLW','WLLLLLWWWLLW',
    'WLLWWWWWWLLW','WLLLWWWLLLLW','WLLLLWWLLLLW','WLLLLLWLLLLW','WLLLLLLLLLLW','.WWWWWWWWWW.','............'],
  ig: [
    '.WWWWWWWWWW.','WLLLLLLLLBLW','WLLWWWWLLLLW','WLWLLLLWLLLW','WLWLLLLWLLLW',
    'WLWLLLLWLLLW','WLLWWWWLLLLW','WLLLLLLLLLLW','WLLLLLLLLLLW','WLLLLLLLLLLW','.WWWWWWWWWW.','............'],
};

// Big hero pixel scene: woman at laptop, window, cat, plant, "you can" poster
export const HERO = `
<svg viewBox="0 0 120 90" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet" style="width:100%;height:100%">
  <!-- window -->
  <rect x="58" y="8" width="34" height="30" fill="#fff"/>
  <rect x="58" y="8" width="34" height="30" fill="none" stroke="#aebcf0" stroke-width="1.4"/>
  <rect x="60" y="10" width="14" height="13" fill="#cfe0ff"/>
  <rect x="76" y="10" width="14" height="13" fill="#cfe0ff"/>
  <rect x="60" y="25" width="14" height="11" fill="#dbe8ff"/>
  <rect x="76" y="25" width="14" height="11" fill="#dbe8ff"/>
  <!-- city silhouettes -->
  <rect x="61" y="16" width="3" height="7" fill="#b6c6f5"/><rect x="65" y="13" width="3" height="10" fill="#aebcf0"/>
  <rect x="69" y="17" width="3" height="6" fill="#b6c6f5"/><rect x="78" y="15" width="3" height="8" fill="#aebcf0"/>
  <rect x="82" y="12" width="3" height="11" fill="#b6c6f5"/><rect x="86" y="17" width="3" height="6" fill="#aebcf0"/>
  <!-- poster you can -->
  <rect x="98" y="12" width="16" height="18" fill="#fff" stroke="#aebcf0" stroke-width="1.2"/>
  <rect x="101" y="16" width="10" height="2" fill="#4d63d8"/><rect x="101" y="20" width="8" height="2" fill="#4d63d8"/>
  <rect x="104" y="25" width="3" height="3" fill="#e0698a"/>
  <!-- shelf + plant -->
  <rect x="96" y="40" width="22" height="2" fill="#aebcf0"/>
  <rect x="100" y="34" width="6" height="6" fill="#ffffff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="101" y="30" width="1.5" height="5" fill="#43b88c"/><rect x="103" y="29" width="1.5" height="6" fill="#43b88c"/><rect x="105" y="31" width="1.5" height="4" fill="#43b88c"/>
  <!-- desk -->
  <rect x="6" y="70" width="108" height="4" fill="#c3cdf3"/>
  <rect x="6" y="74" width="108" height="2" fill="#aebcf0"/>
  <!-- chair back -->
  <rect x="30" y="44" width="22" height="26" fill="#b6c6f5"/>
  <!-- woman: hair -->
  <rect x="34" y="30" width="16" height="14" fill="#8a5a3a"/>
  <rect x="32" y="36" width="4" height="16" fill="#8a5a3a"/><rect x="48" y="36" width="5" height="18" fill="#8a5a3a"/>
  <rect x="40" y="26" width="4" height="3" fill="#8a5a3a"/>
  <!-- bun + tie -->
  <rect x="41" y="24" width="3" height="3" fill="#8a5a3a"/><rect x="40" y="28" width="5" height="2" fill="#9cc0ff"/>
  <!-- face -->
  <rect x="37" y="34" width="11" height="11" fill="#f1c9a5"/>
  <rect x="40" y="38" width="2" height="2" fill="#2a2e57"/><rect x="44" y="38" width="2" height="2" fill="#2a2e57"/>
  <rect x="41" y="42" width="4" height="1" fill="#e0698a"/>
  <!-- sweater -->
  <rect x="33" y="45" width="20" height="22" fill="#9cc0ff"/>
  <rect x="31" y="50" width="4" height="14" fill="#9cc0ff"/><rect x="51" y="50" width="4" height="14" fill="#9cc0ff"/>
  <rect x="41" y="49" width="4" height="4" fill="#e0698a"/>
  <!-- arms to laptop -->
  <rect x="33" y="60" width="8" height="4" fill="#f1c9a5"/><rect x="45" y="60" width="8" height="4" fill="#f1c9a5"/>
  <!-- laptop -->
  <rect x="60" y="56" width="26" height="14" fill="#e6ecff" stroke="#7c83b4" stroke-width="1"/>
  <rect x="62" y="58" width="22" height="10" fill="#28306e"/>
  <rect x="64" y="60" width="2" height="2" fill="#43b88c"/><rect x="67" y="60" width="8" height="1.5" fill="#dbe4ff"/>
  <rect x="64" y="63" width="12" height="1.5" fill="#9aa6e6"/><rect x="64" y="65" width="6" height="1.5" fill="#9aa6e6"/>
  <rect x="56" y="70" width="34" height="2.5" fill="#c3cdf3"/>
  <rect x="71" y="62" width="4" height="4" fill="#e0698a"/>
  <!-- mug -->
  <rect x="92" y="64" width="7" height="6" fill="#ffffff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="99" y="65" width="2" height="3" fill="none" stroke="#aebcf0" stroke-width="1"/>
  <rect x="94" y="66" width="3" height="2" fill="#e0698a"/>
  <!-- books -->
  <rect x="100" y="62" width="14" height="3" fill="#9cc0ff"/><rect x="101" y="65" width="13" height="3" fill="#e0698a"/><rect x="100" y="68" width="14" height="2" fill="#4d63d8"/>
  <!-- cat -->
  <rect x="14" y="58" width="2" height="3" fill="#ffffff"/><rect x="19" y="58" width="2" height="3" fill="#ffffff"/>
  <rect x="13" y="60" width="9" height="8" fill="#ffffff" stroke="#c3cdf3" stroke-width="1"/>
  <rect x="15" y="62" width="2" height="2" fill="#2a2e57"/><rect x="18" y="62" width="2" height="2" fill="#2a2e57"/>
  <rect x="16" y="64" width="3" height="1" fill="#e0698a"/>
  <rect x="13" y="64" width="8" height="6" fill="#ffffff" stroke="#c3cdf3" stroke-width="1"/>
  <rect x="21" y="62" width="2" height="8" fill="#ffffff" stroke="#c3cdf3" stroke-width="1"/>
  <!-- flowers -->
  <rect x="6" y="58" width="6" height="12" fill="#eaf0ff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="7" y="50" width="1.5" height="8" fill="#43b88c"/><rect x="10" y="48" width="1.5" height="10" fill="#43b88c"/>
  <rect x="6" y="48" width="3" height="3" fill="#9cc0ff"/><rect x="9" y="46" width="3" height="3" fill="#e0698a"/>
  <!-- sparkles -->
  <rect x="54" y="20" width="2" height="2" fill="#e6a23c"/><rect x="53" y="19" width="1" height="1" fill="#f6d79a"/><rect x="56" y="22" width="1" height="1" fill="#f6d79a"/>
  <rect x="92" y="48" width="2" height="2" fill="#c3cdf3"/><rect x="24" y="44" width="2" height="2" fill="#c3cdf3"/>
</svg>`;
