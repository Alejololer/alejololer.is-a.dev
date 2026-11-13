import type { WebGLRenderer } from 'three';

// The frame-rate lab (open the page with ?fps). Temporary: it exists to decide whether the scene should draw fewer frames
// than the monitor shows. It draws every Nth frame (an even cadence, so no judder: 300 Hz → 150, 100, 75, 60…) and
// measures what a drawn frame costs: main-thread time, and GPU time where the browser exposes it (timer queries).
// "ciego" picks a cadence without saying which, to find out where the difference stops being visible.
// ?fps=auto runs the whole comparison by itself (every cadence from 1/1 to 1/6, 4 s each) and leaves a table to copy.
export function lab(r: WebGLRenderer, setEvery: (n: number) => void) {
  const gl = r.getContext() as WebGL2RenderingContext;
  const ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
  const waiting: WebGLQuery[] = [];
  let open: WebGLQuery | null = null;
  let frames = 0, draws = 0, cpu = 0, gpu = 0, gpuN = 0, t0 = 0, since = performance.now(), every = 1, blind = false, fresh = true;
  const rates: number[] = [];

  const hud = document.createElement('div');
  hud.style.cssText = 'position:fixed;z-index:9;left:8px;bottom:8px;padding:6px 10px;background:#000;border:1px solid #fff;color:#fff;font:14px/1.35 ui-monospace,monospace;white-space:pre';
  const out = hud.appendChild(document.createElement('div'));
  const set = (n: number, hide = false) => { every = Math.max(1, Math.min(10, n)); blind = hide; setEvery(every); fresh = true; };
  for (const [label, fn] of [
    ['[ − fps ]', () => set(every + 1)], ['[ + fps ]', () => set(every - 1)],
    ['[ ciego ]', () => set(1 + Math.floor(Math.random() * 6), true)], ['[ revelar ]', () => { blind = false; }],
  ] as [string, () => void][]) {
    const b = hud.appendChild(document.createElement('button'));
    b.type = 'button'; b.textContent = label; b.onclick = fn;
    b.style.cssText = 'all:unset;margin:4px 10px 0 0;cursor:pointer';
  }
  document.body.append(hud);

  // ?fps=auto: step through the cadences, average each one's readings, then print the table
  const auto = new URLSearchParams(location.search).get('fps') === 'auto';
  const rows: string[] = [], seen: number[][] = [];
  let table = '';
  function step(n: number) {
    if (n === 1) seen.length = 0;                           // readings from before the run started
    if (seen.length) {
      const avg = (k: number) => seen.reduce((a, w) => a + w[k], 0) / seen.length, [fps, c, g] = [avg(0), avg(1), avg(2)];
      rows.push(`1/${n - 1}  ${fps.toFixed(0).padStart(4)} fps   CPU ${(c * fps / 10).toFixed(1).padStart(5)}%   GPU ${g < 0 ? '  n/d' : (g * fps / 10).toFixed(1).padStart(5) + '%'}   (${c.toFixed(2)} / ${g < 0 ? 'n/d' : g.toFixed(2)} ms por frame)`);
      seen.length = 0;
    }
    if (n > 6) {
      set(1);
      table = [`${navigator.userAgent}`, `${innerWidth}x${innerHeight} @${devicePixelRatio}x · ${String(gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL ?? gl.RENDERER))}`, ...rows].join('\n');
      const b = hud.appendChild(document.createElement('button'));
      b.type = 'button'; b.textContent = '[ copiar tabla ]'; b.style.cssText = 'all:unset;margin:4px 10px 0 0;cursor:pointer';
      b.onclick = () => navigator.clipboard.writeText(table).then(() => { b.textContent = '[ copiada ]'; });
      return;
    }
    set(n);
    setTimeout(() => step(n + 1), 4000);
  }
  if (auto) setTimeout(() => step(1), 2500);                // once the canvas has faded in and the first sweep is done

  return {
    begin() {
      t0 = performance.now();
      if (ext && waiting.length < 8) { open = gl.createQuery(); gl.beginQuery(ext.TIME_ELAPSED_EXT, open); }
    },
    end() {
      if (open) { gl.endQuery(ext.TIME_ELAPSED_EXT); waiting.push(open); open = null; }
      cpu += performance.now() - t0; draws++;
    },
    tick(now: number) {
      frames++;
      while (waiting.length && gl.getQueryParameter(waiting[0], gl.QUERY_RESULT_AVAILABLE)) {
        const q = waiting.shift()!;
        if (!gl.getParameter(ext.GPU_DISJOINT_EXT)) { gpu += gl.getQueryParameter(q, gl.QUERY_RESULT) / 1e6; gpuN++; }
        gl.deleteQuery(q);
      }
      // the first window after a change starts mid-frame: restart the count instead of reporting it
      if (fresh) { fresh = false; since = now; frames = draws = cpu = gpu = gpuN = 0; return; }
      const dt = (now - since) / 1000;
      if (dt < .5) return;
      rates.push(frames / dt); if (rates.length > 10) rates.shift();
      const hz = Math.max(...rates);                        // the monitor's rate: the fastest rAF ran over the last few seconds
      const fps = draws / dt, c = cpu / Math.max(1, draws), g = gpu / Math.max(1, gpuN);
      const pct = (ms: number) => `${(ms * fps / 10).toFixed(1)}%`;
      if (auto && !table) seen.push([fps, c, gpuN ? g : -1]);
      out.textContent = table ? `listo: 4 s por tope\n${rows.join('\n')}` : [
        `monitor ${hz.toFixed(0)} Hz`,
        blind ? 'tope    ?  (revelar para verlo)' : `tope    1/${every} → ${(hz / every).toFixed(0)} fps${every === 1 ? ' (sin tope)' : ''}`,
        blind ? 'dibuja  ?' : `dibuja  ${fps.toFixed(0)} fps`,
        blind ? 'CPU     ?' : `CPU     ${c.toFixed(2)} ms/frame · ${pct(c)} del hilo principal`,
        blind ? 'GPU     ?' : gpuN ? `GPU     ${g.toFixed(2)} ms/frame · ${pct(g)} del tiempo de GPU` : 'GPU     n/d en este navegador (mira el administrador de tareas)',
      ].join('\n');
      since = now; frames = draws = cpu = gpu = gpuN = 0;
    },
  };
}
