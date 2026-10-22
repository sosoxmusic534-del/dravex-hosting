import { useEffect, useRef, type ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeatureCards from "../components/sections/FeatureCards";
import { DISCORD_URL, SUPPORT_EMAIL, fmtLkr } from "../data/minecraftPlans";
import { RUST_PLANS, rustMinPrice } from "../data/rustPlans";
import "./MinecraftPage.css"; // shared page styles
import "./RustPage.css";

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

const CHIPS = ["DDoS protection", "Singapore location", "NVMe storage", "24/7 support"];

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const IconRam = () => <Ico><rect x="3" y="8" width="18" height="8" rx="1.5" /><path d="M7 11v2M11 11v2M15 11v2M7 16v2M12 16v2M17 16v2" /></Ico>;
const IconDrive = () => <Ico><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M7 15h.01M11 15h6" /></Ico>;
const IconShield = () => <Ico><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></Ico>;
const IconPin = () => <Ico><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></Ico>;
const IconArrow = () => <Ico><path d="M5 12h14M13 6l6 6-6 6" /></Ico>;

export default function RustPage({ onOpenGames }: { onOpenGames: () => void }) {
  const plansHead = useInView<HTMLDivElement>();
  const plansGrid = useInView<HTMLDivElement>();
  const perksHead = useInView<HTMLDivElement>();
  const ctaRef = useInView<HTMLDivElement>();

  useEffect(() => {
    document.title = "Rust Server Hosting | DraveX Host";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mc rust">
      {/* ================= HERO ================= */}
      <section className="mc-hero">
        <div className="mc-hero-bg" aria-hidden="true">
          <i className="mc-slash mc-slash-1" />
          <i className="mc-slash mc-slash-2" />
          <i className="mc-slash mc-slash-3" />
          <div className="mc-hero-glow" />
          {Array.from({ length: 12 }).map((_, i) => (
            <b
              key={i}
              style={{
                left: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 7) * -1.4}s`,
                animationDuration: `${9 + (i % 4) * 2}s`,
              }}
            />
          ))}
        </div>

        <Navbar onOpenGames={onOpenGames} />

        <div className="mc-hero-inner">
          <div className="mc-hero-text">
            <nav className="mc-crumbs rise d1" aria-label="Breadcrumb">
              <a href="/">Home</a><span>/</span><a href="/#games">Games</a><span>/</span><b>Rust</b>
            </nav>

            <span className="mc-eyebrow rise d1"><i /> Rust hosting</span>

            <h1 className="rise d2">
              Rust server hosting,
              <span className="mc-italic">
                {rustMinPrice ? (
                  <> (from <em>LKR {fmtLkr(rustMinPrice)}</em>)</>
                ) : (
                  <> (built for <em>wipe day</em>)</>
                )}
              </span>
            </h1>

            <p className="mc-lead rise d3">
              Run your own Rust server with DDoS protection, hosted in Singapore. Pick the RAM you need and order through Discord.
            </p>

            <div className="mc-actions rise d4">
              <a href="#plans" className="mc-btn">View plans <span>↓</span></a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-btn mc-btn-ghost">Order on Discord</a>
            </div>

            <ul className="mc-chips rise d5">
              {CHIPS.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div className="mc-hero-art rise d3" aria-hidden="true">
            <div className="mc-art-disc" />
            <img src="/images/rust/hero-character.webp" alt="" />
            <div className="mc-float mc-float-1"><i /> Online</div>
            <div className="mc-float mc-float-2">
              {rustMinPrice ? <>From <b>LKR {fmtLkr(rustMinPrice)}</b> / month</> : <>Hosted in <b>Singapore</b></>}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className="mc-sec" id="plans">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={plansHead}>
            <span className="mc-eyebrow"><i /> Plans</span>
            <h2>
              Choose your plan,
              <span className="mc-italic"> (<em>Budget</em> or Prime)</span>
            </h2>
            <p>Pick the RAM your server needs. Budget plans are great to start with, and Prime plans give you more room.</p>
          </div>

          <div className="mc-rail-wrap mc-reveal" ref={plansGrid}>
            <div className="mc-rail">
              {RUST_PLANS.map((p, i) => (
                <article
                  className={`mc-plan ${p.popular ? "is-popular" : ""}`}
                  key={p.id}
                  style={{ "--accent": p.accent, "--i": i } as React.CSSProperties}
                >
                  {p.popular && <span className="mc-ribbon"><b>Popular</b></span>}

                  <header className="mc-plan-top">
                    <img className="mc-plan-icon rust-plan-icon" src={p.icon} alt="" />
                    <h3>{p.tier}</h3>
                  </header>

                  <div className="mc-plan-ram-big">
                    {p.gb}<small>GB RAM</small>
                  </div>

                  <div className="mc-plan-price">
                    {p.price !== null ? <>LKR {fmtLkr(p.price)}<span>/mo</span></> : <span className="rust-ask">Ask us for a price</span>}
                  </div>
                  {p.tagline && <p className="mc-plan-tag">{p.tagline}</p>}

                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-deploy">
                    {p.price !== null ? "Deploy now" : "Get a quote"} <IconArrow />
                  </a>

                  <ul className="mc-specs">
                    <li className="mc-spec-ram"><IconRam />{p.gb}GB RAM</li>
                    <li><IconDrive />NVMe Storage</li>
                    <li><IconShield />DDoS Protection</li>
                    <li><IconPin />Singapore location</li>
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <p className="mc-foot">
            Orders and support run through Discord. Prefer email? Write to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </section>

      {/* ================= INCLUDED ================= */}
      <section className="mc-sec mc-sec-alt">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={perksHead}>
            <span className="mc-eyebrow"><i /> Included</span>
            <h2>
              Every plan comes with
              <span className="mc-italic"> (<em>all</em> of this)</span>
            </h2>
          </div>

          <FeatureCards only={["DDoS protection", "Instant setup", "24/7 support", "Singapore servers"]} cols={2} />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mc-cta-sec">
        <div className="mc-inner">
          <div className="mc-cta mc-reveal" ref={ctaRef}>
            <div className="mc-cta-in rust-cta">
              <h2>Ready to start your Rust server?</h2>
              <p>Pick a plan and message us on Discord. We'll help you get set up.</p>
              <div className="mc-actions">
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-btn">Order on Discord <span>→</span></a>
                <a href="#plans" className="mc-btn mc-btn-ghost">See plans again</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}