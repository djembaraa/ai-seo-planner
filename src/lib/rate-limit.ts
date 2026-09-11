import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { hasUpstashConfiguration } from "@/lib/env";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
export const RATE_LIMIT_LIMIT = RATE_LIMIT_MAX_REQUESTS;

let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 5 * 60_000;

function cleanup(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}

export function getRateLimitKey(req: Request): string {
  const forwarded =
    req.headers.get("x-vercel-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for");
  const candidate = forwarded?.split(",")[0]?.trim() || "unknown";

  if (
    candidate === "unknown" ||
    /^(?:\d{1,3}\.){3}\d{1,3}$/.test(candidate) ||
    /^[0-9a-f:]+$/i.test(candidate)
  ) {
    return candidate;
  }

  return "unknown";
}

export function getTenantRateLimitKey(
  req: Request,
  identity: { orgId?: string | null; userId: string }
): string {
  const orgPart = identity.orgId ? `org:${identity.orgId}:` : '';
  return `${orgPart}user:${identity.userId}:ip:${getRateLimitKey(req)}`;
}

export function checkRateLimit(key: string): {
  limited: boolean;
  remaining: number;
  resetAt: number;
} {
  cleanup();

  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return {
      limited: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { limited: true, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    limited: false,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

export function rateLimitHeaders(
  remaining: number,
  resetAt: number
): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };
}

export async function checkDistributedRateLimit(key: string): Promise<{
  limited: boolean;
  remaining: number;
  resetAt: number;
}> {
  if (!hasUpstashConfiguration()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Upstash rate limiting is not configured");
    }

    return checkRateLimit(key);
  }

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, "60 s"),
    prefix: "ai-seo-planner",
  });
  const result = await ratelimit.limit(key);

  return {
    limited: !result.success,
    remaining: result.remaining,
    resetAt: result.reset,
  };
}
