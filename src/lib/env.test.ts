import { describe, expect, it } from "vitest";
import {
  hasClerkConfiguration,
  hasUpstashConfiguration,
  validateEnterpriseEnv,
} from "./env";

describe("enterprise environment configuration", () => {
  it("reports missing enterprise variables without exposing values", () => {
    const original = { ...process.env };
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.SENTRY_DSN;

    const result = validateEnterpriseEnv();

    expect(result.valid).toBe(false);
    expect(result.missing).toEqual([
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      "CLERK_SECRET_KEY",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
      "SENTRY_DSN",
    ]);

    for (const key of Object.keys(process.env)) delete process.env[key];
    Object.assign(process.env, original);
  });

  it("requires both values for provider adapters", () => {
    const original = { ...process.env };
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "publishable-test";
    delete process.env.CLERK_SECRET_KEY;
    process.env.UPSTASH_REDIS_REST_URL = "https://redis.test";
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    expect(hasClerkConfiguration()).toBe(false);
    expect(hasUpstashConfiguration()).toBe(false);

    for (const key of Object.keys(process.env)) delete process.env[key];
    Object.assign(process.env, original);
  });
});