import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getConteudo } from "@/lib/conteudo";
import { textosExtra } from "@/lib/textos-extra";
import { TopoSimples } from "@/components/topo-simples";

/* Política de privacidade (texto editado no portal). Some quando a
   opção de LGPD está desligada. */
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: `${textosExtra[lang].privacidade.titulo} | BD7D Solutions` } : {};
}

/* Linhas curtas sem pontuação final viram títulos; "- " vira tópico. */
function Texto({ texto }: { texto: string }) {
  const linhas = texto.split("\n").map((l) => l.trim());
  const out: React.ReactNode[] = [];
  let lista: string[] = [];
  const fecharLista = () => {
    if (lista.length) out.push(<ul key={`l${out.length}`}>{lista.map((x, i) => <li key={i}>{x}</li>)}</ul>);
    lista = [];
  };
  linhas.forEach((l, i) => {
    if (!l) return fecharLista();
    if (/^[-•]\s+/.test(l)) return lista.push(l.replace(/^[-•]\s+/, ""));
    fecharLista();
    const titulo = l.length < 80 && !/[.:;,!?]$/.test(l);
    out.push(titulo ? <h2 key={i}>{l}</h2> : <p key={i}>{l}</p>);
  });
  fecharLista();
  return <>{out}</>;
}

export default async function PrivacidadePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { lgpd } = await getConteudo();
  if (!lgpd) notFound();
  const tx = textosExtra[lang as Locale].privacidade;
  const inicio = lang === "pt" ? "/" : `/${lang}`;

  return (
    <>
      <TopoSimples inicio={inicio} voltarHref={inicio} voltar={tx.voltar} />
      <article className="artigo">
        <div className="wrap artigo-corpo politica">
          <span className="eyebrow">LGPD</span>
          <h1>{tx.titulo}</h1>
          <Texto texto={lgpd.textos[lang as Locale].politica} />
        </div>
      </article>
    </>
  );
}
