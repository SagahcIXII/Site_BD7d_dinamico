"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/contact";

/* Aparece quando a intro do hero some (~meia tela de scroll) */
export function SiteNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(scrollY > innerHeight * 0.45);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${show ? " show" : ""}`}>
      <a className="brand" href="#topo">
        <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} />
      </a>
      <ul>
        <li><a href="#energia">Energia</a></li>
        <li><a href="#construcao">Construção</a></li>
        <li><a href="#performance">Performance</a></li>
        <li><a href="#cases">Cases</a></li>
      </ul>
      <a className="btn" href={whatsappLink("Olá, vim pelo site da BD7D Solutions e gostaria de saber mais.")} target="_blank" rel="noopener">
        Fale conosco
      </a>
    </header>
  );
}
