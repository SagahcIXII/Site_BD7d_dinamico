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

/* No topo (intro do hero) só o seletor de idioma e o botão de menu
   aparecem; depois de ~meia tela de scroll o menu completo entra.
   Abaixo de 900px os links vão para um painel em tela cheia. */
export function SiteNav({ lang, t, contatoHref }: Props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#energia", label: t.energia },
    { href: "#construcao", label: t.construcao },
    { href: "#performance", label: t.performance },
    { href: "#cases", label: t.cases },
  ];

  useEffect(() => {
    const onScroll = () => setShow(scrollY > innerHeight * 0.45);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  /* painel aberto: trava o scroll da página e fecha com Esc
     ou ao voltar para a largura de desktop */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = matchMedia("(min-width: 901px)");
    const onWide = () => wide.matches && setOpen(false);
    addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = "";
      removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <header className={`nav${show ? " show" : ""}${open ? " menu-open" : ""}`}>
        <a className="brand nav-fade" href="#topo" onClick={() => setOpen(false)}>
          <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} />
        </a>
        <ul className="nav-fade">
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <LangSwitch lang={lang} label={t.idioma} />
          <a className="btn nav-fade nav-cta" href={contatoHref} target="_blank" rel="noopener">
            {t.contato}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.fecharMenu : t.abrirMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="menu-mobile" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label={t.menu}>
          <ol>
            {links.map((l, i) => (
              <li key={l.href} style={{ "--d": `${80 + i * 60}ms` } as React.CSSProperties}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <a className="btn mobile-menu-cta" href={contatoHref} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
          {t.contato} →
        </a>
      </div>
    </>
  );
}
