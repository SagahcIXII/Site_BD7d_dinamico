import "server-only";
import { getDict, type Locale } from "@/lib/i18n";

/* ============================================================
   CONTEÚDO EDITÁVEL (vem do portal app.bd7d.com)
   WhatsApp, LGPD e cases. Fica em cache e é atualizado na hora
   quando alguém salva no portal (/api/revalidar). Se o portal não
   responder, o site usa os textos do próprio código — nunca quebra.
   ============================================================ */

type PorIdioma<T> = Record<Locale, T>;
export type MensagensWhats = { padrao: string; energia: string; construcao: string; performance: string };
export type ConfigWhatsapp = { ativo: boolean; numero: string; mensagens: PorIdioma<MensagensWhats> };
export type ConfigLgpd = { ativo: boolean; textos: PorIdioma<{ rodape: string; politica: string }> };
export type BlocoCase = { tipo: "paragrafo" | "subtitulo" | "lista" | "imagem" | "video"; texto?: string; imagemId?: number; legenda?: string; url?: string };
export type ConteudoCase = { segmento: string; titulo: string; resumo: string; resultado: string; blocos: BlocoCase[] };
export type CaseSite = { slug: string; capa: string | null; conteudo: { pt: ConteudoCase } & Partial<Record<"en" | "es", ConteudoCase>> };
export type ConteudoSite = { whatsapp: ConfigWhatsapp; lgpd: ConfigLgpd | null; cases: CaseSite[]; doPortal: boolean };

export const gestaoUrl = () => (process.env.GESTAO_URL ?? "https://app.bd7d.com").replace(/\/$/, "");

/* Padrões = o que o site mostrava antes do portal */
function padrao(): ConteudoSite {
  const msgs = (l: Locale): MensagensWhats => {
    const t = getDict(l);
    return { padrao: t.contato.mensagemPadrao, energia: t.pilares[0].mensagem, construcao: t.pilares[1].mensagem, performance: t.pilares[2].mensagem };
  };
  const pt = getDict("pt").cases.itens;
  return {
    whatsapp: { ativo: true, numero: "5592981649981", mensagens: { pt: msgs("pt"), en: msgs("en"), es: msgs("es") } },
    lgpd: null,
    cases: pt.map((c, i) => ({
      slug: "",
      capa: null,
      conteudo: Object.fromEntries(
        (["pt", "en", "es"] as const).map((l) => {
          const x = getDict(l).cases.itens[i];
          return [l, { segmento: x.segmento, titulo: x.titulo, resumo: x.texto, resultado: x.resultado, blocos: [] }];
        }),
      ) as unknown as CaseSite["conteudo"],
    })),
    doPortal: false,
  };
}

export async function getConteudo(): Promise<ConteudoSite> {
  try {
    const res = await fetch(`${gestaoUrl()}/api/publico/site`, { next: { revalidate: 600, tags: ["site"] }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(String(res.status));
    const d = (await res.json()) as Omit<ConteudoSite, "doPortal">;
    // imagens com endereço completo do portal
    const cases = d.cases.map((c) => ({ ...c, capa: c.capa ? `${gestaoUrl()}${c.capa}` : null }));
    return { ...d, cases, lgpd: d.lgpd?.ativo ? d.lgpd : null, doPortal: true };
  } catch (e) {
    console.error("conteúdo do portal indisponível, usando padrão:", e);
    return padrao();
  }
}

/* Case no idioma pedido; sem tradução, usa o português. */
export const caseNoIdioma = (c: CaseSite, l: Locale): ConteudoCase => c.conteudo[l] ?? c.conteudo.pt;

export const urlImagem = (id: number) => `${gestaoUrl()}/api/publico/imagem/${id}`;

export const whatsLink = (numero: string, mensagem?: string) =>
  `https://wa.me/${numero.replace(/\D/g, "")}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;

/* YouTube/Vimeo → endereço de incorporação */
export function videoEmbed(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return null;
}
