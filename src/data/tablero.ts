// Copy that only the wall of windows (Tablero.astro) uses: its labels, and the "away from keyboard" window.
// Everything else it shows comes from profile.ts.
import type { Lang } from './profile';

export const ui: Record<Lang, {
  names: string[]; about: string; afk: string[][];
  tip: string; grow: string; esc: string; close: string; see: string; prev: string; next: string;
  keys: string; cView: string; cGrow: string;
  ariaNav: string; ariaMap: string; ariaToggle: string; role: string; egg: string[];
}> = {
  es: {
    // plain names, in window order: every label a visitor reads (top bar, window bars, phone list) says these. No terminal commands: recruiters read this too
    names: ['Inicio', 'Experiencia', 'Sitios web', 'Formación', 'Contacto', 'Proyectos', 'Preguntas', 'Fuera del teclado', 'En vivo'],
    about: 'sobre mí →',
    // dictated by the user (2026-11-12)
    afk: [
      ['juegos', 'PC y Switch 2. Mundo abierto e historias profundas; mi favorito es Breath of the Wild.'],
      ['música', 'Escucho de todo y me importa que suene bien. Un audiófilo me diría poser: uso unos XM4 y unos Galaxy Buds 4 Pro.'],
      ['karaoke', 'Me gusta tanto que empecé usdx-autochart, que arma las canciones a partir del audio.'],
      ['fútbol', 'Arquero amateur.'],
      ['username', 'Necesitaba uno, apareció este y nunca se fue.'],
    ],
    tip: 'haz clic en una ventana para abrirla · arrástrala para moverla',
    grow: '[ ampliar ]', esc: '[x] esc', close: '[x] cerrar', see: 'ver →', prev: '← ant', next: 'sig →',
    keys: '0-8 abrir · esc cerrar', cView: '[ ver ]', cGrow: '[ ampliar ]',
    ariaNav: 'Secciones', ariaMap: 'Mapa de secciones', ariaToggle: 'Ampliar o cerrar', role: 'ingeniero de software',
    egg: ['ES UN FEATURE', 'EN MI MÁQUINA FUNCIONA', 'NO ERA UN BUG', 'DEPLOY EN VIERNES'],
  },
  en: {
    names: ['Home', 'Experience', 'Websites', 'Education', 'Contact', 'Side projects', 'FAQ', 'Away from keyboard', 'Live'],
    about: 'about me →',
    afk: [
      ['games', 'PC and Switch 2. Open worlds and deep stories; my favorite is Breath of the Wild.'],
      ['music', 'I listen to a bit of everything and I care how it sounds. An audiophile would call me a poser: I use XM4s and Galaxy Buds 4 Pro.'],
      ['karaoke', 'I like it enough that I started usdx-autochart, which builds the songs from the audio.'],
      ['football', 'Amateur goalkeeper.'],
      ['username', 'I needed one, this one showed up and never left.'],
    ],
    tip: 'click a window to open it · drag it to move it',
    grow: '[ expand ]', esc: '[x] esc', close: '[x] close', see: 'view →', prev: '← prev', next: 'next →',
    keys: '0-8 open · esc close', cView: '[ view ]', cGrow: '[ expand ]',
    ariaNav: 'Sections', ariaMap: 'Section map', ariaToggle: 'Expand or close', role: 'software engineer',
    egg: ["IT'S A FEATURE", 'WORKS ON MY MACHINE', "IT WASN'T A BUG", 'FRIDAY DEPLOY'],
  },
};
