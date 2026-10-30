"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  obra: string;
  projeto: string;
  alt: string;
  tag: string;
};

/* ============================================================
   REVELAÇÃO PROJETO BIM → OBRA
   Duas imagens alinhadas sobrepostas. Uma linha vertical
   atravessa o card conforme a página rola: à esquerda aparece
   a obra executada, à direita o modelo BIM. A linha também
   pode ser arrastada (mouse, toque ou setas do teclado);
   depois disso o scroll deixa de controlá-la.
   ============================================================ */
export function BimReveal({ obra, projeto, alt, tag }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = reducedMotion ? 50 : 0; // % da obra revelada
    let current = target;
    let manual = reducedMotion;
    let dragging = false;
    let raf = 0;

    const apply = (pos: number) => {
      root.style.setProperty("--pos", `${pos}%`);
      root.setAttribute("aria-valuenow", String(Math.round(pos)));
      root.classList.toggle("show-obra", pos > 30);
      root.classList.toggle("show-projeto", pos < 70);
    };

    /* scroll: card entra por baixo (topo a 85% da tela) → BIM inteiro;
       card chega a 20% da tela → obra quase inteira */
    const fromScroll = () => {
      if (manual) return;
      const r = root.getBoundingClientRect();
      const start = innerHeight * 0.85, end = innerHeight * 0.2;
      const t = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      target = 4 + t * 92;
    };

    const tick = () => {
      current += (target - current) * (dragging ? 0.5 : 0.12);
      if (Math.abs(target - current) < 0.05) current = target;
      apply(current);
      raf = requestAnimationFrame(tick);
    };

    /* só anima enquanto o card está visível */
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(root);

    const setFromPointer = (clientX: number) => {
      const r = root.getBoundingClientRect();
      target = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    };
    const onDown = (e: PointerEvent) => {
      manual = dragging = true;
      root.setPointerCapture(e.pointerId);
      setFromPointer(e.clientX);
    };
    const onMove = (e: PointerEvent) => { if (dragging) setFromPointer(e.clientX); };
    const onUp = () => { dragging = false; };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      manual = true;
      target = Math.min(100, Math.max(0, target + (e.key === "ArrowRight" ? 5 : -5)));
    };

    fromScroll();
    apply(target);
    addEventListener("scroll", fromScroll, { passive: true });
    addEventListener("resize", fromScroll);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("keydown", onKey);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", fromScroll);
      removeEventListener("resize", fromScroll);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pillar-media bim-reveal"
      role="slider"
      tabIndex={0}
      aria-label="Comparar projeto BIM e obra executada"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <Image src={projeto} alt={`Modelo BIM — ${alt}`} fill sizes="(max-width: 900px) 100vw, 55vw" />
      <div className="bim-reveal-obra">
        <Image src={obra} alt={alt} fill sizes="(max-width: 900px) 100vw, 55vw" />
      </div>
      <span className="bim-label bim-label-obra">Obra executada</span>
      <span className="bim-label bim-label-projeto">Projeto BIM</span>
      <div className="bim-line" aria-hidden="true">
        <span className="bim-handle" />
      </div>
      <span className="tag">{tag}</span>
    </div>
  );
}
