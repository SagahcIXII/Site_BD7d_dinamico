import { camposLead, LIMITES, type Dados } from "@/lib/chat/tipos";
import { dentroDoLimite, enviarLead, ipDe } from "@/lib/chat/servidor";

/* O chat do navegador manda o lead para cá; daqui ele segue para o
   sistema de gestão com o token secreto. */
export async function POST(request: Request) {
  if (!dentroDoLimite(`lead:${ipDe(request)}`, 40)) return Response.json({ erro: "limite" }, { status: 429 });

  const corpo = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!corpo || corpo.consentimento !== true) return Response.json({ erro: "sem consentimento" }, { status: 400 });

  const bruto = (corpo.dados ?? {}) as Record<string, unknown>;
  const dados: Dados = {};
  for (const c of camposLead) {
    const v = bruto[c];
    if (typeof v === "string" && v.trim()) dados[c] = v.trim().slice(0, c === "descricao" ? 2000 : LIMITES.caracteres);
  }

  try {
    await enviarLead({
      conversaId: corpo.conversaId,
      idioma: corpo.idioma,
      modo: corpo.modo === "roteiro" ? "roteiro" : "ia",
      consentimento: true,
      dados,
      resumo: typeof corpo.resumo === "string" ? corpo.resumo.slice(0, 1000) : undefined,
      transcricao: typeof corpo.transcricao === "string" ? corpo.transcricao.slice(0, 3000) : undefined,
      completo: corpo.completo === true,
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("envio de lead falhou:", e);
    return Response.json({ erro: "falha" }, { status: 502 });
  }
}
