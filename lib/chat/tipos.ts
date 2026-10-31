/* Tipos e regras compartilhados entre o chat (navegador) e as rotas
   /api/chat e /api/lead (servidor). */

export const camposLead = ["nome", "empresa", "email", "telefone", "cidade", "servico", "descricao", "prazo", "porte"] as const;
export type Campo = (typeof camposLead)[number];
export type Dados = Partial<Record<Campo, string>>;

export type Mensagem = { de: "visitante" | "bot"; texto: string };

/* Limites contra abuso (também conferidos no servidor). */
export const LIMITES = { mensagens: 40, caracteres: 800 };

export const emailValido = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v.trim());
export const telefoneValido = (v: string) => v.replace(/\D/g, "").length >= 10;

/* Ordem das perguntas do roteiro automático. "consentimento" fica
   antes dos dados pessoais. */
export const etapasRoteiro = ["servico", "descricao", "cidade", "prazo", "consentimento", "nome", "empresa", "email", "telefone"] as const;
export type EtapaRoteiro = (typeof etapasRoteiro)[number];

export const camposPessoais: Campo[] = ["nome", "empresa", "email", "telefone"];

/* Próxima pergunta do roteiro, pulando o que já se sabe (inclusive o
   que a IA já coletou antes de cair para o roteiro). */
export function proximaEtapa(dados: Dados, consentimento: boolean | null, empresaPulada: boolean): EtapaRoteiro | "fim" {
  for (const e of etapasRoteiro) {
    if (e === "consentimento") {
      if (consentimento === null) return e;
      continue;
    }
    if (e === "empresa" && empresaPulada) continue;
    if (!dados[e]) return e;
  }
  return "fim";
}

/* Lead completo = já dá para a equipe retornar. */
export const leadCompleto = (d: Dados) => Boolean(d.nome && (d.email || d.telefone) && (d.descricao || d.servico));

export function transcricao(msgs: Mensagem[], max = 3000) {
  const t = msgs.map((m) => `${m.de === "visitante" ? "Visitante" : "Assistente"}: ${m.texto}`).join("\n");
  return t.length > max ? `…${t.slice(-max)}` : t;
}
