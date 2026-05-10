import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price?: number, priceLabel?: string, isPriceOnRequest?: boolean): string {
  if (isPriceOnRequest || !price) return priceLabel || 'Sur devis';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
