import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeatureCards from "../components/sections/FeatureCards";
import PlanRail from "../components/sections/PlanRail";
import { DISCORD_URL, SUPPORT_EMAIL } from "../config/site";
import { fmtLkr } from "../data/minecraftPlans";
import { HYTALE_PLANS, HYTALE_ACCENT, HYTALE_CPU, hytaleMinPrice } from "../data/hytalePlans";
import "./MinecraftPage.css"; // shared page styles
import "./HytalePage.css";

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

const LOGO = "/assets/9a31cf9683-hytale-h.webp";
const ART = "/assets/ae3bf84a42-hytale.webp";
const CHIPS = ["Game DDoS protection", "Singapore location", "NVMe storage", "24/7 support"];

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const IconRam = () => <Ico><rect x="3" y="8" width="18" height="8" rx="1.5" /><path d="M7 11v2M11 11v2M15 11v2M7 16v2M12 16v2M17 16v2" /></Ico>;
const IconDrive = () => <Ico><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M7 15h.01M11 15h6" /></Ico>;
const IconChip = () => <Ico><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></Ico>;
const IconPort = () => <Ico><rect x="4" y="9" width="16" height="9" rx="2" /><path d="M8 9V6M12 9V6M16 9V6M8 13h.01M12 13h.01M16 13h.01" /></Ico>;
const IconShield = () => <Ico><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></Ico>;
const IconArrow = () => <Ico><path d="M5 12h14M13 6l6 6-6 6" /></Ico>;

/* what people run on it */
const USES = [
  {
    title: "Co-op worlds",
    text: "Explore, build and fight together with your friends on your own private server.",
    icon: <Ico><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 2.5 4.5" /></Ico>,
  },
  {
    title: "Community servers",
    text: "Open a public server and grow a community around your own world.",
    icon: <Ico><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></Ico>,
  },
  {
    title: "Mods & custom content",
    text: "Give your server its own rules, items and adventures.",
    icon: <Ico><path d="M10 4a2 2 0 1 1 4 0v1.5h3.5V9H19a2 2 0 1 1 0 4h-1.5v5.5H13V17a2 2 0 1 0-4 0v1.5H4.5V13H6a2 2 0 1 0 0-4H4.5V5.5H10V4Z" /></Ico>,
  },
  {
    title: "Minigames & events",
    text: "Host events and game modes for your players on a stable connection.",
    icon: <Ico><rect x="2.5" y="7" width="19" height="11" rx="5" /><path d="M7.5 10.5v4M5.5 12.5h4M15.5 11.5h.01M18 13.5h.01" /></Ico>,
  },
];

export default function HytalePage({ onOpenGames }: { onOpenGames: () => void }) {
  const plansHead = useInView<HTMLDivElement>();
  const usesHead = useInView<HTMLDivElement>();
  const usesGrid = useInView<HTMLDivElement>();
  const perksHead = useInView<HTMLDivElement>();
  const ctaRef = useInView<HTMLDivElement>();

  useEffect(() => {
    document.title = "Hytale Server Hosting | DraveX Host";
    window.scrollTo(0, 0);
  }, []);

  const hasPlans = HYTALE_PLANS.length > 0;

  return (
    <div className="mc hytale">
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
              <a href="/">Home</a><span>/</span><a href="/#games">Games</a><span>/</span><b>Hytale</b>
            </nav>

            <span className="mc-eyebrow rise d1"><i /> Hytale hosting</span>

            <h1 className="rise d2">
              Hytale server hosting,
              <span className="mc-italic">
                {hytaleMinPrice ? (
                  <> (from <em>LKR {fmtLkr(hytaleMinPrice)}</em>)</>
                ) : (
                  <> (for your <em>adventure</em>)</>
                )}
              </span>
            </h1>

            <p className="mc-lead rise d3">
              Host your own Hytale world with game DDoS protection, hosted in Singapore. Pick a plan and order through Discord.
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
            <img className="ht-hero-logo" src={ART} alt="" />
            <div className="mc-float mc-float-1"><i /> Online</div>
            <div className="mc-float mc-float-2">
              {hytaleMinPrice ? <>From <b>LKR {fmtLkr(hytaleMinPrice)}</b> / month</> : <>Hosted in <b>Singapore</b></>}
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
              <span className="mc-italic"> (<em>pay</em> in LKR)</span>
            </h2>
            <p>
              {hasPlans
                ? "Monthly plans with no surprise invoices. Pick the size that fits your world and your players."
                : "Tell us how big your community is and we'll recommend a Hytale plan and send you a price."}
            </p>
          </div>

          <PlanRail>
              {hasPlans ? (
                HYTALE_PLANS.map((p, i) => (
                  <article
                    className={`mc-plan ${p.popular ? "is-popular" : ""}`}
                    key={p.id}
                    style={{ "--accent": p.accent ?? HYTALE_ACCENT, "--i": i } as CSSProperties}
                  >
                    {p.popular && <span className="mc-ribbon"><b>Popular</b></span>}

                    <header className="mc-plan-top">
                      <img className="mc-plan-icon ht-plan-icon" src={LOGO} alt="" />
                      <h3>{p.name}</h3>
                    </header>

                    <div className="mc-plan-price">
                      {p.price !== null ? <>LKR {fmtLkr(p.price)}<span>/mo</span></> : <span className="ht-ask">Ask us for a price</span>}
                    </div>
                    {p.tagline && <p className="mc-plan-tag">{p.tagline}</p>}

                    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-deploy">
                      {p.price !== null ? "Deploy now" : "Get a quote"} <IconArrow />
                    </a>

                    <ul className="mc-specs">
                      <li className="mc-spec-ram"><IconChip />{p.cpu ?? HYTALE_CPU}</li>
                      {p.vcores !== undefined && <li><IconChip />{p.vcores} vCore{p.vcores === 1 ? "" : "s"}</li>}
                      {p.ram && <li><IconRam />{p.ram} DDR5 RAM</li>}
                      {p.storageGb !== undefined && <li><IconDrive />{p.storageGb}GB NVMe Storage</li>}
                      {p.ports !== undefined && <li><IconPort />{p.ports} Port Allocation{p.ports === 1 ? "" : "s"}</li>}
                      <li><IconShield />Game DDoS Protection</li>
                    </ul>
                  </article>
                ))
              ) : (
                <article className="mc-plan ht-quote" style={{ "--accent": HYTALE_ACCENT, "--i": 0 } as CSSProperties}>
                  <header className="mc-plan-top">
                    <img className="mc-plan-icon ht-plan-icon" src={LOGO} alt="" />
                    <h3>Custom</h3>
                  </header>

                  <div className="ht-quote-big">Tell us what you need</div>
                  <p className="mc-plan-tag ht-quote-text">
                    Share your player count and the mods you plan to use, and we'll recommend a size and send you a price in LKR.
                  </p>

                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-deploy">
                    Get a quote on Discord <IconArrow />
                  </a>

                  <ul className="mc-specs">
                    <li><IconDrive />NVMe Storage</li>
                                      </ul>
                </article>
              )}
          </PlanRail>

          <p className="mc-foot">
            Orders and support run through Discord. Prefer email? Write to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </section>

      {/* ================= WHAT YOU CAN RUN ================= */}
      <section className="mc-sec mc-sec-alt">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={usesHead}>
            <span className="mc-eyebrow"><i /> Play your way</span>
            <h2>
              What you can
              <span className="mc-italic"> (<em>do</em> with it)</span>
            </h2>
            <p>A Hytale server for every kind of group.</p>
          </div>

          <div className="ht-uses" ref={usesGrid}>
            {USES.map((u, i) => (
              <article className="ht-use" key={u.title} style={{ "--i": i } as CSSProperties}>
                <span className="ht-use-icon">{u.icon}</span>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INCLUDED ================= */}
      <section className="mc-sec">
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
            <div className="mc-cta-in">
              <h2>Ready to start your Hytale world?</h2>
              <p>Message us on Discord and tell us about your server. We'll help you get set up.</p>
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