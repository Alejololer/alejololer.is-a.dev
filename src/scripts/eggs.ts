// Konami code → 10s of full-colour vaporwave. Plus a hello for whoever opens devtools.
const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let i = 0, timer = 0;
addEventListener('keydown', e => {
  i = e.key.toLowerCase() === code[i].toLowerCase() ? i + 1 : (e.key === code[0] ? 1 : 0);
  if (i < code.length) return;
  i = 0;
  const html = document.documentElement;
  html.classList.add('vapor');
  clearTimeout(timer);
  timer = window.setTimeout(() => html.classList.remove('vapor'), 10_000);
});

console.log(`%c
    _    _     _____     _  ___  _     ___  _     _____ ____
   / \\  | |   | ____|   | |/ _ \\| |   / _ \\| |   | ____|  _ \\
  / _ \\ | |   |  _|  _  | | | | | |  | | | | |   |  _| | |_) |
 / ___ \\| |___| |___| |_| | |_| | |__| |_| | |___| |___|  _ <
/_/   \\_\\_____|_____|\\___/ \\___/|_____\\___/|_____|_____|_| \\_\\
`, 'font-family:monospace;color:#fff;background:#000');
console.log('%cHey, curious one. I\'m hiring myself out → acarlosaleman03@gmail.com', 'font:16px monospace');
