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
  // easter egg: click the knot and it turns into a 3D lambda in a ring (and back). Own material: the scroll
  // wobble would crack the extrusion's flat faces apart.
  const lamMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, flatShading: true, metalness: .2, roughness: .4, fog: false });
  const LAMBDA: [number, number][] = [[-.75, 1], [-.35, 1], [.8, -1], [.4, -1], [-.037, -.24], [-.45, -1], [-.85, -1], [-.2325, .1]];
  const lg = new THREE.ExtrudeGeometry(new THREE.Shape(LAMBDA.map(([x, y]) => new THREE.Vector2(x * 1.55, y * 1.55))),
    { depth: .5, bevelEnabled: true, bevelThickness: .12, bevelSize: .07, bevelSegments: 2 });
  lg.center();
  const lam = new THREE.Group();
  lam.add(new THREE.Mesh(lg, lamMat), new THREE.Mesh(new THREE.TorusGeometry(2.45, .2, 12, 96), lamMat));

  // the knot lives in its own layer, drawn after a depth clear: it floats above the terrain instead of sinking into it
  const fg = new THREE.Scene();
  const hero = new THREE.Group();
  hero.add(tk, lam);
  fg.add(hero);
  for (const layer of [scene, fg]) {
    layer.add(new THREE.AmbientLight(0xffffff, .25));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(-10, 8, -20);
    const key = new THREE.DirectionalLight(0xffffff, 1); key.position.set(6, 10, 15);
    layer.add(sun, key);
  }
  r.autoClear = false;

  // the knot roams the free space as you scroll: a slow Lissajous path in screen space (NDC),
  // right of the copy on wide screens, across the top on narrow ones; placed at a fixed distance along that view ray
  let narrow = false;
  const aim = new THREE.Vector3();
  function knotTarget(p: number, t: number) {
    const nx = narrow ? .45 * Math.sin(p * Math.PI * 3) : .62 + .16 * Math.sin(p * Math.PI * 3 + .6);
    const ny = (narrow ? .55 + .12 * Math.cos(p * Math.PI * 4) : .3 * Math.cos(p * Math.PI * 2.4)) + .03 * Math.sin(t * .3);
    return aim.set(nx, ny, .5).unproject(cam).sub(cam.position).normalize().multiplyScalar(30).add(cam.position);
  }

  function size() {
    r.setSize(innerWidth, innerHeight, false);
    cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
    narrow = cam.aspect < 1;
    hero.scale.setScalar(narrow ? .7 : 1);
    for (const mat of [tk.material, lamMat]) mat.color.set(narrow ? 0x555555 : 0xdddddd);   // on phones copy runs over the knot: dim it so white text keeps contrast
    if (still) render();
  }

  // all motion is time-based (dt), so it looks the same at 30, 60 or 144 fps;
  // scroll speed is measured in px, so page length doesn't change how much the knot wobbles
  const progress = () => scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
  let sy = scrollY, pk = progress(), t = 0, z = 0, vel = 0, last = performance.now(), placed = false;
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

  // knot ⇄ lambda: raycast clicks that land on the knot (ignored on controls or while selecting text)
  let lambda = false, mo = 0;
  // hit test against a sphere around the figure, not the exact tube: forgiving enough for a fingertip
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), ball = new THREE.Sphere();
  const overHero = (x: number, y: number) => {
    ray.setFromCamera(ndc.set(x / innerWidth * 2 - 1, 1 - y / innerHeight * 2), cam);
    return ray.ray.intersectsSphere(ball.set(hero.position, 2.7 * hero.scale.x));
  };
  const busyTarget = (el: EventTarget | null) =>
    (el instanceof Element && !!el.closest('a, button, summary, input, textarea, .win, .tmux, .remote, .term, .includes'))
    || !!getSelection()?.toString();
  addEventListener('click', e => {
    if (busyTarget(e.target) || !overHero(e.clientX, e.clientY)) return;
    lambda = !lambda;
    vel = 1;                                  // the knot "shudders" as it morphs
    if (caret?.classList.contains('hot')) caret.dataset.label = lambda ? '[ λ ]' : '[ ? ]';
    if (still) { mo = lambda ? 1 : 0; render(); }
  });

  if (caret && !coarse) {
    document.documentElement.classList.add('js');
    addEventListener('pointermove', e => {
      cur.x = e.clientX; cur.y = e.clientY;
      m.x = cur.x / innerWidth * 2 - 1; m.y = 1 - cur.y / innerHeight * 2;
      caret.style.translate = snap(cur.x, cur.y);
      const el = e.target instanceof Element ? e.target : null;
      const hot = el?.closest<HTMLElement>('a, summary, [data-cursor]');
      const onHero = !hot && !busyTarget(el) && overHero(cur.x, cur.y);   // hint that the knot is clickable
      caret.classList.toggle('hot', !!hot || onHero);
      if (hot) caret.dataset.label = hot.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? defLabel;
      else if (onHero) caret.dataset.label = lambda ? '[ λ ]' : '[ ? ]';
    });
  }

  function render(glide = 1) {
    land.position.z = z % D; land2.position.z = land.position.z - D;
    cam.position.set(Math.sin(t * .05) * .8, 4, 18);
    cam.rotation.set(-.15 + s.y * .04, -s.x * .08, -s.x * .015);
    cam.updateMatrixWorld();
    ku.uV.value = vel; ku.uT.value = t;
    tk.rotation.set(t * .05 - s.y * .3, t * .07 + s.x * .3, 0);
    lam.rotation.set(-s.y * .3, Math.sin(t * .2) * .45 + s.x * .4, 0);   // lambda stays readable: gentle sway, no tumbling
    const e = mo * mo * (3 - 2 * mo);                                       // smoothstep: shrink one, grow the other
    tk.scale.setScalar(1 - e); lam.scale.setScalar(e);
    tk.visible = e < .999; lam.visible = e > .001;
    hero.rotation.y = Math.sin(mo * Math.PI) * 2.4;                          // a spin through the swap
    knotTarget(pk, t);
    hero.position.lerp(aim, placed ? glide : 1); placed = true;
    r.clear(); r.render(scene, cam);
    r.clearDepth(); r.render(fg, cam);
  }

  // calibration: the approved prototype stepped per frame on a ~300Hz monitor, so k = "300Hz frames elapsed"
  const HZ = 300;
  function frame(now = performance.now()) {
    const dt = Math.min(.1, (now - last) / 1000), k = dt * HZ;
    last = now;
    const prevY = sy; sy += (scrollY - sy) * ease(.05, k);
    pk += (progress() - pk) * ease(.004, k);                             // knot path follows scroll with a slow (~1s) glide
    t += .016 * k;
    s.x += (m.x - s.x) * ease(.03, k); s.y += (m.y - s.y) * ease(.03, k);
    const v = Math.min(1, Math.abs(sy - prevY) / (22 * k || 1));        // ~22px per 300Hz frame of smoothed scroll = full wobble
    vel += (v - vel) * ease(v > vel ? .15 : .04, k);                     // quick to react, slow to settle back
    z += .018 * k;                                                       // steady cruise
    mo += ((lambda ? 1 : 0) - mo) * ease(.012, k);                       // ~0.6s knot ⇄ lambda morph
    trail.forEach((g, i) => {
      const lead = i ? trail[i - 1] : cur;
      g.x += (lead.x - g.x) * ease(.35, Math.min(k, 5)); g.y += (lead.y - g.y) * ease(.35, Math.min(k, 5));
      g.el.style.translate = snap(g.x, g.y);
    });
    render(ease(.02, k));
    requestAnimationFrame(frame);
  }

  addEventListener('resize', size);
  size();
  if (still) render(); else frame();
}
