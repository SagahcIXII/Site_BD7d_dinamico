"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { textosExtra } from "@/lib/textos-extra";
import { emailValido, telefoneValido } from "@/lib/chat/tipos";
import { ACEITOS, MAX_ANEXOS, enviarAnexo, prepararAnexo } from "@/lib/chat/anexos-cliente";

const novoId = () =>
  `form-${typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`}`;

/* Formulário de contato no fim da página: vai por e-mail para a
   BD7D e vira lead no CRM. Anexos (fatura, fotos, projeto) são
   enviados primeiro, com o mesmo id, e seguem junto no e-mail. */
export function FormContato({ lang, politicaHref }: { lang: Locale; politicaHref: string | null }) {
  const t = textosExtra[lang].form;
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "erro" | "faltando">("livre");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [avisoAnexo, setAvisoAnexo] = useState<string | null>(null);

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
        setAvisoAnexo(null);
        try {
          const conversaId = novoId();
          const enviados = await Promise.all(arquivos.map((a) => enviarAnexo(conversaId, a)));
          const res = await fetch("/api/contato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idioma: lang,
              conversaId,
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
          if (enviados.some((ok) => !ok)) setAvisoAnexo(t.anexoFalhou);
          setArquivos([]);
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
        <div className="largo form-anexos">
          <label className="btn-anexo">
            📎 {t.anexos}
            <input
              type="file"
              accept={ACEITOS}
              multiple
              hidden
              onChange={async (e) => {
                const escolhidos = Array.from(e.target.files ?? []);
                e.target.value = "";
                setAvisoAnexo(null);
                const prontos: File[] = [];
                for (const a of escolhidos) {
                  const p = await prepararAnexo(a);
                  if (typeof p === "string") setAvisoAnexo(t.anexoRecusado);
                  else prontos.push(p);
                }
                setArquivos((x) => {
                  const todos = [...x, ...prontos];
                  if (todos.length > MAX_ANEXOS) setAvisoAnexo(t.anexoRecusado);
                  return todos.slice(0, MAX_ANEXOS);
                });
              }}
            />
          </label>
          <small>{t.anexosDica}</small>
          {arquivos.length > 0 && (
            <ul>
              {arquivos.map((a, i) => (
                <li key={`${a.name}-${i}`}>
                  <span>{a.type === "application/pdf" ? "📄" : "🖼"} {a.name}</span>
                  <small>{Math.max(1, Math.round(a.size / 1024))} KB</small>
                  <button type="button" onClick={() => setArquivos((x) => x.filter((_, j) => j !== i))}>{t.remover}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* armadilha para robôs: fica escondida das pessoas */}
        <label className="armadilha" aria-hidden="true">
          Site<input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="form-consent">
        <input type="checkbox" name="consentimento" />
        <span>
          {t.consentimento} {politicaHref ? <a href={politicaHref}>{t.politica}</a> : t.politica}.
        </span>
      </label>
      {estado === "ok" && <p className="form-aviso ok" role="status">{t.ok}</p>}
      {estado === "erro" && <p className="form-aviso erro" role="alert">{t.erro}</p>}
      {estado === "faltando" && <p className="form-aviso erro" role="alert">{t.obrigatorio}</p>}
      {avisoAnexo && <p className="form-aviso erro" role="alert">{avisoAnexo}</p>}
      <button className="btn" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? t.enviando : `${t.enviar} →`}
      </button>
    </form>
  );
}
