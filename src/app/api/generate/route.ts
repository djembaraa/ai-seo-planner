import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 60;

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
  const { keyword } = await req.json();

  if (!keyword || typeof keyword !== "string") {
    return new Response("Missing keyword", { status: 400 });
  }

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: SYSTEM_PROMPT,
    prompt: `Create a comprehensive SEO content plan for the keyword: "${keyword.trim()}"`,
    temperature: 0.7,
    maxTokens: 4096,
  });

  return result.toTextStreamResponse();
}
