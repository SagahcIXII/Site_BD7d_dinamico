"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { locales, localeInfo, type Dict, type Locale } from "@/lib/i18n";

type Props = { lang: Locale; t: Dict["nav"]; contatoHref: string };

/* Seletor de idioma: pílula com indicador verde que desliza até o
   idioma ativo. Troca de página sem voltar ao topo (scroll={false}). */
function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const active = locales.indexOf(lang);
  return (
    <nav className="lang-switch" aria-label={label} style={{ "--i": active } as React.CSSProperties}>
      <span className="lang-indicator" aria-hidden="true" />
      {locales.map((l) => (
        <Link
          key={l}
          href={localeInfo[l].path}
          hrefLang={localeInfo[l].htmlLang}
          lang={localeInfo[l].htmlLang}
          title={localeInfo[l].nome}
          aria-label={localeInfo[l].nome}
          aria-current={l === lang ? "page" : undefined}
          scroll={false}
        >
          {localeInfo[l].label}
        </Link>
      ))}
    </nav>
  );
}

/* No topo (intro do hero) só o seletor de idioma aparece;
   depois de ~meia tela de scroll o menu completo entra. */
export function SiteNav({ lang, t, contatoHref }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(scrollY > innerHeight * 0.45);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${show ? " show" : ""}`}>
      <a className="brand nav-fade" href="#topo">
        <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} />
      </a>
      <ul className="nav-fade">
        <li><a href="#energia">{t.energia}</a></li>
        <li><a href="#construcao">{t.construcao}</a></li>
        <li><a href="#performance">{t.performance}</a></li>
        <li><a href="#cases">{t.cases}</a></li>
      </ul>
      <div className="nav-actions">
        <LangSwitch lang={lang} label={t.idioma} />
        <a className="btn nav-fade" href={contatoHref} target="_blank" rel="noopener">
          {t.contato}
        </a>
      </div>
    </header>
  );
}
