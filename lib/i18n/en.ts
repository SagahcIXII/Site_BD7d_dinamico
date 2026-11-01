import type { Dict } from ".";

/* English — U.S. (NFPA / NEC / UL) and Europe (IEC / EN / ISO) codes */
export const en: Dict = {
  meta: {
    title: "BD7D Solutions | Engineering · Energy · Performance",
    description:
      "Smart engineering for energy, construction, automation and performance. We connect engineering to your business results.",
  },
  nav: {
    energia: "Energy",
    construcao: "Construction",
    performance: "Performance",
    projetos: "Special projects",
    cases: "Case studies",
    contato: "Contact us",
    chat: "Talk to BD7D",
    idioma: "Language",
    menu: "Menu",
    abrirMenu: "Open menu",
    fecharMenu: "Close menu",
  },
  hero: {
    logoAlt: "BD7D Solutions",
    intro: {
      linha1: "Energy · Construction · Performance",
      linha2: "From design to operation.",
    },
    fases: [
      {
        eyebrow: "Energy · Electrical Design",
        titulo: "Every system starts with a great design.",
        texto:
          "One-line diagrams, sizing and code compliance (NEC, IEC) — engineering designed before it is built.",
      },
      {
        eyebrow: "Performance · Energy Management",
        titulo: "Data-driven decisions.",
        texto: "Metering, KPIs and dashboards that turn consumption into margin — from the boardroom to the shop floor.",
      },
      {
        eyebrow: "Industrial Automation",
        titulo: "Precise control at every point of your operation.",
        texto: "PLCs, fiber-optic networks and SCADA integrated with full traceability and safety.",
      },
    ],
    dicaScroll: "Scroll to explore",
    carregando: "Loading",
  },
  diferenciais: [
    { titulo: "Integrated engineering", texto: "Electrical, civil and automation in a single project, with no rework between disciplines." },
    {
      titulo: "Code compliance",
      texto: "NEC (NFPA 70), NFPA 70E and NFPA 780 in the U.S.; IEC 60364 and EN 62305 in Europe — from the first drawing.",
    },
    { titulo: "Results-driven", texto: "Every deliverable measured in energy cost, uptime and margin." },
    { titulo: "Brazil-based, global reach", texto: "Headquartered in Manaus, delivering projects across Brazil and abroad — on site or through remote engineering." },
  ],
  servicos: {
    eyebrow: "What we do",
    titulo: ["Three pillars, ", "one engineering", " connected to your business."],
    texto:
      "From the substation to the executive dashboard: we design, build and support your operation so energy and infrastructure work in favor of your margin.",
  },
  pilares: [
    {
      tag: "Pillar 01 · Energy",
      eyebrow: "Energy with a strategic view",
      titulo: "Design, safety and economic efficiency.",
      texto: "We connect design, regulation and efficiency — including energy procurement, lightning protection and contract management.",
      alt: "Electrical design on a tablet on a desk with a circuit breaker and drawings",
      itens: [
        [
          "Lightning protection & grounding — NFPA 780 / IEC 62305",
          "Risk assessment, construction documents and compliance reports (UL 96A in the U.S., EN 62305 in Europe).",
        ],
        [
          "Energy efficiency — ISO 50001",
          "Demand charges, power factor, load profiles and energy audits (ASHRAE Level I–III, EN 16247).",
        ],
        [
          "Energy procurement in deregulated markets",
          "Feasibility, retail supply contracts and PPAs in U.S. deregulated states and liberalized EU markets.",
        ],
      ],
      cta: "Talk about energy",
      mensagem: "Hello, I'd like to optimize my company's energy management.",
    },
    {
      tag: "Pillar 02 · Construction",
      eyebrow: "Performance-driven construction",
      titulo: "Every square foot working for your production flow.",
      texto: "We design and manage projects focused on smart layouts, thermal comfort, safety and economic feasibility.",
      alt: "Industrial warehouse with steel structure",
      itens: [
        ["Industrial warehouses & logistics centers", "Production layouts, technical areas and infrastructure sized for expansion."],
        ["Retrofits with minimal downtime", "Phased interventions, structural reinforcement and system upgrades."],
        ["BIM modeling & 3D rendering — ISO 19650", "Clash detection across disciplines and visualization for decisions and approvals."],
      ],
      cta: "Discuss a construction project",
      mensagem: "Hello, I'd like to evaluate a warehouse or retrofit project with BD7D.",
    },
    {
      tag: "Pillar 03 · Performance",
      eyebrow: "Automation & data",
      titulo: "KPIs that become daily decisions.",
      texto: "Industrial automation, custom scripts and dashboards that reduce manual errors and increase predictability.",
      alt: "Industrial PLC with fiber-optic connections",
      itens: [
        [
          "Panel, line & utility automation",
          "IEC 61131-3 PLCs, drives, energy metering and SCADA (UL 508A panels, EN 60204-1 machinery).",
        ],
        ["Business process automation", "Bots, scripts and cloud integrations that eliminate repetitive tasks."],
        ["KPIs & dashboards", "Dashboards that speak to executives, operations and the shop floor."],
      ],
      cta: "Boost performance",
      mensagem: "Hello, I'd like to improve KPIs and automation in my operation.",
    },
  ],
  bim: {
    obra: "Built",
    projeto: "BIM model",
    aria: "Compare BIM model and built project",
    prefixoAlt: "BIM model —",
  },
  processo: {
    eyebrow: "How we work",
    titulo: ["From assessment to ", "assisted operation", "."],
    etapas: [
      { titulo: "Assessment", texto: "Site survey, utility bills, loads and operational bottlenecks." },
      { titulo: "Design", texto: "Code-compliant, right-sized solutions coordinated in BIM." },
      { titulo: "Execution", texto: "Phased implementation with construction management and minimal production impact." },
      { titulo: "Operation", texto: "Metering, dashboards and continuous improvement with clear KPIs." },
    ],
  },
  pd: {
    eyebrow: "Special projects · R&D",
    titulo: ["Technology applied where ", "industry", " needs to evolve."],
    texto: "Retrofits, systems integration and research & development projects for operations that want to lead.",
  },
  cases: {
    eyebrow: "Case studies",
    titulo: ["Projects that connect ", "engineering and results", "."],
    itens: [
      {
        segmento: "Food industry",
        titulo: "18% lower energy cost",
        texto:
          "Full energy audit, demand review, power-factor correction and a procurement strategy for the deregulated market.",
        resultado: "−18% average energy cost",
      },
      {
        segmento: "Logistics center",
        titulo: "New warehouse built for growth",
        texto:
          "Steel structure, HVAC, complete lightning protection and a layout ready for expansion with minimal impact on operations.",
        resultado: "Delivered on schedule and on budget",
      },
      {
        segmento: "Service operation",
        titulo: "Process automation & dashboards",
        texto: "Cloud scripts feeding daily dashboards, reducing manual errors and freeing the team for analysis.",
        resultado: "Critical KPIs in near real time",
      },
    ],
  },
  cta: {
    titulo: "Let's talk about your operation?",
    texto: "Tell us the challenge — energy, construction or automation — and we'll get back with an initial assessment.",
    botao: "Chat on WhatsApp",
  },
  contato: { mensagemPadrao: "Hello, I found BD7D Solutions through your website and would like to know more." },
  rodape: { local: "Manaus, Brazil · Serving clients in Brazil and worldwide" },
};
