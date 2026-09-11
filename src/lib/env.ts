export const REQUIRED_ENVIRONMENT_VARIABLES = [
  "GOOGLE_GENERATIVE_AI_API_KEY",
] as const;

export const ENTERPRISE_ENVIRONMENT_VARIABLES = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "SENTRY_DSN",
] as const;

export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  for (const key of REQUIRED_ENVIRONMENT_VARIABLES) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  return { valid: missing.length === 0, missing };
}

export function validateEnterpriseEnv(): { valid: boolean; missing: string[] } {
  const missing = ENTERPRISE_ENVIRONMENT_VARIABLES.filter(
    (key) => !process.env[key]
  );

  return { valid: missing.length === 0, missing: [...missing] };
}

export function hasClerkConfiguration(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY
  );
}

export function hasUpstashConfiguration(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

