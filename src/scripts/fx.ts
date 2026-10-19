import * as THREE from 'three';

// Light in the screen's own terms, not the world's (a sun/moon sky was tried and dropped):
// dither: the knot/lambda shade in 1-bit ordered dither, so light reads as dot density (Obra Dinn style)
// orbit: the figure's key light circles it as you scroll, so the lit patches travel across it
// beam: as the scene powers on and on every channel change, a refresh beam sweeps the screen top → bottom,
//       lighting what it crosses, with a phosphor tail that fades behind it
type Ctx = { land: THREE.Group; heroMats: THREE.Material[]; key: THREE.DirectionalLight; px: number };

// screen-space beam: sharp leading edge, exponential phosphor decay behind it (uBeam = progress 0..1, <0 idle)
const BEAM = `uniform float uBeam, uRes, uGain, uCap;
float beamAt(){
  if (uBeam < 0.) return 0.;
  float d = uBeam - (1. - gl_FragCoord.y / uRes);
  return (d < 0. ? smoothstep(.012, 0., -d) : exp(-d * 14.)) * (1. - smoothstep(.85, 1.25, uBeam));
}\n`;

export function addFx({ land, heroMats, key, px }: Ctx) {
  const u ={ uBeam: { value: -1 }, uRes: { value: 1 }, uGain: { value: 1 }, uCap: { value: 1 } };

  for (const o of land.children as THREE.Mesh[]) {
    const lines = o instanceof THREE.LineSegments;
    (o.material as THREE.Material).onBeforeCompile = sh => {
      Object.assign(sh.uniforms, u);
      // after the fog: the beam redraws the whole screen, so it briefly reveals the far, fogged-out ridges too
      sh.fragmentShader = BEAM + sh.fragmentShader.replace('#include <fog_fragment>', `#include <fog_fragment>
        float b = beamAt();
        ${lines ? 'gl_FragColor.rgb += b; gl_FragColor.a = max(gl_FragColor.a, b);' : 'gl_FragColor.rgb += b * .2;'}`);
    };
  }

  // the 4×4 Bayer cell is 2 CSS px, so it sits under the 3px CRT scanlines instead of beating against them
  const cell = (2 * px).toFixed(1);
  for (const m of heroMats) {
    const prev = m.onBeforeCompile;
    m.onBeforeCompile = (sh, r) => {
      prev.call(m, sh, r);
      Object.assign(sh.uniforms, u);
      sh.fragmentShader = BEAM + `
        float bayer2(vec2 a){ a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
        float bayer4(vec2 a){ return bayer2(.5 * a) * .25 + bayer2(a); }\n` + sh.fragmentShader.replace('#include <opaque_fragment>', `
        outgoingLight += beamAt() * .9;
        // contrast curve first: solid black shadows, solid white highlights, dots only across the turn of the form
        // (light is linear here: gamma it first, or every midtone reads as shadow)
        // on phones scene.ts dims the figure for the copy: undo that, and cap it at ~50% dots instead (never solid)
        float L = min(smoothstep(.15, .85, pow(dot(outgoingLight, vec3(.299, .587, .114)), .4545) * uGain), uCap);
        outgoingLight = vec3(step(bayer4(gl_FragCoord.xy / ${cell}) + .02, L));
        #include <opaque_fragment>`);
    };
    // the wrappers share source text, and three caches programs by it: keep knot and lambda apart
    m.customProgramCacheKey = () => prev.toString() + 'fx';
  }

  // power-on sweep once the canvas has mostly faded in (-3), then one per channel change: sections.ts fires
  // 'tv:on' as the screen reopens (-2). Reduced motion renders a single frame, so the sweep never shows there.
  let start = -3;
  addEventListener('tv:on', () => { start = -2; });

  return (t: number, pk: number, height: number, narrow: boolean) => {
    u.uGain.value = narrow ? 2.6 : 1;   // 0xdd / 0x55
    u.uCap.value = narrow ? .5 : 1;
    u.uRes.value = height;
    if (start === -2) start = t;
    if (start === -3) start = t + 4.8 * .7;                  // ~0.7s in: the canvas fades in over 1.2s
    const p = start < 0 ? -1 : (t - start) / (4.8 * .75);   // ~0.75s sweep (t runs ~4.8/s, see scene.ts HZ)
    u.uBeam.value = p > 1.3 ? -1 : p;                        // p < 0 (still waiting) is idle too
    if (p > 1.3) start = -1;
    const a = pk * Math.PI * 3 + t * .01;                    // 1.5 turns over the page, plus a slow drift
    key.position.set(Math.sin(a) * 15, 9, Math.cos(a) * 15);
  };
}
