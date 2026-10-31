import type { Locale } from "@/lib/i18n";

/* ============================================================
   TEXTOS DO CHAT (PT / EN / ES)
   Saudação, aviso de privacidade e o roteiro automático usado
   quando a IA não está disponível.
   ============================================================ */

export type Opcao = { valor: string; rotulo: string };

export type TextosChat = {
  botao: string;
  titulo: string;
  subtitulo: string;
  saudacao: string;
  sugestoesIniciais: string[];
  placeholder: string;
  enviar: string;
  fechar: string;
  digitando: string;
  whatsapp: string;
  whatsappRodape: string;
  mensagemWhatsapp: (resumo: string) => string;
  consentimento: { texto: string; aceitar: string; recusar: string; recusado: string; recusadoSemWhats: string };
  erroEnvio: string;
  final: string;
  // versões usadas quando o WhatsApp está desligado no portal
  finalSemWhats: string;
  validacao: { email: string; telefone: string };
  roteiro: {
    servico: { pergunta: string; opcoes: Opcao[] };
    descricao: { pergunta: string };
    cidade: { pergunta: string };
    prazo: { pergunta: string; opcoes: Opcao[] };
    nome: { pergunta: string };
    empresa: { pergunta: string; pular: string };
    email: { pergunta: string };
    telefone: { pergunta: string };
  };
};

const servicos = {
  pt: ["Energia", "Construção", "Performance e automação", "P&D / inovação", "Outro"],
  en: ["Energy", "Construction", "Performance & automation", "R&D / innovation", "Other"],
  es: ["Energía", "Construcción", "Performance y automatización", "I+D / innovación", "Otro"],
};
const codigosServico = ["energia", "construcao", "performance", "pd", "outro"];
const opcoesServico = (l: Locale): Opcao[] => servicos[l].map((rotulo, i) => ({ valor: codigosServico[i], rotulo }));

export const textosChat: Record<Locale, TextosChat> = {
  pt: {
    botao: "Fale com a BD7D",
    titulo: "Assistente BD7D",
    subtitulo: "Engenharia · Energia · Performance",
    saudacao: "Olá! Sou o assistente da BD7D Solutions. Conte em poucas palavras o que você precisa — projeto, obra, energia ou automação — que eu te ajudo a encaminhar.",
    sugestoesIniciais: ["Quero reduzir o custo de energia", "Preciso de um projeto de SPDA", "Vou construir ou reformar um galpão", "Quero automatizar minha operação"],
    placeholder: "Escreva sua mensagem…",
    enviar: "Enviar",
    fechar: "Fechar",
    digitando: "digitando…",
    whatsapp: "Continuar no WhatsApp",
    whatsappRodape: "Prefere WhatsApp? Fale direto conosco",
    mensagemWhatsapp: (r) => `Olá, vim pelo chat do site da BD7D.${r ? ` ${r}` : ""}`,
    consentimento: {
      texto: "Para um especialista entrar em contato, vou pedir alguns dados (nome, empresa, e-mail e telefone). Eles serão usados só pela BD7D Solutions para responder ao seu pedido, conforme a LGPD. Você concorda?",
      aceitar: "Concordo",
      recusar: "Prefiro não informar",
      recusado: "Sem problemas! Se preferir, fale direto com a nossa equipe pelo WhatsApp.",
      recusadoSemWhats: "Sem problemas! Se preferir, use o formulário de contato no fim da página ou escreva para admin@bd7d.com.",
    },
    erroEnvio: "Não consegui enviar agora. Tente de novo ou fale conosco pelo WhatsApp.",
    final: "Obrigado! Recebemos suas informações e um especialista da BD7D vai entrar em contato em breve. Se quiser adiantar, é só chamar no WhatsApp.",
    finalSemWhats: "Obrigado! Recebemos suas informações e um especialista da BD7D vai entrar em contato em breve.",
    validacao: { email: "Esse e-mail parece incompleto. Pode conferir?", telefone: "Informe o telefone com DDD, por favor." },
    roteiro: {
      servico: { pergunta: "Com qual área podemos te ajudar?", opcoes: opcoesServico("pt") },
      descricao: { pergunta: "Conte rapidamente o que você precisa." },
      cidade: { pergunta: "Em qual cidade fica o projeto ou a sua empresa?" },
      prazo: {
        pergunta: "Para quando você precisa?",
        opcoes: [
          { valor: "Imediato", rotulo: "O quanto antes" },
          { valor: "Até 3 meses", rotulo: "Até 3 meses" },
          { valor: "3 a 6 meses", rotulo: "3 a 6 meses" },
          { valor: "Só pesquisando", rotulo: "Só pesquisando" },
        ],
      },
      nome: { pergunta: "Qual é o seu nome?" },
      empresa: { pergunta: "E o nome da sua empresa?", pular: "Sou pessoa física" },
      email: { pergunta: "Qual e-mail podemos usar para enviar a proposta?" },
      telefone: { pergunta: "E um telefone ou WhatsApp com DDD?" },
    },
  },
  en: {
    botao: "Talk to BD7D",
    titulo: "BD7D Assistant",
    subtitulo: "Engineering · Energy · Performance",
    saudacao: "Hi! I'm the BD7D Solutions assistant. Tell me briefly what you need — design, construction, energy or automation — and I'll help route your request.",
    sugestoesIniciais: ["I want to cut energy costs", "I need a lightning protection design", "I'm building or retrofitting a facility", "I want to automate my operation"],
    placeholder: "Type your message…",
    enviar: "Send",
    fechar: "Close",
    digitando: "typing…",
    whatsapp: "Continue on WhatsApp",
    whatsappRodape: "Prefer WhatsApp? Talk to us directly",
    mensagemWhatsapp: (r) => `Hi, I came from the BD7D website chat.${r ? ` ${r}` : ""}`,
    consentimento: {
      texto: "So a specialist can get back to you, I'll ask for a few details (name, company, email and phone). BD7D Solutions will use them only to reply to your request, in line with data protection laws (LGPD/GDPR). Do you agree?",
      aceitar: "I agree",
      recusar: "I'd rather not",
      recusado: "No problem! If you prefer, talk to our team directly on WhatsApp.",
      recusadoSemWhats: "No problem! If you prefer, use the contact form at the bottom of the page or email admin@bd7d.com.",
    },
    erroEnvio: "I couldn't send that right now. Please try again or reach us on WhatsApp.",
    final: "Thank you! We've received your details and a BD7D specialist will contact you shortly. To speed things up, message us on WhatsApp.",
    finalSemWhats: "Thank you! We've received your details and a BD7D specialist will contact you shortly.",
    validacao: { email: "That email looks incomplete. Could you check it?", telefone: "Please include the full phone number with area code." },
    roteiro: {
      servico: { pergunta: "Which area can we help you with?", opcoes: opcoesServico("en") },
      descricao: { pergunta: "Briefly tell us what you need." },
      cidade: { pergunta: "In which city is the project or your company?" },
      prazo: {
        pergunta: "When do you need it?",
        opcoes: [
          { valor: "Immediately", rotulo: "As soon as possible" },
          { valor: "Within 3 months", rotulo: "Within 3 months" },
          { valor: "3 to 6 months", rotulo: "3 to 6 months" },
          { valor: "Just researching", rotulo: "Just researching" },
        ],
      },
      nome: { pergunta: "What's your name?" },
      empresa: { pergunta: "And your company name?", pular: "I'm an individual" },
      email: { pergunta: "Which email should we send the proposal to?" },
      telefone: { pergunta: "And a phone or WhatsApp number (with country/area code)?" },
    },
  },
  es: {
    botao: "Habla con BD7D",
    titulo: "Asistente BD7D",
    subtitulo: "Ingeniería · Energía · Performance",
    saudacao: "¡Hola! Soy el asistente de BD7D Solutions. Cuéntame en pocas palabras qué necesitas — proyecto, obra, energía o automatización — y te ayudo a encaminarlo.",
    sugestoesIniciais: ["Quiero reducir el costo de energía", "Necesito un proyecto de pararrayos", "Voy a construir o reformar una nave", "Quiero automatizar mi operación"],
    placeholder: "Escribe tu mensaje…",
    enviar: "Enviar",
    fechar: "Cerrar",
    digitando: "escribiendo…",
    whatsapp: "Continuar en WhatsApp",
    whatsappRodape: "¿Prefieres WhatsApp? Habla directo con nosotros",
    mensagemWhatsapp: (r) => `Hola, vengo del chat del sitio de BD7D.${r ? ` ${r}` : ""}`,
    consentimento: {
      texto: "Para que un especialista te contacte, voy a pedirte algunos datos (nombre, empresa, correo y teléfono). BD7D Solutions los usará solo para responder a tu solicitud, conforme a la normativa de protección de datos. ¿Estás de acuerdo?",
      aceitar: "Estoy de acuerdo",
      recusar: "Prefiero no informarlos",
      recusado: "¡Sin problema! Si prefieres, habla directo con nuestro equipo por WhatsApp.",
      recusadoSemWhats: "¡Sin problema! Si prefieres, usa el formulario de contacto al final de la página o escribe a admin@bd7d.com.",
    },
    erroEnvio: "No pude enviarlo ahora. Inténtalo de nuevo o contáctanos por WhatsApp.",
    final: "¡Gracias! Recibimos tus datos y un especialista de BD7D se pondrá en contacto pronto. Si quieres adelantar, escríbenos por WhatsApp.",
    finalSemWhats: "¡Gracias! Recibimos tus datos y un especialista de BD7D se pondrá en contacto pronto.",
    validacao: { email: "Ese correo parece incompleto. ¿Puedes revisarlo?", telefone: "Indica el teléfono completo con código de área, por favor." },
    roteiro: {
      servico: { pergunta: "¿En qué área podemos ayudarte?", opcoes: opcoesServico("es") },
      descricao: { pergunta: "Cuéntanos brevemente qué necesitas." },
      cidade: { pergunta: "¿En qué ciudad está el proyecto o tu empresa?" },
      prazo: {
        pergunta: "¿Para cuándo lo necesitas?",
        opcoes: [
          { valor: "Inmediato", rotulo: "Lo antes posible" },
          { valor: "Hasta 3 meses", rotulo: "Hasta 3 meses" },
          { valor: "3 a 6 meses", rotulo: "3 a 6 meses" },
          { valor: "Solo investigando", rotulo: "Solo investigando" },
        ],
      },
      nome: { pergunta: "¿Cómo te llamas?" },
      empresa: { pergunta: "¿Y el nombre de tu empresa?", pular: "Soy persona física" },
      email: { pergunta: "¿A qué correo podemos enviarte la propuesta?" },
      telefone: { pergunta: "¿Y un teléfono o WhatsApp con código de área?" },
    },
  },
};
