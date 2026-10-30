"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { heroContent } from "@/lib/hero-content";

/* ============================================================
   HERO COM SCROLL-SCRUBBING
   Frames em public/hero-frames, gerados a partir de
   Midias/V01/Video/1.mp4 + 2.mp4 (concatenados, 1 a cada 2
   frames, recortados para remover a marca "Veo").
   ============================================================ */
const CONFIG = {
  frameCount: 192,
  framePath: (i: number) => `/hero-frames/frame-${String(i).padStart(4, "0")}.webp`,
  smoothing: 0.12, // 0.05 = mais "peso/inércia" | 0.3 = mais direto
};

/* Dwell zones: pares [scroll, vídeo] em fração 0–1.
   Vídeo (16 s): 0–8 s tablet → escritório/dashboard,
   8–16 s dashboard → zoom → CLP com fibra óptica.
   Onde o valor de vídeo se repete, o frame fica congelado
   enquanto o texto é lido. */
const SCROLL_MAP: [number, number][] = [
  [0.0, 0.0],
  [0.05, 0.0], // dwell: intro
  [0.1, 0.015], // avanço curto: aproximação do tablet
  [0.26, 0.015], // dwell: fase 1 — projeto no tablet
  [0.42, 0.47], // avanço: travessia do escritório até o laptop
  [0.58, 0.47], // dwell: fase 2 — dashboard
  [0.76, 0.8], // avanço: zoom no dashboard → fibra → CLP
  [1.0, 1.0], // fase 3 — CLP (cena quase estática até o fim)
];

/* fração da fase usada para acender as palavras */
const REVEAL_PORTION = 0.45;

function mapProgress(p: number) {
  for (let k = 1; k < SCROLL_MAP.length; k++) {
    const [s0, v0] = SCROLL_MAP[k - 1];
    const [s1, v1] = SCROLL_MAP[k];
    if (p <= s1) return v0 + (v1 - v0) * ((p - s0) / (s1 - s0));
  }
  return 1;
}

function Words({ text }: { text: string }) {
  return text.split(/\s+/).map((w, i) => (
    <span key={i} className="w">
      {w}{" "}
    </span>
  ));
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const typeLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const loader = loaderRef.current!;
    const hint = hintRef.current!;
    const bar = barRef.current!;
    const intro = introRef.current!;
    const overlays = overlaysRef.current.filter(Boolean) as HTMLDivElement[];
    const overlayWords = overlays.map((el) => [...el.querySelectorAll<HTMLElement>(".w")]);

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames: HTMLImageElement[] = new Array(CONFIG.frameCount);
    let loaded = 0;
    let renderProgress = 0;
    let lastFrameDrawn = -1;
    let raf = 0;
    const timers: number[] = [];

    /* ---------- Canvas responsivo (cover, com DPR) ---------- */
    function resizeCanvas() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      lastFrameDrawn = -1;
    }

    function drawFrame(index: number) {
      const img = frames[index];
      if (!img || !img.complete) return;
      const cw = canvas.width, ch = canvas.height;
      const scale = Math.max(cw / img.width, ch / img.height);
      const w = img.width * scale, h = img.height * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      lastFrameDrawn = index;
    }

    /* ---------- Pré-carregamento com prioridade ----------
       Primeiro 1 a cada 8 frames (esqueleto navegável), depois
       preenche o resto. */
    function preload() {
      const order: number[] = [];
      for (let step = 8; step >= 1; step = step >> 1) {
        for (let i = 1; i <= CONFIG.frameCount; i += step) {
          if (!order.includes(i)) order.push(i);
        }
      }
      order.forEach((i) => {
        const img = new window.Image();
        img.src = CONFIG.framePath(i);
        img.onload = () => {
          loaded++;
          loader.textContent = `${heroContent.ui.carregando} ${Math.round((loaded / CONFIG.frameCount) * 100)}%`;
          if (i === 1) {
            resizeCanvas();
            drawFrame(0);
            loader.classList.add("done");
          }
          if (loaded === CONFIG.frameCount) loader.classList.add("done");
        };
        img.onerror = () => {
          loaded++;
        };
        frames[i - 1] = img;
      });
    }

    function computeProgress() {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - innerHeight;
      return Math.min(1, Math.max(0, -rect.top / total));
    }

    /* ---------- Overlays: bloco com fade + palavra por palavra ---------- */
    function updateOverlays(p: number) {
      overlays.forEach((el, idx) => {
        const start = parseFloat(el.dataset.start!);
        const end = parseFloat(el.dataset.end!);
        const span = end - start;
        const edge = Math.min(0.03, span / 6);

        let blockOpacity = 0;
        if (p >= start && p <= end) {
          const inT = Math.min(1, (p - start) / edge);
          const outT = Math.min(1, (end - p) / edge);
          blockOpacity = Math.min(inT, outT);
        }
        el.style.opacity = String(blockOpacity);
        el.style.transform = `translateY(${(1 - blockOpacity) * 16}px)`;
        if (blockOpacity <= 0) return;

        const words = overlayWords[idx];
        const t = Math.min(1, Math.max(0, (p - start) / span));
        const lit = Math.min(1, t / REVEAL_PORTION) * words.length;
        words.forEach((w, i) => {
          const wp = Math.min(1, Math.max(0, lit - i));
          w.style.opacity = String(0.22 + 0.78 * wp);
          w.style.color = wp > 0.55 ? "" : "var(--w-dim)";
        });
      });
      hint.style.opacity = p < 0.03 ? "1" : "0";
      bar.style.transform = `scaleX(${p})`;
    }

    /* ---------- Intro: digitação estilo terminal ---------- */
    function startTyping() {
      const lines = typeLinesRef.current.filter(Boolean) as HTMLParagraphElement[];
      const texts = [heroContent.intro.linha1, heroContent.intro.linha2];
      const cursor = document.createElement("span");
      cursor.className = "cursor";

      function typeLine(li: number) {
        if (li >= lines.length) return;
        const el = lines[li];
        el.classList.add("active");
        el.appendChild(cursor);
        let ci = 0;
        const iv = window.setInterval(() => {
          ci++;
          el.textContent = texts[li].slice(0, ci);
          el.appendChild(cursor);
          if (ci >= texts[li].length) {
            clearInterval(iv);
            el.classList.add("done");
            timers.push(window.setTimeout(() => typeLine(li + 1), 350));
          }
        }, 42);
        timers.push(iv);
      }
      timers.push(window.setTimeout(() => typeLine(0), 900));
    }

    /* ---------- Loop de renderização com lerp ---------- */
    function tick() {
      const targetProgress = computeProgress();
      renderProgress += (targetProgress - renderProgress) * CONFIG.smoothing;
      if (Math.abs(targetProgress - renderProgress) < 0.0005) renderProgress = targetProgress;

      let frameIndex = Math.round(mapProgress(renderProgress) * (CONFIG.frameCount - 1));

      const introFade = Math.max(0, 1 - renderProgress / 0.07);
      intro.style.opacity = String(introFade);
      intro.style.visibility = introFade > 0 ? "visible" : "hidden";

      // se o frame exato ainda não carregou, usa o vizinho mais próximo
      if (!frames[frameIndex]?.complete) {
        for (let d = 1; d < CONFIG.frameCount; d++) {
          const a = frameIndex - d, b = frameIndex + d;
          if (a >= 0 && frames[a]?.complete) { frameIndex = a; break; }
          if (b < CONFIG.frameCount && frames[b]?.complete) { frameIndex = b; break; }
        }
      }

      if (frameIndex !== lastFrameDrawn) drawFrame(frameIndex);
      updateOverlays(renderProgress);
      raf = requestAnimationFrame(tick);
    }

    addEventListener("resize", resizeCanvas);

    if (reducedMotion) {
      // Acessibilidade: frame final estático com o último texto
      const img = new window.Image();
      img.src = CONFIG.framePath(CONFIG.frameCount);
      img.onload = () => {
        frames[CONFIG.frameCount - 1] = img;
        resizeCanvas();
        drawFrame(CONFIG.frameCount - 1);
        loader.classList.add("done");
      };
      overlays.slice(0, -1).forEach((el) => (el.style.display = "none"));
      const last = overlays[overlays.length - 1];
      last.style.opacity = "1";
      last.style.transform = "none";
      overlayWords[overlayWords.length - 1].forEach((w) => (w.style.opacity = "1"));
      intro.style.display = "none";
      hint.style.display = "none";
    } else {
      resizeCanvas();
      preload();
      startTyping();
      raf = requestAnimationFrame(tick);
    }

    return () => {
      removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="scrub-section" id="topo" ref={sectionRef}>
      <div className="scrub-sticky">
        <canvas className="scrub-canvas" ref={canvasRef} />
        <div className="scrub-vignette" />

        <div className="intro" ref={introRef}>
          <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} priority />
          <p className="type-line" ref={(el) => { typeLinesRef.current[0] = el; }} />
          <p className="type-line" ref={(el) => { typeLinesRef.current[1] = el; }} />
        </div>

        {heroContent.fases.map((fase, i) => {
          const Title = i === 0 ? "h1" : "h2";
          return (
            <div
              key={i}
              className={`scrub-overlay scrim${fase.align === "end" ? " align-end" : ""}`}
              data-start={fase.start}
              data-end={fase.end}
              ref={(el) => { overlaysRef.current[i] = el; }}
            >
              <span className="eyebrow">{fase.eyebrow}</span>
              <Title><Words text={fase.titulo} /></Title>
              <p><Words text={fase.texto} /></p>
            </div>
          );
        })}

        <div className="scroll-hint" ref={hintRef}>{heroContent.ui.dica_scroll}</div>
        <div className="scrub-progress" ref={barRef} />
        <div className="scrub-loader" ref={loaderRef}>{heroContent.ui.carregando} 0%</div>
      </div>
    </section>
  );
}
