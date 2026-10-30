"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; className?: string };

/* Vídeo de fundo em loop, sem som. Só toca enquanto está visível
   na tela; com "reduzir movimento" fica parado no pôster. */
export function LoopVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
