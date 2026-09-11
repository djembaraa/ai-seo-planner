import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, getRateLimitKey, rateLimitHeaders } from "./rate-limit";

function makeRequest(ip: string = "127.0.0.1"): Request {
  return new Request("http://localhost/api/generate", {
    headers: { "x-forwarded-for": ip },
  });
}

describe("getRateLimitKey", () => {
  it("extracts IP from x-forwarded-for header", () => {
    const req = makeRequest("10.0.0.1");
    expect(getRateLimitKey(req)).toBe("10.0.0.1");
  });

  it("handles multiple IPs in x-forwarded-for", () => {
    const req = new Request("http://localhost/api/generate", {
      headers: { "x-forwarded-for": "10.0.0.1, 10.0.0.2" },
    });
    expect(getRateLimitKey(req)).toBe("10.0.0.1");
  });

  it("returns 'unknown' when no header present", () => {
    const req = new Request("http://localhost/api/generate");
    expect(getRateLimitKey(req)).toBe("unknown");
  });

  it("prefers the hosting platform address", () => {
    const req = new Request("http://localhost/api/generate", {
      headers: {
        "x-vercel-forwarded-for": "192.0.2.10",
        "x-forwarded-for": "198.51.100.20",
      },
    });
    expect(getRateLimitKey(req)).toBe("192.0.2.10");
  });

  it("rejects malformed forwarded identities", () => {
    const req = new Request("http://localhost/api/generate", {
      headers: { "x-forwarded-for": "not-an-ip" },
    });
    expect(getRateLimitKey(req)).toBe("unknown");
  });
});

describe("checkRateLimit", () => {
  beforeEach(() => {
    // Each test uses a unique key to avoid cross-test interference
  });

  it("allows first request", () => {
    const result = checkRateLimit("test-first-" + Math.random());
    expect(result.limited).toBe(false);
    expect(result.remaining).toBe(9);
  });

  it("tracks remaining requests", () => {
    const key = "test-track-" + Math.random();
    checkRateLimit(key);
    checkRateLimit(key);
    const result = checkRateLimit(key);
    expect(result.remaining).toBe(7);
  });

  it("limits after 10 requests", () => {
    const key = "test-limit-" + Math.random();
    for (let i = 0; i < 10; i++) {
      checkRateLimit(key);
    }
    const result = checkRateLimit(key);
    expect(result.limited).toBe(true);
    expect(result.remaining).toBe(0);
  });
});

describe("rateLimitHeaders", () => {
  it("returns correct header shape", () => {
    const headers = rateLimitHeaders(7, Date.now() + 60000);
    expect(headers["X-RateLimit-Limit"]).toBe("10");
    expect(headers["X-RateLimit-Remaining"]).toBe("7");
    expect(headers["X-RateLimit-Reset"]).toBeDefined();
  });
});
