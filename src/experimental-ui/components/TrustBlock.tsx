import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { clients } from "@/data/company";
import { useIsMobile } from "../lib/useIsMobile";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import type { AccordionGalleryItem } from "../vendor/AccordionGallery";
import { RevealBlock } from "./RevealBlock";
import { RevealText } from "./RevealText";

// Lazy so GSAP + the gallery only load once a visitor is near this section
// (the mount is gated on the same near-viewport check below), and only on
// desktop — mobile never needs it, see below.
const AccordionGallery = lazy(() => import("../vendor/AccordionGallery"));

/**
 * "Trusted across…" — the partner-logo display is the React Bits
 * AccordionGallery (hover-to-expand panels, GSAP, grayscale → colour) on
 * desktop, and a stack of independently-cycling rows on mobile.
 *
 * There are 21 real client logos. Desktop groups them into pages of ~10–11 so
 * roughly that many panels are visible side by side at once, auto-rotating
 * between pages every ~4.8s (every client appears; none are dropped). Mobile
 * doesn't try to cram many thin panels into a narrow viewport — instead it
 * shows a vertical stack of 5 rows, each independently cycling through the
 * full set of logos on its own staggered timer (crossfade, never in sync
 * with the others), so the stack always reads as "alive" rather than one
 * static card. Tapping a row expands it, echoing the desktop accordion's
 * hover-to-expand panels.
 *
 * The vendored AccordionGallery defaults to a grayscale + dark-overlay
 * treatment tuned for photography, which makes inactive company logos read
 * as nearly invisible. We turn grayscale off and lighten the overlay via
 * props (see `overlayColor`/`grayscale` below — no vendor edits), and give
 * every logo a light backing card via `.exp-trust-accordion` in
 * experimental.css so logos with transparent or dark-on-transparent art stay
 * legible against the panel's dark background in both the active and
 * inactive state.
 *
 * Rotation pauses on hover, when the tab is hidden, and while off-screen.
 * prefers-reduced-motion: no rotation and no GSAP motion — a plain static
 * grid of all 21 logos instead, on every breakpoint.
 */

const ROTATE_MS = 4800;
const ACCORDION_H = 460;

const ITEMS: AccordionGalleryItem[] = clients.map((c) => ({
  image: c.logoSrc,
  label: c.name,
  alt: `${c.name} logo`,
}));

/** Split into as-even-as-possible pages of roughly `target` panels each. */
function paginate<T>(arr: T[], target: number): T[][] {
  const pageCount = Math.max(1, Math.ceil(arr.length / target));
  const base = Math.floor(arr.length / pageCount);
  const extra = arr.length % pageCount;
  const out: T[][] = [];
  let idx = 0;
  for (let p = 0; p < pageCount; p++) {
    const size = base + (p < extra ? 1 : 0);
    out.push(arr.slice(idx, idx + size));
    idx += size;
  }
  return out;
}

// Target ~9-10 panels visible per frame on desktop. With 21 logos this lands
// on 2 pages of 11 and 10 — the closest even split to that count (a target of
// 9 or 10 would instead force 3 pages of 7, undershooting the request).
const PAGES = paginate(ITEMS, 11);
const PAGE_COUNT = PAGES.length;

function Heading() {
  return (
    <RevealBlock className="max-w-2xl text-center">
      <h2 className="exp-display exp-display-lg">
        <RevealText text="Trusted across India's power-critical industries" />
      </h2>
    </RevealBlock>
  );
}

// ── Mobile: 5 independently-cycling rows ────────────────────────────────────
const ROW_COUNT = 5;
const MOBILE_STAGE_H = 380;

// Same "expand fraction of the stack" idea as the desktop accordion's
// expandRatio (0.32 there): the tapped row grows to take roughly this share
// of the total height, the rest split the remainder evenly.
const ROW_EXPAND_RATIO = 0.5;
const ROW_EXPAND_GROW = (ROW_EXPAND_RATIO * (ROW_COUNT - 1)) / (1 - ROW_EXPAND_RATIO);

interface TrustLogoRowProps {
  rowIndex: number;
  rotating: boolean;
  expanded: boolean;
  onToggle: () => void;
}

/**
 * One row of the mobile stack. Cycles through every client logo on its own
 * timer: each row starts at a different logo (spread evenly across the set)
 * and its first tick is delayed by a `rowIndex`-based fraction of ROTATE_MS,
 * so the 5 rows' crossfades stay permanently out of phase with each other
 * instead of changing all at once.
 */
function TrustLogoRow({ rowIndex, rotating, expanded, onToggle }: TrustLogoRowProps) {
  const [index, setIndex] = useState(() => Math.floor((rowIndex * clients.length) / ROW_COUNT));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!rotating) return;
    const delay = startedRef.current ? ROTATE_MS : rowIndex * Math.round(ROTATE_MS / ROW_COUNT);
    const t = window.setTimeout(() => {
      startedRef.current = true;
      setIndex((i) => (i + 1) % clients.length);
    }, delay);
    return () => window.clearTimeout(t);
  }, [rotating, index, rowIndex]);

  const current = clients[index];

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={current ? `${current.name} — tap to expand` : undefined}
      className="exp-trust-row relative block w-full overflow-hidden rounded-xl bg-[#0a0713] text-left"
      style={{ flexGrow: expanded ? ROW_EXPAND_GROW : 1 }}
    >
      {clients.map((c, i) => (
        <span
          key={c.name}
          className="exp-fade-layer absolute inset-1.5 flex items-center justify-center rounded-lg bg-[#f7f4ee] px-3"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i === index ? undefined : true}
        >
          <img
            src={c.logoSrc}
            alt={i === index ? `${c.name} logo` : ""}
            loading={rowIndex === 0 && i === 0 ? "eager" : "lazy"}
            className="h-auto max-h-full w-auto max-w-full object-contain py-1"
          />
        </span>
      ))}
      {expanded && current && (
        <span className="exp-mono absolute bottom-2 left-3 z-[2] text-[10px] font-semibold tracking-wide text-white/90">
          {current.name}
        </span>
      )}
    </button>
  );
}

export function TrustBlock() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const canRotate = !reduced && entered && inView && !docHidden && !hovered;
  const rotating = canRotate && !isMobile && PAGE_COUNT > 1;
  const mobileRotating = canRotate && isMobile && ITEMS.length > 1;

  // Mount the gallery only once the section is near the viewport; keep a live
  // on-screen flag for pausing the rotation.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        const vis = Boolean(e?.isIntersecting);
        setInView(vis);
        if (vis) setEntered(true);
      },
      { threshold: 0.15, rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const t = window.setTimeout(() => {
      setPrev(page);
      setPage((p) => (p + 1) % PAGE_COUNT);
    }, ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [rotating, page]);

  // drop the outgoing page once its fade-out has finished
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), 650);
    return () => window.clearTimeout(t);
  }, [prev]);

  // ── prefers-reduced-motion: static grid, all 21, no motion ──────────────────
  if (reduced) {
    return (
      <section className="exp-sec-light-2 exp-trust-bg py-24 sm:py-28">
        <div className="container-page flex flex-col items-center gap-10">
          <Heading />
          <RevealBlock
            distance={30}
            className="exp-trust-box grid w-full max-w-5xl grid-cols-2 gap-4 p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-4"
          >
            {clients.map((c) => (
              <div key={c.name} className="flex items-center justify-center rounded-xl bg-white/70 p-5">
                <img
                  src={c.logoSrc}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-full object-contain opacity-80"
                />
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>
    );
  }

  return (
    <section className="exp-sec-light-2 exp-trust-bg py-24 sm:py-28">
      <div className="container-page flex flex-col items-center gap-10">
        <Heading />
        <RevealBlock
          distance={30}
          className={`exp-trust-box w-full p-3 sm:p-4 ${isMobile ? "max-w-sm" : "max-w-6xl"}`}
        >
          <div
            ref={frameRef}
            className="relative"
            style={{ minHeight: isMobile ? MOBILE_STAGE_H : ACCORDION_H }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {entered && isMobile && (
              <div className="flex flex-col gap-2" style={{ height: MOBILE_STAGE_H }}>
                {Array.from({ length: ROW_COUNT }, (_, i) => (
                  <TrustLogoRow
                    key={i}
                    rowIndex={i}
                    rotating={mobileRotating}
                    expanded={expandedRow === i}
                    onToggle={() => setExpandedRow((r) => (r === i ? null : i))}
                  />
                ))}
              </div>
            )}

            {entered && !isMobile && (
              <Suspense fallback={null}>
                {prev !== null && prev !== page && (
                  <div
                    key={`p-${prev}`}
                    className="exp-accfade-out pointer-events-none absolute inset-0"
                  >
                    <AccordionGallery
                      items={PAGES[prev]}
                      height={ACCORDION_H}
                      defaultIndex={2}
                      grayscale={false}
                      overlayColor="rgba(8, 6, 20, 0.42)"
                      expandRatio={0.32}
                      className="exp-trust-accordion"
                    />
                  </div>
                )}
                <div key={`c-${page}`} className="exp-accfade-in">
                  <AccordionGallery
                    items={PAGES[page]}
                    height={ACCORDION_H}
                    defaultIndex={2}
                    grayscale={false}
                    overlayColor="rgba(8, 6, 20, 0.42)"
                    expandRatio={0.32}
                    className="exp-trust-accordion"
                  />
                </div>
              </Suspense>
            )}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
