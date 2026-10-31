import type { NextConfig } from "next";

/* Imagens dos cases vêm do portal (app.bd7d.com); a Vercel guarda
   uma cópia otimizada, então o portal quase não é consultado. */
const gestao = new URL(process.env.GESTAO_URL ?? "https://app.bd7d.com");
const gestaoLocal = ["localhost", "127.0.0.1"].includes(gestao.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: gestao.protocol.replace(":", "") as "http" | "https", hostname: gestao.hostname, port: gestao.port, pathname: "/api/publico/imagem/**" },
    ],
    // só no teste local (portal em 127.0.0.1)
    dangerouslyAllowLocalIP: gestaoLocal,
  },
  /* Português é o idioma padrão e fica na raiz: "/" serve a página /pt,
     e quem acessar /pt é redirecionado para "/". O mesmo vale para as
     páginas internas (cases e privacidade). */
  async rewrites() {
    return [
      { source: "/", destination: "/pt" },
      { source: "/cases/:slug", destination: "/pt/cases/:slug" },
      { source: "/privacidade", destination: "/pt/privacidade" },
    ];
  },
  async redirects() {
    return [
      { source: "/pt", destination: "/", permanent: true },
      { source: "/pt/cases/:slug", destination: "/cases/:slug", permanent: true },
      { source: "/pt/privacidade", destination: "/privacidade", permanent: true },
    ];
  },
};

export default nextConfig;
