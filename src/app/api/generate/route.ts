import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { generateRequestSchema } from "@/lib/validation";
import { validateEnv } from "@/lib/env";
import { SEO_SYSTEM_PROMPT } from "@/lib/prompts";
import {
  getRateLimitKey,
  checkRateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

export const maxDuration = 60;
const MAX_BODY_BYTES = 10_000;

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

class RequestBodyTooLargeError extends Error {}

async function readJsonBody(req: Request): Promise<unknown> {
  if (!req.body) return JSON.parse(await req.text());

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RequestBodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bodyBytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bodyBytes));
}

export async function POST(req: Request) {
  const env = validateEnv();
  if (!env.valid) {
    return jsonError(
      `Server misconfiguration: missing ${env.missing.join(", ")}`,
      500
    );
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return jsonError("Content-Type must be application/json", 415);
  }

  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Request body is too large", 413);
  }

  let body: unknown;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return jsonError("Request body is too large", 413);
    }
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = generateRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return jsonError(firstError.message, 400);
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

  const { keyword } = parsed.data;
  const timeoutSignal = AbortSignal.timeout(55_000);
  const signal = AbortSignal.any([req.signal, timeoutSignal]);
  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SEO_SYSTEM_PROMPT,
    prompt: `Create a comprehensive SEO content plan for the keyword: ${JSON.stringify(keyword)}`,
    temperature: 0.7,
    maxOutputTokens: 5000,
    abortSignal: signal,
  });

  return result.toTextStreamResponse({ headers });
}
