export const WHATSAPP_NUMBER = "5592981649981";
export const EMAIL = "admin@bd7d.com";
export const LINKEDIN = "https://www.linkedin.com/company/bd7d-solutions/";

export const whatsappLink = (mensagem?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;
