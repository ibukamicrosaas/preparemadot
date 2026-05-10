import { NextRequest } from 'next/server';

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function rateLimit(
  req: NextRequest,
  options: { limit: number; windowMs: number }
): { ok: boolean; remaining: number } {
  const ip = getIP(req);
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, remaining: options.limit - 1 };
  }

  if (entry.count >= options.limit) {
    return { ok: false, remaining: 0 };
  }

  entry.count++;
  return { ok: true, remaining: options.limit - entry.count };
}

export function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
