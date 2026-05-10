type EventName =
  | 'whatsapp_click'
  | 'custom_request_submit'
  | 'pack_click'
  | 'product_view'
  | 'cta_click';

export function trackEvent(event: EventName, properties?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  // Placeholder — brancher Google Analytics / Plausible ici
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics]', event, properties);
  }
}
