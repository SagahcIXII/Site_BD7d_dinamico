"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { locales, localeInfo, type Dict, type Locale } from "@/lib/i18n";

type Props = { lang: Locale; t: Dict["nav"] };

/* Abre o chat (components/chat-widget.tsx escuta este evento). */
export const abrirChat = () => window.dispatchEvent(new Event("bd7d:abrir-chat"));

const IconeChat = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z" />
  </svg>
);

/* Seletor de idioma: pílula com indicador verde que desliza até o
   idioma ativo. Links comuns (<a>), não <Link>: o português é "/"
   reescrito para "/pt" e a navegação interna do Next não segue essa
   reescrita na Vercel (dava 404 ao voltar para PT). Para não perder o
   ponto da página, a posição de rolagem é guardada e restaurada. */
const CHAVE_ROLAGEM = "bd7d-rolagem-idioma";

function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const active = locales.indexOf(lang);

  // ao chegar pela troca de idioma, volta para o mesmo ponto da página
  useEffect(() => {
    let alvo = 0;
    try {
      alvo = Number(sessionStorage.getItem(CHAVE_ROLAGEM) ?? 0);
      sessionStorage.removeItem(CHAVE_ROLAGEM);
    } catch {
      return;
    }
    if (!alvo) return;
    const fim = Date.now() + 4000;
    const tentar = () => {
      if (document.documentElement.scrollHeight - innerHeight >= alvo) scrollTo(0, alvo);
      else if (Date.now() < fim) setTimeout(tentar, 150);
    };
    tentar();
  }, []);

  return (
    <nav className="lang-switch" aria-label={label} style={{ "--i": active } as React.CSSProperties}>
      <span className="lang-indicator" aria-hidden="true" />
      {locales.map((l) => (
        <a
          key={l}
          href={localeInfo[l].path}
          hrefLang={localeInfo[l].htmlLang}
          lang={localeInfo[l].htmlLang}
          title={localeInfo[l].nome}
          aria-label={localeInfo[l].nome}
          aria-current={l === lang ? "page" : undefined}
          onClick={() => {
            try {
              sessionStorage.setItem(CHAVE_ROLAGEM, String(Math.round(scrollY)));
            } catch {
              /* sem armazenamento: só volta ao topo */
            }
          }}
        >
          {localeInfo[l].label}
        </a>
      ))}
    </nav>
  );
}

/* No topo (intro do hero) só o seletor de idioma e o botão de menu
   aparecem; depois de ~meia tela de scroll o menu completo entra.
   Abaixo de 900px os links vão para um painel em tela cheia. */
export function SiteNav({ lang, t }: Props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#energia", label: t.energia },
    { href: "#construcao", label: t.construcao },
    { href: "#performance", label: t.performance },
    { href: "#projetos", label: t.projetos },
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
          {/* ao rolar, o botão flutuante do chat "sobe" para cá */}
          <button type="button" className="btn nav-fade nav-cta" onClick={abrirChat} aria-label={t.chat}>
            <IconeChat />
            <span>{t.chat}</span>
          </button>
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
        <button
          type="button"
          className="btn mobile-menu-cta"
          onClick={() => {
            setOpen(false);
            abrirChat();
          }}
        >
          {t.chat} →
        </button>
      </div>
    </>
  );
}
