"use client";

import Link from "next/link";

export const Sections = () => {
  return (
    <>
      <EnergiaSection />
      <ConstrucaoSection />
      <PerformanceSection />
      <CasesSection />
    </>
  );
};

const SectionWrapper = ({
  id,
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="border-t border-white/5 bg-gradient-to-b from-black/40 via-slate-950/60 to-black/80"
  >
    <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
        {title}{" "}
        {highlight && (
          <span className="text-emerald-400 block md:inline">{highlight}</span>
        )}
      </h2>
      <p className="mt-4 max-w-3xl text-sm md:text-base text-neutral-300">
        {description}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">{children}</div>
    </div>
  </section>
);

const Card = ({
  title,
  description,
  tag,
}: {
  title: string;
  description: string;
  tag?: string;
}) => (
  <div className="relative h-full rounded-xl border border-white/10 bg-white/5 px-5 py-5 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-emerald-400/70 hover:bg-white/[0.04] transition">
    {tag && (
      <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
        {tag}
      </span>
    )}
    <h3 className="mt-3 text-base md:text-lg font-semibold text-white">
      {title}
    </h3>
    <p className="mt-2 text-xs md:text-sm text-neutral-300">{description}</p>
  </div>
);

/* ========================== SEÇÃO ENERGIA ========================== */

const EnergiaSection = () => (
  <SectionWrapper
    id="energia"
    eyebrow="Pilar 01"
    title="Energia com visão estratégica"
    highlight="e conformidade total"
    description="Da subestação ao ponto de consumo, a BD7D Solutions conecta projeto, segurança, regulação e eficiência econômica – incluindo Mercado Livre de Energia, SPDA e gestão de contratos."
  >
    <Card
      tag="SPDA & Aterramento"
      title="SPDA – NBR 5419 e Aterramento Profissional"
      description="Análise de risco, projeto executivo, memoriais e laudos de conformidade. Integração com aterramento funcional, de proteção e equalização de potenciais."
    />
    <Card
      tag="Eficiência & ICMS"
      title="Eficiência energética com foco em ICMS e OPEX"
      description="Mapeamento de cargas, fator de potência, demanda contratada, curva de carga e oportunidades de crédito de ICMS na energia elétrica."
    />
    <Card
      tag="Mercado Livre"
      title="Estratégia para Mercado Livre de Energia"
      description="Estudo de viabilidade, enquadramento regulatório, modelagem de consumo, contratos de fornecimento e acompanhamento pós-migração em parceria com agentes varejistas."
    />

    <div className="md:col-span-3 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs md:text-sm text-neutral-300 max-w-2xl">
        Queremos que a energia deixe de ser apenas um custo fixo e passe a ser
        uma alavanca de competitividade para sua operação.
      </p>
      <Link
        href="https://wa.me/5592981649981?text=Olá,%20quero%20otimizar%20a%20gestão%20de%20energia%20da%20minha%20empresa."
        className="rounded-full bg-emerald-500 px-5 py-2 text-xs md:text-sm font-semibold text-black shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition"
      >
        Falar sobre energia com a BD7D
      </Link>
    </div>
  </SectionWrapper>
);

/* ======================= SEÇÃO CONSTRUÇÃO ========================= */

const ConstrucaoSection = () => (
  <SectionWrapper
    id="construcao"
    eyebrow="Pilar 02"
    title="Construção e reformas"
    highlight="orientadas a desempenho"
    description="Projetamos e gerenciamos obras com foco em layout inteligente, conforto térmico, segurança e viabilidade econômica, conectando engenharia civil, elétrica e automação."
  >
    <Card
      tag="Galpões & Indústria"
      title="Galpões industriais e centros logísticos"
      description="Layout de produção, áreas técnicas, câmaras frias, circulação de pessoas e materiais, climatização e infraestrutura elétrica dimensionada para expansão."
    />
    <Card
      tag="Reformas Estratégicas"
      title="Retrofit e reformas com mínimo downtime"
      description="Planejamento de intervenções por fases, mitigação de paradas, reforço estrutural e adequação de sistemas para novas demandas operacionais."
    />
    <Card
      tag="BIM & Render"
      title="Modelagem BIM e visualização 3D"
      description="Modelos digitais integrados, compatibilização de disciplinas e renders realistas para apoio à decisão, aprovação interna e relacionamento com stakeholders."
    />

    <div className="md:col-span-3 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs md:text-sm text-neutral-300 max-w-2xl">
        Cada metro quadrado precisa trabalhar a favor do fluxo produtivo,
        da segurança e da experiência de quem ocupa o espaço.
      </p>
      <Link
        href="https://wa.me/5592981649981?text=Olá,%20quero%20avaliar%20um%20projeto%20de%20galpão%20ou%20reforma%20com%20a%20BD7D."
        className="rounded-full bg-emerald-500 px-5 py-2 text-xs md:text-sm font-semibold text-black shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition"
      >
        Discutir um projeto de obra
      </Link>
    </div>
  </SectionWrapper>
);

/* ===================== SEÇÃO PERFORMANCE ========================= */

const PerformanceSection = () => (
  <SectionWrapper
    id="performance"
    eyebrow="Pilar 03"
    title="Performance operacional"
    highlight="alavancada por automação e dados"
    description="Unimos automação industrial, scripts sob medida e dashboards para transformar indicadores em decisões diárias, reduzindo falhas manuais e ampliando previsibilidade."
  >
    <Card
      tag="Automação Industrial"
      title="Automação de painéis, linhas e utilidades"
      description="Integração de CLPs, inversores, medições de energia e sistemas supervisórios para garantir controle fino, rastreabilidade e segurança operacional."
    />
    <Card
      tag="Rotinas Digitais"
      title="Automação de rotinas computacionais"
      description="Bots, scripts e integrações em nuvem para eliminar tarefas repetitivas, gerar relatórios automáticos e alimentar painéis gerenciais em tempo quase real."
    />
    <Card
      tag="KPIs & Dashboards"
      title="KPIs claros e dashboards que contam histórias"
      description="Estruturação de indicadores, definição de metas, construção de painéis visuais e trilhas de acompanhamento que conversem com diretoria, operação e chão de fábrica."
    />

    <div className="md:col-span-3 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs md:text-sm text-neutral-300 max-w-2xl">
        A visão da BD7D é que cada dado gerado na sua operação possa ser uma
        peça estratégica para proteger margem, disponibilidade e qualidade.
      </p>
      <Link
        href="https://wa.me/5592981649981?text=Olá,%20quero%20melhorar%20os%20KPIs%20e%20a%20automação%20da%20minha%20operação."
        className="rounded-full bg-emerald-500 px-5 py-2 text-xs md:text-sm font-semibold text-black shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition"
      >
        Acelerar a performance com a BD7D
      </Link>
    </div>
  </SectionWrapper>
);

/* ========================== SEÇÃO CASES ========================== */

const CasesSection = () => (
  <section
    id="cases"
    className="border-t border-white/5 bg-gradient-to-b from-black/70 via-slate-950/80 to-black py-16 md:py-24"
  >
    <div className="mx-auto max-w-7xl px-4">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400/80">
        Casos Reais
      </p>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
        Cases que conectam{" "}
        <span className="text-emerald-400">engenharia e resultado</span>
      </h2>
      <p className="mt-4 max-w-3xl text-sm md:text-base text-neutral-300">
        Alguns exemplos de como a BD7D Solutions tem apoiado indústrias, comércios
        e operações críticas a aumentarem margens, segurança e previsibilidade.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <CaseCard
          segmento="Indústria de alimentos"
          titulo="Redução de 18% no custo de energia"
          descricao="Diagnóstico energético completo, revisão de demanda, correção de fator de potência e estratégia para migração ao Mercado Livre de Energia."
          resultado="+18% de redução no custo médio de energia."
        />
        <CaseCard
          segmento="Centro logístico"
          titulo="Novo galpão com foco em expansão"
          descricao="Projeto de galpão com estrutura metálica, climatização, SPDA completo e layout preparado para ampliação com mínimo impacto na operação."
          resultado="Obra entregue com previsibilidade e capacidade de crescimento escalável."
        />
        <CaseCard
          segmento="Operação de serviços"
          titulo="Automação de rotinas e dashboards"
          descricao="Criação de scripts em nuvem para alimentar painéis diários, reduzir erros manuais e liberar tempo do time para análise, não digitação."
          resultado="Processo mais confiável e visão clara de KPIs críticos em tempo quase real."
        />
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm text-neutral-300 max-w-2xl">
          Quer avaliar se faz sentido construir um case assim na sua operação?
        </p>
        <Link
          href="https://wa.me/5592981649981?text=Olá,%20gostaria%20de%20entender%20como%20a%20BD7D%20pode%20me%20ajudar%20em%20um%20case%20similar."
          className="rounded-full bg-transparent border border-emerald-400 px-5 py-2 text-xs md:text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10 transition"
        >
          Conversar sobre um novo case
        </Link>
      </div>
    </div>
  </section>
);

const CaseCard = ({
  segmento,
  titulo,
  descricao,
  resultado,
}: {
  segmento: string;
  titulo: string;
  descricao: string;
  resultado: string;
}) => (
  <div className="relative h-full rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-black/80 to-slate-950/80 px-5 py-5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
      {segmento}
    </p>
    <h3 className="mt-2 text-base md:text-lg font-semibold text-white">
      {titulo}
    </h3>
    <p className="mt-2 text-xs md:text-sm text-neutral-300">{descricao}</p>
    <p className="mt-3 text-xs font-semibold text-emerald-300">
      Resultado: {resultado}
    </p>
  </div>
);
