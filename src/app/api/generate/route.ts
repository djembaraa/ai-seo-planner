import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 60;

const MAX_KEYWORD_LENGTH = 200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

function sanitizeKeyword(input: string): string {
  return input
    .replace(/[<>{}[\]\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_KEYWORD_LENGTH);
}

const SYSTEM_PROMPT = `You are an expert SEO content strategist. Given a target keyword, produce a comprehensive SEO content plan.

Return your response in clean Markdown with these exact sections:

## Search Intent

State the primary search intent (Informational, Commercial, Transactional, or Navigational) and explain why users search for this. Include the typical user persona.

## Related Keywords

Provide two groups as comma-separated tags:

**Primary Related Keywords** (8-12 terms): closely related variations with estimated search volume tier (High/Medium/Low).

**Long-tail Keywords** (8-12 phrases): question-based, comparison, and modifier phrases with clear search intent.

## Content Ideas & Titles

Provide 5 content ideas with:
- A compelling title (under 60 chars)
- The content format (Guide, Listicle, Comparison, Tutorial, Case Study)
- A one-sentence hook explaining the value

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
- **Primary Schema Types** to implement (e.g., Article, FAQ, HowTo)

Be specific, actionable, and data-informed. Use real-world examples where possible.`;

export async function POST(req: Request) {
  const rateKey = getRateLimitKey(req);
  if (isRateLimited(rateKey)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const rawKeyword = (body as Record<string, unknown>)?.keyword;

  if (!rawKeyword || typeof rawKeyword !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing or invalid keyword" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const keyword = sanitizeKeyword(rawKeyword);

  if (keyword.length === 0) {
    return new Response(
      JSON.stringify({ error: "Keyword cannot be empty" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (keyword.length > MAX_KEYWORD_LENGTH) {
    return new Response(
      JSON.stringify({ error: `Keyword must be under ${MAX_KEYWORD_LENGTH} characters` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: SYSTEM_PROMPT,
    prompt: `Create a comprehensive SEO content plan for the keyword: "${keyword}"`,
    temperature: 0.7,
    maxTokens: 4096,
  });

  return result.toTextStreamResponse();
}
