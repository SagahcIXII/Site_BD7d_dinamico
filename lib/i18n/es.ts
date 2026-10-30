import type { Dict } from ".";

/* Español — España/Europa (UNE, IEC, REBT) y América Latina (NOM, NMX) */
export const es: Dict = {
  meta: {
    title: "BD7D Solutions | Ingeniería · Energía · Performance",
    description:
      "Proyectos inteligentes en energía, construcción, automatización y performance. Conectamos la ingeniería con los resultados de su negocio.",
  },
  nav: {
    energia: "Energía",
    construcao: "Construcción",
    performance: "Performance",
    cases: "Casos",
    contato: "Contáctenos",
    idioma: "Idioma",
  },
  hero: {
    logoAlt: "BD7D Solutions",
    intro: {
      linha1: "Energía · Construcción · Performance",
      linha2: "Del proyecto a la operación.",
    },
    fases: [
      {
        eyebrow: "Energía · Proyectos Eléctricos",
        titulo: "Todo sistema nace de un buen proyecto.",
        texto:
          "Esquemas, dimensionamiento y cumplimiento normativo (IEC, REBT) — ingeniería diseñada antes de construirse.",
      },
      {
        eyebrow: "Performance · Gestión de Energía",
        titulo: "Decisiones guiadas por datos.",
        texto: "Medición, KPIs y dashboards que convierten el consumo en margen — de la dirección a la planta.",
      },
      {
        eyebrow: "Automatización Industrial",
        titulo: "Control preciso en cada punto de la operación.",
        texto: "PLCs, redes de fibra óptica y SCADA integrados con trazabilidad y seguridad.",
      },
    ],
    dicaScroll: "Desplácese para explorar",
    carregando: "Cargando",
  },
  diferenciais: [
    { titulo: "Ingeniería integrada", texto: "Eléctrica, civil y automatización en un mismo proyecto, sin retrabajos entre disciplinas." },
    {
      titulo: "Cumplimiento normativo",
      texto: "IEC 62305 y REBT en España, NOM-001-SEDE en México y requisitos de la distribuidora desde el primer plano.",
    },
    { titulo: "Enfoque en resultados", texto: "Cada entrega medida en costo de energía, disponibilidad y margen." },
    { titulo: "Con sede en Brasil", texto: "Base en Manaos, con soporte de ingeniería remoto para proyectos internacionales." },
  ],
  servicos: {
    eyebrow: "Qué hacemos",
    titulo: ["Tres pilares, ", "una ingeniería", " conectada a su negocio."],
    texto:
      "De la subestación al dashboard de la dirección: diseñamos, ejecutamos y acompañamos la operación para que la energía y la infraestructura trabajen a favor de su margen.",
  },
  pilares: [
    {
      tag: "Pilar 01 · Energía",
      eyebrow: "Energía con visión estratégica",
      titulo: "Proyecto, seguridad y eficiencia económica.",
      texto:
        "Conectamos proyecto, regulación y eficiencia — incluida la compra de energía en mercado liberalizado, protección contra rayos y gestión de contratos.",
      alt: "Proyecto eléctrico en una tableta sobre la mesa con interruptor y planos",
      itens: [
        [
          "Protección contra rayos y puesta a tierra — IEC 62305",
          "Evaluación de riesgo, proyecto ejecutivo, memorias y certificados (UNE-EN 62305 en España, NMX-J-549-ANCE en México).",
        ],
        [
          "Eficiencia energética — ISO 50001",
          "Potencia contratada, factor de potencia, curva de carga y auditorías energéticas (UNE-EN 16247).",
        ],
        [
          "Compra de energía en mercado liberalizado",
          "Viabilidad, contratos con comercializadoras y PPAs, con seguimiento tras la migración.",
        ],
      ],
      cta: "Hablar de energía",
      mensagem: "Hola, quiero optimizar la gestión de energía de mi empresa.",
    },
    {
      tag: "Pilar 02 · Construcción",
      eyebrow: "Construcción orientada al desempeño",
      titulo: "Cada metro cuadrado a favor del flujo productivo.",
      texto:
        "Diseñamos y gestionamos obras con foco en layout inteligente, confort térmico, seguridad y viabilidad económica.",
      alt: "Nave industrial con estructura metálica",
      itens: [
        ["Naves industriales y centros logísticos", "Layout de producción, áreas técnicas e infraestructura dimensionada para crecer."],
        ["Retrofit con mínimo tiempo de parada", "Intervenciones por fases, refuerzo estructural y adecuación de sistemas."],
        ["Modelado BIM y render 3D — ISO 19650", "Coordinación de disciplinas y visualización para decisión y aprobación."],
      ],
      cta: "Conversar sobre una obra",
      mensagem: "Hola, quiero evaluar un proyecto de nave industrial o reforma con BD7D.",
    },
    {
      tag: "Pilar 03 · Performance",
      eyebrow: "Automatización y datos",
      titulo: "Indicadores que se convierten en decisiones diarias.",
      texto: "Automatización industrial, scripts a medida y dashboards para reducir fallas manuales y ganar previsibilidad.",
      alt: "PLC industrial con conexiones de fibra óptica",
      itens: [
        [
          "Automatización de tableros, líneas y servicios",
          "PLCs IEC 61131-3, variadores, medición de energía y SCADA (UNE-EN 60204-1 para máquinas).",
        ],
        ["Automatización de procesos administrativos", "Bots, scripts e integraciones en la nube que eliminan tareas repetitivas."],
        ["KPIs y dashboards", "Paneles que hablan con la dirección, la operación y la planta."],
      ],
      cta: "Acelerar la performance",
      mensagem: "Hola, quiero mejorar los KPIs y la automatización de mi operación.",
    },
  ],
  bim: {
    obra: "Obra ejecutada",
    projeto: "Proyecto BIM",
    aria: "Comparar proyecto BIM y obra ejecutada",
    prefixoAlt: "Modelo BIM —",
  },
  processo: {
    eyebrow: "Cómo trabajamos",
    titulo: ["Del diagnóstico a la ", "operación asistida", "."],
    etapas: [
      { titulo: "Diagnóstico", texto: "Relevamiento en campo, facturas, cargas y cuellos de botella de la operación." },
      { titulo: "Proyecto", texto: "Soluciones dimensionadas, normalizadas y coordinadas en BIM." },
      { titulo: "Ejecución", texto: "Implantación por fases, con gestión de obra y mínimo impacto en la producción." },
      { titulo: "Operación", texto: "Medición, dashboards y mejora continua con indicadores claros." },
    ],
  },
  pd: {
    eyebrow: "Proyectos especiales · I+D",
    titulo: ["Tecnología aplicada donde la ", "industria", " necesita evolucionar."],
    texto:
      "Retrofit, integración de sistemas y proyectos de investigación y desarrollo para operaciones que quieren ir un paso adelante.",
  },
  cases: {
    eyebrow: "Casos reales",
    titulo: ["Casos que conectan ", "ingeniería y resultado", "."],
    itens: [
      {
        segmento: "Industria alimentaria",
        titulo: "Reducción del 18% en el costo de energía",
        texto:
          "Auditoría energética, revisión de potencia contratada, corrección del factor de potencia y estrategia de compra en mercado liberalizado.",
        resultado: "−18% en el costo medio de energía",
      },
      {
        segmento: "Centro logístico",
        titulo: "Nueva nave pensada para crecer",
        texto:
          "Estructura metálica, climatización, protección contra rayos completa y layout preparado para ampliación con mínimo impacto.",
        resultado: "Obra entregada con previsibilidad",
      },
      {
        segmento: "Operación de servicios",
        titulo: "Automatización de procesos y dashboards",
        texto: "Scripts en la nube que alimentan paneles diarios, reducen errores manuales y liberan al equipo para el análisis.",
        resultado: "KPIs críticos casi en tiempo real",
      },
    ],
  },
  cta: {
    titulo: "¿Conversamos sobre su operación?",
    texto: "Cuéntenos el desafío — energía, obra o automatización — y le responderemos con un primer diagnóstico.",
    botao: "Hablar por WhatsApp",
  },
  contato: { mensagemPadrao: "Hola, llegué por el sitio web de BD7D Solutions y me gustaría saber más." },
  rodape: { local: "Manaos, Brasil" },
};
