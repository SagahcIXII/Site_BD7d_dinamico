"use client";

import { abrirChat } from "@/components/site-nav";

/* Botão de contato: com WhatsApp ligado no portal, abre o WhatsApp
   com a mensagem pronta; desligado, abre o chat do site. */
export function BotaoContato({ href, rotulo, rotuloChat, className }: { href: string | null; rotulo: string; rotuloChat: string; className: string }) {
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener">
        {rotulo}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={abrirChat}>
      {rotuloChat}
    </button>
  );
}
