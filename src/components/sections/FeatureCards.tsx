import { useEffect, useRef } from "react";
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

/* ---------- little animated visuals (CSS only) ---------- */

const NvmeViz = () => (
  <div className="viz viz-nvme">
    {[38, 62, 48, 80, 56, 92, 70, 100].map((h, i) => (
      <i key={i} style={{ height: `${h}%`, animationDelay: `${i * -0.22}s` }} />
    ))}
    <span className="viz-chip">NVMe SSD</span>
  </div>
);

const DdosViz = () => (
  <div className="viz viz-ddos">
    <span className="ring" />
    <span className="ring" />
    <span className="ring" />
    <svg viewBox="0 0 24 24" className="shield" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
    <span className="viz-chip viz-chip-green">Protected</span>
  </div>
);

const MOD_ICONS = [
  "09b98797b9-create.webp",
  "5dd8d72b02-worldedit.webp",
  "79eca8456f-sodium.webp",
  "56defdc067-iris.webp",
  "e952ce0876-geyser.webp",
  "a9f6490ee6-luckperms.webp",
  "82ebfd7db7-essentialsx.webp",
  "d71deb5813-simple-voice-chat.webp",
  "557b743164-dynmap.webp",
];

const ModsViz = () => (
  <div className="viz viz-mods">
    {MOD_ICONS.map((file, i) => (
      <i key={file} style={{ animationDelay: `${i * 0.4}s` }}>
        <img src={`/assets/${file}`} alt="" loading="lazy" />
      </i>
    ))}
    <span className="viz-chip">1 click</span>
  </div>
);

const GAME_ICONS = [
  "/games/minecraft.png",
  "/assets/70f8c6a7bb-rust.webp",
  "/assets/76d3233bbb-fivem.webp",
  "/assets/9a31cf9683-hytale-h.webp",
  "/assets/540bef7b39-nodejs-logo.webp",
];

const SetupViz = () => (
  <div className="viz viz-setup">
    <div className="setup-row">
      <span className="setup-label">
        <b className="deploying">Deploying server…</b>
        <b className="online">Online</b>
      </span>
    </div>
    <div className="setup-bar"><i /></div>
    <div className="setup-games">
      {GAME_ICONS.map((src, i) => (
        <img key={src} src={src} alt="" loading="lazy" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </div>
  </div>
);

const ChatViz = () => (
  <div className="viz viz-chat">
    <p className="bubble bubble-user">Server won't start?</p>
    <div className="bubble bubble-dots"><span /><span /><span /></div>
    <p className="bubble bubble-agent">Fixed. You're back online.</p>
  </div>
);

const LkViz = () => (
  <div className="viz viz-lk">
    <div className="lk-dots" />
    <div className="lk-pin">
      <span className="ring" />
      <span className="ring" />
      <i />
    </div>
    <span className="viz-chip viz-chip-green">Singapore · SG</span>
  </div>
);

/* ---------- icons ---------- */

const icon = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const FEATURES = [
  {
    title: "NVMe storage",
    text: "Worlds, plugins and bots load fast on NVMe SSDs, so saves and chunk loading never hold your players back.",
    viz: <NvmeViz />,
    icon: icon(<><rect x="4" y="7" width="16" height="10" rx="2" /><path d="M8 11h.01M8 14h8" /></>),
  },
  {
    title: "DDoS protection",
    text: "Attack traffic is filtered before it reaches your server, so your players stay connected and your game stays up.",
    viz: <DdosViz />,
    icon: icon(<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />),
  },
  {
    title: "One-click mods",
    text: "Install modpacks, plugins and versions from the panel in one click. No FTP and no manual setup.",
    viz: <ModsViz />,
    icon: icon(<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><path d="M16.5 13v7M13 16.5h7" /></>),
  },
  {
    title: "Instant setup",
    text: "Pick a plan and your server is deployed in moments, ready for you and your friends to join.",
    viz: <SetupViz />,
    icon: icon(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />),
  },
  {
    title: "24/7 support",
    text: "Real people on Discord, any time of day, ready to help you fix problems quickly.",
    viz: <ChatViz />,
    icon: icon(<path d="M5 14v-2a7 7 0 0 1 14 0v2M5 14h2.5v4H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Zm14 0h-2.5v4H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />),
  },
  {
    title: "Singapore servers",
    text: "Hosted in Singapore for stable connections to players in Sri Lanka and across Asia, with clear LKR pricing and no surprise invoices.",
    viz: <LkViz />,
    icon: icon(<><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>),
  },
];

/** The six animated feature cards (used on the home page AND the Minecraft page) */
export default function FeatureCards({ only, cols = 3 }: { only?: string[]; cols?: 2 | 3 }) {
  const gridRef = useReveal<HTMLDivElement>();
  const list = only ? FEATURES.filter((f) => only.includes(f.title)) : FEATURES;

  return (
    <div className={`features-grid ${cols === 2 ? "features-grid-2" : ""}`} ref={gridRef}>
      {list.map((f, i) => (
        <article className="fcard-wrap" key={f.title} style={{ "--i": i } as React.CSSProperties}>
          <div className="fcard">
            <div className="fcard-in">
              <div className="fcard-glow" />
              <div className="fcard-viz">{f.viz}</div>
              <div className="fcard-body">
                <div className="fcard-title">
                  <span className="fcard-icon">{f.icon}</span>
                  <h3>{f.title}</h3>
                </div>
                <p>{f.text}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}