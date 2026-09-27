import { useEffect, useRef } from "react";

/**
 * /lab/lv16 — shared "conveyor belt" marquee: an auto-scrolling, seamlessly
 * looping, right-to-left track that pauses and follows the pointer while
 * dragged, then resumes auto-scroll from wherever it was released. Used by
 * the Industries images, Products, and company-logos sections — each with
 * its own `speed`/`gap`, but the exact same drag/loop mechanics, so there is
 * only one place this behavior is implemented.
 *
 * The track renders `items` twice back-to-back (via `renderItem`) so that
 * once the scroll position has advanced by exactly one copy's width, it can
 * wrap by that same amount with no visible seam — the classic doubled-track
 * marquee technique, driven here by a real per-frame position (not a CSS
 * `animation`) so it can be paused/offset by pointer input.
 */
export function DraggableMarquee<T>({
  items,
  renderItem,
  speed = 40,
  gap = 24,
  className,
  ariaLabel,
}: {
  items: T[];
  renderItem: (item: T, copy: 0 | 1, index: number) => React.ReactNode;
  /** Auto-scroll speed in pixels per second (right-to-left). */
  speed?: number;
  gap?: number;
  className?: string;
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const startXRef = useRef(0);
  const movedRef = useRef(false);

  function applyTransform() {
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
  }

  function wrap() {
    const half = halfWidthRef.current;
    if (half <= 0) return;
    // Keep position within a single copy-width band so it can wrap
    // seamlessly however far a drag pushes it in either direction.
    positionRef.current = ((positionRef.current % half) + half) % half - half;
  }

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      halfWidthRef.current = track.scrollWidth / 2;
    }
    measure();
    const id = window.setTimeout(measure, 150); // after images/fonts settle
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number;
    let lastTime: number | null = null;

    function tick(time: number) {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (!draggingRef.current && !reducedMotion) {
        positionRef.current -= speed * dt;
        wrap();
        applyTransform();
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    movedRef.current = false;
    lastXRef.current = e.clientX;
    startXRef.current = e.clientX;
    // Deliberately NOT calling setPointerCapture here. Capturing on every
    // pointerdown (including a plain click) causes the browser to
    // re-target the resulting "click" event to THIS element instead of
    // whatever was actually under the cursor (a "View Product" link,
    // say) — confirmed live: the click event's target became this div,
    // so the link's own navigation never fired. Capture is deferred to
    // onPointerMove, once a real drag is confirmed.
  }

  // A real click's mousedown-to-mouseup almost never lands on the exact
  // same pixel — a few px of natural hand/trackpad jitter is normal and
  // must still count as a click, not a drag. Comparing each event's delta
  // to a tiny threshold (as an earlier version of this did) flags that
  // jitter as "moved" and silently swallows the click via onClickCapture
  // below. Comparing TOTAL displacement from the pointerdown origin to a
  // real drag-sized threshold (the same ~8-10px most drag/carousel
  // libraries use) fixes that while still suppressing click-through after
  // an actual drag.
  const CLICK_VS_DRAG_THRESHOLD_PX = 8;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    if (!movedRef.current && Math.abs(e.clientX - startXRef.current) > CLICK_VS_DRAG_THRESHOLD_PX) {
      movedRef.current = true;
      // Only capture once a real drag is confirmed (see the onPointerDown
      // comment above) — this keeps tracking the pointer smoothly even if
      // it leaves the marquee's own bounds mid-drag.
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    positionRef.current += dx;
    wrap();
    applyTransform();
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  // Dragging shouldn't also fire click-through on the image/card beneath
  // the pointer — only suppress it when the pointer actually moved past
  // the click-vs-drag threshold above.
  function onClickCapture(e: React.MouseEvent) {
    if (movedRef.current) e.preventDefault();
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      style={{
        overflow: "hidden",
        cursor: "grab",
        touchAction: "pan-y",
        WebkitUserSelect: "none",
        userSelect: "none",
        maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
      }}
    >
      <div ref={trackRef} style={{ display: "flex", width: "max-content", gap: `${gap}px`, willChange: "transform" }}>
        {items.map((item, i) => (
          <div key={`a-${i}`} style={{ flexShrink: 0 }}>
            {renderItem(item, 0, i)}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`b-${i}`} aria-hidden="true" style={{ flexShrink: 0 }}>
            {renderItem(item, 1, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
