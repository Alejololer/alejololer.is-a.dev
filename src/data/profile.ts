import virtus from '../assets/sites/virtus.png';
import asia from '../assets/sites/asia-motors.png';
import carino from '../assets/sites/con-carino.png';

export type Lang = 'en' | 'es';

export const SITE = 'https://alejololer.is-a.dev';
export const person = {
  name: 'Carlos Alejandro Alemán Osorio',
  short: 'Carlos Alejandro Alemán',
  handle: 'Alejololer',
  email: 'acarlosaleman03@gmail.com',
  github: 'https://github.com/Alejololer',
  linkedin: 'https://www.linkedin.com/in/alejoaleman',
  city: 'Quito',
  country: 'EC',
};

const gh = (repo: string) => `${person.github}/${repo}`;

const shipped = {
  virtus: { file: 'virtus.exe', name: 'Virtus Estudio Jurídico', url: 'https://virtusestudiojuridico.com', img: virtus },
  asia: { file: 'asia_motors.exe', name: 'Asia Motors Importadora', url: 'https://asia-motors-eta.vercel.app', img: asia },
  carino: { file: 'con_carino.exe', name: 'Con Cariño', url: 'https://con-carino.vercel.app', img: carino },
};

export const t = {
  en: {
    meta: {
      title: 'Alejololer · Carlos Alejandro Alemán, Software Engineer',
      description: 'Software Engineer in Quito, Ecuador, building production web products with Django, Next.js, Astro and LLMs.',
    },
    nav: {
      other: 'ES', otherHref: '/es/', otherLabel: 'Leer en español', label: 'Sections', hint: '0-7 jump',
      prev: 'Previous section', next: 'Next section', list: 'All sections',
      sections: [['hero', 'whoami'], ['about', 'cat about'], ['experience', 'git log'], ['credentials', 'cat creds'], ['shipped', 'ls shipped'], ['lab', 'ls lab'], ['faq', 'man'], ['contact', './contact']],
    },
    hero: { cmd: 'whoami', lines: ['Built to last.', 'Designed to', 'be noticed.'], scroll: "scroll ↓ (it's worth it)" },
    about: {
      cmd: 'cat about.txt',
      title: 'I turn days into hours.',
      sub: 'Mostly with LLMs, occasionally with coffee.',
      body: "I'm Carlos Alejandro Alemán, better known as Alejololer. I'm a Software Engineer at Upstart 13, where I own auth, the data model and the frontend architecture of an AI platform built on the Claude Agent SDK. Before that I built LLM features that turned messy client documents into structured data and cut drafting time from days to hours. On the side I design and ship websites for small businesses that actually get found. I graduated from Escuela Politécnica Nacional. I'm Azure AZ-104 certified and a Claude Certified Developer.",
      term: [['name', 'Carlos Alejandro Alemán'], ['role', 'Junior Software Engineer @ Upstart 13'], ['stack', 'TypeScript · React · Django · LLMs · Azure'], ['based', 'Quito, Ecuador'], ['status', "just chillin'"]],
    },
    exp: {
      cmd: 'git log --career',
      title: 'Experience',
      items: [
        { when: 'Oct 2025 — now', role: 'Junior Software Engineer', org: 'Upstart 13', hook: 'Owns auth, the data model and the frontend architecture of an AI platform built on the Claude Agent SDK.', details: [
          'Own core areas of the AI platform: authentication and permissions, data model and APIs, and frontend architecture (TypeScript, React, Next.js, Prisma, PostgreSQL).',
          'Drive tickets from design to delivery with minimal oversight on a 5-person team, proposing technical solutions and reporting directly to product owners.',
          "Helped bring formal architecture design and clear product ownership into the team's development process.",
          'Built LLM features on the OpenAI API (Django, Next.js), extracting structured data from client documents and cutting drafting from days to hours; piloted with 2 clients.',
          'Stabilized failing Azure dev/test environments (env variables, logging), unblocking QA and team builds.',
          'Trained the incoming intern through structured shadowing and handed off the onboarding platforms.',
        ] },
        { when: 'May 2025 — Oct 2025', role: 'Tech HR Intern', org: 'Upstart 13', hook: 'Automated onboarding with a custom WordPress + Moodle plugin. One login, zero copy-paste.', details: [
          'Built a WordPress and Moodle plugin that automated new-hire onboarding.',
          'Implemented unified login and progress sync between the intranet and Moodle.',
        ] },
        { when: '2025 — now', role: 'Freelance Web Developer', org: 'Independent', hook: 'Websites for local businesses, from first call to launch day.', details: [
          'Built and deployed websites for small businesses with Next.js and Astro on Vercel, managing each project directly with the client.',
        ] },
        { when: 'Sep 2024 — Apr 2025', role: 'Software Developer', org: 'Sagat Farm', hook: '~30% less bug downtime, 20–40% faster queries, "Best Intern of the Cycle."', details: [
          'Delivered 6+ web and mobile features for a floriculture operations system; automated deployments with GitHub Actions.',
          'Cut bug-related downtime ~30% and sped up key queries 20–40% with refactors and parameterized SQL.',
          'Named "Best Intern of the Cycle" and promoted to developer after resolving 10+ bugs across three internal tools.',
        ] },
      ],
    },
    creds: {
      cmd: 'cat credentials',
      title: 'Credentials',
      items: [
        { k: 'B.Eng. Software Engineering', v: 'Escuela Politécnica Nacional · 2021–2026 · grade 28/30' },
        { k: 'Azure Administrator Associate (AZ-104)', v: 'Microsoft Certified · Oct 2026' },
        { k: 'Claude Certified Developer: Foundations', v: 'Anthropic · Oct 2026' },
      ],
    },
    service: null,
    shipped: {
      cmd: 'ls ./shipped',
      title: 'Sites in the wild',
      open: '[ open ]',
      items: [
        { ...shipped.virtus, tag: 'Law firm · Salcedo', hook: 'A law firm website that answers questions before the client even calls.', result: 'Top 3 on Google for “abogados Salcedo”.', alt: 'Virtus Estudio Jurídico homepage' },
        { ...shipped.asia, tag: 'Vehicle importer · Ecuador', hook: 'Vehicles that go far, and a website that keeps up.', result: 'Catalog, EV savings calculator, test drives and quotes.', alt: 'Asia Motors Importadora homepage' },
        { ...shipped.carino, tag: 'Gift shop · Latacunga', hook: 'Strawberries, chocolate and a one-tap WhatsApp checkout.', result: 'Catalog + cart that sends the order to WhatsApp, with an admin panel.', alt: 'Con Cariño homepage' },
      ],
    },
    lab: {
      cmd: 'ls ~/lab',
      title: 'Lab',
      items: [
        { name: 'usdx-autochart', url: gh('usdx-autochart'), desc: 'Generates singable UltraStar Deluxe karaoke charts from audio. Because singing badly deserves accurate charts.' },
        { name: 'RAG_Presidentes', url: gh('RAG_Presidentes'), desc: 'Retrieval-augmented generation over presidential data.' },
        { name: 'TripTikBot', url: gh('TripTikBot'), desc: 'AI agent that finds travel experiences.' },
        { name: 'shop-base', url: gh('shop-base'), desc: 'Reusable storefront + CMS template. Astro, Neon, WhatsApp checkout.' },
        { name: 'ez-finance', url: gh('ez-finance'), desc: 'FinanzasFácil, a personal finance app.' },
      ],
    },
    faq: {
      cmd: 'man alejololer',
      title: 'FAQ',
      manual: 'User Commands',
      options: 'OPTIONS',
      items: [
        { flag: '--whoami', q: 'Who is Alejololer?', a: 'Carlos Alejandro Alemán Osorio, a Software Engineer in Quito, Ecuador, working with Django, Next.js, Astro and LLMs.' },
        { flag: '--freelance', q: 'Are you available for freelance work?', a: 'Yes. I build websites for small businesses, with SEO, GEO and AEO included.' },
        { flag: '--stack', q: "What's your stack?", a: 'TypeScript/React/Next.js, Python/Django, Astro, Prisma, PostgreSQL, Azure and Vercel, plus LLM work with the Claude Agent SDK and the OpenAI API (RAG, structured extraction).' },
        { flag: '--location', q: 'Where are you based?', a: 'Quito, Ecuador. I work remotely with clients anywhere.' },
        { flag: '--username', q: 'Why the username?', a: 'I needed one, this one showed up, and it never left. Like most good decisions.' },
      ],
    },
    contact: {
      cmd: './contact.sh',
      title: "Let's build something.",
      cv: 'Download CV (PDF)',
      cvHref: '/cv.pdf',
      cvFile: 'Carlos_Aleman_CV.pdf',
      mailSubject: 'Hi Alejo',
    },
    footer: 'built in Quito by a goalkeeper who refuses to let bugs through_',
  },

  es: {
    meta: {
      title: 'Alejololer · Carlos Alejandro Alemán, ingeniero de software',
      description: 'Ingeniero de software en Quito, Ecuador. Construyo productos web en producción con Django, Next.js, Astro y LLMs, y sitios para negocios locales con SEO, GEO y AEO.',
    },
    nav: {
      other: 'EN', otherHref: '/', otherLabel: 'Read in English', label: 'Secciones', hint: '0-8 saltar',
      prev: 'Sección anterior', next: 'Sección siguiente', list: 'Todas las secciones',
      sections: [['hero', 'whoami'], ['about', 'cat sobre-mí'], ['experience', 'git log'], ['credentials', 'cat creds'], ['freelance', 'cat freelance'], ['shipped', 'ls proyectos'], ['lab', 'ls lab'], ['faq', 'man'], ['contact', './contacto']],
    },
    hero: { cmd: 'whoami', lines: ['Hecho para durar.', 'Diseñado para', 'que te vean.'], scroll: 'scroll ↓ (vale la pena)' },
    about: {
      cmd: 'cat sobre-mi.txt',
      title: 'Convierto días en horas.',
      sub: 'Casi siempre con LLMs, a veces con café.',
      body: 'Soy Carlos Alejandro Alemán, aunque en internet me conocen como Alejololer. Trabajo como ingeniero de software en Upstart 13, en una plataforma de IA hecha con el Claude Agent SDK; ahí me toca la autenticación, el modelo de datos y cómo está armado el frontend. Antes hice funciones con LLMs que leen documentos de clientes y sacan lo importante, así que un borrador que tomaba días ahora sale en horas. Aparte diseño sitios web para negocios locales que de verdad aparecen cuando alguien los busca. Me gradué de la Politécnica Nacional y tengo dos certificaciones: Azure AZ-104 y Claude Certified Developer.',
      term: [['nombre', 'Carlos Alejandro Alemán'], ['rol', 'Junior Software Engineer @ Upstart 13'], ['stack', 'TypeScript · React · Django · LLMs · Azure'], ['base', 'Quito, Ecuador'], ['estado', "just chillin'"]],
    },
    exp: {
      cmd: 'git log --carrera',
      title: 'Experiencia',
      items: [
        { when: 'Oct 2025 — hoy', role: 'Junior Software Engineer', org: 'Upstart 13', hook: 'La autenticación, los datos y el frontend de una plataforma de IA hecha con el Claude Agent SDK pasan por mí.', details: [
          'Tengo a cargo partes centrales de la plataforma: autenticación y permisos, el modelo de datos y las APIs, y la arquitectura del frontend (TypeScript, React, Next.js, Prisma, PostgreSQL).',
          'En un equipo de 5 personas, llevo mis tickets del diseño a producción casi sin supervisión: propongo la solución técnica y reporto directo a los product owners.',
          'Ayudé a que el equipo empezara a diseñar la arquitectura antes de programar y a que cada parte del producto tuviera un responsable claro.',
          'Hice funciones con la API de OpenAI (Django, Next.js) que sacan datos estructurados de documentos de clientes. Lo que antes eran días de redacción pasó a ser cuestión de horas, y se probó con 2 clientes.',
          'Puse a funcionar de nuevo los entornos de desarrollo y pruebas en Azure, que tenían las variables de entorno desconectadas y ningún log, y QA y el equipo pudieron volver a trabajar.',
          'Formé al pasante que tomó mi lugar, trabajando lado a lado con él, y le dejé las plataformas de onboarding.',
        ] },
        { when: 'May 2025 — Oct 2025', role: 'Tech HR Intern', org: 'Upstart 13', hook: 'Onboarding automatizado con un plugin propio para WordPress + Moodle. Un login, cero copiar y pegar.', details: [
          'Hice un plugin de WordPress y Moodle que se encarga solo del onboarding de quien entra a la empresa.',
          'Logré que la intranet y Moodle compartieran un solo login y el avance de cada persona.',
        ] },
        { when: '2025 — hoy', role: 'Desarrollador web freelance', org: 'Independiente', hook: 'Sitios para negocios locales, desde la primera llamada hasta el lanzamiento.', details: [
          'Construyo y publico sitios para pequeños negocios con Next.js y Astro en Vercel, trabajando directo con cada cliente.',
        ] },
        { when: 'Sep 2024 — Abr 2025', role: 'Desarrollador de software', org: 'Sagat Farm', hook: '~30% menos caídas por bugs, consultas 20–40% más rápidas, "Mejor pasante del ciclo".', details: [
          'Entregué más de 6 funciones web y móviles para el sistema que maneja la operación de una florícola, y automaticé sus despliegues con GitHub Actions.',
          'Bajé cerca de un 30% las caídas por bugs y las consultas clave quedaron entre 20 y 40% más rápidas, refactorizando código viejo y parametrizando el SQL.',
          'Me eligieron "Mejor pasante del ciclo" y pasé a desarrollador después de resolver más de 10 bugs en tres herramientas internas.',
        ] },
      ],
    },
    creds: {
      cmd: 'cat credenciales',
      title: 'Credenciales',
      items: [
        { k: 'Ingeniería de Software', v: 'Escuela Politécnica Nacional · 2021–2026 · nota 28/30' },
        { k: 'Azure Administrator Associate (AZ-104)', v: 'Microsoft Certified · Oct 2026' },
        { k: 'Claude Certified Developer: Foundations', v: 'Anthropic · Oct 2026' },
      ],
    },
    // ponytail: portfolio tone on purpose — is-a.dev only accepts non-commercial sites, so this describes the work, it doesn't sell it
    service: {
      cmd: 'cat freelance.md',
      title: 'Sitios para negocios locales.',
      lead: 'Además de mi trabajo en Upstart 13, diseño y construyo sitios para negocios en Ecuador. Me enfoco en que carguen rápido y en que se encuentren: en Google y también en asistentes de IA como ChatGPT, Gemini o Perplexity.',
      includes: [
        ['Diseño a medida', 'Cada sitio parte de cero, sin plantillas genéricas.'],
        ['SEO local', 'Páginas por ciudad, Google Business y velocidad 95+.'],
        ['GEO', 'Datos estructurados y llms.txt para que los asistentes de IA citen el negocio.'],
        ['AEO', 'Preguntas frecuentes con schema y respuestas directas.'],
        ['Hosting', 'Publicados en Vercel: rápidos y con HTTPS.'],
      ],
      steps: ['Entender el negocio', 'Diseño y construcción', 'Lanzamiento + visibilidad'],
      proof: 'Resultado: Virtus aparece en el top 3 de Google para “abogados Salcedo”.',
    },
    shipped: {
      cmd: 'ls ./proyectos',
      title: 'Sitios en producción',
      open: '[ abrir ]',
      items: [
        { ...shipped.virtus, tag: 'Estudio jurídico · Salcedo', hook: 'Un sitio de abogados que responde preguntas antes de que el cliente llame.', result: 'Top 3 en Google para “abogados Salcedo”.', alt: 'Página de inicio de Virtus Estudio Jurídico' },
        { ...shipped.asia, tag: 'Importadora de vehículos · Ecuador', hook: 'Vehículos que llegan lejos, y un sitio que les sigue el ritmo.', result: 'Catálogo, calculadora de ahorro eléctrico, test drives y cotizaciones.', alt: 'Página de inicio de Asia Motors Importadora' },
        { ...shipped.carino, tag: 'Detalles · Latacunga', hook: 'Fresas, chocolate y un pedido por WhatsApp en un toque.', result: 'Catálogo + carrito que envía el pedido a WhatsApp, con panel de administración.', alt: 'Página de inicio de Con Cariño' },
      ],
    },
    lab: {
      cmd: 'ls ~/lab',
      title: 'Lab',
      items: [
        { name: 'usdx-autochart', url: gh('usdx-autochart'), desc: 'Genera canciones de karaoke UltraStar Deluxe a partir de audio. Cantar mal merece partituras precisas.' },
        { name: 'RAG_Presidentes', url: gh('RAG_Presidentes'), desc: 'Generación aumentada por recuperación sobre datos de presidentes.' },
        { name: 'TripTikBot', url: gh('TripTikBot'), desc: 'Agente de IA para encontrar experiencias de viaje.' },
        { name: 'shop-base', url: gh('shop-base'), desc: 'Plantilla reutilizable de tienda + CMS. Astro, Neon, checkout por WhatsApp.' },
        { name: 'ez-finance', url: gh('ez-finance'), desc: 'FinanzasFácil, app de finanzas personales.' },
      ],
    },
    faq: {
      cmd: 'man alejololer',
      title: 'Preguntas frecuentes',
      manual: 'Manual de usuario',
      options: 'OPCIONES',
      items: [
        { flag: '--negocios', q: '¿Haces páginas web para negocios?', a: 'Sí, como freelance. Los construyo con SEO, GEO y AEO para que se encuentren en Google y en asistentes de IA.' },
        { flag: '--tiempo', q: '¿Cuánto tarda un sitio?', a: 'De días a semanas, según el nivel de detalle.' },
        { flag: '--geo-aeo', q: '¿Qué es GEO y AEO?', a: 'GEO es optimizar para que los asistentes de IA (ChatGPT, Gemini) mencionen tu negocio. AEO es estructurar tu contenido para dar respuestas directas a lo que pregunta la gente.' },
        { flag: '--remoto', q: '¿Trabajas fuera de Quito?', a: 'Sí. Trabajo de forma remota con negocios de todo Ecuador.' },
        { flag: '--whoami', q: '¿Quién es Alejololer?', a: 'Carlos Alejandro Alemán Osorio, ingeniero de software en Quito, Ecuador, que trabaja con Django, Next.js, Astro y LLMs.' },
      ],
    },
    contact: {
      cmd: './contacto.sh',
      title: 'Construyamos algo.',
      cv: 'Descargar CV (PDF)',
      cvHref: '/cv-es.pdf',
      cvFile: 'Carlos_Aleman_CV_ES.pdf',
      mailSubject: 'Hola Alejo',
    },
    footer: 'hecho en Quito por un arquero que no deja pasar bugs_',
  },
} as const;

export type Copy = (typeof t)[Lang];
