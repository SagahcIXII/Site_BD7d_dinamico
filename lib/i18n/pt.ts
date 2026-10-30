import type { Dict } from ".";

/* Português (Brasil) — normas brasileiras (ABNT, NR, ANEEL) */
export const pt: Dict = {
  meta: {
    title: "BD7D Solutions | Engenharia · Energia · Performance",
    description:
      "Projetos inteligentes em energia, construção, automação e performance. Conectamos engenharia ao resultado do seu negócio.",
  },
  nav: {
    energia: "Energia",
    construcao: "Construção",
    performance: "Performance",
    cases: "Cases",
    contato: "Fale conosco",
    idioma: "Idioma",
    menu: "Menu",
    abrirMenu: "Abrir menu",
    fecharMenu: "Fechar menu",
  },
  hero: {
    logoAlt: "BD7D Solutions",
    intro: {
      linha1: "Energia · Construção · Performance",
      linha2: "Do projeto à operação.",
    },
    fases: [
      {
        eyebrow: "Energia · Projetos Elétricos",
        titulo: "Todo sistema nasce de um bom projeto.",
        texto:
          "Diagramas, dimensionamento e conformidade com as normas ABNT — engenharia desenhada antes de ser construída.",
      },
      {
        eyebrow: "Performance · Gestão de Energia",
        titulo: "Decisões guiadas por dados.",
        texto:
          "Medição, KPIs e dashboards que transformam consumo em margem — da diretoria ao chão de fábrica.",
      },
      {
        eyebrow: "Automação Industrial",
        titulo: "Controle fino em cada ponto da operação.",
        texto: "CLPs, redes em fibra óptica e supervisórios integrados com rastreabilidade e segurança.",
      },
    ],
    dicaScroll: "Role para explorar",
    carregando: "Carregando",
  },
  diferenciais: [
    { titulo: "Engenharia integrada", texto: "Elétrica, civil e automação no mesmo projeto, sem retrabalho entre disciplinas." },
    { titulo: "Conformidade técnica", texto: "NBR 5419, NBR 5410, NR-10 e exigências da concessionária desde o primeiro traço." },
    { titulo: "Foco em resultado", texto: "Cada entrega medida em custo de energia, disponibilidade e margem." },
    { titulo: "Atuação regional", texto: "Base em Manaus, atendendo a indústria do Polo Industrial e região Norte." },
  ],
  servicos: {
    eyebrow: "O que fazemos",
    titulo: ["Três pilares, ", "uma engenharia", " conectada ao seu negócio."],
    texto:
      "Da subestação ao dashboard da diretoria: projetamos, executamos e acompanhamos a operação para que energia e infraestrutura trabalhem a favor da sua margem.",
  },
  pilares: [
    {
      tag: "Pilar 01 · Energia",
      eyebrow: "Energia com visão estratégica",
      titulo: "Projeto, segurança e eficiência econômica.",
      texto: "Conectamos projeto, regulação e eficiência — incluindo Mercado Livre de Energia, SPDA e gestão de contratos.",
      alt: "Projeto elétrico em tablet sobre a mesa com disjuntor e plantas",
      itens: [
        ["SPDA e aterramento — NBR 5419", "Análise de risco, projeto executivo, memoriais e laudos de conformidade."],
        ["Eficiência energética e ICMS", "Demanda contratada, fator de potência, curva de carga e créditos de ICMS."],
        ["Mercado Livre de Energia", "Viabilidade, enquadramento regulatório ANEEL e acompanhamento pós-migração."],
      ],
      cta: "Falar sobre energia",
      mensagem: "Olá, quero otimizar a gestão de energia da minha empresa.",
    },
    {
      tag: "Pilar 02 · Construção",
      eyebrow: "Construção orientada a desempenho",
      titulo: "Cada metro quadrado a favor do fluxo produtivo.",
      texto:
        "Projetamos e gerenciamos obras com foco em layout inteligente, conforto térmico, segurança e viabilidade econômica.",
      alt: "Galpão industrial com estrutura metálica",
      itens: [
        ["Galpões industriais e centros logísticos", "Layout de produção, áreas técnicas e infraestrutura dimensionada para expansão."],
        ["Retrofit com mínimo downtime", "Intervenções por fases, reforço estrutural e adequação de sistemas."],
        ["Modelagem BIM e render 3D", "Compatibilização de disciplinas e visualização para decisão e aprovação."],
      ],
      cta: "Discutir um projeto de obra",
      mensagem: "Olá, quero avaliar um projeto de galpão ou reforma com a BD7D.",
    },
    {
      tag: "Pilar 03 · Performance",
      eyebrow: "Automação e dados",
      titulo: "Indicadores que viram decisões diárias.",
      texto:
        "Automação industrial, scripts sob medida e dashboards para reduzir falhas manuais e ampliar a previsibilidade.",
      alt: "CLP industrial com conexões em fibra óptica",
      itens: [
        ["Automação de painéis, linhas e utilidades", "CLPs, inversores, medição de energia e supervisórios integrados (NR-12)."],
        ["Automação de rotinas computacionais", "Bots, scripts e integrações em nuvem que eliminam tarefas repetitivas."],
        ["KPIs e dashboards", "Painéis que conversam com diretoria, operação e chão de fábrica."],
      ],
      cta: "Acelerar a performance",
      mensagem: "Olá, quero melhorar os KPIs e a automação da minha operação.",
    },
  ],
  bim: {
    obra: "Obra executada",
    projeto: "Projeto BIM",
    aria: "Comparar projeto BIM e obra executada",
    prefixoAlt: "Modelo BIM —",
  },
  processo: {
    eyebrow: "Como trabalhamos",
    titulo: ["Do diagnóstico à ", "operação assistida", "."],
    etapas: [
      { titulo: "Diagnóstico", texto: "Levantamento de campo, faturas, cargas e gargalos da operação." },
      { titulo: "Projeto", texto: "Soluções dimensionadas, normatizadas e compatibilizadas em BIM." },
      { titulo: "Execução", texto: "Implantação por fases, com gestão de obra e mínimo impacto na produção." },
      { titulo: "Operação", texto: "Medição, dashboards e melhoria contínua com indicadores claros." },
    ],
  },
  pd: {
    eyebrow: "Projetos especiais · P&D",
    titulo: ["Tecnologia aplicada onde a ", "indústria", " precisa evoluir."],
    texto:
      "Retrofit, integração de sistemas e projetos de pesquisa e desenvolvimento para operações que querem sair na frente.",
  },
  cases: {
    eyebrow: "Casos reais",
    titulo: ["Cases que conectam ", "engenharia e resultado", "."],
    itens: [
      {
        segmento: "Indústria de alimentos",
        titulo: "Redução de 18% no custo de energia",
        texto:
          "Diagnóstico energético, revisão de demanda, correção de fator de potência e estratégia de migração ao Mercado Livre.",
        resultado: "−18% no custo médio de energia",
      },
      {
        segmento: "Centro logístico",
        titulo: "Novo galpão com foco em expansão",
        texto:
          "Estrutura metálica, climatização, SPDA completo e layout preparado para ampliação com mínimo impacto na operação.",
        resultado: "Obra entregue com previsibilidade",
      },
      {
        segmento: "Operação de serviços",
        titulo: "Automação de rotinas e dashboards",
        texto: "Scripts em nuvem alimentando painéis diários, reduzindo erros manuais e liberando o time para análise.",
        resultado: "KPIs críticos em tempo quase real",
      },
    ],
  },
  cta: {
    titulo: "Vamos conversar sobre a sua operação?",
    texto: "Conte o desafio — energia, obra ou automação — e retornamos com um primeiro diagnóstico.",
    botao: "Falar no WhatsApp",
  },
  contato: { mensagemPadrao: "Olá, vim pelo site da BD7D Solutions e gostaria de saber mais." },
  rodape: { local: "Manaus – AM" },
};
