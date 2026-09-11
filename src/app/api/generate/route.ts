import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { generateRequestSchema } from "@/lib/validation";
import { validateEnv } from "@/lib/env";
import {
  getRateLimitKey,
  checkRateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

export const maxDuration = 60;
const MAX_BODY_BYTES = 10_000;

const SYSTEM_PROMPT = `You are an expert SEO content strategist. Given a target keyword, produce a comprehensive SEO content plan.

Return your response in clean Markdown with these exact sections:

## Search Intent

State the primary search intent (Informational, Commercial, Transactional, or Navigational) and explain why users search for this. Include the typical user persona.

## Related Keywords

Provide two groups as comma-separated tags:

**Primary Related Keywords** (8-12 terms): closely related variations with estimated search volume tier (High/Medium/Low).

**Long-tail Keywords** (8-12 phrases): question-based, comparison, and modifier phrases with clear search intent.

## Content Ideas & Titles

Provide 5 content ideas. Format every idea exactly as one numbered list item with these three separate lines:
1. **Title:** A compelling title under 60 characters
  **Format:** Guide, Listicle, Comparison, Tutorial, or Case Study
  **Hook:** One sentence explaining the value
Leave a line break after each label/value line so Title, Format, and Hook never appear as one paragraph.

## Content Outline

Create a detailed H2/H3 outline for the primary pillar article. Include:
- Suggested word count range
- Key points under each heading
- Internal linking opportunities
- Featured snippet optimization notes

## Meta Data

Provide optimized:
- **Title Tag** (under 60 characters)
- **Meta Description** (under 155 characters)
- **URL Slug**
- **Open Graph Title** (under 90 characters)
- **Open Graph Description**
- **Primary Schema Types** to implement (e.g., Article, Product, LocalBusiness)

Be specific, actionable, and data-informed. Use real-world examples where possible.`;

function jsonError(
  message: string,
  status: number,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

export async function POST(req: Request) {
  const env = validateEnv();
  if (!env.valid) {
    return jsonError(
      `Server misconfiguration: missing ${env.missing.join(", ")}`,
      500
    );
  }

  const rateKey = getRateLimitKey(req);
  const { limited, remaining, resetAt } = checkRateLimit(rateKey);
  const headers = rateLimitHeaders(remaining, resetAt);

  if (limited) {
    return jsonError(
      "Too many requests. Please wait a moment and try again.",
      429,
      headers
    );
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return jsonError("Content-Type must be application/json", 415, headers);
  }

  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Request body is too large", 413, headers);
  }

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonError("Request body is too large", 413, headers);
    }
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("Invalid JSON body", 400, headers);
  }

  const parsed = generateRequestSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return jsonError(firstError.message, 400, headers);
  }

  const { keyword } = parsed.data;

  const timeoutSignal = AbortSignal.timeout(55_000);
  const signal = AbortSignal.any([req.signal, timeoutSignal]);
  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    prompt: `Create a comprehensive SEO content plan for the keyword: "${keyword}"`,
    temperature: 0.7,
    abortSignal: signal,
  });

  return result.toTextStreamResponse({ headers });
}
