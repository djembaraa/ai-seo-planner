<div align="center">

# AI SEO Planner

**AI-powered SEO content strategy — streamed in real time.**

Generate comprehensive SEO plans including search intent analysis, keyword clusters, content outlines, and meta data — all from a single target keyword.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Overview

AI SEO Planner is a full-stack web application that turns a single keyword into a production-ready SEO content strategy. It uses **Google Gemini 2.5 Flash** via the Vercel AI SDK to stream structured Markdown output in real time, parsed and rendered into an interactive dashboard.

## Features

- 🔍 **Search Intent Analysis** — Classifies intent (Informational / Commercial / Transactional / Navigational) with user persona insights
- 🏷️ **Keyword Clustering** — Generates 8–12 primary related keywords and 8–12 long-tail phrases with search volume tiers
- 💡 **Content Ideas & Titles** — Produces 5 content ideas with format, compelling title (under 60 chars), and a value hook
- 📄 **Content Outline** — Detailed H2/H3 pillar article structure with word count, internal linking, and featured snippet notes
- 🧬 **Meta Data** — Optimized title tag, meta description, URL slug, Open Graph fields, and schema type recommendations
- ⚡ **Real-time Streaming** — Results stream token by token directly to the UI with no full-page reload
- 🕐 **Recent Searches** — Persists the last 5 keywords locally for quick re-generation
- 🛡️ **Rate Limiting** — Built-in IP-based rate limiter (10 requests / 60 s) with standard `X-RateLimit-*` response headers
- ✅ **Input Validation** — Server-side Zod schema with sanitization strips dangerous characters before reaching the model

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| AI / Streaming | [Vercel AI SDK](https://sdk.vercel.ai) + [@ai-sdk/google](https://www.npmjs.com/package/@ai-sdk/google) |
| Model | Google Gemini 2.5 Flash |
| Validation | [Zod v4](https://zod.dev) |
| Markdown | [marked](https://marked.js.org) |
| Testing | [Vitest](https://vitest.dev) |

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- A free **Google Gemini API key** → [Get one at Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/djembaraa/ai-seo-planner.git
cd ai-seo-planner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your API key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts        # POST /api/generate — streaming AI endpoint
│   ├── page.tsx                # Root page with streaming state management
│   ├── layout.tsx              # Root layout, metadata, and web manifest
│   └── globals.css             # Global styles and Tailwind base
├── components/
│   ├── hero-section.tsx        # Keyword input form with recent searches
│   ├── result-dashboard.tsx    # Parsed section renderer with tag cloud
│   ├── markdown-section.tsx    # Individual section card with copy button
│   ├── result-skeleton.tsx     # Loading skeleton shown while waiting for first chunk
│   ├── tag-cloud.tsx           # Keyword tag pill display
│   └── copy-button.tsx         # Clipboard copy with visual feedback
└── lib/
    ├── parse-seo.ts            # Markdown section parser and tag extractor
    ├── rate-limit.ts           # In-memory IP-based rate limiter
    ├── validation.ts           # Zod request schema
    ├── env.ts                  # Environment variable validation
    └── use-recent-searches.ts  # localStorage hook for recent keywords
```

## API Reference

### `POST /api/generate`

Streams an SEO content plan as plain text (Markdown).

**Request body**

```json
{
  "keyword": "content marketing strategy"
}
```

| Field | Type | Constraints |
|---|---|---|
| `keyword` | `string` | Required · 1–200 characters · sanitized |

**Response**

- `200 OK` — `text/plain` stream (chunked transfer encoding)
- `400 Bad Request` — Invalid or empty keyword
- `429 Too Many Requests` — Rate limit exceeded (10 req / 60 s per IP)
- `500 Internal Server Error` — Missing or invalid server configuration

**Rate limit headers**

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1234567890
```

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Create production build
npm run start        # Run production server
npm run lint         # Run ESLint
npm run test         # Run Vitest test suite
npm run test:watch   # Run Vitest in watch mode
```

## Running Tests

```bash
npm run test
```

Unit tests cover the SEO section parser (`parse-seo.ts`), rate limiter (`rate-limit.ts`), and input validation schema (`validation.ts`).

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/djembaraa/ai-seo-planner)

1. Click the button above or import the repository in the [Vercel dashboard](https://vercel.com/new)
2. Add the environment variable `GOOGLE_GENERATIVE_AI_API_KEY` in the project settings
3. Deploy — Vercel handles the rest

### Self-hosted

```bash
npm run build
npm run start
```

Set `GOOGLE_GENERATIVE_AI_API_KEY` in your hosting environment before starting.

> **Note:** The built-in rate limiter uses in-process memory and resets on server restart. For production deployments with multiple instances, replace it with a distributed store (e.g., Redis via Upstash).

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Built with Next.js, Vercel AI SDK, and Google Gemini
</div>
