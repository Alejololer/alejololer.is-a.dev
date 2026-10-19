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
  cv: '/cv.pdf',
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
      body: "I'm Carlos Alejandro Alemán, better known as Alejololer. I'm a Software Engineer at Upstart 13, where I build LLM features that turn messy business documents into structured data and cut drafting time from days to hours. On the side I design and ship websites for small businesses that actually get found. I graduated from Escuela Politécnica Nacional and I'm a Microsoft Certified Azure Administrator.",
      term: [['name', 'Carlos Alejandro Alemán'], ['role', 'Software Engineer @ Upstart 13'], ['stack', 'Django · Next.js · Astro · LLMs · Azure'], ['based', 'Quito, Ecuador'], ['status', "just chillin'"]],
    },
    exp: {
      cmd: 'git log --career',
      title: 'Experience',
      items: [
        { when: 'Oct 2025 — now', role: 'Software Engineer', org: 'Upstart 13', hook: 'LLM features that turned days of document drafting into hours.', details: [
          'Built LLM features on the OpenAI API that extract structured data from unstructured client documents; piloted with 2 clients.',
          'Helped turn pilot learnings into a redesigned platform during a product pivot, focused on lower latency and faster development.',
          'Owned features end to end in an 11-engineer agile team (Django, Next.js), from scoping to deployment.',
          'Stabilized failing Azure dev and test environments, unblocking QA and team builds.',
        ] },
        { when: 'May 2025 — Oct 2025', role: 'Tech HR Intern', org: 'Upstart 13', hook: 'Automated onboarding with a custom WordPress + Moodle plugin. One login, zero copy-paste.', details: [
          'Built a WordPress and Moodle plugin that automated new-hire onboarding.',
          'Implemented unified login and progress sync between the intranet and Moodle.',
          'Trained the incoming intern and handed off both platforms.',
        ] },
        { when: '2025 — now', role: 'Freelance Web Developer', org: 'Independent', hook: 'Websites for local businesses, from first call to launch day.', details: [
          'Built and deployed websites for small businesses with Next.js and Astro on Vercel, managing each project directly with the client.',
        ] },
        { when: 'Sep 2024 — Apr 2025', role: 'Software Developer', org: 'Sagat Farm', hook: '~30% less bug downtime, 20–40% faster queries, "Best Intern of the Cycle."', details: [
          'Delivered 6+ web and mobile features for a floriculture operations system; automated deployments with GitHub Actions.',
          'Cut bug-related downtime ~30% and sped up key queries 20–40% with refactors and parameterized SQL.',
          'Named "Best Intern of the Cycle" and promoted to developer.',
        ] },
      ],
    },
    creds: {
      cmd: 'cat credentials',
      title: 'Credentials',
      items: [
        { k: 'B.Eng. Software Engineering', v: 'Escuela Politécnica Nacional · 2021–2026 · grade 28/30' },
        { k: 'Azure Administrator Associate (AZ-104)', v: 'Microsoft Certified · Oct 2026' },
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
      items: [
        { q: 'Who is Alejololer?', a: 'Carlos Alejandro Alemán Osorio, a Software Engineer in Quito, Ecuador, working with Django, Next.js, Astro and LLMs.' },
        { q: 'Are you available for freelance work?', a: 'Yes. I build websites for small businesses, with SEO, GEO and AEO included.' },
        { q: "What's your stack?", a: 'Python/Django, TypeScript/Next.js, Astro, PostgreSQL, Azure and Vercel, plus LLM integration (RAG, structured extraction).' },
        { q: 'Where are you based?', a: 'Quito, Ecuador. I work remotely with clients anywhere.' },
        { q: 'Why the username?', a: 'I needed one, this one showed up, and it never left. Like most good decisions.' },
      ],
    },
    contact: {
      cmd: './contact.sh',
      title: "Let's build something.",
      cv: 'Download CV (PDF)',
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
      body: 'Soy Carlos Alejandro Alemán, aunque en internet me conocen como Alejololer. Soy ingeniero de software en Upstart 13, donde construyo funciones con LLMs que convierten documentos desordenados en datos estructurados y bajan el tiempo de redacción de días a horas. Además diseño y publico sitios web para negocios locales que de verdad aparecen cuando alguien los busca.',
      term: [['nombre', 'Carlos Alejandro Alemán'], ['rol', 'Ingeniero de software @ Upstart 13'], ['stack', 'Django · Next.js · Astro · LLMs · Azure'], ['base', 'Quito, Ecuador'], ['estado', "just chillin'"]],
    },
    exp: {
      cmd: 'git log --carrera',
      title: 'Experiencia',
      items: [
        { when: 'Oct 2025 — hoy', role: 'Ingeniero de software', org: 'Upstart 13', hook: 'Funciones con LLMs que llevaron la redacción de documentos de días a horas.', details: [
          'Construí funciones con la API de OpenAI que extraen datos estructurados de documentos de clientes; piloto con 2 clientes.',
          'Ayudé a convertir lo aprendido en el piloto en una plataforma rediseñada, enfocada en menor latencia y desarrollo más rápido.',
          'Responsable de features de punta a punta en un equipo ágil de 11 ingenieros (Django, Next.js).',
          'Estabilicé los entornos de desarrollo y pruebas en Azure, desbloqueando a QA y al equipo.',
        ] },
        { when: 'May 2025 — Oct 2025', role: 'Tech HR Intern', org: 'Upstart 13', hook: 'Onboarding automatizado con un plugin propio para WordPress + Moodle. Un login, cero copiar y pegar.', details: [
          'Construí un plugin de WordPress y Moodle que automatizó el onboarding de nuevos empleados.',
          'Implementé login unificado y sincronización de progreso entre la intranet y Moodle.',
          'Capacité al siguiente pasante y entregué ambas plataformas.',
        ] },
        { when: '2025 — hoy', role: 'Desarrollador web freelance', org: 'Independiente', hook: 'Sitios para negocios locales, desde la primera llamada hasta el lanzamiento.', details: [
          'Construyo y publico sitios para pequeños negocios con Next.js y Astro en Vercel, trabajando directo con cada cliente.',
        ] },
        { when: 'Sep 2024 — Abr 2025', role: 'Desarrollador de software', org: 'Sagat Farm', hook: '~30% menos caídas por bugs, consultas 20–40% más rápidas, "Mejor pasante del ciclo".', details: [
          'Entregué 6+ funciones web y móviles para un sistema de operaciones florícolas; automaticé despliegues con GitHub Actions.',
          'Reduje ~30% las caídas por bugs y aceleré consultas clave 20–40% con refactors y SQL parametrizado.',
          'Nombrado "Mejor pasante del ciclo" y promovido a desarrollador.',
        ] },
      ],
    },
    creds: {
      cmd: 'cat credenciales',
      title: 'Credenciales',
      items: [
        { k: 'Ingeniería de Software', v: 'Escuela Politécnica Nacional · 2021–2026 · nota 28/30' },
        { k: 'Azure Administrator Associate (AZ-104)', v: 'Microsoft Certified · Oct 2026' },
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
      items: [
        { q: '¿Haces páginas web para negocios?', a: 'Sí, como freelance. Los construyo con SEO, GEO y AEO para que se encuentren en Google y en asistentes de IA.' },
        { q: '¿Cuánto tarda un sitio?', a: 'De días a semanas, según el nivel de detalle.' },
        { q: '¿Qué es GEO y AEO?', a: 'GEO es optimizar para que los asistentes de IA (ChatGPT, Gemini) mencionen tu negocio. AEO es estructurar tu contenido para dar respuestas directas a lo que pregunta la gente.' },
        { q: '¿Trabajas fuera de Quito?', a: 'Sí. Trabajo de forma remota con negocios de todo Ecuador.' },
        { q: '¿Quién es Alejololer?', a: 'Carlos Alejandro Alemán Osorio, ingeniero de software en Quito, Ecuador, que trabaja con Django, Next.js, Astro y LLMs.' },
      ],
    },
    contact: {
      cmd: './contacto.sh',
      title: 'Construyamos algo.',
      cv: 'Descargar CV (PDF)',
      mailSubject: 'Hola Alejo',
    },
    footer: 'hecho en Quito por un arquero que no deja pasar bugs_',
  },
} as const;

export type Copy = (typeof t)[Lang];
