import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-neutral-900">Design System</h1>
      <p className="text-neutral-500">Your single source of truth for design tokens.</p>
      <Link
        href="/styleguide"
        className="mt-4 rounded-lg bg-primary-500 px-6 py-3 text-white font-semibold hover:bg-primary-600 transition-colors"
      >
        View Style Guide
      </Link>
    </main>
  );
}
