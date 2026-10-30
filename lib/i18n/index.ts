import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";

/* ============================================================
   IDIOMAS DO SITE
   pt → "/"   ·   en → "/en"   ·   es → "/es"
   Os textos de cada idioma ficam em lib/i18n/<idioma>.ts.
   Pontos ligados a normas seguem a referência de cada região:
   PT = Brasil (ABNT/NR) · EN = EUA e Europa (NFPA/IEC/EN)
   ES = Espanha e América Latina (UNE/IEC/NOM).
   ============================================================ */
export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeInfo: Record<Locale, { label: string; nome: string; htmlLang: string; path: string }> = {
  pt: { label: "PT", nome: "Português (Brasil)", htmlLang: "pt-BR", path: "/" },
  en: { label: "EN", nome: "English", htmlLang: "en", path: "/en" },
  es: { label: "ES", nome: "Español", htmlLang: "es", path: "/es" },
};

/* Título dividido em [antes, destaque, depois] — o destaque fica em verde */
export type Titulo = [string, string, string];

export type Dict = {
  meta: { title: string; description: string };
  nav: { energia: string; construcao: string; performance: string; cases: string; contato: string; idioma: string; menu: string; abrirMenu: string; fecharMenu: string };
  hero: {
    logoAlt: string;
    intro: { linha1: string; linha2: string };
    fases: { eyebrow: string; titulo: string; texto: string }[];
    dicaScroll: string;
    carregando: string;
  };
  diferenciais: { titulo: string; texto: string }[];
  servicos: { eyebrow: string; titulo: Titulo; texto: string };
  pilares: {
    tag: string;
    eyebrow: string;
    titulo: string;
    texto: string;
    alt: string;
    itens: [string, string][];
    cta: string;
    mensagem: string;
  }[];
  bim: { obra: string; projeto: string; aria: string; prefixoAlt: string };
  processo: { eyebrow: string; titulo: Titulo; etapas: { titulo: string; texto: string }[] };
  pd: { eyebrow: string; titulo: Titulo; texto: string };
  cases: {
    eyebrow: string;
    titulo: Titulo;
    itens: { segmento: string; titulo: string; texto: string; resultado: string }[];
  };
  cta: { titulo: string; texto: string; botao: string };
  contato: { mensagemPadrao: string };
  rodape: { local: string };
};

const dicts: Record<Locale, Dict> = { pt, en, es };

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const getDict = (locale: Locale) => dicts[locale];
