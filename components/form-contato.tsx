"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { textosExtra } from "@/lib/textos-extra";
import { emailValido, telefoneValido } from "@/lib/chat/tipos";

/* Formulário de contato no fim da página: vai por e-mail para a
   BD7D e vira lead no CRM. */
export function FormContato({ lang, politicaHref }: { lang: Locale; politicaHref: string | null }) {
  const t = textosExtra[lang].form;
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "erro" | "faltando">("livre");

  return (
    <form
      className="form-contato"
      noValidate
      onSubmit={async (ev) => {
        ev.preventDefault();
        const f = new FormData(ev.currentTarget);
        const v = (k: string) => String(f.get(k) ?? "").trim();
        const contatoOk = (v("email") && emailValido(v("email"))) || (v("telefone") && telefoneValido(v("telefone")));
        if (!v("nome") || !v("mensagem") || !contatoOk || f.get("consentimento") !== "on") return setEstado("faltando");
        setEstado("enviando");
        try {
          const res = await fetch("/api/contato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idioma: lang,
              nome: v("nome"),
              empresa: v("empresa"),
              email: v("email"),
              telefone: v("telefone"),
              mensagem: v("mensagem"),
              site: v("site"),
              consentimento: true,
            }),
          });
          if (!res.ok) throw new Error();
          setEstado("ok");
          (ev.target as HTMLFormElement).reset();
        } catch {
          setEstado("erro");
        }
      }}
    >
      <div className="form-grade">
        <label><span>{t.nome} *</span><input name="nome" autoComplete="name" maxLength={120} required /></label>
        <label><span>{t.empresa}</span><input name="empresa" autoComplete="organization" maxLength={160} /></label>
        <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" maxLength={160} /></label>
        <label><span>{t.telefone}</span><input name="telefone" type="tel" autoComplete="tel" maxLength={40} /></label>
        <label className="largo"><span>{t.mensagem} *</span><textarea name="mensagem" rows={4} maxLength={2000} required /></label>
        {/* armadilha para robôs: fica escondida das pessoas */}
        <label className="armadilha" aria-hidden="true">
          Site<input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="form-consent">
        <input type="checkbox" name="consentimento" />
        <span>
          {t.consentimento} {politicaHref ? <Link href={politicaHref}>{t.politica}</Link> : t.politica}.
        </span>
      </label>
      {estado === "ok" && <p className="form-aviso ok" role="status">{t.ok}</p>}
      {estado === "erro" && <p className="form-aviso erro" role="alert">{t.erro}</p>}
      {estado === "faltando" && <p className="form-aviso erro" role="alert">{t.obrigatorio}</p>}
      <button className="btn" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? t.enviando : `${t.enviar} →`}
      </button>
    </form>
  );
}
