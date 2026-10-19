// Section navigation: the tmux bar (desktop) and the TV remote (phones). Both highlight the section in view,
// and jump between sections behind a CRT "channel change": the screen collapses to a bright line, the page
// jumps, and it reopens through a burst of static.
const bar = document.querySelector<HTMLElement>('.tmux');
const tv = document.querySelector<HTMLElement>('.tv');
if (bar && tv) {
  const links = [...bar.querySelectorAll<HTMLAnchorElement>('a[data-key]')];
  const allLinks = [...document.querySelectorAll<HTMLAnchorElement>('.tmux a[data-key], .remote-list a[data-key]')];
  const pos = bar.querySelector<HTMLElement>('.pos b')!;
  const remote = document.querySelector<HTMLElement>('.remote');
  const list = document.querySelector<HTMLElement>('.remote-list');
  const nowBtn = remote?.querySelector<HTMLButtonElement>('.now');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
  let busy = false, current = 0;

  async function jump(id: string) {
    const target = document.getElementById(id);
    if (!target || busy) return;
    history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`);
    navigator.vibrate?.(8);                   // a tiny "click" on phones that support it
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
  const jumpTo = (i: number) => links[i] && jump(links[i].hash.slice(1));

  function setList(open: boolean) {
    if (!list || !nowBtn) return;
    list.hidden = !open;
    nowBtn.setAttribute('aria-expanded', String(open));
  }

  document.addEventListener('click', e => {
    const el = e.target as Element;
    const a = el.closest<HTMLAnchorElement>('.tmux a[data-key], .remote-list a[data-key]');
    if (a) { e.preventDefault(); setList(false); return jump(a.hash.slice(1)); }
    if (el.closest('.remote .up')) return jumpTo(Math.max(0, current - 1));
    if (el.closest('.remote .down')) return jumpTo(Math.min(links.length - 1, current + 1));
    if (el.closest('.remote .now')) return setList(!!list?.hidden);
    if (!el.closest('.remote')) setList(false);
  });

  addEventListener('keydown', e => {
    if (e.key === 'Escape') setList(false);
    if (e.ctrlKey || e.metaKey || e.altKey || (e.target as Element).closest('input, textarea, [contenteditable]')) return;
    if (/^\d$/.test(e.key)) jumpTo(Number(e.key));
  });

  // active window / channel: whichever section crosses the middle of the viewport
  const pad = (n: number) => String(n).padStart(2, '0');
  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      current = Math.max(0, links.findIndex(a => a.hash === `#${en.target.id}`));
      for (const a of allLinks) a.toggleAttribute('aria-current', a.hash === `#${en.target.id}`);
      for (const ch of document.querySelectorAll('.ch')) ch.textContent = `CH ${pad(current)}`;
      const name = remote?.querySelector('.ch-name');
      if (name) name.textContent = links[current].dataset.label ?? '';
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
