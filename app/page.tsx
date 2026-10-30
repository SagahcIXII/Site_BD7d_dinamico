import Image from "next/image";
import { ScrollHero } from "@/components/scroll-hero";
import { SiteNav } from "@/components/site-nav";
import { RevealObserver } from "@/components/reveal-observer";
import { BimReveal } from "@/components/bim-reveal";
import { EMAIL, LINKEDIN, whatsappLink } from "@/lib/contact";

const diferenciais = [
  { titulo: "Engenharia integrada", texto: "Elétrica, civil e automação no mesmo projeto, sem retrabalho entre disciplinas." },
  { titulo: "Conformidade técnica", texto: "NBR 5419, NR-10 e exigências da concessionária desde o primeiro traço." },
  { titulo: "Foco em resultado", texto: "Cada entrega medida em custo de energia, disponibilidade e margem." },
  { titulo: "Atuação regional", texto: "Base em Manaus, atendendo a indústria do Polo Industrial e região Norte." },
];

const pilares = [
  {
    id: "energia",
    imagem: "/images/projeto-tablet.jpg",
    alt: "Projeto elétrico em tablet sobre a mesa com disjuntor e plantas",
    tag: "Pilar 01 · Energia",
    eyebrow: "Energia com visão estratégica",
    titulo: "Projeto, segurança e eficiência econômica.",
    texto: "Conectamos projeto, regulação e eficiência — incluindo Mercado Livre de Energia, SPDA e gestão de contratos.",
    itens: [
      ["SPDA e aterramento — NBR 5419", "Análise de risco, projeto executivo, memoriais e laudos de conformidade."],
      ["Eficiência energética e ICMS", "Demanda contratada, fator de potência, curva de carga e créditos de ICMS."],
      ["Mercado Livre de Energia", "Viabilidade, enquadramento regulatório e acompanhamento pós-migração."],
    ],
    cta: "Falar sobre energia",
    mensagem: "Olá, quero otimizar a gestão de energia da minha empresa.",
  },
  {
    id: "construcao",
    imagem: "/images/construcao-obra.jpg",
    /* modelo BIM alinhado à foto: o card revela projeto → obra */
    imagemProjeto: "/images/construcao-bim.jpg",
    alt: "Galpão industrial com estrutura metálica",
    tag: "Pilar 02 · Construção",
    eyebrow: "Construção orientada a desempenho",
    titulo: "Cada metro quadrado a favor do fluxo produtivo.",
    texto: "Projetamos e gerenciamos obras com foco em layout inteligente, conforto térmico, segurança e viabilidade econômica.",
    itens: [
      ["Galpões industriais e centros logísticos", "Layout de produção, áreas técnicas e infraestrutura dimensionada para expansão."],
      ["Retrofit com mínimo downtime", "Intervenções por fases, reforço estrutural e adequação de sistemas."],
      ["Modelagem BIM e render 3D", "Compatibilização de disciplinas e visualização para decisão e aprovação."],
    ],
    cta: "Discutir um projeto de obra",
    mensagem: "Olá, quero avaliar um projeto de galpão ou reforma com a BD7D.",
  },
  {
    id: "performance",
    imagem: "/images/clp-fibra.jpg",
    alt: "CLP industrial com conexões em fibra óptica",
    tag: "Pilar 03 · Performance",
    eyebrow: "Automação e dados",
    titulo: "Indicadores que viram decisões diárias.",
    texto: "Automação industrial, scripts sob medida e dashboards para reduzir falhas manuais e ampliar a previsibilidade.",
    itens: [
      ["Automação de painéis, linhas e utilidades", "CLPs, inversores, medição de energia e supervisórios integrados."],
      ["Automação de rotinas computacionais", "Bots, scripts e integrações em nuvem que eliminam tarefas repetitivas."],
      ["KPIs e dashboards", "Painéis que conversam com diretoria, operação e chão de fábrica."],
    ],
    cta: "Acelerar a performance",
    mensagem: "Olá, quero melhorar os KPIs e a automação da minha operação.",
  },
];

const etapas = [
  { titulo: "Diagnóstico", texto: "Levantamento de campo, faturas, cargas e gargalos da operação." },
  { titulo: "Projeto", texto: "Soluções dimensionadas, normatizadas e compatibilizadas em BIM." },
  { titulo: "Execução", texto: "Implantação por fases, com gestão de obra e mínimo impacto na produção." },
  { titulo: "Operação", texto: "Medição, dashboards e melhoria contínua com indicadores claros." },
];

const cases = [
  {
    segmento: "Indústria de alimentos",
    titulo: "Redução de 18% no custo de energia",
    texto: "Diagnóstico energético, revisão de demanda, correção de fator de potência e estratégia de migração ao Mercado Livre.",
    resultado: "−18% no custo médio de energia",
  },
  {
    segmento: "Centro logístico",
    titulo: "Novo galpão com foco em expansão",
    texto: "Estrutura metálica, climatização, SPDA completo e layout preparado para ampliação com mínimo impacto na operação.",
    resultado: "Obra entregue com previsibilidade",
  },
  {
    segmento: "Operação de serviços",
    titulo: "Automação de rotinas e dashboards",
    texto: "Scripts em nuvem alimentando painéis diários, reduzindo erros manuais e liberando o time para análise.",
    resultado: "KPIs críticos em tempo quase real",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  return (
    <>
      <SiteNav />
      <ScrollHero />

      {/* Diferenciais */}
      <div className="strip">
        <div className="wrap">
          {diferenciais.map((d, i) => (
            <div className="item reveal" key={d.titulo}>
              <span className="num">{pad(i + 1)}</span>
              <h3>{d.titulo}</h3>
              <p>{d.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pilares */}
      <section className="block" id="servicos">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">O que fazemos</span>
            <h2>Três pilares, <em>uma engenharia</em> conectada ao seu negócio.</h2>
            <p>
              Da subestação ao dashboard da diretoria: projetamos, executamos e acompanhamos a operação para que
              energia e infraestrutura trabalhem a favor da sua margem.
            </p>
          </div>

          <div className="pillars">
            {pilares.map((p) => (
              <article className="pillar reveal" id={p.id} key={p.id}>
                {"imagemProjeto" in p && p.imagemProjeto ? (
                  <BimReveal obra={p.imagem} projeto={p.imagemProjeto} alt={p.alt} tag={p.tag} />
                ) : (
                  <div className="pillar-media">
                    <Image src={p.imagem} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 55vw" />
                    <span className="tag">{p.tag}</span>
                  </div>
                )}
                <div>
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                  <ul>
                    {p.itens.map(([titulo, texto]) => (
                      <li key={titulo}>
                        <strong>{titulo}</strong>
                        <span>{texto}</span>
                      </li>
                    ))}
                  </ul>
                  <a className="link-arrow" href={whatsappLink(p.mensagem)} target="_blank" rel="noopener">
                    {p.cta} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="block process">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Como trabalhamos</span>
            <h2>Do diagnóstico à <em>operação assistida</em>.</h2>
          </div>
          <div className="steps reveal">
            {etapas.map((e, i) => (
              <div className="step" key={e.titulo}>
                <div className="n">{pad(i + 1)}</div>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inovação */}
      <section className="feature">
        <div className="wrap reveal">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Projetos especiais · P&amp;D</span>
            <h2>Tecnologia aplicada onde a <em>indústria</em> precisa evoluir.</h2>
            <p>
              Retrofit, integração de sistemas e projetos de pesquisa e desenvolvimento para operações que querem
              sair na frente.
            </p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="block" id="cases">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Casos reais</span>
            <h2>Cases que conectam <em>engenharia e resultado</em>.</h2>
          </div>
          <div className="cases">
            {cases.map((c) => (
              <article className="case reveal" key={c.titulo}>
                <span className="seg">{c.segmento}</span>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
                <div className="result">{c.resultado}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <div>
            <h2>Vamos conversar sobre a sua operação?</h2>
            <p>Conte o desafio — energia, obra ou automação — e retornamos com um primeiro diagnóstico.</p>
          </div>
          <a className="btn" href={whatsappLink("Olá, vim pelo site da BD7D Solutions e gostaria de saber mais.")} target="_blank" rel="noopener">
            Falar no WhatsApp →
          </a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} />
          <nav>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp</a>
            <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
          </nav>
          <span>© {new Date().getFullYear()} BD7D Solutions · Manaus – AM</span>
        </div>
      </footer>

      <RevealObserver />
    </>
  );
}
