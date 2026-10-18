import * as THREE from 'three';

// Port of prototypes/3-terminal-dream.html. Rule: everything slow, nothing dizzying.
export function start(canvas: HTMLCanvasElement) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  const r = new THREE.WebGLRenderer({ canvas, antialias: !coarse, powerPreference: 'low-power' });
  r.setPixelRatio(coarse ? 1 : Math.min(devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, .045);
  const cam = new THREE.PerspectiveCamera(55, 1, .1, 150);

  // low-poly terrain: flat-shaded grey + white edges, valley in the middle; heights periodic over D so two tiles leapfrog seamlessly
  const W = 60, D = 120;
  const g = new THREE.PlaneGeometry(W, D, coarse ? 20 : 40, coarse ? 40 : 80);
  g.rotateX(-Math.PI / 2);
  const pa = g.attributes.position;
  for (let i = 0; i < pa.count; i++) {
    const x = pa.getX(i), z = pa.getZ(i);
    const h = Math.sin(x * .35 + z * (Math.PI * 8 / D)) * Math.cos(z * (Math.PI * 12 / D)) + Math.sin(x * .9) * .4;
    pa.setY(i, h * (.4 + Math.abs(x) * .18) + Math.abs(x) * .15);
  }
  g.computeVertexNormals();
  const land = new THREE.Group();
  land.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0x1a1a1a, flatShading: true, roughness: 1 })));
  land.add(new THREE.LineSegments(new THREE.EdgesGeometry(g, 1), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .4 })));
  const land2 = land.clone();
  scene.add(land, land2);

  // torus knot that wobbles while you scroll and settles back to a clean knot when you stop
  const ku = { uV: { value: 0 }, uT: { value: 0 } };
  const tk = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2, .5, coarse ? 140 : 220, coarse ? 12 : 18),
    new THREE.MeshStandardMaterial({ color: 0xdddddd, flatShading: true, metalness: .2, roughness: .4, fog: false }),
  );
  tk.material.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, ku);
    sh.vertexShader = 'uniform float uV, uT;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
      vec3 transformed = position;
      float n = sin(position.x * 2.1 + uT * 1.3) * sin(position.y * 2.4 - uT * 1.1) * sin(position.z * 2.7 + uT * .9);
      transformed += normal * n * 1.2 * uV;
    `);
  };
  scene.add(tk);

  scene.add(new THREE.AmbientLight(0xffffff, .25));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(-10, 8, -20); scene.add(sun);
  const key = new THREE.DirectionalLight(0xffffff, 1); key.position.set(6, 10, 15); scene.add(key);

  // knot sits in the empty space right of the copy on wide screens (x scales with aspect), above it (smaller) on narrow ones
  const home = new THREE.Vector3(12, 6, -14);
  function size() {
    r.setSize(innerWidth, innerHeight, false);
    cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
    const narrow = cam.aspect < 1;
    home.set(narrow ? 0 : 9.5 * cam.aspect, narrow ? 8.5 : 6, -14);
    tk.scale.setScalar(narrow ? .7 : 1);
    tk.material.color.set(narrow ? 0x555555 : 0xdddddd);   // on phones copy runs over the knot: dim it so white text keeps contrast
    if (still) render();
  }

  // all motion is time-based (dt), so it looks the same at 30, 60 or 144 fps;
  // scroll speed is measured in px, so page length doesn't change how much the knot wobbles
  let sy = scrollY, t = 0, z = 0, vel = 0, last = performance.now();
  const ease = (rate: number, k: number) => 1 - Math.pow(1 - rate, k);   // per-60fps-frame lerp rate → this frame

  // pointer: caret snaps to a character grid, ghost blocks chase it (CRT afterglow), camera turns like your head
  const caret = document.querySelector<HTMLElement>('.caret');
  const defLabel = document.documentElement.lang === 'es' ? '[ abrir ]' : '[ open ]';
  const snap = (x: number, y: number) => `${Math.round(x / 10) * 10}px ${Math.round(y / 18) * 18}px`;
  const trail = (caret && !coarse && !still) ? Array.from({ length: 6 }, (_, i) => {
    const el = document.createElement('div');
    el.className = 'trail'; el.style.opacity = String(.45 - i * .07);
    document.body.append(el);
    return { el, x: -50, y: -50 };
  }) : [];
  const m = { x: 0, y: 0 }, s = { x: 0, y: 0 }, cur = { x: -50, y: -50 };
  if (caret && !coarse) {
    document.documentElement.classList.add('js');
    addEventListener('pointermove', e => {
      cur.x = e.clientX; cur.y = e.clientY;
      m.x = cur.x / innerWidth * 2 - 1; m.y = 1 - cur.y / innerHeight * 2;
      caret.style.translate = snap(cur.x, cur.y);
      const el = e.target instanceof Element ? e.target : null;
      const hot = el?.closest<HTMLElement>('a, summary, [data-cursor]');
      caret.classList.toggle('hot', !!hot);
      if (hot) caret.dataset.label = hot.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? defLabel;
    });
  }

  function render() {
    land.position.z = z % D; land2.position.z = land.position.z - D;
    cam.position.set(Math.sin(t * .05) * .8, 4, 18);
    cam.rotation.set(-.15 + s.y * .04, -s.x * .08, -s.x * .015);
    ku.uV.value = vel; ku.uT.value = t;
    tk.rotation.set(t * .05 - s.y * .3, t * .07 + s.x * .3, 0);
    tk.position.set(home.x + s.x * .8, home.y + s.y * .4, home.z);
    r.render(scene, cam);
  }

  // calibration: the approved prototype stepped per frame on a ~300Hz monitor, so k = "300Hz frames elapsed"
  const HZ = 300;
  function frame(now = performance.now()) {
    const dt = Math.min(.1, (now - last) / 1000), k = dt * HZ;
    last = now;
    const prevY = sy; sy += (scrollY - sy) * ease(.05, k);
    t += .016 * k;
    s.x += (m.x - s.x) * ease(.03, k); s.y += (m.y - s.y) * ease(.03, k);
    const v = Math.min(1, Math.abs(sy - prevY) / (22 * k || 1));        // ~22px per 300Hz frame of smoothed scroll = full wobble
    vel += (v - vel) * ease(v > vel ? .15 : .04, k);                     // quick to react, slow to settle back
    z += .018 * k;                                                       // steady cruise
    trail.forEach((g, i) => {
      const lead = i ? trail[i - 1] : cur;
      g.x += (lead.x - g.x) * ease(.35, Math.min(k, 5)); g.y += (lead.y - g.y) * ease(.35, Math.min(k, 5));
      g.el.style.translate = snap(g.x, g.y);
    });
    render();
    requestAnimationFrame(frame);
  }

  addEventListener('resize', size);
  size();
  if (still) render(); else frame();
}
