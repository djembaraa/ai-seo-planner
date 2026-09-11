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

[Live Demo: ai-seo-planner.vercel.app](https://ai-seo-planner.vercel.app/)

## Features

- 🎯 **Search Intent Analysis** — Classifies intent (Informational / Commercial / Transactional / Navigational) with user persona insights
- 🗝️ **Keyword Clustering** — Generates 8–12 primary related keywords and 8–12 long-tail phrases with search volume tiers
- 💡 **Content Ideas & Titles** — Produces 5 content ideas with format, compelling title (under 60 chars), and a value hook
- 📝 **Content Outline** — Detailed H2/H3 pillar article structure with word count, internal linking, and featured snippet notes
- 🏷 **Meta Data** — Optimized title tag, meta description, URL slug, Open Graph fields, and schema type recommendations
- ⚡ **Real-time Streaming** — Results stream token by token directly to the UI with no full-page reload
- 🕒 **Recent Searches** — Persists the last 3 keywords locally for quick re-generation
- 🛡️ **Authentication** — Secure login and session management via Clerk
- 🧱 **Distributed Rate Limiting** — Upstash Redis rate limiter with strict quota limits
- 👁️ **Observability** — Sentry error and performance instrumentation
- ✅ **Input Validation** — Server-side Zod schema with sanitization strips dangerous characters before reaching the model

## 🛠️ Tech Stack & Architecture Details

This project is built with a modern, production-ready stack focused on performance, developer experience, and scalability.

### 1. **Next.js (App Router)**
- **Purpose**: The core React framework powering both the frontend UI and the backend API routes.
- **Why we use it**: Next.js provides seamless Server-Side Rendering (SSR), edge-compatible API routes, and advanced routing out of the box. The App Router architecture makes it incredibly easy to structure the application components.
- **Plus Points**: Phenomenal performance, excellent built-in SEO capabilities, and deep integration with Vercel for zero-config deployments.

### 2. **Tailwind CSS v4**
- **Purpose**: A utility-first CSS framework for styling the application.
- **Why we use it**: Eliminates the need to write custom CSS classes and prevents context switching. It allows us to build responsive, beautiful, and consistent UI directly within our React components.
- **Plus Points**: Extremely fast development speed, tiny production build size, and a highly customizable design system without the bloat of traditional CSS.

### 3. **Google Gemini API & Vercel AI SDK**
- **Purpose**: The "brain" of the application. Gemini (`gemini-2.5-flash`) handles the complex SEO strategy generation, while Vercel AI SDK handles the streaming to the client.
- **Why we use it**: Gemini provides incredibly fast and high-quality language generation. Vercel AI SDK abstracts away the complexities of handling Server-Sent Events (SSE) and stream chunking.
- **Plus Points**: Real-time typing effects for users (low perceived latency), highly structured SEO outputs, and a magical user experience.

### 4. **Clerk**
- **Purpose**: Complete user authentication and identity management.
- **Why we use it**: Building secure authentication from scratch is time-consuming and risky. Clerk handles sign-ups, logins, session management, and bot protection (via Cloudflare Turnstile) out of the box.
- **Plus Points**: Beautiful pre-built UI components (`<SignIn />`, `<UserButton />`), drop-in integration, and enterprise-grade security.

### 5. **Upstash Redis**
- **Purpose**: Distributed rate limiting for the API.
- **Why we use it**: AI APIs are expensive. We use Upstash to strictly rate-limit server IP requests to prevent spam and abuse.
- **Plus Points**: Serverless-friendly, ultra-low latency, and requires zero infrastructure management.

### 6. **Formspree & Sentry**
- **Purpose**: Formspree handles contact form submissions, while Sentry provides application monitoring.
- **Why we use it**: Formspree allows us to receive user feedback without having to build a custom mailer backend. Sentry helps us catch and squash bugs before users even notice them.
- **Plus Points**: Easy integration, built-in spam filtering, and robust error tracking.

## Getting Started

### Prerequisites

- **Node.js** 20.9 or later (Node.js 22+ recommended)
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

Open `.env.local` and add your local values:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add your Clerk, Upstash, and Sentry variables if needed
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
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
│   ├── copy-button.tsx         # Clipboard copy with visual feedback
│   ├── section-icon.tsx        # Shared section icon renderer
│   └── site-footer.tsx         # Global attribution footer
└── lib/
    ├── constants.ts            # Shared UI and section constants
    ├── parse-seo.ts            # Markdown section parser and tag extractor
    ├── prompts.ts              # AI system prompt
    ├── rate-limit.ts           # Upstash limiter and development fallback
    ├── auth.ts                 # Clerk authentication and tenant identity
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
- `413 Payload Too Large` — Request body exceeds the 10 KB limit
- `415 Unsupported Media Type` — Request is not JSON
- `401 Unauthorized` — Clerk authentication required
- `429 Too Many Requests` — Rate limit exceeded
- `503 Service Unavailable` — Local provider configuration is absent or unavailable
- `500 Internal Server Error` — Missing or invalid server configuration

The endpoint caps AI output at 5,000 tokens and cancels generation after 55 seconds or when the client disconnects.

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
2. Add `GOOGLE_GENERATIVE_AI_API_KEY`, Clerk publishable/secret keys, Upstash REST URL/token, and `SENTRY_DSN` in the project settings
3. Add `NEXT_PUBLIC_SITE_URL` with the production URL, for example `https://your-domain.com`
4. Deploy — Vercel handles the rest

### Self-hosted

```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Built with Next.js, Vercel AI SDK, and Google Gemini
</div>
