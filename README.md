# AI SEO Planner 🚀

[Live Demo: ai-seo-planner.vercel.app](https://ai-seo-planner.vercel.app/)

AI SEO Planner is a modern, AI-powered web application designed to generate comprehensive SEO content strategies in seconds. By simply entering a target keyword, users receive deep search intent analysis, keyword clusters, content outlines, and metadata—all streamed in real-time.

---

## 🛠️ Tech Stack & Architecture

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
- **Why we use it**: AI APIs are expensive. We use Upstash to limit users to exactly 3 free generations (tracking via local state) and strictly rate-limit server IP requests to prevent spam and abuse.
- **Plus Points**: Serverless-friendly, ultra-low latency, and requires zero infrastructure management.

### 6. **Formspree & Sentry**
- **Purpose**: Formspree handles contact form submissions, while Sentry provides application monitoring.
- **Why we use it**: Formspree allows us to receive user feedback without having to build a custom mailer backend. Sentry helps us catch and squash bugs before users even notice them.
- **Plus Points**: Easy integration, built-in spam filtering, and robust error tracking.

---

## 💻 Running Locally

Follow these steps to get the project running on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-seo-planner.git
cd ai-seo-planner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a new `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

You will need to populate the `.env.local` file with the following credentials:
- **Clerk Keys**: Get these from your [Clerk Dashboard](https://dashboard.clerk.com/).
- **Google Gemini API Key**: Get this from [Google AI Studio](https://aistudio.google.com/).
- **Upstash Redis Keys**: Get these from the [Upstash Console](https://console.upstash.com/).

*Note: Sentry and Formspree IDs are optional for local development.*

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running. You can start editing the pages by modifying files inside the `src/app` directory. The page will auto-update as you edit the file.

---

## 📄 License
This project is created for educational and portfolio purposes.
