import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 shadow-primary-md mb-2">
        <span className="text-lg font-black text-white">GK</span>
      </div>
      <h1 className="text-4xl font-bold text-neutral-900">Gokwik Design System</h1>
      <p className="text-neutral-500 text-center max-w-sm">
        Production-ready components built from the Figma design system.
      </p>
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        <Link
          href="/styleguide"
          className="rounded-lg bg-primary-500 px-6 py-3 text-white font-semibold hover:bg-primary-600 transition-colors shadow-primary-sm"
        >
          View Style Guide
        </Link>
        <Link
          href="/store"
          className="rounded-lg border-2 border-primary-400 px-6 py-3 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
        >
          🛍️ Demo Store
        </Link>
      </div>
    </main>
  );
}
