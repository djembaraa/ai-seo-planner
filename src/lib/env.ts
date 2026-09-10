const requiredEnvVars = ["GOOGLE_GENERATIVE_AI_API_KEY"] as const;

export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  return { valid: missing.length === 0, missing };
}

export function getEnvStatus(): { configured: boolean; missing: string[] } {
  const { valid, missing } = validateEnv();
  return { configured: valid, missing };
}
