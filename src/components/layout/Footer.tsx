import "./Footer.css";

/* ---------------------------------------------------------
   EDIT THESE
--------------------------------------------------------- */
const DISCORD_URL = "#"; // <- your Discord invite link
const TRUSTPILOT_URL = "https://www.trustpilot.com/review/dravexhost.xyz";

const GAME_LINKS = [
  { label: "Minecraft", href: "/games/minecraft", icon: "/games/minecraft.png" },
  { label: "Rust", href: "/games/rust", icon: "/assets/70f8c6a7bb-rust.webp" },
  { label: "FiveM", href: "/games/fivem", icon: "/assets/76d3233bbb-fivem.webp" },
  { label: "Node.js & Bots", href: "/games/nodejs", icon: "/assets/540bef7b39-nodejs-logo.webp" },
];

const COMPANY_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Locations", href: "/#locations" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-glow" aria-hidden="true" />

      <div className="ft-inner">
        <div className="ft-top">
          {/* ---------- brand ---------- */}
          <div className="ft-brand">
            <a href="/" className="ft-logo">
              <img src="/logo.png" alt="" />
              <span>Drave<b>X</b></span>
              <small>Host</small>
            </a>
            <p>
              Game server and bot hosting for gamers and communities, with reliable performance, simple management and helpful support.
            </p>

            <div className="ft-social">
              <a href={DISCORD_URL} className="ft-social-btn" aria-label="Join our Discord">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 12a8 8 0 0 1-11.7 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
                  <path d="M9 11.5h.01M15 11.5h.01" />
                </svg>
                Discord
              </a>
              <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="ft-social-btn ft-social-tp" aria-label="Our Trustpilot reviews">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.1L12 17.7 5.8 21.3l1.6-7.1L2 9.5l7.1-.6L12 2Z" /></svg>
                Trustpilot
              </a>
            </div>
          </div>

          {/* ---------- links ---------- */}
          <nav className="ft-col" aria-label="Games">
            <h4>Games</h4>
            {GAME_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="ft-game">
                <img src={l.icon} alt="" loading="lazy" />
                {l.label}
              </a>
            ))}
          </nav>

          <nav className="ft-col" aria-label="Company">
            <h4>Company</h4>
            {COMPANY_LINKS.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <nav className="ft-col" aria-label="Legal">
            <h4>Legal</h4>
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} DraveX Host. All rights reserved.</p>
          <p className="ft-where">
            <i /> Hosted in Singapore · Made in Sri Lanka
          </p>
          <button type="button" className="ft-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            Back to top <span>↑</span>
          </button>
        </div>
      </div>

      {/* big faded wordmark */}
      <div className="ft-mark" aria-hidden="true">DraveX</div>
    </footer>
  );
}