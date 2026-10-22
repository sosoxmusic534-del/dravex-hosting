import { useEffect, useRef, useState, type ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeatureCards from "../components/sections/FeatureCards";
import { MC_PLANS, DISCORD_URL, SUPPORT_EMAIL, fmtLkr } from "../data/minecraftPlans";
import "./MinecraftPage.css";

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
   Content you can edit
--------------------------------------------------------- */

const SHOTS = [
  {
    id: "files",
    label: "File manager",
    img: "/images/panel/files.png",
    text: "Browse and manage your server files in the browser, with your disk usage always in view.",
  },
  {
    id: "plugins",
    label: "Plugin manager",
    img: "/images/panel/plugin-manager.png",
    text: "Search plugins, filter by loader and install them with one click.",
  },
  {
    id: "settings",
    label: "Server settings",
    img: "/images/panel/server-settings.png",
    text: "Rename your server, set auto-start and auto-kill, change the timezone and reinstall for a clean start.",
  },
  {
    id: "subdomains",
    label: "Subdomains",
    img: "/images/panel/sub-domains.png",
    text: "Give your server its own subdomain so players join with a name, not an IP address.",
  },
];

const MODS = [
  ["worldedit", "WorldEdit"],
  ["essentialsx", "EssentialsX"],
  ["luckperms", "LuckPerms"],
  ["geyser", "Geyser"],
  ["floodgate", "Floodgate"],
  ["viaversion", "ViaVersion"],
  ["dynmap", "Dynmap"],
  ["bluemap", "BlueMap"],
  ["coreprotect", "CoreProtect"],
  ["sodium", "Sodium"],
  ["iris", "Iris"],
  ["lithium", "Lithium"],
  ["create", "Create"],
  ["jei", "JEI"],
  ["simple-voice-chat", "Simple Voice Chat"],
  ["chunky", "Chunky"],
] as const;

const CHIPS = ["AMD EPYC", "DDoS protection", "Singapore location", "One-click plugins", "24/7 support"];

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const IconRam = () => <Ico><rect x="3" y="8" width="18" height="8" rx="1.5" /><path d="M7 11v2M11 11v2M15 11v2M7 16v2M12 16v2M17 16v2" /></Ico>;
const IconDrive = () => <Ico><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M7 15h.01M11 15h6" /></Ico>;
const IconBolt = () => <Ico><path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" /></Ico>;
const IconCpu = () => <Ico><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 10h4v4h-4zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></Ico>;
const IconShield = () => <Ico><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></Ico>;
const IconArrow = () => <Ico><path d="M5 12h14M13 6l6 6-6 6" /></Ico>;

const minPrice = Math.min(...MC_PLANS.map((p) => p.price));
const perGbValues = MC_PLANS.map((p) => p.price / p.gb);
const perGb = perGbValues.every((v) => v === perGbValues[0]) ? perGbValues[0] : null;

export default function MinecraftPage({ onOpenGames }: { onOpenGames: () => void }) {
  const plansHead = useInView<HTMLDivElement>();
  const plansGrid = useInView<HTMLDivElement>();
  const perksRef = useInView<HTMLDivElement>();
  const panelRef = useInView<HTMLDivElement>();
  const modsRef = useInView<HTMLDivElement>();
  const ctaRef = useInView<HTMLDivElement>();

  const [shot, setShot] = useState(0);
  const [auto, setAuto] = useState(true);

  // plan cards slide sideways like a carousel
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const updateRail = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };
  const slide = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 330, behavior: "smooth" });

  useEffect(() => {
    updateRail();
    window.addEventListener("resize", updateRail);
    return () => window.removeEventListener("resize", updateRail);
  }, []);

  useEffect(() => {
    document.title = "Minecraft Server Hosting | DraveX Host";
    window.scrollTo(0, 0);
  }, []);

  // panel screenshots rotate by themselves until the visitor clicks one
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setShot((i) => (i + 1) % SHOTS.length), 6000);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => {
    setShot(i);
    setAuto(false);
  };

  return (
    <div className="mc">
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
              <a href="/">Home</a><span>/</span><a href="/#games">Games</a><span>/</span><b>Minecraft</b>
            </nav>

            <span className="mc-eyebrow rise d1"><i /> Minecraft hosting</span>

            <h1 className="rise d2">
              Minecraft server hosting,
              <span className="mc-italic"> (from <em>LKR {fmtLkr(minPrice)}</em>)</span>
            </h1>

            <p className="mc-lead rise d3">
              Run your own server with mods and plugins, DDoS protection and a panel that handles the hard parts for you. Pick the RAM you need and order through Discord.
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
            <img src="/images/minecraft/hero-characters.webp" alt="" />
            <div className="mc-float mc-float-1"><i /> Online</div>
            <div className="mc-float mc-float-2">From <b>LKR {fmtLkr(minPrice)}</b> / month</div>
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
            <p>Monthly plans with no surprise invoices. All plans run on AMD EPYC hardware in Singapore.</p>
            {perGb && (
              <span className="mc-pergb"><b>LKR {fmtLkr(perGb)}</b> per GB of RAM, on every plan</span>
            )}
          </div>

          <div className="mc-rail-wrap mc-reveal" ref={plansGrid}>
            <div className="mc-rail" ref={railRef} onScroll={updateRail}>
              {MC_PLANS.map((p, i) => (
                <article
                  className={`mc-plan ${p.popular ? "is-popular" : ""}`}
                  key={p.id}
                  style={{ "--accent": p.accent, "--i": i } as React.CSSProperties}
                >
                  {p.popular && <span className="mc-ribbon"><b>Popular</b></span>}

                  <header className="mc-plan-top">
                    <img className="mc-plan-icon" src={p.icon} alt="" />
                    <h3>{p.name}</h3>
                  </header>

                  <div className="mc-plan-price">
                    LKR {fmtLkr(p.price)}<span>/mo</span>
                  </div>
                  <p className="mc-plan-tag">{p.tagline}</p>

                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="mc-deploy">
                    Deploy now <IconArrow />
                  </a>

                  <ul className="mc-specs">
                    <li className="mc-spec-ram"><IconRam />{p.gb}GB RAM</li>
                    <li><IconDrive />{p.storage ? `${p.storage}GB NVMe Storage` : "NVMe Storage"}</li>
                    {p.vcores && <li><IconBolt />{p.vcores} vCore{p.vcores > 1 ? "s" : ""}</li>}
                    <li><IconCpu />AMD EPYC CPU</li>
                    <li><IconShield />DDoS Protection</li>
                  </ul>
                </article>
              ))}
            </div>

            {canPrev && (
              <button type="button" className="mc-rail-btn mc-rail-prev" onClick={() => slide(-1)} aria-label="Previous plans">
                <IconArrow />
              </button>
            )}
            {canNext && (
              <button type="button" className="mc-rail-btn mc-rail-next" onClick={() => slide(1)} aria-label="More plans">
                <IconArrow />
              </button>
            )}
          </div>

          <p className="mc-foot">
            Orders and support run through Discord. Prefer email? Write to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </section>

      {/* ================= PERKS ================= */}
      <section className="mc-sec mc-sec-alt">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={perksRef}>
            <span className="mc-eyebrow"><i /> Included</span>
            <h2>
              Every plan comes with
              <span className="mc-italic"> (<em>all</em> of this)</span>
            </h2>
          </div>

          <FeatureCards />
        </div>
      </section>

      {/* ================= PANEL ================= */}
      <section className="mc-sec">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={panelRef}>
            <span className="mc-eyebrow"><i /> Control panel</span>
            <h2>
              A panel that makes it
              <span className="mc-italic"> (<em>easy</em>)</span>
            </h2>
            <p>Manage everything from one place, in your browser.</p>
          </div>

          <div className="mc-panel">
            <div className="mc-tabs" role="tablist">
              {SHOTS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={shot === i}
                  className={`mc-tab ${shot === i ? "is-active" : ""}`}
                  onClick={() => pick(i)}
                >
                  <span className="mc-tab-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mc-tab-text">
                    <b>{s.label}</b>
                    <small>{s.text}</small>
                  </span>
                  {shot === i && auto && <i className="mc-tab-progress" key={shot} />}
                </button>
              ))}
            </div>

            <div className="mc-browser">
              <div className="mc-browser-bar">
                <span className="mc-dots"><i /><i /><i /></span>
                <span className="mc-browser-title">Dravex Panel · {SHOTS[shot].label}</span>
              </div>
              <div className="mc-browser-body">
                {SHOTS.map((s, i) => (
                  <img key={s.id} src={s.img} alt={`${s.label} in the Dravex panel`} loading="lazy" className={shot === i ? "is-active" : ""} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODS ================= */}
      <section className="mc-sec mc-sec-alt mc-sec-tight">
        <div className="mc-inner">
          <div className="mc-head mc-reveal" ref={modsRef}>
            <span className="mc-eyebrow"><i /> Mods &amp; plugins</span>
            <h2>
              Install your favourites,
              <span className="mc-italic"> (<em>one</em> click)</span>
            </h2>
            <p>Find and install mods and plugins right from the panel's plugin manager.</p>
          </div>
        </div>

        <div className="mc-marquee" aria-hidden="true">
          <div className="mc-track">
            {[0, 1].map((g) => (
              <div className="mc-track-group" key={g}>
                {MODS.map(([file, name]) => (
                  <div className="mc-mod" key={file + g}>
                    <img src={`/images/mods/${file}.webp`} alt="" loading="lazy" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mc-cta-sec">
        <div className="mc-inner">
          <div className="mc-cta mc-reveal" ref={ctaRef}>
            <div className="mc-cta-in">
              <h2>Ready to start your server?</h2>
              <p>Choose a plan and message us on Discord. We'll help you get set up.</p>
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