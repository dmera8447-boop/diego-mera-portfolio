import "server-only";

/**
 * Rate limit en memoria (sliding window, por IP).
 *
 * Cap: 5 envíos / 10 minutos / IP. Suficiente para un portafolio.
 *
 * Limitaciones conocidas (aceptables aquí):
 *  · En cold starts serverless el Map se reinicia → ventana puede resetearse.
 *  · No comparte estado entre instancias del runtime.
 * Para producción seria → Upstash Ratelimit + Redis.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt <= now) {
    const reset = now + WINDOW_MS;
    buckets.set(ip, { count: 1, resetAt: reset });
    return { ok: true, remaining: LIMIT - 1, resetAt: reset };
  }
  if (b.count >= LIMIT) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { ok: true, remaining: LIMIT - b.count, resetAt: b.resetAt };
}
