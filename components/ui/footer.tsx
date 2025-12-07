import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} BD7D Solutions · Manaus - AM</p>

        <div className="flex gap-4">
          <Link href="mailto:admin@bd7d.com">admin@bd7d.com</Link>
          <Link href="https://api.whatsapp.com/send?phone=5592981649981&text=Olá%2C+vim+pelo+site+da+BD7D+Solutions+e+gostaria+de+saber+mais.">WhatsApp</Link>
          <Link href="https://www.linkedin.com/company/bd7d-solutions/">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
;