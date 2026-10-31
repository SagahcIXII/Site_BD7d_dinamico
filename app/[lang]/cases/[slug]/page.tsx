import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { caseNoIdioma, getConteudo, urlImagem, videoEmbed, whatsLink, type BlocoCase } from "@/lib/conteudo";
import { textosExtra } from "@/lib/textos-extra";
import { TopoSimples } from "@/components/topo-simples";
import { BotaoContato } from "@/components/botao-contato";

/* Página de cada case (artigo editado no portal). Novos cases
   aparecem sem precisar publicar o site de novo. */
export const dynamicParams = true;
export async function generateStaticParams() {
  const { cases } = await getConteudo();
  return cases.filter((c) => c.slug).map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ lang: string; slug: string }> };

async function carregar(p: Props["params"]) {
  const { lang, slug } = await p;
  if (!isLocale(lang)) return null;
  const c = await getConteudo();
  const cs = c.cases.find((x) => x.slug === slug);
  return cs ? { lang, cs, c } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await carregar(params);
  if (!d) return {};
  const x = caseNoIdioma(d.cs, d.lang);
  return { title: `${x.titulo} | BD7D Solutions`, description: x.resumo, openGraph: d.cs.capa ? { images: [d.cs.capa] } : undefined };
}

function Bloco({ b }: { b: BlocoCase }) {
  if (b.tipo === "subtitulo") return <h2>{b.texto}</h2>;
  if (b.tipo === "lista")
    return (
      <ul>
        {(b.texto ?? "").split("\n").filter((l) => l.trim()).map((l, i) => (
          <li key={i}>{l.replace(/^\s*[-•]\s*/, "")}</li>
        ))}
      </ul>
    );
  if (b.tipo === "imagem" && b.imagemId)
    return (
      <figure>
        <Image src={urlImagem(b.imagemId)} alt={b.legenda ?? ""} width={1600} height={1000} sizes="(max-width: 900px) 100vw, 860px" />
        {b.legenda && <figcaption>{b.legenda}</figcaption>}
      </figure>
    );
  if (b.tipo === "video" && b.url) {
    const src = videoEmbed(b.url);
    if (!src) return null;
    return (
      <figure>
        <div className="video">
          <iframe src={src} title={b.legenda ?? "Vídeo"} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
        </div>
        {b.legenda && <figcaption>{b.legenda}</figcaption>}
      </figure>
    );
  }
  return b.texto ? <p>{b.texto}</p> : null;
}

export default async function CasePage({ params }: Props) {
  const d = await carregar(params);
  if (!d) notFound();
  const lang = d.lang as Locale;
  const x = caseNoIdioma(d.cs, lang);
  const tx = textosExtra[lang];
  const prefixo = lang === "pt" ? "" : `/${lang}`;
  const inicio = prefixo || "/";
  const w = d.c.whatsapp;
  const outros = d.c.cases.filter((o) => o.slug && o.slug !== d.cs.slug).slice(0, 3);

  return (
    <>
      <TopoSimples inicio={inicio} voltarHref={`${inicio}#cases`} voltar={tx.cases.voltar} />
      <article className="artigo">
        {d.cs.capa && (
          <div className="artigo-capa">
            <Image src={d.cs.capa} alt="" fill priority sizes="100vw" />
          </div>
        )}
        <div className="wrap artigo-corpo">
          <span className="eyebrow">{x.segmento}</span>
          <h1>{x.titulo}</h1>
          {x.resultado && (
            <p className="artigo-resultado">
              <span>{tx.cases.resultado}</span> {x.resultado}
            </p>
          )}
          <p className="artigo-lead">{x.resumo}</p>
          {x.blocos.map((b, i) => (
            <Bloco key={i} b={b} />
          ))}
          <div className="artigo-cta">
            <BotaoContato className="btn" href={w.ativo ? whatsLink(w.numero, w.mensagens[lang].padrao) : null} rotulo={`${tx.falar} →`} rotuloChat={`${tx.falar} →`} />
          </div>
        </div>
      </article>

      {outros.length > 0 && (
        <section className="block">
          <div className="wrap">
            <h2 className="outros-titulo">{tx.cases.outros}</h2>
            <div className="cases">
              {outros.map((o) => {
                const y = caseNoIdioma(o, lang);
                return (
                  <Link className="case" key={o.slug} href={`${prefixo}/cases/${o.slug}`}>
                    {o.capa && (
                      <div className="case-capa">
                        <Image src={o.capa} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                      </div>
                    )}
                    <span className="seg">{y.segmento}</span>
                    <h3>{y.titulo}</h3>
                    {y.resultado && <div className="result">{y.resultado}</div>}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
