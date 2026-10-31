import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

/* O portal (app.bd7d.com) chama aqui depois de salvar algo do site,
   com o LEADS_TOKEN; o conteúdo novo aparece na próxima visita. */
export async function POST(request: Request) {
  const esperado = process.env.LEADS_TOKEN ?? "";
  const recebido = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  if (esperado.length < 24 || a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ erro: "não autorizado" }, { status: 401 });
  revalidateTag("site", { expire: 0 });
  return Response.json({ ok: true });
}
