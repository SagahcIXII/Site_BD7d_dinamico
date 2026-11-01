import { dentroDoLimite, ipDe } from "@/lib/chat/servidor";
import { gestaoUrl } from "@/lib/conteudo";

/* Anexo do chat/formulário → portal (guardado no CRM e enviado por
   e-mail junto com o lead). O portal confere tipo real e limites. */
export async function POST(request: Request) {
  if (!dentroDoLimite(`anexo:${ipDe(request)}`, 20)) return Response.json({ erro: "limite" }, { status: 429 });
  const form = await request.formData().catch(() => null);
  const conversaId = String(form?.get("conversaId") ?? "");
  const arquivo = form?.get("arquivo");
  if (!/^[a-zA-Z0-9-]{16,64}$/.test(conversaId) || !(arquivo instanceof File) || !arquivo.size || arquivo.size > 4 * 1024 * 1024) {
    return Response.json({ erro: "inválido" }, { status: 400 });
  }
  const token = process.env.LEADS_TOKEN;
  if (!token) return Response.json({ erro: "config" }, { status: 500 });

  const envio = new FormData();
  envio.set("conversaId", conversaId);
  envio.set("arquivo", arquivo, arquivo.name);
  try {
    const res = await fetch(`${gestaoUrl()}/api/leads/anexo`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: envio,
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return Response.json({ erro: "recusado" }, { status: res.status === 400 ? 400 : 502 });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("anexo falhou:", e);
    return Response.json({ erro: "falha" }, { status: 502 });
  }
}
