import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-amber-accent text-sm font-semibold tracking-widest uppercase mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-ink mb-2">Page not found</h1>
        <p className="text-stone-muted text-sm mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-accent hover:bg-amber-hover text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
