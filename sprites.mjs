// Pixel-art sprite library — text grids rendered to crisp SVG <rect> pixels.
// Each char maps to a colour; '.' = transparent. Icons are 16x16.

const PAL = {
  '.': null,
  B: '#5b76e6', // blue fill
  D: '#33409f', // deep blue outline/shadow
  L: '#cdd8ff', // light blue highlight
  l: '#aebcf0', // mid light
  W: '#ffffff',
  K: '#2a2e57', // ink
  k: '#5b62a0',
  Y: '#f0b94a', // yellow
  y: '#ffe49c',
  o: '#f3954e', // orange
  G: '#4cc293', // green
  g: '#bfe6d6',
  P: '#7b88ea', // purple
  R: '#e36f93', // pink
  r: '#f6c7d6',
  S: '#f1c9a5', // skin
  s: '#e0ad84', // skin shade
  H: '#7a5435', // hair dark
  h: '#a9763f', // hair light
  C: '#c3cdf3', // cloud / chair
  m: '#d2d8ee', // metal light (laptop)
  n: '#9aa3c4', // metal dark
  e: '#eef2ff', // off white
};

export function px(grid) {
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

// ---- 16x16 module icons (clean two-tone, white keyline + blue fill + shading) ----
export const ICONS = {
  // 01 rocket — new paradigm
  rocket: [
    '.......DD.......',
    '......DBBD......',
    '......DLLD......',
    '.....DBWWBD....',
    '.....DBWWBD....',
    '.....DBLLBD....',
    '....DBBLLBBD...',
    '...DBD.BB.DBD..',
    '...DD..BB..DD..',
    '.......BB......',
    '.....YDBBDY....',
    '.....oYYYYo....',
    '......oYYo.....',
    '.......YY......',
    '.......oo......',
    '...............'],
  // 02 download — install
  install: [
    '...............',
    '......DDDD.....',
    '.....DBLLBD....',
    '.....DBLLBD....',
    '.....DBLLBD....',
    '...DBDBLLBDBD..',
    '....DBBLLBBD...',
    '.....DBLLBD....',
    '......DBBD.....',
    '.......DD......',
    '...............',
    '..DDDDDDDDDDD..',
    '..DBLLLLLLLBD..',
    '..DBLBLBLBLBD..',
    '..DDDDDDDDDDD..',
    '...............'],
  // 03 terminal — CLI
  terminal: [
    '...............',
    '.DDDDDDDDDDDDD.',
    '.DKKKKKKKKKKKD.',
    '.DKGKKKKKKKKKD.',
    '.DKKGKKKKKKKKD.',
    '.DKGKKKKKKKKKD.',
    '.DKKKKKKKKKKKD.',
    '.DKKKKKYYYYYKD.',
    '.DKKKKKKKKKKKD.',
    '.DKLKKKKKKKKKD.',
    '.DKKKKKKKKKKKD.',
    '.DDDDDDDDDDDDD.',
    '...............',
    '....DDDDDDD....',
    '..DDDDDDDDDDD..',
    '...............'],
  // 04 sliders — modes
  toggle: [
    '...............',
    '...............',
    '..DDDDDDDDDDD..',
    '.DBLLLLLBBBBBD.',
    '.DBLLLLBWWBBBD.',
    '.DBLLLLBWWBBBD.',
    '.DBLLLLLBBBBBD.',
    '..DDDDDDDDDDD..',
    '..DDDDDDDDDDD..',
    '.DBBBBBLLLLLBD.',
    '.DBBBWWBLLLLBD.',
    '.DBBBWWBLLLLBD.',
    '.DBBBBBLLLLLBD.',
    '..DDDDDDDDDDD..',
    '...............',
    '...............'],
  // 05 slash command — "/"
  slash: [
    '...............',
    '.DDDDDDDDDDDDD.',
    '.DKKKKKKKKKKKD.',
    '.DKKKKKKKLBKKD.',
    '.DKKKKKKLBKKKD.',
    '.DKKKKKLBKKKKD.',
    '.DKKKKLBKKKKKD.',
    '.DKKKLBKKKKKKD.',
    '.DKKLBKKKKKKKD.',
    '.DKKKKKKKKKKKD.',
    '.DKKKKLLLLLKKD.',
    '.DKKKKKKKKKKKD.',
    '.DDDDDDDDDDDDD.',
    '...............',
    '...............',
    '...............'],
  // 06 book — CLAUDE.md memory
  memory: [
    '...............',
    '..DDDDD.DDDDD..',
    '.DBLLLBDBLLLBD.',
    '.DBLLLBDBLLLBD.',
    '.DBWWLBDBWWWBD.',
    '.DBLLLBDBLLLBD.',
    '.DBWWLBDBWWWBD.',
    '.DBLLLBDBLLLBD.',
    '.DBWWLBDBWWWBD.',
    '.DBLLLBDBLLLBD.',
    '.DBLLLBDBLLLBD.',
    '.DDDDDDKDDDDDD.',
    '..DDDDDDDDDDD..',
    '...............',
    '...............',
    '...............'],
  // 07 broom — context cleanup
  broom: [
    '...............',
    '............DD.',
    '..........DBBD.',
    '.........DBBD..',
    '........DBBD...',
    '.......DBBD....',
    '......DYYDD....',
    '.....DYYYYD....',
    '....DYYYYYYD...',
    '....YGYGYGYY...',
    '...YGYGYGYGY...',
    '...YGYGYGYGY...',
    '..YGYGYGYGYGY..',
    '..Y.G.Y.G.Y.G..',
    '...............',
    '...............'],
  // 08 chat — prompts
  chat: [
    '...............',
    '..DDDDDDDDDDD..',
    '.DBLLLLLLLLLBD.',
    '.DBLWWLLLLLLBD.',
    '.DBLLLLLLLLLBD.',
    '.DBLWWWWWLLLBD.',
    '.DBLLLLLLLLLBD.',
    '.DBLWWWWLLLLBD.',
    '.DBLLLLLLLLLBD.',
    '.DDDDDDBLDDDDD.',
    '......DBLD.....',
    '......DBD......',
    '.......D.......',
    '...............',
    '...............',
    '...............'],
  // 09 clipboard — plan
  plan: [
    '.....DDDDD.....',
    '....DBLLLBD....',
    '...DDDDDDDDD...',
    '..DBLLLLLLLBD..',
    '..DBLDDDDDLBD..',
    '..DBLGLLLLLBD..',
    '..DBLLGLLLLBD..',
    '..DBGLLGLLLBD..',
    '..DBLGLLLLLBD..',
    '..DBLLLLLLLBD..',
    '..DBLDDDDDLBD..',
    '..DBLLLLLLLBD..',
    '..DBLLLLLLLBD..',
    '..DDDDDDDDDDD..',
    '...............',
    '...............'],
  // 10 star — skills
  star: [
    '.......D.......',
    '......DBD......',
    '......DBD......',
    '.....DBLBD.....',
    'DDDDDDBLBDDDDDD',
    '.DBLLLLLLLLLBD.',
    '..DBLLLLLLLBD..',
    '...DBLLLLLBD...',
    '...DBLLLLLBD...',
    '..DBLBDDDBLBD..',
    '.DBLBD...DBLBD.',
    '.DBD.......DBD.',
    '.DD.........DD.',
    '...............',
    '...............',
    '...............'],
  // 11 robot — subagents
  robots: [
    '......DD.......',
    '......DBD......',
    '...DDDDDDDDD...',
    '..DBLLLLLLLBD..',
    '..DBLWWLWWLBD..',
    '..DBLWKLWKLBD..',
    '..DBLLLLLLLBD..',
    '..DBLLWWWLLBD..',
    '..DDDDDDDDDDD..',
    '.DBD.DBBBD.DBD.',
    '.DBD.DBLBD.DBD.',
    '.DBD.DBLBD.DBD.',
    '.DDD.DDDDD.DDD.',
    '...............',
    '...............',
    '...............'],
  // 12 puzzle — plugins
  puzzle: [
    '...............',
    '....DDDD.......',
    '...DBLLBD......',
    '..DDBLLBDD.....',
    '.DBLBLLBLBDDDD.',
    '.DBLLLLLLLBLLBD',
    '.DBLLLLLLLLLLBD',
    '.DDBLLLLLLBLLBD',
    '..DBLLLLLBDDDD.',
    '..DBLLLLLBD....',
    '..DBLLLLLBD....',
    '..DDDDDDDDD....',
    '...............',
    '...............',
    '...............',
    '...............'],
  // 13 plug — MCP
  plug: [
    '....D.....D....',
    '....D.....D....',
    '...DBD...DBD...',
    '..DBLBDDDBLBD..',
    '..DBLLLLLLLBD..',
    '..DBLLLLLLLBD..',
    '..DDBLLLLLBDD..',
    '...DBLLLLLBD...',
    '....DBLLLBD....',
    '.....DBLBD.....',
    '......DBD......',
    '.....DBLBD.....',
    '....DBLLLBD....',
    '....DBGGGBD....',
    '....DDDDDDD....',
    '...............'],
  // 14 hook
  hook: [
    '.....DDD.......',
    '....DBLBD......',
    '....DBLBD......',
    '....DDLDD......',
    '.....DLD.......',
    '.....DLD.......',
    '.....DLD.......',
    '.....DLD.......',
    '.....DLD.DDD...',
    '..DD.DLD.......',
    '.DBLDDLD.......',
    '.DBLLLBD.......',
    '.DBLLBD........',
    '..DBBD.........',
    '...DD..........',
    '...............'],
  // 15 clock — cron
  clock: [
    '.....DDDDD.....',
    '...DDLLLLLDD...',
    '..DBLLLLLLLBD..',
    '.DBLLLLDLLLLBD.',
    '.DBLLLLDLLLLBD.',
    'DBLLLLLDLLLLLBD',
    'DBLLLLLDLLLLLBD',
    'DBLLLLLDDDLLLBD',
    'DBLLLLLLLLLLLBD',
    '.DBLLLLLLLLLBD.',
    '.DBLLLLLLLLLBD.',
    '..DBLLLLLLLBD..',
    '...DDLLLLLDD...',
    '.....DDDDD.....',
    '...............',
    '...............'],
  // 16 loop — refresh
  loop: [
    '...............',
    '.....DDDDD.....',
    '...DBLLLLLBD...',
    '..DBLDDDDDLBD..',
    '..DBD.....DBDDD',
    '.DBLD......DBLD',
    '.DBD.......DDDD',
    '.DBD......YYYY.',
    '.DBLD.....YYY..',
    '..DBD....YDBD..',
    '..DBLDDDDDLBD..',
    '...DBLLLLLBD...',
    '.....DDDDD.....',
    '...............',
    '...............',
    '...............'],
  // 17 bee — hivemind
  bee: [
    '...D.......D...',
    '...DLD...DLD...',
    '....DLD.DLD....',
    '.....DDLDD.....',
    '....DYKYKYD....',
    '...LDKYKYKDL...',
    '..LLDYKYKYDLL..',
    '..LLDKYKYKDLL..',
    '...LDYKYKYDL...',
    '....DKYKYKD....',
    '....DYYKYYD....',
    '.....DKKD......',
    '......DD.......',
    '...............',
    '...............',
    '...............'],
  // 18 shield — security
  shield: [
    '...DDDDDDDDD...',
    '..DBLLLLLLLBD..',
    '.DBLLLLLLLLLBD.',
    '.DBLLLLGLLLLBD.',
    '.DBLLLGGGLLLBD.',
    '.DBLLGGWGGLLBD.',
    '.DBLLLGGGLLLBD.',
    '.DBLLLLGLLLLBD.',
    '.DBLLLLLLLLLBD.',
    '..DBLLLLLLLBD..',
    '..DBLLLLLLLBD..',
    '...DBLLLLLBD...',
    '....DBLLLBD....',
    '.....DBLBD.....',
    '......DBD......',
    '.......D.......'],
  // 19 cloud — backup
  cloud: [
    '...............',
    '......DDDD.....',
    '....DDLLLLDD...',
    '...DLLLLLLLLD..',
    '..DLLDDDDDLLLD.',
    '.DLLDBGGGBDLLD.',
    'DLLDBGWWGBDLLLD',
    'DLLDBGGGGBDLLLD',
    '.DLDBGWWGBDLLD.',
    '..DLDDDDDDLLD..',
    '...DLLLLLLLD...',
    '....DDDDDDD....',
    '...............',
    '...............',
    '...............',
    '...............'],
  // 20 target — audience / analytics
  target: [
    '.....DDDDD.....',
    '...DDLLLLLDD...',
    '..DLLLLLLLLLD..',
    '.DLLDDDDDDDLLD.',
    '.DLLDBLLLBDLLD.',
    'DLLDBRRRRRBDLLD',
    'DLLDBRWWRBDLLLD',
    'DLLDBRWWRBDLLLD',
    'DLLDBRRRRRBDLLD',
    '.DLLDBLLLBDLLD.',
    '.DLLDDDDDDDLLD.',
    '..DLLLLLLLLLD..',
    '...DDLLLLLDD...',
    '.....DDDDD.....',
    '...............',
    '...............'],
  // finish — flag
  flag: [
    '..D............',
    '..DDDDDDDDD....',
    '..DBLBLBLBD....',
    '..DLBLBLBLD....',
    '..DBLBLBLBD....',
    '..DLBLBLBLD....',
    '..DBLBLBLBD....',
    '..DDDDDDDDD....',
    '..D............',
    '..D............',
    '..D............',
    '.DDD...........',
    'DBLLBD.........',
    'DDDDDD.........',
    '...............',
    '...............'],
  // heart
  heart: [
    '...............',
    '..DDD.....DDD..',
    '.DRRRD...DRRRD.',
    'DRWRRRD.DRRRRD.',
    'DRWRRRRDRRRRRD.',
    'DRRRRRRRRRRRRD.',
    '.DRRRRRRRRRRD..',
    '..DRRRRRRRRD...',
    '...DRRRRRRD....',
    '....DRRRRD.....',
    '.....DRRD......',
    '......DD.......',
    '...............',
    '...............',
    '...............',
    '...............'],
  // cat
  cat: [
    '..D........D...',
    '..DBD.....DBD..',
    '..DLBD...DBLD..',
    '..DWLBDDDBLWD..',
    '..DWLLLLLLLWD..',
    '..DWLKLLLKLWD..',
    '..DWLLLLLLLWD..',
    '..DWLLoRoLLWD..',
    '..DWLLLLLLLWD..',
    '...DWLLLLLWD...',
    '...DWLLLLLWDD..',
    '...DWLLLLLWDLD.',
    '...DWLLLLLWDLD.',
    '...DDDDDDDDDDD.',
    '...............',
    '...............'],
  // note markers (replace 💡 ⚠️ 🔑)
  tip: [
    '................',
    '......DDDD......',
    '.....DyYYyD.....',
    '....DyYWYYyD....',
    '....DyYWYYyD....',
    '....DyYYYYyD....',
    '....DyYYYYyD....',
    '.....DyYYyD.....',
    '.....DKKKKD.....',
    '......DWWD......',
    '.....DKKKKD.....',
    '......DWWD......',
    '......DKKD......',
    '.......DD.......',
    '................',
    '................'],
  warn: [
    '................',
    '.......DD.......',
    '......DYYD......',
    '......DYYD......',
    '.....DYYYYD.....',
    '.....DYKKYD.....',
    '....DYYKKYYD....',
    '....DYYKKYYD....',
    '...DYYYKKYYYD...',
    '...DYYYYYYYYD...',
    '..DYYYYKKYYYYD..',
    '..DYYYYYYYYYYD..',
    '..DDDDDDDDDDDD..',
    '................',
    '................',
    '................'],
  key: [
    '................',
    '...DDDDD........',
    '..DyYYYyD.......',
    '.DyYWWYYyD......',
    '.DyYWWYYyD......',
    '.DyYYYYYyD......',
    '..DyYYYyDD......',
    '...DDKDDD.......',
    '....DKD........',
    '....DKD........',
    '....DKDD.......',
    '....DKYD.......',
    '....DKDD.......',
    '....DKD........',
    '....DKD........',
    '.....D.........'],
};

// social icons (12x12)
export const SOCIAL = {
  heart: [
    '............','.DDD....DDD.','DRRRD..DRRRD','DRWRRDDRRRRD',
    'DRRRRRRRRRRD','.DRRRRRRRRD.','..DRRRRRRD..','...DRRRRD...',
    '....DRRD....','.....DD.....','............','............'],
  tg: [
    '............','.DDDDDDDDDD.','DBLLLLLLLLBD','DBLLLLLWLLBD','DBLLLLWWWLBD',
    'DBLWWWWWWLBD','DBLLLWWLLLBD','DBLLLLWLLLBD','DBLLLLWLLLBD','DBLLLLLLLLBD','.DDDDDDDDDD.','............'],
  ig: [
    '.DDDDDDDDDD.','DBLLLLLLLBLD','DBLDDDDLLLBD','DBLDLLDLLLBD','DBLDLLDLLWBD',
    'DBLDLLDLLLBD','DBLDDDDLLLBD','DBLLLLLLLLBD','DBLLLLLLLLBD','DBLLLLLLLLBD','.DDDDDDDDDD.','............'],
};

// ============================================================
//  HERO SCENE — woman at laptop, window+skyline, cat, plants,
//  books, mug, flowers, "you can" poster. viewBox 150x96.
// ============================================================
export const HERO = `
<svg viewBox="0 0 150 96" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet" style="width:100%;height:100%">
  <!-- ===== window + skyline ===== -->
  <rect x="56" y="10" width="50" height="38" fill="#ffffff"/>
  <rect x="56" y="10" width="50" height="38" fill="none" stroke="#aebcf0" stroke-width="1.6"/>
  <rect x="58" y="12" width="22" height="16" fill="#d7e6ff"/>
  <rect x="82" y="12" width="22" height="16" fill="#d7e6ff"/>
  <rect x="58" y="30" width="22" height="16" fill="#e4eeff"/>
  <rect x="82" y="30" width="22" height="16" fill="#e4eeff"/>
  <!-- skyline -->
  <rect x="59" y="20" width="4" height="8" fill="#b6c6f5"/><rect x="64" y="16" width="4" height="12" fill="#9fb2ef"/>
  <rect x="69" y="22" width="3" height="6" fill="#b6c6f5"/><rect x="73" y="18" width="4" height="10" fill="#aebcf0"/>
  <rect x="83" y="19" width="4" height="9" fill="#9fb2ef"/><rect x="88" y="15" width="4" height="13" fill="#b6c6f5"/>
  <rect x="93" y="21" width="3" height="7" fill="#aebcf0"/><rect x="98" y="17" width="4" height="11" fill="#9fb2ef"/>
  <rect x="65" y="14" width="2" height="2" fill="#ffe49c"/><rect x="89" y="13" width="2" height="2" fill="#ffe49c"/>
  <!-- ===== you-can poster ===== -->
  <rect x="112" y="14" width="20" height="24" fill="#ffffff" stroke="#aebcf0" stroke-width="1.4"/>
  <rect x="116" y="19" width="12" height="3" fill="#5b76e6"/><rect x="116" y="24" width="9" height="3" fill="#5b76e6"/>
  <rect x="119" y="31" width="3" height="3" fill="#e36f93"/>
  <!-- ===== shelf + plants ===== -->
  <rect x="110" y="44" width="30" height="2" fill="#aebcf0"/>
  <rect x="114" y="38" width="6" height="6" fill="#ffffff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="115" y="33" width="2" height="5" fill="#4cc293"/><rect x="117" y="31" width="2" height="7" fill="#4cc293"/><rect x="113" y="34" width="2" height="4" fill="#4cc293"/>
  <rect x="128" y="38" width="6" height="6" fill="#dbe4ff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="129" y="33" width="2" height="5" fill="#4cc293"/><rect x="131" y="32" width="2" height="6" fill="#4cc293"/><rect x="133" y="35" width="2" height="3" fill="#4cc293"/>
  <!-- ===== chair back ===== -->
  <rect x="38" y="44" width="34" height="40" fill="#c3cdf3"/>
  <rect x="38" y="44" width="34" height="40" fill="none" stroke="#aebcf0" stroke-width="1"/>
  <!-- ===== woman ===== -->
  <!-- hair back volume -->
  <rect x="38" y="28" width="34" height="30" fill="#7a5435"/>
  <rect x="36" y="34" width="4" height="20" fill="#7a5435"/><rect x="70" y="34" width="5" height="22" fill="#7a5435"/>
  <rect x="40" y="26" width="30" height="6" fill="#7a5435"/>
  <!-- hair highlights / waves -->
  <rect x="42" y="30" width="3" height="22" fill="#a9763f"/><rect x="67" y="32" width="3" height="20" fill="#a9763f"/>
  <rect x="48" y="27" width="14" height="3" fill="#a9763f"/>
  <!-- half-up bun -->
  <rect x="51" y="22" width="8" height="5" fill="#7a5435"/><rect x="53" y="20" width="4" height="3" fill="#a9763f"/>
  <rect x="49" y="26" width="12" height="2" fill="#9fb2ef"/>
  <!-- face -->
  <rect x="47" y="32" width="16" height="15" fill="#f1c9a5"/>
  <rect x="46" y="38" width="2" height="5" fill="#e0ad84"/>
  <rect x="50" y="38" width="2" height="2" fill="#2a2e57"/><rect x="57" y="38" width="2" height="2" fill="#2a2e57"/>
  <rect x="49" y="36" width="3" height="1" fill="#7a5435"/><rect x="56" y="36" width="3" height="1" fill="#7a5435"/>
  <rect x="53" y="41" width="2" height="2" fill="#e0ad84"/>
  <rect x="52" y="44" width="5" height="1" fill="#e36f93"/>
  <rect x="49" y="42" width="2" height="1" fill="#f6c7d6"/><rect x="58" y="42" width="2" height="1" fill="#f6c7d6"/>
  <!-- sweater -->
  <rect x="40" y="47" width="32" height="34" fill="#7e96f2"/>
  <rect x="40" y="47" width="32" height="34" fill="none" stroke="#5b76e6" stroke-width="0.5"/>
  <rect x="40" y="50" width="5" height="28" fill="#5b76e6"/>
  <rect x="67" y="50" width="5" height="28" fill="#9fb2ef"/>
  <rect x="50" y="47" width="12" height="4" fill="#9fb2ef"/>
  <rect x="54" y="50" width="4" height="4" fill="#e36f93"/>
  <!-- hand on chin -->
  <rect x="44" y="44" width="6" height="6" fill="#f1c9a5"/>
  <rect x="44" y="50" width="4" height="14" fill="#7e96f2"/>
  <!-- right arm to laptop -->
  <rect x="62" y="62" width="12" height="5" fill="#7e96f2"/>
  <rect x="72" y="64" width="7" height="4" fill="#f1c9a5"/>
  <!-- ===== desk ===== -->
  <rect x="4" y="80" width="142" height="6" fill="#c3cdf3"/>
  <rect x="4" y="86" width="142" height="3" fill="#aebcf0"/>
  <!-- ===== laptop ===== -->
  <rect x="74" y="62" width="30" height="18" fill="#d2d8ee" stroke="#9aa3c4" stroke-width="1"/>
  <rect x="76" y="64" width="26" height="14" fill="#2a2e57"/>
  <rect x="78" y="66" width="2" height="2" fill="#4cc293"/>
  <rect x="82" y="66" width="10" height="1.5" fill="#cdd8ff"/><rect x="78" y="70" width="16" height="1.5" fill="#9aa3c4"/><rect x="78" y="73" width="9" height="1.5" fill="#9aa3c4"/>
  <rect x="87" y="68" width="4" height="4" fill="#e36f93"/>
  <rect x="70" y="80" width="38" height="2.5" fill="#aebcf0"/>
  <!-- ===== mug ===== -->
  <rect x="110" y="73" width="9" height="7" fill="#ffffff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="119" y="74" width="2" height="4" fill="none" stroke="#aebcf0" stroke-width="1"/>
  <rect x="112" y="75" width="4" height="3" fill="#e36f93"/>
  <!-- ===== books ===== -->
  <rect x="120" y="74" width="18" height="2.5" fill="#9fb2ef"/>
  <rect x="121" y="76.5" width="17" height="2.5" fill="#e36f93"/>
  <rect x="120" y="79" width="18" height="2" fill="#5b76e6"/>
  <!-- ===== flowers in vase ===== -->
  <rect x="8" y="66" width="9" height="14" fill="#eef2ff" stroke="#aebcf0" stroke-width="1"/>
  <rect x="9" y="74" width="7" height="2" fill="#dbe4ff"/>
  <rect x="9" y="56" width="2" height="11" fill="#4cc293"/><rect x="12" y="53" width="2" height="14" fill="#4cc293"/><rect x="15" y="58" width="2" height="9" fill="#4cc293"/>
  <rect x="7" y="53" width="4" height="4" fill="#7e96f2"/><rect x="11" y="50" width="4" height="4" fill="#e36f93"/><rect x="14" y="55" width="4" height="4" fill="#9fb2ef"/>
  <rect x="8" y="54" width="2" height="2" fill="#ffe49c"/><rect x="12" y="51" width="2" height="2" fill="#ffe49c"/>
  <!-- ===== white cat ===== -->
  <rect x="124" y="60" width="3" height="4" fill="#ffffff" stroke="#c3cdf3" stroke-width="0.6"/>
  <rect x="133" y="60" width="3" height="4" fill="#ffffff" stroke="#c3cdf3" stroke-width="0.6"/>
  <rect x="123" y="63" width="14" height="9" fill="#ffffff" stroke="#c3cdf3" stroke-width="1"/>
  <rect x="126" y="66" width="2" height="2" fill="#2a2e57"/><rect x="132" y="66" width="2" height="2" fill="#2a2e57"/>
  <rect x="129" y="68" width="2" height="1" fill="#e36f93"/>
  <rect x="124" y="70" width="12" height="10" fill="#ffffff" stroke="#c3cdf3" stroke-width="1"/>
  <rect x="136" y="64" width="3" height="16" fill="#ffffff" stroke="#c3cdf3" stroke-width="1"/>
  <!-- ===== sparkles ===== -->
  <rect x="50" y="18" width="2" height="2" fill="#f0b94a"/><rect x="49" y="17" width="1" height="1" fill="#ffe49c"/><rect x="52" y="20" width="1" height="1" fill="#ffe49c"/>
  <rect x="108" y="54" width="2" height="2" fill="#c3cdf3"/><rect x="30" y="40" width="2" height="2" fill="#c3cdf3"/>
  <rect x="100" y="50" width="2" height="2" fill="#aebcf0"/>
</svg>`;
