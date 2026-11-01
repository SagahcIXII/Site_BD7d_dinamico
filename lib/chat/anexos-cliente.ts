/* ============================================================
   ANEXOS (navegador) — faturas, fotos do local, projetos.
   Fotos são reduzidas no próprio aparelho (celular manda vários MB);
   PDF vai como está, até 4 MB. Usado pelo chat e pelo formulário.
   ============================================================ */
export const MAX_ANEXOS = 5;
export const MAX_BYTES = 4 * 1024 * 1024;
export const ACEITOS = "application/pdf,image/jpeg,image/png,image/webp,image/heic,image/heif";

async function reduzirFoto(arquivo: File, maxLado = 1800): Promise<File> {
  const bitmap = await createImageBitmap(arquivo);
  const escala = Math.min(1, maxLado / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((ok, falha) => canvas.toBlob((b) => (b ? ok(b) : falha(new Error("foto"))), "image/jpeg", 0.85));
  return new File([blob], arquivo.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}

/* Prepara o arquivo para envio ou devolve o motivo da recusa. */
export async function prepararAnexo(arquivo: File): Promise<File | "tipo" | "tamanho"> {
  if (arquivo.type === "application/pdf" || /\.pdf$/i.test(arquivo.name)) return arquivo.size > MAX_BYTES ? "tamanho" : arquivo;
  if (arquivo.type.startsWith("image/") || /\.(jpe?g|png|webp|heic|heif)$/i.test(arquivo.name)) {
    try {
      const f = await reduzirFoto(arquivo);
      return f.size > MAX_BYTES ? "tamanho" : f;
    } catch {
      return "tipo"; // navegador não leu a imagem (ex.: HEIC fora do Safari)
    }
  }
  return "tipo";
}

export async function enviarAnexo(conversaId: string, arquivo: File): Promise<boolean> {
  const f = new FormData();
  f.set("conversaId", conversaId);
  f.set("arquivo", arquivo);
  try {
    const res = await fetch("/api/anexo", { method: "POST", body: f });
    return res.ok;
  } catch {
    return false;
  }
}
