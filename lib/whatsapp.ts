import { siteConfig, whatsappMessages } from '@/data/site';

export function buildWhatsAppUrl(message: string): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function getWhatsAppUrl(context: 'default' | 'customRequest'): string {
  return buildWhatsAppUrl(whatsappMessages[context]);
}

export function getProductWhatsAppUrl(productName: string): string {
  return buildWhatsAppUrl(whatsappMessages.product(productName));
}

export function getPackWhatsAppUrl(packName: string): string {
  return buildWhatsAppUrl(whatsappMessages.pack(packName));
}
