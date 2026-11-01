"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Cartões de cases: 3 por vez (1 no celular, arrastando) e setas
   quando há mais. A ordem vem do portal — favoritos primeiro. */
export function CarrosselCases({ children, rotulos }: { children: ReactNode; rotulos: { anterior: string; proximo: string } }) {
  const trilho = useRef<HTMLDivElement>(null);
  const [pode, setPode] = useState({ voltar: false, avancar: false });

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const medir = () => setPode({ voltar: el.scrollLeft > 4, avancar: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", medir);
      ro.disconnect();
    };
  }, []);

  // anda uma "página" (os cartões visíveis), alinhando no cartão
  const mover = (dir: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const cartao = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const passo = cartao ? cartao.offsetWidth + gap : el.clientWidth;
    const porPagina = Math.max(1, Math.round((el.clientWidth + gap) / passo));
    el.scrollBy({ left: dir * passo * porPagina, behavior: "smooth" });
  };

  const setas = pode.voltar || pode.avancar;
  return (
    <div className="carrossel">
      <div className="cases" ref={trilho}>
        {children}
      </div>
      {setas && (
        <div className="carrossel-setas">
          <button type="button" className="seta" onClick={() => mover(-1)} disabled={!pode.voltar} aria-label={rotulos.anterior}>
            ←
          </button>
          <button type="button" className="seta" onClick={() => mover(1)} disabled={!pode.avancar} aria-label={rotulos.proximo}>
            →
          </button>
        </div>
      )}
    </div>
  );
}
