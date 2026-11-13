// Copy that only the wall of cameras (Tablero.astro) uses: its labels, and the "away from keyboard" camera.
// Everything else it shows comes from profile.ts.
import type { Lang } from './profile';

export const ui: Record<Lang, {
  names: string[]; afkTitle: string; liveTitle: string; liveBar: string; afk: string[][];
  tip: string; live: string; grow: string; esc: string; close: string; see: string; prev: string; next: string;
  shuffle: string; keys: string; cView: string; cGrow: string; cShuffle: string;
  ariaNav: string; ariaMap: string; ariaToggle: string; role: string; egg: string[];
}> = {
  es: {
    // plain names: the top bar and the phone's camera list say these; the terminal commands stay as decoration on each camera's bar
    names: ['Inicio', 'Fuera del teclado', 'Contacto', 'Experiencia', 'Proyectos', 'Credenciales', 'En vivo', 'Lab', 'Preguntas'],
    afkTitle: 'Fuera del teclado', liveTitle: 'En vivo', liveBar: 'en vivo',
    // dictated by the user (2026-11-12)
    afk: [
      ['juegos', 'PC y Switch 2. Mundo abierto e historias profundas; mi favorito es Breath of the Wild.'],
      ['música', 'Escucho de todo y me importa que suene bien. Un audiófilo me diría poser: uso unos XM4 y unos Galaxy Buds 4 Pro.'],
      ['karaoke', 'Me gusta tanto que empecé usdx-autochart, que arma las canciones a partir del audio.'],
      ['fútbol', 'Arquero amateur.'],
      ['username', 'Necesitaba uno, apareció este y nunca se fue.'],
    ],
    tip: 'clic en una cámara para ampliarla · arrástrala por su barra',
    live: 'señal en vivo · la figura sigue a esta ventana: muévela',
    grow: '[ ampliar ]', esc: '[x] esc', close: '[x] cerrar', see: 'ver →', prev: '← ant', next: 'sig →',
    shuffle: '[barajar]', keys: '0-8 cámara · esc muro', cView: '[ ver ]', cGrow: '[ ampliar ]', cShuffle: '[ barajar ]',
    ariaNav: 'Cámaras', ariaMap: 'Mapa de cámaras', ariaToggle: 'Ampliar o cerrar', role: 'ingeniero de software',
    egg: ['ES UN FEATURE', 'EN MI MÁQUINA FUNCIONA', 'NO ERA UN BUG', 'DEPLOY EN VIERNES'],
  },
  en: {
    names: ['Home', 'Away from keyboard', 'Contact', 'Experience', 'Projects', 'Credentials', 'Live', 'Lab', 'FAQ'],
    afkTitle: 'Away from keyboard', liveTitle: 'Live', liveBar: 'live',
    afk: [
      ['games', 'PC and Switch 2. Open worlds and deep stories; my favorite is Breath of the Wild.'],
      ['music', 'I listen to a bit of everything and I care how it sounds. An audiophile would call me a poser: I use XM4s and Galaxy Buds 4 Pro.'],
      ['karaoke', 'I like it enough that I started usdx-autochart, which builds the songs from the audio.'],
      ['football', 'Amateur goalkeeper.'],
      ['username', 'I needed one, this one showed up and never left.'],
    ],
    tip: 'click a camera to enlarge it · drag it by its title bar',
    live: 'live feed · the shape follows this window: move it',
    grow: '[ enlarge ]', esc: '[x] esc', close: '[x] close', see: 'view →', prev: '← prev', next: 'next →',
    shuffle: '[shuffle]', keys: '0-8 camera · esc wall', cView: '[ view ]', cGrow: '[ enlarge ]', cShuffle: '[ shuffle ]',
    ariaNav: 'Cameras', ariaMap: 'Camera map', ariaToggle: 'Enlarge or close', role: 'software engineer',
    egg: ["IT'S A FEATURE", 'WORKS ON MY MACHINE', "IT WASN'T A BUG", 'FRIDAY DEPLOY'],
  },
};
