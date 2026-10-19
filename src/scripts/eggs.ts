// Konami code (or triple-tapping the λ logo, for phones) → 10s of full-colour vaporwave. Plus a hello for whoever opens devtools.
let timer = 0;
export function vapor() {
  const html = document.documentElement;
  html.classList.add('vapor');
  clearTimeout(timer);
  timer = window.setTimeout(() => html.classList.remove('vapor'), 10_000);
}

const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let i = 0;
addEventListener('keydown', e => {
  i = e.key.toLowerCase() === code[i].toLowerCase() ? i + 1 : (e.key === code[0] ? 1 : 0);
  if (i < code.length) return;
  i = 0;
  vapor();
});

// λ logo: on its own page it scrolls home instead of reloading; three quick taps = vapor mode
let taps: number[] = [];
document.querySelector('.tmux .session')?.addEventListener('click', e => {
  const a = e.currentTarget as HTMLAnchorElement;
  if (a.pathname !== location.pathname) return;
  e.preventDefault();
  const now = performance.now();
  taps = [...taps.filter(t => now - t < 700), now];
  if (taps.length >= 3) { taps = []; vapor(); }
  else scrollTo({ top: 0, behavior: 'smooth' });
});

console.log(`%c
    _    _     _____     _  ___  _     ___  _     _____ ____
   / \\  | |   | ____|   | |/ _ \\| |   / _ \\| |   | ____|  _ \\
  / _ \\ | |   |  _|  _  | | | | | |  | | | | |   |  _| | |_) |
 / ___ \\| |___| |___| |_| | |_| | |__| |_| | |___| |___|  _ <
/_/   \\_\\_____|_____|\\___/ \\___/|_____\\___/|_____|_____|_| \\_\\
`, 'font-family:monospace;color:#fff;background:#000');
console.log('%cHey, curious one. I\'m hiring myself out → acarlosaleman03@gmail.com', 'font:16px monospace');
