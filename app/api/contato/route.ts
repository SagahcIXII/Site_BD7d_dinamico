import { isLocale } from "@/lib/i18n";
import { emailValido, telefoneValido } from "@/lib/chat/tipos";
import { dentroDoLimite, ipDe } from "@/lib/chat/servidor";
import { gestaoUrl } from "@/lib/conteudo";

/* Formulário de contato do rodapé → portal (lead no CRM + e-mail). */
export async function POST(request: Request) {
  if (!dentroDoLimite(`contato:${ipDe(request)}`, 5)) return Response.json({ erro: "limite" }, { status: 429 });
  const corpo = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!corpo) return Response.json({ erro: "inválido" }, { status: 400 });
  // campo escondido: só robôs preenchem
  if (typeof corpo.site === "string" && corpo.site) return Response.json({ ok: true });

  const t = (k: string, max: number) => (typeof corpo[k] === "string" ? (corpo[k] as string).trim().slice(0, max) : "");
  const dados = { nome: t("nome", 120), empresa: t("empresa", 160), email: t("email", 160), telefone: t("telefone", 40), mensagem: t("mensagem", 2000) };
  const contatoOk = (dados.email && emailValido(dados.email)) || (dados.telefone && telefoneValido(dados.telefone));
  if (corpo.consentimento !== true || !dados.nome || !dados.mensagem || !contatoOk) return Response.json({ erro: "dados" }, { status: 400 });

  const token = process.env.LEADS_TOKEN;
  if (!token) return Response.json({ erro: "config" }, { status: 500 });
  try {
    const res = await fetch(`${gestaoUrl()}/api/leads/contato`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ idioma: typeof corpo.idioma === "string" && isLocale(corpo.idioma) ? corpo.idioma : "pt", consentimento: true, dados }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return Response.json({ ok: true });
  } catch (e) {
    console.error("formulário de contato falhou:", e);
    return Response.json({ erro: "falha" }, { status: 502 });
  }
}
