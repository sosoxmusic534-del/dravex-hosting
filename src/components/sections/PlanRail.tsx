import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * Sideways plan carousel: arrow buttons, mouse drag, touch swipe and snap.
 * Uses the shared .mc-rail styles from MinecraftPage.css.
 */
export default function PlanRail({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const update = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 6);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  // fade the cards in once the carousel scrolls into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    const t = setTimeout(update, 400); // after images / fonts settle
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, [children]);

  const slide = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".mc-plan");
    const start = el.scrollLeft;
    const step = (card?.offsetWidth ?? 292) + 18;
    const target = start + dir * step;
    const ms = 900;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    const frame = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      el.scrollLeft = start + (target - start) * ease(p);
      if (p < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  /* mouse drag (touch already scrolls natively) */
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = railRef.current!;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      railRef.current!.classList.add("is-dragging");
    }
    if (d.moved) railRef.current!.scrollLeft = d.startLeft - dx;
  };
  const up = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    railRef.current!.classList.remove("is-dragging");
    // let the click that ends a drag be ignored
    if (d.moved) setTimeout(() => (d.moved = false), 0);
  };

  return (
    <div className="mc-rail-wrap" ref={wrapRef}>
      <div
        className="mc-rail"
        ref={railRef}
        onScroll={update}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children}
      </div>

      {canPrev && (
        <button type="button" className="mc-rail-btn mc-rail-prev" onClick={() => slide(-1)} aria-label="Previous plans">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
      {canNext && (
        <button type="button" className="mc-rail-btn mc-rail-next" onClick={() => slide(1)} aria-label="More plans">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}