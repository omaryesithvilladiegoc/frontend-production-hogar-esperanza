const WHATSAPP_PHONE_E164 = "573013743729";
const WHATSAPP_DISPLAY_PHONE = "+57 301 3743729";
const WHATSAPP_DONATION_MESSAGE =
  "Hola, quiero apoyar a Hogar Esperanza y recibir información para hacer una donación.";

const WHATSAPP_DONATION_URL = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(
  WHATSAPP_DONATION_MESSAGE,
)}`;

const buildWhatsAppMessageUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`;

export {
  buildWhatsAppMessageUrl,
  WHATSAPP_DONATION_URL,
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_PHONE_E164,
  WHATSAPP_DONATION_MESSAGE,
};
