import type { Locale } from "./config";

/**
 * Textos del sitio en español e inglés.
 * Las plantillas usan {llave} y se rellenan con fill() (sin funciones,
 * para poder pasar el diccionario a componentes cliente).
 */
const es = {
  meta: {
    title: "Diego Mera — Diseñador UX/UI",
    description:
      "Diseñador UX/UI en Samborondón, Ecuador. Hago simple lo complejo en dashboards, productos SaaS B2B y sitios corporativos para equipos de Latinoamérica y el Caribe.",
    ogLocale: "es_EC",
  },
  nav: {
    work: "Trabajo",
    about: "Sobre mí",
    process: "Proceso",
    contact: "Contacto",
    book: "Agendar llamada",
    menu: "Menú",
    close: "Cerrar",
    skip: "Saltar al contenido",
    switchTo: "English",
    switchLabel: "Ver el sitio en inglés",
    home: "Diego Mera, inicio",
  },
  common: {
    bookCall: "Agendar una llamada",
    whatsapp: "Escribir por WhatsApp",
    whatsappShort: "WhatsApp",
    orWhatsapp: "o escríbeme por WhatsApp",
    viewCase: "Ver el caso",
    allCases: "Ver todos los casos",
    availability:
      "Disponible para full-time y freelance. Samborondón, Ecuador · GMT−5",
    imagePending: "Imagen pendiente",
    whatsappHello: "Hola Diego, vi tu portfolio y me gustaría conversar.",
    mailSubject: "Conversemos — desde tu portfolio",
  },
  home: {
    statement:
      "Diseñador UX/UI. Hago simple lo complejo en dashboards, productos SaaS B2B y sitios corporativos.",
    numbers: {
      title: "Lo que he entregado",
      items: [
        {
          value: "15+",
          label:
            "proyectos entregados para equipos de Ecuador, Latinoamérica y el Caribe.",
        },
        {
          value: "6",
          label:
            "industrias: seguros, acuicultura, robótica, hotelería, delivery y organizaciones sociales.",
        },
        {
          value: "4+",
          label:
            "años en la industria tecnológica: primero del lado comercial, hoy diseñando productos.",
        },
        {
          value: "1",
          label:
            "sistema de diseño por producto, del celular al escritorio: web, apps y dashboards hablan el mismo idioma.",
        },
      ],
    },
    work: { title: "Trabajo seleccionado" },
    about: {
      title: "Sobre mí",
      story:
        "Soy Diego Mera, diseñador UX/UI en Samborondón, Ecuador. Antes de diseñar pasé dos años en ventas, y eso cambió mi forma de trabajar: escucho al cliente, hablo el idioma del negocio y priorizo lo que genera impacto. Hoy diseño productos de punta a punta para equipos de Latinoamérica y el Caribe: dashboards multirol para seguros y acuicultura, plataformas SaaS y sitios corporativos. Antes de abrir Figma entiendo el problema; después acompaño el handoff junto a developers y product managers hasta que el diseño se implementa bien. Una buena interfaz no se decora: se entiende.",
      highlights: [
        "Diego Mera",
        "Samborondón, Ecuador",
        "dos años en ventas",
        "el idioma del negocio",
        "Latinoamérica y el Caribe",
        "dashboards multirol",
        "Una buena interfaz no se decora: se entiende.",
      ],
      skills:
        "Figma · Design systems y tokens · User research · User journeys · Prototipado · Pruebas de usabilidad · Handoff a desarrollo",
      more: "Más sobre mí",
      portrait: "Retrato de Diego",
    },
    process: {
      title: "Así trabajo, de punta a punta",
      stages: [
        {
          name: "Entender",
          duration: "≈ 1 semana",
          weight: 18,
          desc: "Investigo usuarios, analizo benchmarks y defino qué problema hay que resolver.",
        },
        {
          name: "Estructurar",
          duration: "3–5 días",
          weight: 16,
          desc: "Traduzco el análisis en user journeys, flujos y wireframes.",
        },
        {
          name: "Diseñar",
          duration: "2–4 semanas",
          weight: 36,
          desc: "Prototipos de alta fidelidad en Figma, con design system y tokens.",
        },
        {
          name: "Validar",
          duration: "≈ 1 semana",
          weight: 15,
          desc: "Reviso las decisiones con el equipo y stakeholders antes de desarrollo.",
        },
        {
          name: "Entregar",
          duration: "Continuo",
          weight: 15,
          desc: "Documento y acompaño el handoff hasta que se implementa bien.",
        },
      ],
    },
    testimonials: {
      title: "Lo que dicen de trabajar conmigo",
      next: "Siguiente",
      prev: "Anterior",
      of: "de",
      // Agregar aquí testimonios reales de LinkedIn: { quote, name, role }.
      // La sección se oculta mientras la lista esté vacía.
      items: [] as { quote: string; name: string; role: string }[],
    },
    contact: {
      title: "Hablemos de tu producto",
      body: "Cuéntame qué estás construyendo. Respondo en menos de 24 horas, en español o en inglés.",
      callMeta: "Llamada de 30 minutos · Google Meet",
    },
  },
  footer: {
    rights: "Diego Mera",
    made: "Diseñado y desarrollado en Samborondón, Ecuador",
    backTop: "Volver arriba",
  },
  caseStudy: {
    back: "Todos los casos",
    labels: {
      client: "Cliente",
      role: "Mi rol",
      team: "Equipo",
      duration: "Duración",
      platform: "Plataforma",
      year: "Año",
    },
    results: "Resultados",
    next: "Siguiente caso",
    live: "Ver proyecto en vivo",
    ctaTitle: "¿Tu producto tiene un problema parecido?",
  },
  about: {
    metaTitle: "Sobre mí",
    metaDescription:
      "Diseñador UX/UI en Samborondón, Ecuador. Vengo de ventas: diseño hablando el idioma del negocio.",
    h1: "Hola, soy Diego.",
    statement:
      "Diseñador UX/UI en Samborondón, Ecuador. Vengo de ventas, por eso diseño hablando el idioma del negocio.",
    story: [
      "Antes de diseñar pasé dos años como asesor comercial en Shepwashi y en Todo Domi. Ahí aprendí algo que no se enseña en un curso: cómo piensan las personas cuando deciden bajo presión.",
      "En 2024 pasé al equipo de diseño de Shepwashi. Desde entonces diseño productos de punta a punta para clientes de Latinoamérica y el Caribe: dashboards de siniestros y el sitio web de una insurtech, una plataforma para operación acuícola en desktop e iPad, el sitio de una línea de robótica de servicio y una app de concierge para huéspedes de hotel.",
      "He trabajado en seguros, acuicultura, robótica, hotelería y delivery. Eso me enseñó que el proceso importa más que la industria: si entiendes al usuario y al negocio, puedes diseñar para cualquier contexto.",
    ],
    seeWork: "Ver mi trabajo",
    experience: {
      title: "Experiencia",
      items: [
        {
          years: "2024 — hoy",
          role: "Diseñador UX/UI",
          place: "Shepwashi · Samborondón",
          desc: "Productos digitales de punta a punta: dashboards, sitios corporativos y design systems para clientes de Latinoamérica y el Caribe.",
        },
        {
          years: "2024",
          role: "Asesor de innovación",
          place: "Todo Domi · Galápagos",
          desc: "",
        },
        {
          years: "2022 — 2024",
          role: "Asesor comercial",
          place: "Shepwashi · Samborondón",
          desc: "",
        },
        {
          years: "2023 — 2024",
          role: "Asesor comercial",
          place: "Todo Domi · Galápagos",
          desc: "",
        },
        {
          years: "2020 — 2025",
          role: "Licenciatura en Negocios Digitales",
          place: "Universidad Espíritu Santo",
          desc: "",
        },
      ],
    },
    principles: {
      title: "Cómo trabajo",
      items: [
        {
          head: "Una buena interfaz no se decora: se entiende.",
          body: "Antes de pensar en lo visual, ordeno la información: qué necesita ver cada persona primero y qué puede esperar.",
        },
        {
          head: "Antes de abrir Figma, entiendo el problema.",
          body: "Investigo usuarios, reviso benchmarks y defino con el negocio qué hay que resolver y cómo lo vamos a medir.",
        },
        {
          head: "El trabajo no termina en el handoff.",
          body: "Documento, acompaño a developers y product managers, y reviso la implementación hasta que el diseño funciona en producción.",
        },
      ],
    },
    skills: {
      title: "Herramientas y habilidades",
      groups: [
        {
          name: "UX/UI",
          items: [
            "User research",
            "User journeys",
            "Arquitectura de información",
            "Wireframing y prototipado",
            "Pruebas de usabilidad",
            "Benchmarking",
            "Design systems y tokens",
          ],
        },
        { name: "Herramientas", items: ["Figma", "FigJam", "Miro"] },
        { name: "IA en el proceso", items: ["Claude", "Stitch de Google"] },
        {
          name: "Con el equipo",
          items: [
            "Colaboración con developers y PMs",
            "Comunicación de decisiones de diseño",
            "Pensamiento de negocio",
          ],
        },
      ],
    },
    certs: {
      title: "Certificaciones",
      items: [
        "Foundations of User Experience (UX) Design",
        "Start the UX Design Process: Empathize, Define, and Ideate",
        "Productividad Personal",
      ],
    },
    ctaTitle: "¿Trabajamos juntos?",
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription:
      "Agenda una llamada de 30 minutos con Diego Mera o escríbele por WhatsApp o email.",
    h1: "Hablemos de tu producto",
    intro:
      "Agenda una llamada de 30 minutos o escríbeme. Respondo en menos de 24 horas, en español o en inglés.",
    localTime: "Hora local",
    planner: {
      title: "Llamada de 30 minutos",
      sub: "Google Meet · confirmo por WhatsApp o email",
      pickDay: "Elige un día",
      pickTime: "Elige una hora (hora de Ecuador, GMT−5)",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      weekdays: ["L", "M", "X", "J", "V", "S", "D"],
      selected: "{day} · {time} (GMT−5)",
      confirm: "Proponer {day}, {time}",
      confirmEmpty: "Elige día y hora",
      byEmail: "Prefiero proponerlo por email",
      message:
        "Hola Diego, vi tu portfolio. ¿Podemos hablar el {day} a las {time} (hora de Ecuador)?",
      emailSubject: "Llamada de 30 minutos — {day}, {time}",
    },
    channelsTitle: "Otras formas de contacto",
    channels: { whatsapp: "WhatsApp", email: "Email", linkedin: "LinkedIn" },
    form: {
      title: "¿Prefieres escribir?",
      kindLabel: "¿Qué estás buscando?",
      kinds: {
        job: "Puesto full-time",
        freelance: "Proyecto freelance",
        other: "Otro",
      },
      name: "Nombre",
      email: "Email",
      company: "Empresa (opcional)",
      message: "¿Qué necesitas?",
      messagePlaceholder: "Cuéntame sobre el puesto o el proyecto…",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      success: "Mensaje enviado. Te respondo en menos de 24 horas.",
      mocked:
        "(Modo simulado: Resend no está configurado. El mensaje quedó en la consola del servidor.)",
      offline: "Sin conexión. Revisa tu red e inténtalo de nuevo.",
      failed: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      honeypot: "Sitio web (no rellenar)",
      errors: {
        name_short: "Escribe tu nombre.",
        name_long: "Máximo 80 caracteres.",
        email_invalid: "Escribe un email válido.",
        email_long: "Máximo 160 caracteres.",
        company_long: "Máximo 120 caracteres.",
        message_short: "Cuéntame un poco más (mínimo 10 caracteres).",
        message_long: "Máximo 2000 caracteres.",
      },
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Estás disponible para trabajar en remoto?",
          a: "Sí. Trabajo desde Samborondón, Ecuador (GMT−5), la misma zona horaria de gran parte de Latinoamérica y, en invierno, de la costa este de EE. UU.",
        },
        {
          q: "¿Buscas un puesto full-time o proyectos freelance?",
          a: "Las dos cosas. Priorizo puestos full-time en equipos de producto, y tomo proyectos freelance cuando el alcance encaja con lo que hago mejor.",
        },
        {
          q: "¿Qué tipo de proyectos freelance tomas?",
          a: "Dashboards y paneles de gestión, productos SaaS B2B y sitios corporativos: de la investigación y los flujos al prototipo en Figma y el handoff a desarrollo.",
        },
      ],
    },
  },
  notFound: {
    title: "Esta página no existe",
    body: "Puede que el enlace esté mal escrito o que la página se haya movido.",
    home: "Volver al inicio",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Diego Mera — UX/UI Designer",
    description:
      "UX/UI designer based in Samborondón, Ecuador. I make complex things simple: dashboards, B2B SaaS products and corporate websites for teams across Latin America and the Caribbean.",
    ogLocale: "en_US",
  },
  nav: {
    work: "Work",
    about: "About",
    process: "Process",
    contact: "Contact",
    book: "Book a call",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    switchTo: "Español",
    switchLabel: "Ver el sitio en español",
    home: "Diego Mera, home",
  },
  common: {
    bookCall: "Book a call",
    whatsapp: "Message me on WhatsApp",
    whatsappShort: "WhatsApp",
    orWhatsapp: "or message me on WhatsApp",
    viewCase: "View case study",
    allCases: "See all case studies",
    availability:
      "Open to full-time roles and freelance. Samborondón, Ecuador · GMT−5",
    imagePending: "Image coming soon",
    whatsappHello: "Hi Diego, I saw your portfolio and would like to talk.",
    mailSubject: "Let's talk — from your portfolio",
  },
  home: {
    statement:
      "UX/UI designer. I make complex things simple: dashboards, B2B SaaS products and corporate websites.",
    numbers: {
      title: "What I have delivered",
      items: [
        {
          value: "15+",
          label:
            "projects delivered for teams in Ecuador, Latin America and the Caribbean.",
        },
        {
          value: "6",
          label:
            "industries: insurance, aquaculture, robotics, hospitality, delivery and non-profits.",
        },
        {
          value: "4+",
          label:
            "years in the tech industry: first on the sales side, now designing products.",
        },
        {
          value: "1",
          label:
            "design system per product, from phone to desktop: websites, apps and dashboards speak the same language.",
        },
      ],
    },
    work: { title: "Selected work" },
    about: {
      title: "About",
      story:
        "I'm Diego Mera, a UX/UI designer based in Samborondón, Ecuador. Before design I spent two years in sales, and it changed how I work: I listen to clients, speak the language of the business and prioritise what drives impact. Today I design products end to end for teams across Latin America and the Caribbean: multi-role dashboards for insurance and aquaculture, SaaS platforms and corporate websites. Before opening Figma I understand the problem; afterwards I stay with developers and product managers through handoff until the design ships right. A good interface isn't decorated: it's understood.",
      highlights: [
        "Diego Mera",
        "Samborondón, Ecuador",
        "two years in sales",
        "the language of the business",
        "Latin America and the Caribbean",
        "multi-role dashboards",
        "A good interface isn't decorated: it's understood.",
      ],
      skills:
        "Figma · Design systems and tokens · User research · User journeys · Prototyping · Usability testing · Developer handoff",
      more: "More about me",
      portrait: "Portrait of Diego",
    },
    process: {
      title: "How I work, end to end",
      stages: [
        {
          name: "Understand",
          duration: "≈ 1 week",
          weight: 18,
          desc: "I research users, study benchmarks and define the problem worth solving.",
        },
        {
          name: "Structure",
          duration: "3–5 days",
          weight: 16,
          desc: "I turn that analysis into user journeys, flows and wireframes.",
        },
        {
          name: "Design",
          duration: "2–4 weeks",
          weight: 36,
          desc: "High-fidelity prototypes in Figma, built on a design system and tokens.",
        },
        {
          name: "Validate",
          duration: "≈ 1 week",
          weight: 15,
          desc: "I review decisions with the team and stakeholders before development.",
        },
        {
          name: "Deliver",
          duration: "Ongoing",
          weight: 15,
          desc: "I document and stay through handoff until it ships right.",
        },
      ],
    },
    testimonials: {
      title: "What people say about working with me",
      next: "Next",
      prev: "Previous",
      of: "of",
      items: [],
    },
    contact: {
      title: "Let's talk about your product",
      body: "Tell me what you're building. I reply within 24 hours, in English or Spanish.",
      callMeta: "30-minute call · Google Meet",
    },
  },
  footer: {
    rights: "Diego Mera",
    made: "Designed and built in Samborondón, Ecuador",
    backTop: "Back to top",
  },
  caseStudy: {
    back: "All case studies",
    labels: {
      client: "Client",
      role: "My role",
      team: "Team",
      duration: "Duration",
      platform: "Platform",
      year: "Year",
    },
    results: "Results",
    next: "Next case study",
    live: "See it live",
    ctaTitle: "Does your product have a similar problem?",
  },
  about: {
    metaTitle: "About",
    metaDescription:
      "UX/UI designer based in Samborondón, Ecuador. I come from sales, so I design in the language of the business.",
    h1: "Hi, I'm Diego.",
    statement:
      "UX/UI designer based in Samborondón, Ecuador. I come from sales, so I design in the language of the business.",
    story: [
      "Before design I spent two years as a sales advisor at Shepwashi and Todo Domi. There I learned something no course teaches: how people think when they decide under pressure.",
      "In 2024 I moved to Shepwashi's design team. Since then I design products end to end for clients across Latin America and the Caribbean: claims dashboards and the website for an insurtech company, a desktop and iPad platform for aquaculture operations, the website for a service robotics line and a concierge app for hotel guests.",
      "I've worked in insurance, aquaculture, robotics, hospitality and delivery. It taught me that process matters more than industry: if you understand the user and the business, you can design for any context.",
    ],
    seeWork: "See my work",
    experience: {
      title: "Experience",
      items: [
        {
          years: "2024 — now",
          role: "UX/UI Designer",
          place: "Shepwashi · Samborondón",
          desc: "Digital products end to end: dashboards, corporate websites and design systems for clients across Latin America and the Caribbean.",
        },
        {
          years: "2024",
          role: "Innovation Advisor",
          place: "Todo Domi · Galápagos",
          desc: "",
        },
        {
          years: "2022 — 2024",
          role: "Sales Advisor",
          place: "Shepwashi · Samborondón",
          desc: "",
        },
        {
          years: "2023 — 2024",
          role: "Sales Advisor",
          place: "Todo Domi · Galápagos",
          desc: "",
        },
        {
          years: "2020 — 2025",
          role: "BA in Digital Business",
          place: "Universidad Espíritu Santo",
          desc: "",
        },
      ],
    },
    principles: {
      title: "How I work",
      items: [
        {
          head: "A good interface isn't decorated: it's understood.",
          body: "Before the visuals, I organise the information: what each person needs to see first and what can wait.",
        },
        {
          head: "Before opening Figma, I understand the problem.",
          body: "I research users, review benchmarks and agree with the business on what to solve and how we'll measure it.",
        },
        {
          head: "The work doesn't end at handoff.",
          body: "I document, support developers and product managers, and review the build until the design works in production.",
        },
      ],
    },
    skills: {
      title: "Tools and skills",
      groups: [
        {
          name: "UX/UI",
          items: [
            "User research",
            "User journeys",
            "Information architecture",
            "Wireframing and prototyping",
            "Usability testing",
            "Benchmarking",
            "Design systems and tokens",
          ],
        },
        { name: "Tools", items: ["Figma", "FigJam", "Miro"] },
        { name: "AI in the process", items: ["Claude", "Google Stitch"] },
        {
          name: "With the team",
          items: [
            "Working with developers and PMs",
            "Communicating design decisions",
            "Business thinking",
          ],
        },
      ],
    },
    certs: {
      title: "Certifications",
      items: [
        "Foundations of User Experience (UX) Design",
        "Start the UX Design Process: Empathize, Define, and Ideate",
        "Personal Productivity",
      ],
    },
    ctaTitle: "Shall we work together?",
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Book a 30-minute call with Diego Mera or message him on WhatsApp or email.",
    h1: "Let's talk about your product",
    intro:
      "Book a 30-minute call or write to me. I reply within 24 hours, in English or Spanish.",
    localTime: "Local time",
    planner: {
      title: "30-minute call",
      sub: "Google Meet · I confirm by WhatsApp or email",
      pickDay: "Pick a day",
      pickTime: "Pick a time (Ecuador time, GMT−5)",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      weekdays: ["M", "T", "W", "T", "F", "S", "S"],
      selected: "{day} · {time} (GMT−5)",
      confirm: "Propose {day}, {time}",
      confirmEmpty: "Pick a day and time",
      byEmail: "I'd rather propose it by email",
      message:
        "Hi Diego, I saw your portfolio. Could we talk on {day} at {time} (Ecuador time)?",
      emailSubject: "30-minute call — {day}, {time}",
    },
    channelsTitle: "Other ways to reach me",
    channels: { whatsapp: "WhatsApp", email: "Email", linkedin: "LinkedIn" },
    form: {
      title: "Rather write?",
      kindLabel: "What are you looking for?",
      kinds: {
        job: "Full-time role",
        freelance: "Freelance project",
        other: "Something else",
      },
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      message: "What do you need?",
      messagePlaceholder: "Tell me about the role or the project…",
      submit: "Send message",
      sending: "Sending…",
      success: "Message sent. I'll reply within 24 hours.",
      mocked:
        "(Mock mode: Resend isn't configured. The message was logged on the server.)",
      offline: "You're offline. Check your connection and try again.",
      failed: "The message couldn't be sent. Please try again.",
      honeypot: "Website (leave empty)",
      errors: {
        name_short: "Please enter your name.",
        name_long: "80 characters maximum.",
        email_invalid: "Please enter a valid email.",
        email_long: "160 characters maximum.",
        company_long: "120 characters maximum.",
        message_short: "Tell me a bit more (at least 10 characters).",
        message_long: "2000 characters maximum.",
      },
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Are you available to work remotely?",
          a: "Yes. I work from Samborondón, Ecuador (GMT−5), the same time zone as much of Latin America and, in winter, the US East Coast.",
        },
        {
          q: "Are you looking for a full-time role or freelance projects?",
          a: "Both. I prioritise full-time roles on product teams, and I take freelance projects when the scope fits what I do best.",
        },
        {
          q: "What kind of freelance projects do you take on?",
          a: "Dashboards and admin panels, B2B SaaS products and corporate websites: from research and flows to Figma prototypes and developer handoff.",
        },
      ],
    },
  },
  notFound: {
    title: "This page doesn't exist",
    body: "The link may be mistyped, or the page may have moved.",
    home: "Back to home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** Rellena una plantilla: fill("Hola {name}", { name: "Ana" }). */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
