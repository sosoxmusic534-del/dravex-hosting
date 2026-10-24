import { useEffect, useRef, type ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Reviews from "../components/sections/Reviews";
import { DISCORD_URL, SUPPORT_EMAIL } from "../data/minecraftPlans";
import "./MinecraftPage.css"; // shared page styles
import "./AboutPage.css";

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

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/* What we stand for (taken from how DraveX describes itself) */
const VALUES = [
  {
    title: "Reliable performance",
    text: "Fast hardware, NVMe storage and DDoS protection, so your server stays quick and online.",
    icon: <Ico><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Ico>,
  },
  {
    title: "Straightforward management",
    text: "A simple control panel for your files, plugins, settings and subdomains. No hard setup.",
    icon: <Ico><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 9l3 2.5L7 14M12 14h5" /></Ico>,
  },
  {
    title: "Helpful support",
    text: "Real people on Discord, any time of day, ready to help you fix problems quickly.",
    icon: <Ico><path d="M5 14v-2a7 7 0 0 1 14 0v2M5 14h2.5v4H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Zm14 0h-2.5v4H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" /></Ico>,
  },
  {
    title: "Clear pricing",
    text: "Plans are priced in LKR with no surprise invoices, so you always know what you pay.",
    icon: <Ico><circle cx="12" cy="12" r="9" /><path d="M9 9.5c0-1 1.2-1.8 3-1.8s3 .8 3 1.9c0 2.6-6 1.2-6 4 0 1.1 1.3 1.9 3 1.9s3-.8 3-1.8M12 6v1.7M12 16.3V18" /></Ico>,
  },
];

const STATS = [
  { big: "Singapore", small: "Server location" },
  { big: "LKR", small: "Local pricing" },
  { big: "24/7", small: "Discord support" },
  { big: "AMD EPYC", small: "Minecraft hardware" },
];

/* What we host today (edit freely) */
const HOSTS = [
  { name: "Minecraft", text: "Java servers with mods and plugins", href: "/games/minecraft", icon: "/games/minecraft.png" },
  { name: "Rust", text: "Budget and Prime servers", href: "/games/rust", icon: "/assets/70f8c6a7bb-rust.webp" },
  { name: "FiveM", text: "GTA roleplay servers", href: "/games/fivem", icon: "/assets/76d3233bbb-fivem.webp" },
  { name: "Node.js & Python", text: "Bots, APIs and apps", href: "/#pricing", icon: "/assets/540bef7b39-nodejs-logo.webp" },
];

export default function AboutPage({ onOpenGames }: { onOpenGames: () => void }) {
  const storyRef = useInView<HTMLDivElement>();
  const valuesHead = useInView<HTMLDivElement>();
  const valuesGrid = useInView<HTMLDivElement>();
  const hostHead = useInView<HTMLDivElement>();
  const hostGrid = useInView<HTMLDivElement>();
  const mapRef = useInView<HTMLDivElement>();
  const ctaRef = useInView<HTMLDivElement>();

  useEffect(() => {
    document.title = "About DraveX Host | Sri Lankan Hosting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mc about">
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
              <a href="/">Home</a><span>/</span><b>About</b>
            </nav>

            <span className="mc-eyebrow rise d1"><i /> About DraveX Host</span>

            <h1 className="rise d2">
              Hosting designed for gamers and communities,
              <span className="mc-italic"> (made in <em>Sri Lanka</em>)</span>
            </h1>

            <p className="mc-lead rise d3">
              DraveX Host provides game server hosting and hosting solutions for gamers and communities. We aim to give you reliable performance, straightforward server management and helpful customer support.
            </p>

            <div className="mc-actions rise d4">
              <a href="/#pricing" className="mc-btn">See our plans <span>→</span></a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-btn mc-btn-ghost">Talk to us on Discord</a>
            </div>
          </div>

          <div className="mc-hero-art rise d3" aria-hidden="true">
            <div className="mc-art-disc" />
            <img className="ab-logo" src="/logo.png" alt="" />
            <div className="mc-float mc-float-1"><i /> Online</div>
            <div className="mc-float mc-float-2">Hosted in <b>Singapore</b></div>
          </div>
        </div>
      </section>

      {/* ================= STORY + STATS ================= */}
      <section className="mc-sec">
        <div className="mc-inner">
          <div className="ab-story mc-reveal" ref={storyRef}>
            <div className="ab-story-text">
              <span className="mc-eyebrow"><i /> Who we are</span>
              <h2>
                A hosting brand that
                <span className="mc-italic"> (<em>keeps</em> it simple)</span>
              </h2>
              <p>
                We started DraveX Host to give gamers and community owners hosting that just works: quick servers, a panel that is easy to use, and a team that answers when you need help.
              </p>
              <p>
                Our plans are priced in LKR, our servers run in Singapore for stable connections across Asia, and our support lives where you already are: on Discord.
              </p>
            </div>

            <ul className="ab-stats">
              {STATS.map((s) => (
                <li key={s.small}>
                  <b>{s.big}</b>
                  <span>{s.small}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="mc-sec mc-sec-alt">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={valuesHead}>
            <span className="mc-eyebrow"><i /> What we stand for</span>
            <h2>
              Four things we
              <span className="mc-italic"> (<em>care</em> about)</span>
            </h2>
          </div>

          <div className="ab-values" ref={valuesGrid}>
            {VALUES.map((v, i) => (
              <article className="ab-wrap" key={v.title} style={{ "--i": i } as React.CSSProperties}>
                <div className="ab-card">
                  <div className="ab-card-in">
                    <span className="ab-card-icon">{v.icon}</span>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT WE HOST ================= */}
      <section className="mc-sec">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={hostHead}>
            <span className="mc-eyebrow"><i /> What we host</span>
            <h2>
              Pick your
              <span className="mc-italic"> (<em>game</em> or app)</span>
            </h2>
            <p>Game servers, bots and apps, with the same DDoS protection and Singapore location on all of them.</p>
          </div>

          <div className="ab-host" ref={hostGrid}>
            {HOSTS.map((g, i) => (
              <a className="ab-host-card" href={g.href} key={g.name} style={{ "--i": i } as React.CSSProperties}>
                <img src={g.icon} alt="" loading="lazy" />
                <span className="ab-host-text">
                  <b>{g.name}</b>
                  <small>{g.text}</small>
                </span>
                <span className="ab-host-go">View <i>→</i></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="mc-sec mc-sec-alt mc-sec-tight">
        <div className="mc-inner">
          <div className="ab-loc mc-reveal" ref={mapRef}>
            <div className="ab-loc-text">
              <span className="mc-eyebrow"><i /> Our location</span>
              <h2>
                Servers in
                <span className="mc-italic"> (<em>Singapore</em>)</span>
              </h2>
              <p>
                Hosting in Singapore gives stable connections for players in Sri Lanka and across Asia. Not sure how it feels from your side? Run a live ping test from your own connection.
              </p>
              <a href="/#locations" className="mc-btn">Run a ping test <span>→</span></a>
            </div>

            <div className="ab-map" aria-hidden="true">
              <div className="ab-map-hex" />
              <div className="ab-map-spot" />
              <div className="ab-map-pin">
                <span /><span /><i />
                <em>Singapore</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REAL REVIEWS ================= */}
      <Reviews />

      {/* ================= CTA ================= */}
      <section className="mc-cta-sec">
        <div className="mc-inner">
          <div className="mc-cta mc-reveal" ref={ctaRef}>
            <div className="mc-cta-in">
              <h2>Questions? Come and say hi.</h2>
              <p>
                Join our Discord for support and orders, or write to us at <a className="ab-mail" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
              </p>
              <div className="mc-actions">
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-btn">Join our Discord <span>→</span></a>
                <a href="/#pricing" className="mc-btn mc-btn-ghost">See plans</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}