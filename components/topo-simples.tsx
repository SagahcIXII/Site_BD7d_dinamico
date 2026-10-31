import Image from "next/image";

/* Barra superior das páginas internas (case, privacidade): logo que
   volta para a página inicial e um link de retorno.
   Links comuns (<a>, não <Link>) de propósito: a página inicial em
   português é "/" reescrita para "/pt", e a navegação interna do Next
   não segue essa reescrita — dava "página não encontrada". */
export function TopoSimples({ inicio, voltarHref, voltar }: { inicio: string; voltarHref: string; voltar: string }) {
  return (
    <header className="topo-simples">
      <div className="wrap">
        <a href={inicio} className="brand">
          <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} priority />
        </a>
        <a href={voltarHref} className="voltar-link">{voltar}</a>
      </div>
    </header>
  );
}
