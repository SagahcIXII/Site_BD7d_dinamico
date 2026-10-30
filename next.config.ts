import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Português é o idioma padrão e fica na raiz: "/" serve a página /pt,
     e quem acessar /pt é redirecionado para "/". */
  async rewrites() {
    return [{ source: "/", destination: "/pt" }];
  },
  async redirects() {
    return [{ source: "/pt", destination: "/", permanent: true }];
  },
};

export default nextConfig;
