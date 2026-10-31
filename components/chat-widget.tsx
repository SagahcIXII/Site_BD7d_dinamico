"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/contact";
import { textosChat, type Opcao } from "@/lib/chat/textos";
import {
  emailValido,
  LIMITES,
  leadCompleto,
  proximaEtapa,
  telefoneValido,
  transcricao,
  type Dados,
  type Mensagem,
} from "@/lib/chat/tipos";

/* ============================================================
   CHAT DO SITE
   Conversa com a IA (via /api/chat). Se a IA não responder, segue
   sozinho com o roteiro automático — o visitante não percebe.
   Dados pessoais só depois do "Concordo" (LGPD); o lead vai sendo
   salvo no CRM aos poucos (/api/lead).
   ============================================================ */

type Item = Mensagem & { tipo?: "consentimento" | "whatsapp" };
type Estado = {
  id: string;
  itens: Item[];
  dados: Dados;
  consentimento: boolean | null;
  modo: "ia" | "roteiro";
  empresaPulada: boolean;
  concluido: boolean;
  resumo: string;
};

const CHAVE = "bd7d-chat-v1";
const novoId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
const novoEstado = (): Estado => ({ id: novoId(), itens: [], dados: {}, consentimento: null, modo: "ia", empresaPulada: false, concluido: false, resumo: "" });

function carregar(): Estado | null {
  try {
    const s = sessionStorage.getItem(CHAVE);
    return s ? (JSON.parse(s) as Estado) : null;
  } catch {
    return null;
  }
}

/* só o que a IA precisa ver (os cartões de consentimento/WhatsApp são da tela) */
const paraIA = (itens: Item[]) => itens.filter((i) => !i.tipo).slice(-LIMITES.mensagens + 1).map(({ de, texto }) => ({ de, texto }));

/* junta só valores preenchidos (a IA manda "" para o que não sabe) */
const mesclar = (a: Dados, b: Record<string, string | undefined>) => {
  const out: Dados = { ...a };
  for (const [k, v] of Object.entries(b)) if (typeof v === "string" && v.trim()) out[k as keyof Dados] = v.trim();
  return out;
};

export function ChatWidget({ lang }: { lang: Locale }) {
  const t = textosChat[lang];
  const [aberto, setAberto] = useState(false);
  const [e, setE] = useState<Estado>(novoEstado);
  const [sugestoes, setSugestoes] = useState<Opcao[]>([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const estadoRef = useRef(e);
  useEffect(() => {
    estadoRef.current = e;
  }, [e]);

  // recupera a conversa ao trocar de página/idioma na mesma aba
  useEffect(() => {
    const salvo = carregar();
    if (salvo) setE(salvo);
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAVE, JSON.stringify(e));
    } catch {
      /* navegação privada: segue sem guardar */
    }
  }, [e]);
  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [e.itens.length, carregando, aberto]);

  /* ---------- envio do lead ao CRM ---------- */
  const salvarLead = useCallback(
    async (est: Estado, completo: boolean) => {
      if (est.consentimento !== true) return;
      const corpo = {
        conversaId: est.id,
        idioma: lang,
        modo: est.modo,
        consentimento: true,
        dados: est.dados,
        resumo: est.resumo || undefined,
        transcricao: transcricao(est.itens.filter((i) => !i.tipo)),
        completo,
      };
      try {
        await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corpo), keepalive: true });
      } catch {
        /* tenta de novo na próxima atualização */
      }
    },
    [lang],
  );

  // parcial: depois do consentimento, guarda o que já foi informado
  useEffect(() => {
    if (e.consentimento !== true || e.concluido) return;
    if (!e.dados.nome && !e.dados.email && !e.dados.telefone) return;
    const id = setTimeout(() => salvarLead(estadoRef.current, false), 1500);
    return () => clearTimeout(id);
  }, [e.dados, e.consentimento, e.concluido, salvarLead]);

  // visitante fechou a aba no meio: envia o que tem
  useEffect(() => {
    const sair = () => {
      const est = estadoRef.current;
      if (est.consentimento !== true || est.concluido || (!est.dados.email && !est.dados.telefone && !est.dados.nome)) return;
      const corpo = JSON.stringify({ conversaId: est.id, idioma: lang, modo: est.modo, consentimento: true, dados: est.dados, resumo: est.resumo, transcricao: transcricao(est.itens.filter((i) => !i.tipo)), completo: false });
      navigator.sendBeacon?.("/api/lead", new Blob([corpo], { type: "application/json" }));
    };
    window.addEventListener("pagehide", sair);
    return () => window.removeEventListener("pagehide", sair);
  }, [lang]);

  /* ---------- helpers de conversa ---------- */
  const bot = (est: Estado, txt: string, tipo?: Item["tipo"]): Estado => ({ ...est, itens: [...est.itens, { de: "bot", texto: txt, tipo }] });

  // comMensagem=false quando a própria IA já agradeceu e encerrou
  const finalizar = (est: Estado, comMensagem = true): Estado => {
    const base = { ...est, concluido: true };
    const fim = bot(comMensagem ? bot(base, t.final) : base, t.whatsapp, "whatsapp");
    setSugestoes([]);
    salvarLead(fim, true);
    return fim;
  };

  /* próxima pergunta do roteiro automático */
  const perguntarRoteiro = (est: Estado): Estado => {
    const etapa = proximaEtapa(est.dados, est.consentimento, est.empresaPulada);
    if (etapa === "fim") return finalizar(est);
    if (etapa === "consentimento") {
      setSugestoes([]);
      return bot(est, t.consentimento.texto, "consentimento");
    }
    const r = t.roteiro;
    const pergunta = r[etapa].pergunta;
    setSugestoes(etapa === "servico" ? r.servico.opcoes : etapa === "prazo" ? r.prazo.opcoes : etapa === "empresa" ? [{ valor: "__pular", rotulo: r.empresa.pular }] : []);
    return bot(est, pergunta);
  };

  /* resposta do visitante dentro do roteiro */
  const responderRoteiro = (est: Estado, txt: string, valor?: string): Estado => {
    const etapa = proximaEtapa(est.dados, est.consentimento, est.empresaPulada);
    const d = { ...est.dados };
    if (etapa === "servico") {
      const op = t.roteiro.servico.opcoes.find((o) => o.valor === valor || o.rotulo.toLowerCase() === txt.toLowerCase());
      d.servico = op?.valor ?? "outro";
      if (!op && !d.descricao) d.descricao = txt;
    } else if (etapa === "empresa" && valor === "__pular") {
      return perguntarRoteiro({ ...est, empresaPulada: true });
    } else if (etapa === "email" && !emailValido(txt)) {
      return bot(est, t.validacao.email);
    } else if (etapa === "telefone" && !telefoneValido(txt)) {
      return bot(est, t.validacao.telefone);
    } else if (etapa !== "consentimento" && etapa !== "fim") {
      d[etapa] = valor && etapa === "prazo" ? valor : txt;
    }
    return perguntarRoteiro({ ...est, dados: d });
  };

  /* ---------- enviar mensagem ---------- */
  const enviar = async (txt: string, valor?: string) => {
    const limpo = txt.trim().slice(0, LIMITES.caracteres);
    if (!limpo || carregando || e.concluido) return;
    setTexto("");
    setSugestoes([]);
    let est: Estado = { ...e, itens: [...e.itens, { de: "visitante", texto: limpo }] };
    if (est.itens.length > LIMITES.mensagens) est = { ...est, modo: "roteiro" };

    if (est.modo === "roteiro") {
      setE(responderRoteiro(est, limpo, valor));
      return;
    }
    setE(est);
    await rodadaIA(est, limpo);
  };

  const rodadaIA = async (est: Estado, ultimoTexto?: string) => {
    setCarregando(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idioma: lang, mensagens: paraIA(est.itens), dados: est.dados, consentimento: est.consentimento }),
      });
      const r = res.ok ? await res.json() : { modo: "roteiro" };
      if (r.modo !== "ia") throw new Error("roteiro");

      let prox: Estado = { ...est, dados: mesclar(est.dados, r.dados ?? {}), resumo: r.resumo || est.resumo };
      prox = bot(prox, r.resposta);
      if (r.etapa === "concluido" && leadCompleto(prox.dados) && prox.consentimento === true) {
        setE(finalizar(prox, false));
      } else if (r.etapa !== "qualificando" && prox.consentimento === null) {
        setSugestoes([]);
        setE(bot(prox, t.consentimento.texto, "consentimento"));
      } else {
        setSugestoes((r.sugestoes ?? []).map((s: string) => ({ valor: s, rotulo: s })));
        setE(prox);
      }
    } catch {
      // IA indisponível: segue com o roteiro, aproveitando o que já se sabe
      const d = { ...est.dados };
      if (!d.descricao && ultimoTexto && ultimoTexto.length >= 8) d.descricao = ultimoTexto;
      setE(perguntarRoteiro({ ...est, dados: d, modo: "roteiro" }));
    } finally {
      setCarregando(false);
    }
  };

  /* ---------- consentimento ---------- */
  const decidir = async (aceita: boolean) => {
    let est: Estado = { ...e, consentimento: aceita, itens: [...e.itens, { de: "visitante", texto: aceita ? t.consentimento.aceitar : t.consentimento.recusar }] };
    if (!aceita) {
      est = bot(bot({ ...est, concluido: true }, t.consentimento.recusado), t.whatsapp, "whatsapp");
      setSugestoes([]);
      setE(est);
      return;
    }
    if (est.modo === "roteiro") {
      setE(perguntarRoteiro(est));
      return;
    }
    setE(est);
    await rodadaIA(est);
  };

  const abrir = () => {
    setAberto(true);
    if (!e.itens.length) {
      setE((x) => bot(x, t.saudacao));
      setSugestoes(t.sugestoesIniciais.map((s) => ({ valor: s, rotulo: s })));
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const recomecar = () => {
    const novo = bot(novoEstado(), t.saudacao);
    setE(novo);
    setSugestoes(t.sugestoesIniciais.map((s) => ({ valor: s, rotulo: s })));
  };

  useEffect(() => {
    if (!aberto) return;
    const esc = (ev: KeyboardEvent) => ev.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  const linkWhats = whatsappLink(t.mensagemWhatsapp(e.dados.descricao ?? ""));
  const ultimoConsent = e.itens.length > 0 && e.itens[e.itens.length - 1].tipo === "consentimento";
  const bloqueado = carregando || e.concluido || ultimoConsent;

  return (
    <>
      <button type="button" className={`chat-lancador${aberto ? " oculto" : ""}`} onClick={abrir} aria-label={t.botao}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z" />
        </svg>
        <span>{t.botao}</span>
      </button>

      {aberto && (
        <section className="chat-painel" role="dialog" aria-label={t.titulo}>
          <header className="chat-topo">
            <span className="chat-avatar" aria-hidden="true">B7</span>
            <div>
              <strong>{t.titulo}</strong>
              <small>{t.subtitulo}</small>
            </div>
            {e.concluido && (
              <button type="button" className="chat-recomecar" onClick={recomecar} aria-label="↺">
                ↺
              </button>
            )}
            <button type="button" className="chat-fechar" onClick={() => setAberto(false)} aria-label={t.fechar}>
              ×
            </button>
          </header>

          <div className="chat-mensagens" aria-live="polite">
            {e.itens.map((m, i) =>
              m.tipo === "whatsapp" ? (
                <a key={i} className="chat-whats" href={linkWhats} target="_blank" rel="noopener">
                  {m.texto}
                </a>
              ) : (
                <div key={i} className={`chat-msg ${m.de}`}>
                  <p>{m.texto}</p>
                  {m.tipo === "consentimento" && i === e.itens.length - 1 && (
                    <div className="chat-consent">
                      <button type="button" onClick={() => decidir(true)}>{t.consentimento.aceitar}</button>
                      <button type="button" className="sec" onClick={() => decidir(false)}>{t.consentimento.recusar}</button>
                    </div>
                  )}
                </div>
              ),
            )}
            {carregando && <div className="chat-msg bot digitando"><p>{t.digitando}</p></div>}
            <div ref={fimRef} />
          </div>

          {sugestoes.length > 0 && !bloqueado && (
            <div className="chat-sugestoes">
              {sugestoes.map((s) => (
                <button key={s.valor} type="button" onClick={() => enviar(s.rotulo, s.valor)}>
                  {s.rotulo}
                </button>
              ))}
            </div>
          )}

          <form
            className="chat-entrada"
            onSubmit={(ev) => {
              ev.preventDefault();
              enviar(texto);
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={texto}
              maxLength={LIMITES.caracteres}
              placeholder={t.placeholder}
              disabled={bloqueado}
              onChange={(ev) => setTexto(ev.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  ev.preventDefault();
                  enviar(texto);
                }
              }}
              aria-label={t.placeholder}
            />
            <button type="submit" disabled={bloqueado || !texto.trim()} aria-label={t.enviar}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 11.5 20 4l-5.5 16-3-6.5z" />
              </svg>
            </button>
          </form>
          <a className="chat-rodape" href={linkWhats} target="_blank" rel="noopener">
            {t.whatsappRodape} →
          </a>
        </section>
      )}
    </>
  );
}
