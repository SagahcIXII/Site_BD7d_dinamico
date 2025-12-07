import { HeroParallax } from "@/components/ui/hero-parallax";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Sections } from "@/components/ui/sections";

type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

const products: Product[] = [
  {
    title: "Projeto de SPDA e Aterramento – NBR 5419",
    link: "#energia",
    thumbnail: "/images/spda-bd7d.jpg",
  },
  {
    title: "Eficiência Energética e Redução de Demanda",
    link: "#energia",
    thumbnail: "/images/eficiencia-energetica.jpg",
  },
  {
    title: "Mercado Livre de Energia – Grupo A",
    link: "#energia",
    thumbnail: "/images/mercado-livre-energia.jpg",
  },
  {
    title: "Gestão de Contratos de Energia e ICMS",
    link: "#energia",
    thumbnail: "/images/gestao-energia.jpg",
  },
  {
    title: "Projetos Elétricos Industriais – MT/BT",
    link: "#energia",
    thumbnail: "/images/projetos-eletricos.jpg",
  },
  {
    title: "Projetos de Galpões Industriais e Layout",
    link: "#construcao",
    thumbnail: "/images/galpao-industrial.jpg",
  },
  {
    title: "Construção e Reformas com Foco em Performance",
    link: "#construcao",
    thumbnail: "/images/construcao-reformas.jpg",
  },
  {
    title: "Modelagem BIM e Render 3D",
    link: "#construcao",
    thumbnail: "/images/bim-render.jpg",
  },
  {
    title: "Automação Industrial e Retrofit",
    link: "#performance",
    thumbnail: "/images/automacao-industrial.jpg",
  },
  {
    title: "Automação de Rotinas e Dashboards",
    link: "#performance",
    thumbnail: "/images/automacao-rotinas.jpg",
  },
  {
    title: "KPIs e Performance Operacional",
    link: "#performance",
    thumbnail: "/images/kpis-performance.jpg",
  },
  {
    title: "Projetos Especiais P&D",
    link: "#performance",
    thumbnail: "/images/projetos-pd.jpg",
  },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-black via-slate-950 to-black min-h-screen text-white">
      {/* Navbar fixa no topo */}
      <Navbar />

      {/* Hero com efeito parallax usando os produtos/serviços da BD7D */}
      <section className="pt-20">
        <HeroParallax products={products} />
      </section>

      {/* Aqui depois você pode adicionar seções de serviços, cases, contato, etc. */}

      <Footer />
    </main>
  );
};