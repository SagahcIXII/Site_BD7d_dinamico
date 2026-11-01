"use client";

import { useEffect, useRef, useState } from "react";

/* Frases de "Projetos especiais" digitadas uma a uma, com cursor.
   Uma cópia invisível da frase mais longa reserva a altura (a página
   não pula enquanto digita). Só anima com a seção na tela; com
   "reduzir movimento", só troca a frase. */
const DIGITA_MS = 45;
const APAGA_MS = 22;

export function FrasesDigitadas({ frases, intervalo }: { frases: string[]; intervalo: number }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(frases[0]?.length ?? 0);
  const [fase, setFase] = useState<"parado" | "apagando" | "digitando">("parado");
  const [visivel, setVisivel] = useState(false);
  const raiz = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (frases.length < 2 || !visivel) return;
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frase = frases[i];
    let t: ReturnType<typeof setTimeout>;
    if (fase === "parado") {
      t = setTimeout(() => {
        if (calmo) {
          const j = (i + 1) % frases.length;
          setI(j);
          setN(frases[j].length);
        } else setFase("apagando");
      }, intervalo * 1000);
    } else if (fase === "apagando") {
      t = setTimeout(() => {
        if (n > 0) setN(n - 1);
        else {
          setI((i + 1) % frases.length);
          setFase("digitando");
        }
      }, APAGA_MS);
    } else {
      t = setTimeout(() => {
        if (n < frase.length) setN(n + 1);
        else setFase("parado");
      }, DIGITA_MS);
    }
    return () => clearTimeout(t);
  }, [frases, intervalo, i, n, fase, visivel]);

  const maisLonga = frases.reduce((a, b) => (b.length > a.length ? b : a), "");
  const texto = frases[i]?.slice(0, n) ?? "";

  return (
    <span className="digitada" ref={raiz}>
      <span className="digitada-reserva" aria-hidden="true">
        <span className="marker">{maisLonga}</span>
      </span>
      <span className="digitada-texto" aria-hidden="true">
        {texto && <span className="marker">{texto}</span>}
        <span className="cursor" />
      </span>
      <span className="sr-only">{frases[0]}</span>
    </span>
  );
}
