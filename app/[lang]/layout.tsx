import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { getDict, isLocale, localeInfo, locales } from "@/lib/i18n";
import { ChatWidget } from "@/components/chat-widget";
import { getConteudo } from "@/lib/conteudo";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/* só existem /pt (servido em "/"), /en e /es — outros idiomas caem no
   notFound() abaixo. (dynamicParams = false impediria regenerar as
   páginas quando o portal pede atualização: viraria 404.) */
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localeInfo[lang].path,
      languages: Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, localeInfo[l].path])),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { whatsapp } = await getConteudo();

  return (
    <html lang={localeInfo[lang].htmlLang}>
      <body className={`${archivo.variable} ${plexMono.variable}`}>
        {children}
        <ChatWidget lang={lang} whatsapp={whatsapp.ativo ? { numero: whatsapp.numero, mensagem: whatsapp.mensagens[lang].padrao } : null} />
      </body>
    </html>
  );
}
