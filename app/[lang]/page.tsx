import Image from "next/image";
import { ScrollHero } from "@/components/scroll-hero";
import { SiteNav } from "@/components/site-nav";
import { RevealObserver } from "@/components/reveal-observer";
import { BimReveal } from "@/components/bim-reveal";
import { LoopVideo } from "@/components/loop-video";
import Link from "next/link";
import { EMAIL, LINKEDIN } from "@/lib/contact";
import { caseNoIdioma, getConteudo, whatsLink } from "@/lib/conteudo";
import { textosExtra } from "@/lib/textos-extra";
import { BotaoContato } from "@/components/botao-contato";
import { FormContato } from "@/components/form-contato";
import { notFound } from "next/navigation";
import { getDict, isLocale, type Locale, type Titulo } from "@/lib/i18n";

/* Imagens e âncoras de cada pilar (os textos vêm do dicionário) */
const pilarMidia = [
  { id: "energia", imagem: "/images/projeto-tablet.jpg" },
  /* modelo BIM alinhado à foto: o card revela projeto → obra */
  { id: "construcao", imagem: "/images/construcao-obra.jpg", imagemProjeto: "/images/construcao-bim.jpg" },
  { id: "performance", imagem: "/images/clp-fibra.jpg" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Heading = ({ titulo: [antes, destaque, depois] }: { titulo: Titulo }) => (
  <h2>
    {antes}
    <em>{destaque}</em>
    {depois}
  </h2>
);

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const bruto = (await params).lang;
  if (!isLocale(bruto)) notFound();
  const lang: Locale = bruto;
  const t = getDict(lang);
  const tx = textosExtra[lang];
  const c = await getConteudo();
  // WhatsApp desligado no portal → botões abrem o chat do site
  const w = c.whatsapp;
  const whats = (m: string) => (w.ativo ? whatsLink(w.numero, m) : null);
  const msgs = w.mensagens[lang];
  const pilarMsg = [msgs.energia, msgs.construcao, msgs.performance];
  const prefixo = lang === "pt" ? "" : `/${lang}`;
  const politicaHref = c.lgpd ? `${prefixo}/privacidade` : null;

  return (
    <>
      <SiteNav lang={lang} t={t.nav} />
      <ScrollHero key={lang} t={t.hero} />

      {/* Diferenciais */}
      <div className="strip">
        <div className="wrap">
          {t.diferenciais.map((d, i) => (
            <div className="item reveal" key={i}>
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
            <span className="eyebrow">{t.servicos.eyebrow}</span>
            <Heading titulo={t.servicos.titulo} />
            <p>{t.servicos.texto}</p>
          </div>

          <div className="pillars">
            {t.pilares.map((p, i) => {
              const m = pilarMidia[i];
              return (
                <article className="pillar reveal" id={m.id} key={m.id}>
                  {m.imagemProjeto ? (
                    <BimReveal obra={m.imagem} projeto={m.imagemProjeto} alt={p.alt} tag={p.tag} t={t.bim} />
                  ) : (
                    <div className="pillar-media">
                      <Image src={m.imagem} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 55vw" />
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
                    <BotaoContato className="link-arrow" href={whats(pilarMsg[i])} rotulo={`${p.cta} →`} rotuloChat={`${p.cta} →`} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="block process">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{t.processo.eyebrow}</span>
            <Heading titulo={t.processo.titulo} />
          </div>
          <div className="steps reveal">
            {t.processo.etapas.map((e, i) => (
              <div className="step" key={i}>
                <div className="n">{pad(i + 1)}</div>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inovação — texto em marcador verde para ler sobre a imagem */}
      <section className="feature" id="projetos">
        {/* P&D1 + P&D2 (Midias/V01) unidos, com fusão no ponto do loop */}
        <LoopVideo className="feature-video" src="/videos/pd-lab-loop.mp4" poster="/images/pd-lab-poster.jpg" />
        <div className="wrap reveal">
          <div className="feature-copy">
            <span className="eyebrow">{t.pd.eyebrow}</span>
            <h2>
              <span className="marker">{t.pd.titulo.join("")}</span>
            </h2>
            <p>
              <span className="marker-soft">{t.pd.texto}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="block" id="cases">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">{t.cases.eyebrow}</span>
            <Heading titulo={t.cases.titulo} />
          </div>
          <div className="cases">
            {c.cases.map((cs, i) => {
              const x = caseNoIdioma(cs, lang);
              const conteudo = (
                <>
                  {cs.capa && (
                    <div className="case-capa">
                      <Image src={cs.capa} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                    </div>
                  )}
                  <span className="seg">{x.segmento}</span>
                  <h3>{x.titulo}</h3>
                  <p>{x.resumo}</p>
                  {x.resultado && <div className="result">{x.resultado}</div>}
                  {cs.slug && <span className="case-link">{tx.cases.verCase} →</span>}
                </>
              );
              return cs.slug ? (
                <Link className="case reveal" key={cs.slug} href={`${prefixo}/cases/${cs.slug}`}>
                  {conteudo}
                </Link>
              ) : (
                <article className="case reveal" key={i}>
                  {conteudo}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <div>
            <h2>{t.cta.titulo}</h2>
            <p>{t.cta.texto}</p>
          </div>
          <BotaoContato className="btn" href={whats(msgs.padrao)} rotulo={`${t.cta.botao} →`} rotuloChat={`${tx.falar} →`} />
        </div>
      </section>

      {/* Formulário de contato */}
      <section className="block contato" id="contato">
        <div className="wrap contato-grade">
          <div className="section-head reveal">
            <span className="eyebrow">{tx.form.eyebrow}</span>
            <h2>{tx.form.titulo}</h2>
            <p>{tx.form.texto}</p>
          </div>
          <FormContato lang={lang} politicaHref={politicaHref} />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} />
          <nav>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            {w.ativo && <a href={whatsLink(w.numero, msgs.padrao)} target="_blank" rel="noopener">WhatsApp</a>}
            {politicaHref && <Link href={politicaHref}>{tx.privacidade.link}</Link>}
            <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
          </nav>
          <span>© {new Date().getFullYear()} BD7D Solutions · {t.rodape.local}</span>
          {c.lgpd && <p className="rodape-lgpd">{c.lgpd.textos[lang].rodape}</p>}
        </div>
      </footer>

      <RevealObserver key={lang} />
    </>
  );
}
