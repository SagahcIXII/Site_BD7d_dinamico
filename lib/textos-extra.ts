import type { Locale } from "@/lib/i18n";

/* Textos das partes novas do site: formulário de contato, página
   de case, política de privacidade e botões sem WhatsApp. */
export type TextosExtra = {
  form: {
    eyebrow: string;
    titulo: string;
    texto: string;
    nome: string;
    empresa: string;
    email: string;
    telefone: string;
    mensagem: string;
    consentimento: string;
    politica: string;
    enviar: string;
    enviando: string;
    ok: string;
    erro: string;
    obrigatorio: string;
    anexos: string;
    anexosDica: string;
    remover: string;
    anexoRecusado: string;
    anexoFalhou: string;
  };
  cases: { verCase: string; voltar: string; resultado: string; outros: string };
  privacidade: { titulo: string; link: string; voltar: string };
  falar: string;
};

export const textosExtra: Record<Locale, TextosExtra> = {
  pt: {
    form: {
      eyebrow: "Contato",
      titulo: "Prefere deixar uma mensagem?",
      texto: "Preencha seus dados e retornamos por e-mail ou telefone.",
      nome: "Nome",
      empresa: "Empresa (opcional)",
      email: "E-mail",
      telefone: "Telefone / WhatsApp",
      mensagem: "Mensagem",
      consentimento: "Concordo que a BD7D Solutions use estes dados para responder ao meu contato, conforme a",
      politica: "política de privacidade",
      enviar: "Enviar mensagem",
      enviando: "Enviando…",
      ok: "Mensagem enviada! Retornaremos em breve.",
      erro: "Não foi possível enviar agora. Tente de novo em instantes.",
      obrigatorio: "Preencha nome, e-mail ou telefone, a mensagem e aceite o uso dos dados.",
      anexos: "Anexar arquivos (opcional)",
      anexosDica: "Fatura de energia, fotos do local, projeto… PDF ou imagem, até 5 arquivos de 4 MB.",
      remover: "Remover",
      anexoRecusado: "Use PDF ou imagem de até 4 MB (máximo 5 arquivos).",
      anexoFalhou: "A mensagem foi enviada, mas algum anexo não chegou. Se precisar, envie por e-mail.",
    },
    cases: { verCase: "Ver o case completo", voltar: "← Voltar aos cases", resultado: "Resultado", outros: "Outros cases" },
    privacidade: { titulo: "Política de privacidade", link: "Política de privacidade", voltar: "← Voltar ao site" },
    falar: "Fale com a BD7D",
  },
  en: {
    form: {
      eyebrow: "Contact",
      titulo: "Prefer to leave a message?",
      texto: "Leave your details and we'll get back to you by email or phone.",
      nome: "Name",
      empresa: "Company (optional)",
      email: "Email",
      telefone: "Phone / WhatsApp",
      mensagem: "Message",
      consentimento: "I agree that BD7D Solutions may use this data to reply to my inquiry, under the",
      politica: "privacy policy",
      enviar: "Send message",
      enviando: "Sending…",
      ok: "Message sent! We'll get back to you shortly.",
      erro: "We couldn't send it right now. Please try again in a moment.",
      obrigatorio: "Please fill in your name, email or phone, the message, and accept the data use.",
      anexos: "Attach files (optional)",
      anexosDica: "Energy bill, site photos, drawings… PDF or image, up to 5 files of 4 MB.",
      remover: "Remove",
      anexoRecusado: "Use a PDF or image up to 4 MB (5 files max).",
      anexoFalhou: "Your message was sent, but an attachment didn't arrive. If needed, send it by email.",
    },
    cases: { verCase: "Read the full case", voltar: "← Back to case studies", resultado: "Result", outros: "More case studies" },
    privacidade: { titulo: "Privacy policy", link: "Privacy policy", voltar: "← Back to the site" },
    falar: "Talk to BD7D",
  },
  es: {
    form: {
      eyebrow: "Contacto",
      titulo: "¿Prefiere dejar un mensaje?",
      texto: "Complete sus datos y le respondemos por correo o teléfono.",
      nome: "Nombre",
      empresa: "Empresa (opcional)",
      email: "Correo",
      telefone: "Teléfono / WhatsApp",
      mensagem: "Mensaje",
      consentimento: "Acepto que BD7D Solutions use estos datos para responder a mi contacto, conforme a la",
      politica: "política de privacidad",
      enviar: "Enviar mensaje",
      enviando: "Enviando…",
      ok: "¡Mensaje enviado! Le responderemos pronto.",
      erro: "No fue posible enviarlo ahora. Inténtelo de nuevo en unos instantes.",
      obrigatorio: "Complete nombre, correo o teléfono, el mensaje y acepte el uso de los datos.",
      anexos: "Adjuntar archivos (opcional)",
      anexosDica: "Factura de energía, fotos del lugar, proyecto… PDF o imagen, hasta 5 archivos de 4 MB.",
      remover: "Quitar",
      anexoRecusado: "Use PDF o imagen de hasta 4 MB (máximo 5 archivos).",
      anexoFalhou: "El mensaje fue enviado, pero algún adjunto no llegó. Si lo necesita, envíelo por correo.",
    },
    cases: { verCase: "Ver el caso completo", voltar: "← Volver a los casos", resultado: "Resultado", outros: "Otros casos" },
    privacidade: { titulo: "Política de privacidad", link: "Política de privacidad", voltar: "← Volver al sitio" },
    falar: "Habla con BD7D",
  },
};
