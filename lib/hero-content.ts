/* ============================================================
   BD7D SCROLL HERO — TEXTOS
   Edite os textos aqui; nada de HTML ou CSS precisa ser tocado.
   ============================================================ */

export type HeroPhase = {
  eyebrow: string;
  titulo: string;
  texto: string;
  /* faixa do scroll (0–1) em que o texto aparece */
  start: number;
  end: number;
  align: "start" | "end";
};

export const heroContent = {
  intro: {
    linha1: "Energia · Construção · Performance",
    linha2: "Do projeto à operação.",
  },

  fases: [
    /* Fase 1 — Projeto no tablet (início do vídeo 1) */
    {
      eyebrow: "Energia · Projetos Elétricos",
      titulo: "Todo sistema nasce de um bom projeto.",
      texto:
        "Diagramas, dimensionamento e conformidade com as normas — engenharia desenhada antes de ser construída.",
      start: 0.09,
      end: 0.26,
      align: "end",
    },
    /* Fase 2 — Dashboard no escritório (fim do vídeo 1) */
    {
      eyebrow: "Performance · Gestão de Energia",
      titulo: "Decisões guiadas por dados.",
      texto:
        "Medição, KPIs e dashboards que transformam consumo em margem — da diretoria ao chão de fábrica.",
      start: 0.41,
      end: 0.58,
      align: "start",
    },
    /* Fase 3 — CLP e fibra óptica (fim do vídeo 2) */
    {
      eyebrow: "Automação Industrial",
      titulo: "Controle fino em cada ponto da operação.",
      texto:
        "CLPs, redes em fibra óptica e supervisórios integrados com rastreabilidade e segurança.",
      start: 0.76,
      end: 0.97,
      align: "end",
    },
  ] satisfies HeroPhase[],

  ui: {
    dica_scroll: "Role para explorar",
    carregando: "Carregando",
  },
};
