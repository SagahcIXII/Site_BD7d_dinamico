import Anthropic from "@anthropic-ai/sdk";
import { isLocale } from "@/lib/i18n";
import { camposLead, LIMITES, type Dados, type Mensagem } from "@/lib/chat/tipos";
import { iaConfigurada, responderComIA } from "@/lib/chat/ia";
import { alertarIaIndisponivel, dentroDoLimite, ipDe } from "@/lib/chat/servidor";

export const maxDuration = 45;

/* Uma rodada da conversa com a IA. Se a IA não estiver disponível
   (sem chave, sem créditos, fora do ar), responde { modo: "roteiro" }
   e o navegador continua com as perguntas automáticas. */
export async function POST(request: Request) {
  if (!dentroDoLimite(`chat:${ipDe(request)}`, 60)) return Response.json({ modo: "roteiro", motivo: "limite" });

  const corpo = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const idioma = typeof corpo?.idioma === "string" && isLocale(corpo.idioma) ? corpo.idioma : "pt";
  const brutas = Array.isArray(corpo?.mensagens) ? corpo.mensagens : [];
  if (!brutas.length || brutas.length > LIMITES.mensagens) return Response.json({ modo: "roteiro", motivo: "tamanho" });

  const mensagens: Mensagem[] = [];
  for (const m of brutas as Record<string, unknown>[]) {
    const texto = typeof m?.texto === "string" ? m.texto.trim() : "";
    if (!texto || texto.length > LIMITES.caracteres) return Response.json({ modo: "roteiro", motivo: "tamanho" });
    mensagens.push({ de: m.de === "bot" ? "bot" : "visitante", texto });
  }
  const brutosDados = (corpo?.dados ?? {}) as Record<string, unknown>;
  const dados: Dados = {};
  for (const c of camposLead) if (typeof brutosDados[c] === "string" && brutosDados[c]) dados[c] = String(brutosDados[c]).slice(0, 500);
  const consentimento = corpo?.consentimento === true ? true : corpo?.consentimento === false ? false : null;

  if (!iaConfigurada()) return Response.json({ modo: "roteiro", motivo: "desligada" });

  try {
    const r = await responderComIA({ idioma, mensagens, dados, consentimento });
    // sem consentimento, dados pessoais não voltam para o navegador
    if (consentimento !== true) for (const c of ["nome", "empresa", "email", "telefone"] as const) r.dados[c] = "";
    return Response.json({ modo: "ia", ...r, sugestoes: r.sugestoes.slice(0, 3) });
  } catch (e) {
    const motivo =
      e instanceof Anthropic.APIError ? `${e.status ?? "?"} ${e.message}`.slice(0, 200) : e instanceof Error ? e.message.slice(0, 200) : "erro desconhecido";
    await alertarIaIndisponivel(motivo);
    return Response.json({ modo: "roteiro", motivo: "ia-indisponivel" });
  }
}
