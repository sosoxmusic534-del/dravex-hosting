import { useEffect, useRef, useState } from "react";
import "./Faq.css";

/** Adds .is-visible once the element scrolls into view */
function useInView<T extends HTMLElement>() {
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/* ---------------------------------------------------------
   EDIT THESE: your Discord invite
--------------------------------------------------------- */
const DISCORD_URL = "#"; // <- put your Discord invite link here

type Item = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

/*
  EDIT THE ANSWERS so they match your real policies.
  The ones marked CHECK depend on how you actually run things
  (payments, upgrades, refunds), so confirm them before launch.
*/
const ITEMS: Item[] = [
  {
    q: "How fast will my server be ready?",
    a: "Most servers are ready within minutes of your order being confirmed. If yours takes longer than that, message us on Discord and we'll look into it straight away.", // CHECK
  },
  {
    q: "Where are your servers located?",
    a: "Our servers are in Singapore, which gives stable connections for players in Sri Lanka and across Asia. You can run a live ping test from your own connection to see how it feels.",
    link: { label: "Run the ping test", href: "#locations" },
  },
  {
    q: "Which games and apps can I host?",
    a: "We host Minecraft, Rust and FiveM servers, Node.js and Python apps, and V2Ray. Some games are still coming soon, and the Games section always shows what is available right now.",
    link: { label: "See all games", href: "#games" },
  },
  {
    q: "How does DDoS protection work?",
    a: "Attack traffic is filtered before it reaches your server, so your players stay connected and your game stays online even when someone tries to knock it over.",
  },
  {
    q: "Can I install mods and plugins?",
    a: "Yes. You can install modpacks, plugins and different versions from the panel in one click, with no manual setup needed.",
  },
  {
    q: "How do I pay?",
    a: "All plans are priced in LKR with no surprise invoices. Message us on Discord and we'll show you the payment methods available and help you complete your order.", // CHECK
  },
  {
    q: "Can I upgrade my plan later?",
    a: "If you need more resources as your community grows, message our team on Discord and we'll help you move to a bigger plan.", // CHECK
  },
  {
    q: "Do you offer refunds?",
    a: "If something isn't working, contact support first and we'll do our best to fix it. Our refund terms are written out on our Refund Policy page.", // CHECK
  },
  {
    q: "How do I get help if something goes wrong?",
    a: "Join our Discord and message the team. Real people answer there, at any time of day.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const headRef = useInView<HTMLDivElement>();
  const listRef = useInView<HTMLDivElement>();

  return (
    <section className="fq" id="faq">
      <div className="fq-bg" aria-hidden="true">
        <i className="fq-slash fq-slash-1" />
        <i className="fq-slash fq-slash-2" />
        <i className="fq-slash fq-slash-3" />
      </div>

      <div className="fq-inner">
        {/* ---------- left ---------- */}
        <div className="fq-left fq-reveal" ref={headRef}>
          <span className="fq-eyebrow"><i /> FAQ</span>
          <h2>
            Questions,
            <span className="fq-italic"> (<em>answered</em>)</span>
          </h2>
          <p>Quick answers to the things people ask us most. Can't find yours? Just ask.</p>

          <div className="fq-help">
            <div className="fq-help-in">
              <h3>Still need help?</h3>
              <p>Our team is on Discord and happy to help.</p>
              <a href={DISCORD_URL} className="fq-btn">Chat on Discord <span>→</span></a>
            </div>
          </div>
        </div>

        {/* ---------- accordion ---------- */}
        <div className="fq-list fq-reveal" ref={listRef}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`fq-item ${isOpen ? "is-open" : ""}`} key={item.q} style={{ "--i": i } as React.CSSProperties}>
                <h3>
                  <button
                    type="button"
                    className="fq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`fq-panel-${i}`}
                    id={`fq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="fq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="fq-q">{item.q}</span>
                    <span className="fq-icon" aria-hidden="true"><i /><i /></span>
                  </button>
                </h3>
                <div className="fq-panel" id={`fq-panel-${i}`} role="region" aria-labelledby={`fq-btn-${i}`}>
                  <div className="fq-panel-in">
                    <p>{item.a}</p>
                    {item.link && (
                      <a href={item.link.href} className="fq-link">
                        {item.link.label} <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}