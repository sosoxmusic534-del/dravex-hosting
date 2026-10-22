import { useEffect, useRef } from "react";
import FeatureCards from "./FeatureCards";
import "./Features.css";

/** Adds .is-visible once the element scrolls into view */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

export default function Features() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section className="features" id="features">
      <div className="features-bg" aria-hidden="true">
        <i className="fs fs-1" />
        <i className="fs fs-2" />
        <i className="fs fs-3" />
        <i className="fs fs-4" />
      </div>

      <div className="features-inner">
        <div className="features-head reveal" ref={headRef}>
          <span className="features-eyebrow">
            <i /> Why DraveX
          </span>
          <h2>
            Everything your server needs,
            <span className="features-italic"> (<em>nothing</em> it doesn't)</span>
          </h2>
          <p>
            Fast hardware, real protection and people who answer. Simple hosting for Minecraft, Rust, Discord bots and more.
          </p>
        </div>

        <FeatureCards />
      </div>
    </section>
  );
}