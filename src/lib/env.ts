export const REQUIRED_ENVIRONMENT_VARIABLES = [
  "GOOGLE_GENERATIVE_AI_API_KEY",
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

