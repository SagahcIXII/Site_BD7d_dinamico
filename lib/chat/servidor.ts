import "server-only";

/* ============================================================
   Utilitários do chat no servidor do site.
   - Limite de pedidos por visitante (em memória: simples, vale por
     instância; somado aos limites por conversa já basta para um
     site institucional).
   - Envio dos leads e alertas ao sistema de gestão (app.bd7d.com)
     com o token LEADS_TOKEN — o navegador nunca vê esse token.
   ============================================================ */

const janelas = new Map<string, { n: number; fim: number }>();

export function dentroDoLimite(chave: string, max: number, janelaMs = 10 * 60 * 1000) {
  const agora = Date.now();
  const j = janelas.get(chave);
  if (!j || j.fim < agora) {
    janelas.set(chave, { n: 1, fim: agora + janelaMs });
    if (janelas.size > 5000) for (const [k, v] of janelas) if (v.fim < agora) janelas.delete(k);
    return true;
  }
  j.n++;
  return j.n <= max;
}

export const ipDe = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anon";

const gestao = () => (process.env.GESTAO_URL ?? "https://app.bd7d.com").replace(/\/$/, "");

async function chamarGestao(caminho: string, corpo: unknown) {
  const token = process.env.LEADS_TOKEN;
  if (!token) throw new Error("LEADS_TOKEN não configurado");
  const res = await fetch(`${gestao()}${caminho}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`gestão respondeu ${res.status}`);
  return res.json();
}

export const enviarLead = (corpo: unknown) => chamarGestao("/api/leads", corpo);

/* Avisa (no máximo 1 e-mail/dia, controlado no sistema) que a IA
   caiu e o chat está no roteiro automático. Nunca derruba o chat. */
export async function alertarIaIndisponivel(motivo: string) {
  try {
    await chamarGestao("/api/leads/alerta", { motivo });
  } catch (e) {
    console.error("alerta de IA indisponível falhou:", e);
  }
}
