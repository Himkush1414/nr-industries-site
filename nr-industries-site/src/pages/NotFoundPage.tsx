import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function NotFoundPage() {
  useDocumentMeta("Page Not Found", "The page you're looking for doesn't exist.");

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="font-heading text-6xl font-bold text-navy-950">404</span>
      <h1 className="font-heading text-2xl font-bold text-navy-950">Page Not Found</h1>
      <p className="max-w-md text-sm text-ink-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center rounded bg-navy-800 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-700"
      >
        Back to Home
      </Link>
    </section>
  );
}
