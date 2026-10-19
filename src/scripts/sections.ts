// tmux-style section bar: highlights the section in view, shows a vim-like position, and jumps
// between sections (click or number keys) behind a CRT "channel change": the screen collapses to a
// bright line, the page jumps, and it opens back up.
const bar = document.querySelector<HTMLElement>('.tmux');
const tv = document.querySelector<HTMLElement>('.tv');
if (bar && tv) {
  const links = [...bar.querySelectorAll<HTMLAnchorElement>('a[data-key]')];
  const pos = bar.querySelector<HTMLElement>('.pos b')!;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
  let busy = false;

  async function jump(id: string) {
    const target = document.getElementById(id);
    if (!target || busy) return;
    history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`);
    if (still) return target.scrollIntoView();
    busy = true;
    tv!.classList.add('off');
    await wait(170);
    target.scrollIntoView({ behavior: 'instant' });
    await wait(70);
    tv!.classList.replace('off', 'static');   // reopen through a burst of static…
    await wait(260);
    tv!.classList.remove('static');           // …that fades out
    busy = false;
  }

  bar.addEventListener('click', e => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-key]');
    if (!a) return;
    e.preventDefault();
    jump(a.hash.slice(1));
  });

  addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || (e.target as Element).closest('input, textarea, [contenteditable]')) return;
    const link = links[Number(e.key)];
    if (/^\d$/.test(e.key) && link) jump(link.hash.slice(1));
  });

  // active window: whichever section crosses the middle of the viewport
  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      for (const a of links) a.toggleAttribute('aria-current', a.hash === `#${en.target.id}`);
    }
  }, { rootMargin: '-45% 0px -54% 0px' });
  for (const a of links) { const s = document.getElementById(a.hash.slice(1)); if (s) io.observe(s); }

  // vim-style position: Top / NN% / Bot
  let queued = false;
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      pos.textContent = scrollY < 4 ? 'Top' : scrollY >= max - 4 ? 'Bot' : `${Math.round(scrollY / max * 100)}%`;
    });
  }, { passive: true });
}
