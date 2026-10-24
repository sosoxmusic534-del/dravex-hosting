import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeatureCards from "../components/sections/FeatureCards";
import PlanRail from "../components/sections/PlanRail";
import { DISCORD_URL, SUPPORT_EMAIL } from "../config/site";
import { fmtLkr } from "../data/minecraftPlans";
import { NODE_PLANS, NODE_ACCENT, nodeMinPrice } from "../data/nodePlans";
import "./MinecraftPage.css"; // shared page styles
import "./NodePage.css";

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

const LOGO = "/assets/540bef7b39-nodejs-logo.webp";
const CHIPS = ["Node.js", "Python", "DDoS protection", "Singapore location"];

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const IconRam = () => <Ico><rect x="3" y="8" width="18" height="8" rx="1.5" /><path d="M7 11v2M11 11v2M15 11v2M7 16v2M12 16v2M17 16v2" /></Ico>;
const IconDrive = () => <Ico><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M7 15h.01M11 15h6" /></Ico>;
const IconChip = () => <Ico><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></Ico>;
const IconPort = () => <Ico><rect x="4" y="9" width="16" height="9" rx="2" /><path d="M8 9V6M12 9V6M16 9V6M8 13h.01M12 13h.01M16 13h.01" /></Ico>;
const IconCode = () => <Ico><path d="m8 8-4 4 4 4M16 8l4 4-4 4" /></Ico>;
const IconArrow = () => <Ico><path d="M5 12h14M13 6l6 6-6 6" /></Ico>;

/* what people run on it */
const USES = [
  {
    title: "Discord bots",
    text: "Keep your discord.js or discord.py bot online around the clock.",
    icon: <Ico><path d="M7 8.5c3-1.5 7-1.5 10 0M8 17c2.5 1 5.5 1 8 0M9 12.5h.01M15 12.5h.01" /><path d="M6 6.5 5 18l3 1.5M18 6.5 19 18l-3 1.5" /></Ico>,
  },
  {
    title: "Websites & APIs",
    text: "Host an Express, Fastify or Flask app, or a backend for your site.",
    icon: <Ico><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></Ico>,
  },
  {
    title: "Other bots",
    text: "Run Telegram bots and other chat or automation bots.",
    icon: <Ico><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5" /></Ico>,
  },
  {
    title: "Scripts & workers",
    text: "Run background jobs and scripts that need to stay on all the time.",
    icon: <Ico><path d="M8 8 4 12l4 4M16 8l4 4-4 4M13.5 6l-3 12" /></Ico>,
  },
];

export default function NodePage({ onOpenGames }: { onOpenGames: () => void }) {
  const plansHead = useInView<HTMLDivElement>();
  const usesHead = useInView<HTMLDivElement>();
  const usesGrid = useInView<HTMLDivElement>();
  const perksHead = useInView<HTMLDivElement>();
  const ctaRef = useInView<HTMLDivElement>();

  useEffect(() => {
    document.title = "Node.js & Python Hosting | DraveX Host";
    window.scrollTo(0, 0);
  }, []);

  const hasPlans = NODE_PLANS.length > 0;

  return (
    <div className="mc nodejs">
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
              <a href="/">Home</a><span>/</span><a href="/#games">Games</a><span>/</span><b>Node.js & Python</b>
            </nav>

            <span className="mc-eyebrow rise d1"><i /> App & bot hosting</span>

            <h1 className="rise d2">
              Node.js & Python hosting,
              <span className="mc-italic">
                {nodeMinPrice ? (
                  <> (from <em>LKR {fmtLkr(nodeMinPrice)}</em>)</>
                ) : (
                  <> (for your <em>bots</em> and apps)</>
                )}
              </span>
            </h1>

            <p className="mc-lead rise d3">
              Keep your Discord bot, API or website online 24/7 with DDoS protection, hosted in Singapore. Tell us what you are running and order through Discord.
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
            <img className="nd-hero-logo" src={LOGO} alt="" />
            <div className="mc-float mc-float-1"><i /> Online</div>
            <div className="mc-float mc-float-2">
              {nodeMinPrice ? <>From <b>LKR {fmtLkr(nodeMinPrice)}</b> / month</> : <>Hosted in <b>Singapore</b></>}
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
                ? "Monthly plans with no surprise invoices. Pick the size that fits your project."
                : "A small bot and a busy API need different resources, so we size Node.js and Python hosting to fit. Tell us what you run and we'll send you a price."}
            </p>
          </div>

          <PlanRail>
              {hasPlans ? (
                NODE_PLANS.map((p, i) => (
                  <article
                    className={`mc-plan ${p.popular ? "is-popular" : ""}`}
                    key={p.id}
                    style={{ "--accent": p.accent ?? NODE_ACCENT, "--i": i } as CSSProperties}
                  >
                    {p.popular && <span className="mc-ribbon"><b>Popular</b></span>}

                    <header className="mc-plan-top">
                      <img className="mc-plan-icon nd-plan-icon" src={LOGO} alt="" />
                      <h3>{p.name}</h3>
                    </header>

                    <div className="mc-plan-price">
                      {p.price !== null ? <>LKR {fmtLkr(p.price)}<span>/mo</span></> : <span className="nd-ask">Ask us for a price</span>}
                    </div>
                    {p.tagline && <p className="mc-plan-tag">{p.tagline}</p>}

                    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-deploy">
                      {p.price !== null ? "Deploy now" : "Get a quote"} <IconArrow />
                    </a>

                    <ul className="mc-specs">
                      <li className="mc-spec-ram"><IconChip />AMD EPYC™ CPU</li>
                      {p.vcores !== undefined && <li><IconChip />{p.vcores} vCore{p.vcores === 1 ? "" : "s"}</li>}
                      {p.ram && <li><IconRam />{p.ram} DDR5 RAM</li>}
                      {p.storageGb !== undefined && <li><IconDrive />{p.storageGb}GB NVMe Storage</li>}
                      {p.ports !== undefined && <li><IconPort />{p.ports} Port Allocation{p.ports === 1 ? "" : "s"}</li>}
                      <li><IconCode />Node.js & Python Support</li>
                    </ul>
                  </article>
                ))
              ) : (
                <article className="mc-plan nd-quote" style={{ "--accent": NODE_ACCENT, "--i": 0 } as CSSProperties}>
                  <header className="mc-plan-top">
                    <img className="mc-plan-icon nd-plan-icon" src={LOGO} alt="" />
                    <h3>Custom</h3>
                  </header>

                  <div className="nd-quote-big">Tell us what you run</div>
                  <p className="mc-plan-tag nd-quote-text">
                    Share your language, what the app does and roughly how many users it has, and we'll recommend a size and send you a price in LKR.
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
            <span className="mc-eyebrow"><i /> Use cases</span>
            <h2>
              What you can
              <span className="mc-italic"> (<em>run</em> on it)</span>
            </h2>
            <p>If it runs on Node.js or Python, it can run here.</p>
          </div>

          <div className="nd-uses" ref={usesGrid}>
            {USES.map((u, i) => (
              <article className="nd-use" key={u.title} style={{ "--i": i } as CSSProperties}>
                <span className="nd-use-icon">{u.icon}</span>
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
              <h2>Ready to put your bot online?</h2>
              <p>Message us on Discord and tell us what you are building. We'll help you get set up.</p>
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