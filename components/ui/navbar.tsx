"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-bd7d.png"              // ⬅️ caminho da sua logo em /public
            alt="Logo BD7D Solutions"
            width={128}                        // ~32px de largura
            height={64}                       // ~32px de altura
            className="rounded-lg"            // opcional: deixa cantos levemente arredondados
            priority                           // carrega mais rápido no topo
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">
              BD7D Solutions
            </span>
            <span className="text-[11px] text-neutral-400">
              Energia · Construção · Performance
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-200">
          <Link href="#energia">Energia</Link>
          <Link href="#construcao">Construção</Link>
          <Link href="#performance">Performance</Link>
          <Link href="#cases">Cases</Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-neutral-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/90">
          <nav className="px-4 py-3 flex flex-col gap-2 text-sm text-neutral-200">
            <Link href="#energia">Energia</Link>
            <Link href="#construcao">Construção</Link>
            <Link href="#performance">Performance</Link>
            <Link href="#cases">Cases</Link>
          </nav>
        </div>
      )}
    </header>
  );
};