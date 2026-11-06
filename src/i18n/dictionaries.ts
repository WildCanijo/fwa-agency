// All site copy, per language. Data only (no functions), so any part of it can
// be passed to client components.
//
// Spanish uses neutral Latin American Spanish with "tú", a common tone for
// modern studios in the US market.

import type { Locale } from "@/i18n/config";

/** Values sent with the contact form stay in English, so enquiries read the same. */
export const projectTypeValues = [
  "Business Website",
  "Landing Page",
  "Web Application",
  "Website Redesign",
  "Not sure yet",
] as const;

export const budgetValues = ["Under $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Not sure yet"] as const;

const en = {
  meta: {
    title: "Romano Web — We build what moves you forward",
    description:
      "Romano Web is an independent web development and digital design studio. Thoughtful design and serious development for small and medium-sized businesses.",
    ogLocale: "en_US",
  },
  common: {
    fullName: "Romano Web — Independent Digital Studio",
    homeLabel: "Romano Web, home",
    studio: "Web",
  },
  nav: {
    label: "Main",
    skip: "Skip to content",
    links: [
      { label: "Services", id: "services" },
      { label: "Work", id: "work" },
      { label: "About", id: "about" },
    ],
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  footer: {
    meta: "© 2026 Romano Web · Built with intention",
    note: "Move the cursor. Click the dots.",
    backToTop: "Back to top ↑",
    studio: "Studio",
    start: "Start",
    direct: "Direct",
    language: "Language",
    links: { services: "Services", work: "Work", approach: "Approach", about: "About" },
    startProject: "Start a project",
    contact: "Contact",
  },
  hero: {
    meta: ["Romano Web", "Independent Digital Studio", "Design / Development", "Taking on new projects"],
    // The last line gets an accent full stop and an arrow.
    lines: ["We build", "what moves", "you forward"],
    leadStrong: "Digital experiences designed with purpose and built with precision.",
    lead: "We help businesses establish a stronger online presence through thoughtful design and serious development.",
    primary: "Start a project",
    secondary: "Explore our work",
    scroll: "Scroll",
  },
  marquee: ["Business Websites", "Landing Pages", "Web Applications", "Website Redesign"],
  services: {
    label: "Services",
    note: "What we make",
    titleA: "Four ways",
    titleB: "to move forward.",
    intro: "Every project is designed and developed in-house, from the first sketch to the deployed site.",
    srStart: "Start a project:",
    items: [
      {
        title: "Business Websites",
        body: "Professional websites designed to establish credibility, communicate value, and generate business.",
        tags: ["Multi-page sites", "Content structure", "SEO foundations"],
      },
      {
        title: "Landing Pages",
        body: "Focused, conversion-oriented pages built around specific products, campaigns, or services.",
        tags: ["Campaigns", "Product launches", "Lead capture"],
      },
      {
        title: "Web Applications",
        body: "Custom digital tools and applications designed around business needs.",
        tags: ["Dashboards", "Internal tools", "Client portals"],
      },
      {
        title: "Website Redesign",
        body: "Modernize outdated websites with improved design, usability, and performance.",
        tags: ["Audit", "New design", "Rebuild"],
      },
    ],
  },
  work: {
    label: "Selected Work",
    note: "Concept projects",
    title: "Selected work",
    intro:
      "The projects below are studio concepts that show how we approach different kinds of businesses. Client case studies will appear here as they launch.",
    concept: "Concept",
    type: "Type",
    industry: "Industry",
    status: "Status",
    statusValue: "Studio concept",
    previewAlt: "Illustration of the {name} concept on a desktop browser and a phone.",
    projects: [
      {
        category: "Construction",
        type: "Business Website",
        description:
          "A website for a general contractor that puts services, past builds and a simple quote request front and centre.",
      },
      {
        category: "Healthcare",
        type: "Landing Page",
        description:
          "A calm, booking-first landing page for a physiotherapy clinic, built so patients can pick a time in a few taps.",
      },
      {
        category: "Field Services",
        type: "Web Application",
        description:
          "An operations dashboard for a field-service team: jobs, crews, schedules and invoices in one place.",
      },
    ],
  },
  approach: {
    label: "Approach",
    note: "How a project runs",
    titleA: "A clear process,",
    titleB: "start to launch.",
    intro:
      "Four stages, each with a clear outcome, so you always know where your project stands and what comes next.",
    steps: [
      { title: "Discover", body: "Understand the business, audience, and goals." },
      { title: "Design", body: "Develop the visual direction and user experience." },
      { title: "Build", body: "Turn the approved design into a fast, responsive website." },
      { title: "Launch", body: "Test, refine, and deploy the finished experience." },
    ],
  },
  about: {
    label: "About",
    srTitle: "About Romano Web",
    side: "An independent digital studio",
    foundedBy: "Founded by",
    statement:
      "Good design should do more than look good. It should make things clearer, easier, and more effective. Romano Web brings design and development together to build digital experiences that help businesses move forward.",
    highlight: ["forward"],
    founder: {
      eyebrow: "Founder",
      role: "Software Engineer",
      photoAlt: "Portrait of Andoni Romano",
      bio: "I'm Andoni Romano, a software engineer with 4+ years of experience building web applications, design systems and AI-powered products. I work across the whole build, from interface and reusable components to APIs, and I started Romano Web to bring that same care to small and medium-sized businesses.",
      based: "Based in Mexico · Works in English and Spanish",
      focusTitle: "Focus",
      focus: ["Frontend architecture", "Design systems", "AI-powered apps", "Full-stack web"],
      offTitle: "Off the clock",
      off: ["Guitar", "Reading", "Chess", "The beach"],
    },
    principles: [
      {
        title: "Design and development, together",
        body: "The person who designs your site also builds it, so nothing gets lost between the mockup and the final product.",
      },
      {
        title: "Direct collaboration",
        body: "You work with the studio directly. No account managers, no handoffs, no guessing who to ask.",
      },
      {
        title: "Built to perform",
        body: "Fast-loading, responsive and accessible by default, because a website is only useful if people can use it.",
      },
      {
        title: "Made to grow",
        body: "Clean, maintainable code and a clear structure, so your site can evolve with your business.",
      },
    ],
  },
  finalCta: {
    eyebrow: "(05) — Next step",
    // The last line gets an accent question mark.
    lines: ["Have something", "in mind"],
    body: "Let's build something that moves your business forward.",
    orWrite: "Or write to",
    button: ["Start a", "project"],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Start a project with Romano Web. Tell us about your business website, landing page, web application or redesign.",
    top: ["Contact", "Start a project"],
    // The last line gets an accent full stop.
    lines: ["Let's move", "forward"],
    intro: "Tell us a little about your project. We'll get back to you to discuss how we can help.",
    formLabel: "Contact form",
    direct: "Direct",
    directNote: "Prefer email? Write to us directly. Same studio, same reply.",
    nextTitle: "What happens next",
    nextSteps: [
      { title: "You send a note", body: "A few lines about your business and what you need is enough." },
      { title: "We reply", body: "We read every message and follow up to ask questions and understand the project." },
      { title: "We talk it through", body: "A short call to agree on scope, timeline and next steps." },
    ],
  },
  form: {
    requiredBefore: "Fields marked",
    requiredAfter: "are required.",
    requiredSr: "(required)",
    optional: "Optional",
    name: "Name",
    email: "Email",
    company: "Company",
    projectType: "Project type",
    budget: "Estimated budget",
    message: "Project description",
    messageHint: "Goals, timeline, links to your current site — anything useful.",
    projectTypes: ["Business Website", "Landing Page", "Web Application", "Website Redesign", "Not sure yet"],
    budgets: ["Under $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Not sure yet"],
    submit: "Send message",
    sending: "Sending…",
    sendingSr: "Sending your message",
    successTitle: "Message received.",
    successBody: "Thanks for reaching out. We'll read your note and get back to you to talk about your project.",
    another: "Send another message",
    errorTitle: "Message not sent",
    errorNotConfigured: "Our contact form isn't connected yet, so your message wasn't delivered.",
    errorNetwork: "We couldn't reach the server. Please check your connection and try again.",
    errorProvider: "Something went wrong on our side and your message wasn't delivered. Please try again.",
    errorVerification: "We couldn't verify this submission, so it wasn't sent. Please try again.",
    errorTooFast: "That was quick, so it wasn't sent. Please take a moment and send it again.",
    errorExpired: "This form was open for a while, so we refreshed it. Please send your message again.",
    errorRateLimited: "You've sent several messages in a short time. Please wait a few minutes and try again.",
    humanCheck: "Quick check that you're human",
    alsoEmail: "You can also email us directly at",
    validation: {
      name: "Please enter your name.",
      nameLong: "That name is a little long.",
      email: "Please enter a valid email address.",
      company: "Please shorten the company name.",
      projectType: "Please choose a project type.",
      messageShort: "Please tell us a bit more (at least 20 characters).",
      messageLong: "Please keep it under 5,000 characters.",
    },
  },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  meta: {
    title: "Romano Web — Construimos lo que te hace avanzar",
    description:
      "Romano Web es un estudio independiente de desarrollo web y diseño digital. Diseño cuidadoso y desarrollo serio para pequeñas y medianas empresas.",
    ogLocale: "es_US",
  },
  common: {
    fullName: "Romano Web — Estudio Digital Independiente",
    homeLabel: "Romano Web, inicio",
    studio: "Web",
  },
  nav: {
    label: "Principal",
    skip: "Saltar al contenido",
    links: [
      { label: "Servicios", id: "services" },
      { label: "Trabajo", id: "work" },
      { label: "Nosotros", id: "about" },
    ],
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
  },
  footer: {
    meta: "© 2026 Romano Web · Hecho con intención",
    note: "Mueve el cursor. Haz clic en los puntos.",
    backToTop: "Volver arriba ↑",
    studio: "Estudio",
    start: "Empezar",
    direct: "Directo",
    language: "Idioma",
    links: { services: "Servicios", work: "Trabajo", approach: "Proceso", about: "Nosotros" },
    startProject: "Iniciar un proyecto",
    contact: "Contacto",
  },
  hero: {
    meta: ["Romano Web", "Estudio Digital Independiente", "Diseño / Desarrollo", "Aceptando nuevos proyectos"],
    lines: ["Construimos", "lo que te hace", "avanzar"],
    leadStrong: "Experiencias digitales diseñadas con propósito y construidas con precisión.",
    lead: "Ayudamos a los negocios a fortalecer su presencia en línea con diseño cuidadoso y desarrollo serio.",
    primary: "Iniciar un proyecto",
    secondary: "Ver nuestro trabajo",
    scroll: "Desliza",
  },
  marquee: ["Sitios web para negocios", "Landing pages", "Aplicaciones web", "Rediseño web"],
  services: {
    label: "Servicios",
    note: "Lo que hacemos",
    titleA: "Cuatro formas",
    titleB: "de avanzar.",
    intro: "Cada proyecto se diseña y se desarrolla en el estudio, desde el primer boceto hasta el sitio publicado.",
    srStart: "Iniciar un proyecto:",
    items: [
      {
        title: "Sitios web para negocios",
        body: "Sitios web profesionales diseñados para generar credibilidad, comunicar tu valor y atraer clientes.",
        tags: ["Sitios de varias páginas", "Estructura de contenido", "Bases de SEO"],
      },
      {
        title: "Landing pages",
        body: "Páginas enfocadas en la conversión, creadas para productos, campañas o servicios específicos.",
        tags: ["Campañas", "Lanzamientos", "Captación de clientes"],
      },
      {
        title: "Aplicaciones web",
        body: "Herramientas y aplicaciones digitales hechas a la medida de las necesidades de tu negocio.",
        tags: ["Paneles", "Herramientas internas", "Portales de clientes"],
      },
      {
        title: "Rediseño web",
        body: "Moderniza un sitio desactualizado con mejor diseño, usabilidad y rendimiento.",
        tags: ["Auditoría", "Nuevo diseño", "Reconstrucción"],
      },
    ],
  },
  work: {
    label: "Trabajo seleccionado",
    note: "Proyectos conceptuales",
    title: "Trabajo seleccionado",
    intro:
      "Estos proyectos son conceptos del estudio que muestran cómo abordamos distintos tipos de negocio. Aquí aparecerán casos de clientes a medida que se lancen.",
    concept: "Concepto",
    type: "Tipo",
    industry: "Sector",
    status: "Estado",
    statusValue: "Concepto del estudio",
    previewAlt: "Ilustración del concepto {name} en un navegador de escritorio y un teléfono.",
    projects: [
      {
        category: "Construcción",
        type: "Sitio web para negocio",
        description:
          "Un sitio para un contratista general que pone al frente sus servicios, sus obras anteriores y una solicitud de cotización sencilla.",
      },
      {
        category: "Salud",
        type: "Landing page",
        description:
          "Una landing page tranquila y centrada en las reservas para una clínica de fisioterapia, pensada para que los pacientes elijan un horario en pocos toques.",
      },
      {
        category: "Servicios de campo",
        type: "Aplicación web",
        description:
          "Un panel de operaciones para un equipo de servicios de campo: trabajos, cuadrillas, horarios y facturas en un solo lugar.",
      },
    ],
  },
  approach: {
    label: "Proceso",
    note: "Cómo funciona un proyecto",
    titleA: "Un proceso claro,",
    titleB: "del inicio al lanzamiento.",
    intro:
      "Cuatro etapas, cada una con un resultado claro, para que siempre sepas en qué punto está tu proyecto y qué sigue.",
    steps: [
      { title: "Descubrir", body: "Entender el negocio, la audiencia y los objetivos." },
      { title: "Diseñar", body: "Definir la dirección visual y la experiencia de usuario." },
      { title: "Construir", body: "Convertir el diseño aprobado en un sitio rápido y adaptable." },
      { title: "Lanzar", body: "Probar, ajustar y publicar la experiencia terminada." },
    ],
  },
  about: {
    label: "Nosotros",
    srTitle: "Sobre Romano Web",
    side: "Un estudio digital independiente",
    foundedBy: "Fundado por",
    statement:
      "El buen diseño debe hacer más que verse bien. Debe hacer las cosas más claras, más fáciles y más efectivas. Romano Web une diseño y desarrollo para crear experiencias digitales que ayudan a los negocios a avanzar.",
    highlight: ["avanzar"],
    founder: {
      eyebrow: "Fundador",
      role: "Ingeniero de software",
      photoAlt: "Retrato de Andoni Romano",
      bio: "Soy Andoni Romano, ingeniero de software con más de 4 años de experiencia creando aplicaciones web, sistemas de diseño y productos con inteligencia artificial. Trabajo en todo el proceso, desde la interfaz y los componentes reutilizables hasta las APIs, y fundé Romano Web para llevar ese mismo cuidado a pequeñas y medianas empresas.",
      based: "Desde México · Trabajo en inglés y español",
      focusTitle: "Enfoque",
      focus: ["Arquitectura frontend", "Sistemas de diseño", "Apps con IA", "Desarrollo web full-stack"],
      offTitle: "En mi tiempo libre",
      off: ["Guitarra", "Lectura", "Ajedrez", "La playa"],
    },
    principles: [
      {
        title: "Diseño y desarrollo, juntos",
        body: "Quien diseña tu sitio también lo construye, así nada se pierde entre la maqueta y el producto final.",
      },
      {
        title: "Colaboración directa",
        body: "Trabajas directamente con el estudio. Sin intermediarios, sin traspasos, sin dudas sobre a quién preguntar.",
      },
      {
        title: "Hecho para rendir",
        body: "Rápido, adaptable y accesible desde el principio, porque un sitio solo es útil si la gente puede usarlo.",
      },
      {
        title: "Listo para crecer",
        body: "Código limpio y fácil de mantener, con una estructura clara, para que tu sitio evolucione con tu negocio.",
      },
    ],
  },
  finalCta: {
    eyebrow: "(05) — Siguiente paso",
    lines: ["¿Tienes algo", "en mente"],
    body: "Construyamos algo que haga avanzar tu negocio.",
    orWrite: "O escríbenos a",
    button: ["Iniciar un", "proyecto"],
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription:
      "Inicia un proyecto con Romano Web. Cuéntanos sobre tu sitio web, landing page, aplicación web o rediseño.",
    top: ["Contacto", "Iniciar un proyecto"],
    lines: ["Avancemos", "juntos"],
    intro: "Cuéntanos un poco sobre tu proyecto. Te responderemos para conversar sobre cómo podemos ayudarte.",
    formLabel: "Formulario de contacto",
    direct: "Directo",
    directNote: "¿Prefieres el correo? Escríbenos directamente. El mismo estudio, la misma respuesta.",
    nextTitle: "Qué sigue",
    nextSteps: [
      { title: "Nos envías un mensaje", body: "Unas líneas sobre tu negocio y lo que necesitas son suficientes." },
      { title: "Te respondemos", body: "Leemos cada mensaje y te contactamos para hacer preguntas y entender el proyecto." },
      { title: "Lo conversamos", body: "Una llamada breve para acordar el alcance, los plazos y los próximos pasos." },
    ],
  },
  form: {
    requiredBefore: "Los campos marcados con",
    requiredAfter: "son obligatorios.",
    requiredSr: "(obligatorio)",
    optional: "Opcional",
    name: "Nombre",
    email: "Correo electrónico",
    company: "Empresa",
    projectType: "Tipo de proyecto",
    budget: "Presupuesto estimado",
    message: "Descripción del proyecto",
    messageHint: "Objetivos, plazos, enlaces a tu sitio actual: todo lo que sea útil.",
    projectTypes: ["Sitio web para negocio", "Landing page", "Aplicación web", "Rediseño web", "Aún no lo sé"],
    budgets: ["Menos de $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Aún no lo sé"],
    submit: "Enviar mensaje",
    sending: "Enviando…",
    sendingSr: "Enviando tu mensaje",
    successTitle: "Mensaje recibido.",
    successBody: "Gracias por escribirnos. Leeremos tu mensaje y te responderemos para hablar de tu proyecto.",
    another: "Enviar otro mensaje",
    errorTitle: "Mensaje no enviado",
    errorNotConfigured: "Nuestro formulario de contacto aún no está conectado, así que tu mensaje no se entregó.",
    errorNetwork: "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
    errorProvider: "Algo salió mal de nuestro lado y tu mensaje no se entregó. Inténtalo de nuevo.",
    errorVerification: "No pudimos verificar este envío, así que no se mandó. Inténtalo de nuevo.",
    errorTooFast: "Fue muy rápido, así que no se mandó. Espera un momento y vuelve a enviarlo.",
    errorExpired: "El formulario llevaba un rato abierto, así que lo actualizamos. Vuelve a enviar tu mensaje.",
    errorRateLimited: "Enviaste varios mensajes en poco tiempo. Espera unos minutos e inténtalo de nuevo.",
    humanCheck: "Comprobación rápida de que eres humano",
    alsoEmail: "También puedes escribirnos directamente a",
    validation: {
      name: "Escribe tu nombre.",
      nameLong: "Ese nombre es un poco largo.",
      email: "Escribe un correo electrónico válido.",
      company: "Acorta el nombre de la empresa.",
      projectType: "Elige un tipo de proyecto.",
      messageShort: "Cuéntanos un poco más (al menos 20 caracteres).",
      messageLong: "Mantén el mensaje por debajo de 5,000 caracteres.",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
