export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Herbalife",
  whatsappPhone: process.env.WHATSAPP_PHONE ?? "",
} as const;

export function buildWhatsAppUrl(message: string): string | null {
  const phone = appConfig.whatsappPhone.replace(/\D/g, "");
  if (!phone) {
    return null;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
