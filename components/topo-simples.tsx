import Image from "next/image";
import Link from "next/link";

/* Barra superior das páginas internas (case, privacidade): logo que
   volta para a página inicial e um link de retorno. */
export function TopoSimples({ inicio, voltarHref, voltar }: { inicio: string; voltarHref: string; voltar: string }) {
  return (
    <header className="topo-simples">
      <div className="wrap">
        <Link href={inicio} className="brand">
          <Image src="/images/logo-dark.png" alt="BD7D Solutions" width={1200} height={560} priority />
        </Link>
        <Link href={voltarHref} className="voltar-link">{voltar}</Link>
      </div>
    </header>
  );
}
