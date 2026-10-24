import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { DISCORD_URL, SUPPORT_EMAIL } from "../../config/site";
import { MC_PLANS, fmtLkr } from "../../data/minecraftPlans";
import { rustMinPrice } from "../../data/rustPlans";
import { fivemMinPrice } from "../../data/fivemPlans";
import { hytaleMinPrice } from "../../data/hytalePlans";
import { nodeMinPrice } from "../../data/nodePlans";
import "./Navbar.css";

type NavbarProps = {
  onOpenGames?: () => void;
};

const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const I = {
  info: <Ico><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></Ico>,
  star: <Ico><path d="m12 3.5 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 17l-5.3 3 1.1-6L3.4 9.8l6-.8L12 3.5Z" /></Ico>,
  pin: <Ico><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></Ico>,
  bolt: <Ico><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Ico>,
  help: <Ico><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" /></Ico>,
  chat: <Ico><path d="M4 5h16v11H9l-5 4V5Z" /></Ico>,
  mail: <Ico><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></Ico>,
  terms: <Ico><path d="M6 3h9l3 3v15H6V3Z" /><path d="M9 11h6M9 15h6" /></Ico>,
  shield: <Ico><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /></Ico>,
  refund: <Ico><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" /></Ico>,
  grid: <Ico><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></Ico>,
  vpn: <Ico><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="M9 12.5h6M12 9.5v6" /></Ico>,
};

const from = (n: number | null | undefined) => (n ? `Starting @ ${fmtLkr(n)} LKR` : "Custom quote");

const mcMin = Math.min(...MC_PLANS.map((p) => p.price));

/* ---------- Services mega menu ---------- */
const SERVICES = [
  { name: "Minecraft Servers", sub: from(mcMin), href: "/games/minecraft", img: "/assets/85b35026a3-minecraft-key-art.webp" },
  { name: "Hytale Servers", sub: from(hytaleMinPrice), href: "/games/hytale", img: "/assets/ae3bf84a42-hytale.webp" },
  { name: "Rust Servers", sub: from(rustMinPrice), href: "/games/rust", img: "/assets/70f8c6a7bb-rust.webp" },
  { name: "FiveM Servers", sub: from(fivemMinPrice), href: "/games/fivem", img: "/assets/76d3233bbb-fivem.webp" },
  { name: "Node.js & Python", sub: from(nodeMinPrice), href: "/games/nodejs", img: "/assets/540bef7b39-nodejs-logo.webp" },
  { name: "V2Ray", sub: "Starting @ 500 LKR", href: "/#games", icon: I.vpn },
];

/* ---------- simple dropdowns ---------- */
type Item = { title: string; text: string; href: string; icon: ReactNode; external?: boolean };

const COMPANY: Item[] = [
  { title: "About us", text: "Who we are and what we stand for.", href: "/about", icon: I.info },
  { title: "Reviews", text: "What customers say about us.", href: "/#reviews", icon: I.star },
  { title: "Locations & ping test", text: "Check your ping to Singapore.", href: "/#locations", icon: I.pin },
  { title: "Why DraveX", text: "NVMe, DDoS protection and more.", href: "/#features", icon: I.bolt },
];

const HELP: Item[] = [
  { title: "FAQ", text: "Quick answers to common questions.", href: "/#faq", icon: I.help },
  { title: "Discord support", text: "Chat with our team, any time.", href: DISCORD_URL, icon: I.chat, external: true },
  { title: "Email us", text: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}`, icon: I.mail },
];

const LEGAL: Item[] = [
  { title: "Terms of Service", text: "What you agree to when using us.", href: "/terms", icon: I.terms },
  { title: "Privacy Policy", text: "How we collect and protect your data.", href: "/privacy", icon: I.shield },
  { title: "Refund Policy", text: "Our commitment to fairness.", href: "/refund-policy", icon: I.refund },
];

const Chevron = () => (
  <svg className="nav-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function List({ items, onPick }: { items: Item[]; onPick: () => void }) {
  return (
    <div className="nav-panel nav-panel-list">
      {items.map((it) => (
        <a
          key={it.title}
          href={it.href}
          className="nav-item"
          onClick={onPick}
          {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="nav-item-ico">{it.icon}</span>
          <span className="nav-item-text">
            <b>{it.title}</b>
            <small>{it.text}</small>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function Navbar({ onOpenGames }: NavbarProps) {
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const timer = useRef<number>(0);

  const close = () => {
    setMenu(null);
    setMobile(false);
  };

  // lock page scroll while the phone menu is open, and close it if the screen grows
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    const onResize = () => window.innerWidth > 760 && setMobile(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [mobile]);

  // click outside / Escape closes menus
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // hover opens on desktop (with a short delay so the menu doesn't flicker)
  const hoverable = () => window.matchMedia("(hover: hover) and (min-width: 761px)").matches;
  const enter = (id: string) => {
    if (!hoverable()) return;
    clearTimeout(timer.current);
    setMenu(id);
  };
  const leave = () => {
    if (!hoverable()) return;
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(null), 140);
  };
  const toggle = (id: string) => setMenu((m) => (m === id ? null : id));

  const trigger = (id: string, label: string) => (
    <button
      type="button"
      className={`nav-link nav-trigger ${menu === id ? "is-active" : ""}`}
      aria-expanded={menu === id}
      aria-haspopup="true"
      onClick={() => toggle(id)}
    >
      {label} <Chevron />
    </button>
  );

  // Rendered straight into <body> so no page section can paint on top of the navbar.
  return createPortal(
    <header className="nav-wrap">
      {mobile && <div className="nav-scrim" onClick={close} aria-hidden="true" />}
      <nav className="nav" ref={wrapRef}>
        <a href="/" className="nav-brand" aria-label="DraveX Host home">
          <img src="/logo-wordmark.png" alt="DraveX Host" />
        </a>

        <ul className={`nav-links ${mobile ? "is-open" : ""}`}>
          <li>
            <a className="nav-link" href="/" onClick={close}>Home</a>
          </li>

          {/* Services: wide menu anchored to the whole bar */}
          <li className="nav-dd nav-dd-mega" onMouseEnter={() => enter("services")} onMouseLeave={leave}>
            {trigger("services", "Services")}
            <div className={`nav-panel nav-panel-mega ${menu === "services" ? "is-open" : ""}`}>
              {SERVICES.map((s) => (
                <a key={s.name} href={s.href} className="nav-game" onClick={close}>
                  <span className="nav-game-img">
                    {s.img ? <img src={s.img} alt="" loading="lazy" /> : s.icon}
                  </span>
                  <span className="nav-item-text">
                    <b>{s.name}</b>
                    <small>{s.sub}</small>
                  </span>
                </a>
              ))}
              <button
                type="button"
                className="nav-game nav-game-all"
                onClick={() => {
                  close();
                  onOpenGames?.();
                }}
              >
                <span className="nav-game-img nav-game-grid">{I.grid}</span>
                <span className="nav-item-text">
                  <b>All games</b>
                  <small>See everything we host</small>
                </span>
              </button>
            </div>
          </li>

          <li className="nav-dd" onMouseEnter={() => enter("company")} onMouseLeave={leave}>
            {trigger("company", "Company")}
            <div className={menu === "company" ? "nav-wrap-open" : "nav-wrap-closed"}>
              <List items={COMPANY} onPick={close} />
            </div>
          </li>

          <li className="nav-dd" onMouseEnter={() => enter("help")} onMouseLeave={leave}>
            {trigger("help", "Help & Guides")}
            <div className={menu === "help" ? "nav-wrap-open" : "nav-wrap-closed"}>
              <List items={HELP} onPick={close} />
            </div>
          </li>

          <li className="nav-dd" onMouseEnter={() => enter("legal")} onMouseLeave={leave}>
            {trigger("legal", "Legal")}
            <div className={menu === "legal" ? "nav-wrap-open" : "nav-wrap-closed"}>
              <List items={LEGAL} onPick={close} />
            </div>
          </li>
          <li className="nav-mobile-cta">
            <a href="https://panel.dravexhost.xyz" target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={close}>Game Panel</a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-ghost" onClick={close}>Discord</a>
          </li>
        </ul>

        <div className="nav-right">
          <a href="https://panel.dravexhost.xyz" target="_blank" rel="noopener noreferrer" className="nav-cta">Game Panel</a>
          <button
            type="button"
            className={`nav-toggle ${mobile ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </nav>
    </header>,
    document.body,
  );
}