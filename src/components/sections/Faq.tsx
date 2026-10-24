import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DISCORD_URL } from "../../config/site";
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

/* ---------- icons (all from /public/assets) ---------- */
const A = "/assets/";
const IMG = {
  minecraft: { name: "Minecraft", src: "/games/minecraft.png", cover: true },
  rust: { name: "Rust", src: A + "70f8c6a7bb-rust.webp" },
  fivem: { name: "FiveM", src: A + "76d3233bbb-fivem.webp" },
  node: { name: "Node.js", src: A + "540bef7b39-nodejs-logo.webp" },
  sodium: { name: "Sodium", src: A + "79eca8456f-sodium.webp" },
  iris: { name: "Iris", src: A + "56defdc067-iris.webp" },
  worldedit: { name: "WorldEdit", src: A + "5dd8d72b02-worldedit.webp" },
  luckperms: { name: "LuckPerms", src: A + "a9f6490ee6-luckperms.webp" },
  essentialsx: { name: "EssentialsX", src: A + "82ebfd7db7-essentialsx.webp" },
  geyser: { name: "Geyser", src: A + "e952ce0876-geyser.webp" },
  voice: { name: "Voice Chat", src: A + "d71deb5813-simple-voice-chat.webp" },
  dynmap: { name: "Dynmap", src: A + "557b743164-dynmap.webp" },
  create: { name: "Create", src: A + "09b98797b9-create.webp" },
} as const;

type Chip = (typeof IMG)[keyof typeof IMG];

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const ICON = {
  bolt: <Svg><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Svg>,
  pin: <Svg><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></Svg>,
  pad: <Svg><rect x="2.5" y="7" width="19" height="11" rx="5" /><path d="M7.5 10.5v4M5.5 12.5h4M15.5 11.5h.01M18 13.5h.01" /></Svg>,
  shield: <Svg><path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></Svg>,
  puzzle: <Svg><path d="M10 4a2 2 0 1 1 4 0v1.5h3.5V9H19a2 2 0 1 1 0 4h-1.5v5.5H13V17a2 2 0 1 0-4 0v1.5H4.5V13H6a2 2 0 1 0 0-4H4.5V5.5H10V4Z" /></Svg>,
  wallet: <Svg><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" /><rect x="3.5" y="8" width="17" height="11" rx="2.5" /><circle cx="16.5" cy="13.5" r="1" /></Svg>,
  up: <Svg><path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" /><path d="M5 20h14" /></Svg>,
  receipt: <Svg><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" /><path d="M9 8h6M9 12h6" /></Svg>,
  help: <Svg><path d="M5 14v-2a7 7 0 0 1 14 0v2" /><rect x="3.5" y="13.5" width="4" height="6" rx="1.5" /><rect x="16.5" y="13.5" width="4" height="6" rx="1.5" /></Svg>,
};

type Cat = "setup" | "games" | "billing" | "support";

const TABS: { id: "all" | Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "setup", label: "Getting started" },
  { id: "games", label: "Games & mods" },
  { id: "billing", label: "Billing" },
  { id: "support", label: "Support" },
];

type Item = {
  q: string;
  a: string;
  cat: Cat;
  icon: ReactNode;
  chips?: Chip[];
  tag?: string;
  link?: { label: string; href: string; external?: boolean };
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
    cat: "setup",
    icon: ICON.bolt,
  },
  {
    q: "Where are your servers located?",
    a: "Our servers are in Singapore, which gives stable connections for players in Sri Lanka and across Asia. You can run a live ping test from your own connection to see how it feels.",
    cat: "setup",
    icon: ICON.pin,
    tag: "Singapore",
    link: { label: "Run the ping test", href: "/#locations" },
  },
  {
    q: "Which games and apps can I host?",
    a: "We host Minecraft, Rust and FiveM servers, Node.js and Python apps, and V2Ray. Some games are still coming soon, and the Games section always shows what is available right now.",
    cat: "games",
    icon: ICON.pad,
    chips: [IMG.minecraft, IMG.rust, IMG.fivem, IMG.node],
    link: { label: "See all games", href: "/#games" },
  },
  {
    q: "How does DDoS protection work?",
    a: "Attack traffic is filtered before it reaches your server, so your players stay connected and your game stays online even when someone tries to knock it over.",
    cat: "games",
    icon: ICON.shield,
  },
  {
    q: "Can I install mods and plugins?",
    a: "Yes. You can install modpacks, plugins and different versions from the panel in one click, with no manual setup needed.",
    cat: "games",
    icon: ICON.puzzle,
    chips: [IMG.sodium, IMG.iris, IMG.worldedit, IMG.luckperms, IMG.essentialsx, IMG.geyser, IMG.voice, IMG.dynmap, IMG.create],
  },
  {
    q: "How do I pay?",
    a: "All plans are priced in LKR with no surprise invoices. Message us on Discord and we'll show you the payment methods available and help you complete your order.", // CHECK
    cat: "billing",
    icon: ICON.wallet,
    tag: "LKR pricing",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "If you need more resources as your community grows, message our team on Discord and we'll help you move to a bigger plan.", // CHECK
    cat: "billing",
    icon: ICON.up,
  },
  {
    q: "Do you offer refunds?",
    a: "If something isn't working, contact support first and we'll do our best to fix it. Our refund terms are written out on our Refund Policy page.", // CHECK
    cat: "billing",
    icon: ICON.receipt,
    link: { label: "Read the refund policy", href: "/refund-policy" },
  },
  {
    q: "How do I get help if something goes wrong?",
    a: "Join our Discord and message the team. Real people answer there, at any time of day.",
    cat: "support",
    icon: ICON.help,
    tag: "24/7 on Discord",
    link: { label: "Open Discord", href: DISCORD_URL, external: true },
  },
];

const HOSTS = [IMG.minecraft, IMG.rust, IMG.fivem, IMG.node];

export default function Faq() {
  const [tab, setTab] = useState<"all" | Cat>("all");
  const [open, setOpen] = useState<string | null>(ITEMS[0].q);
  const headRef = useInView<HTMLDivElement>();
  const listRef = useInView<HTMLDivElement>();

  const shown = tab === "all" ? ITEMS : ITEMS.filter((i) => i.cat === tab);

  const pick = (id: "all" | Cat) => {
    setTab(id);
    const first = (id === "all" ? ITEMS : ITEMS.filter((i) => i.cat === id))[0];
    setOpen(first ? first.q : null);
  };

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

          <div className="fq-hosts" aria-label="What we host">
            {HOSTS.map((h, i) => (
              <span className="fq-host" key={h.name} style={{ "--i": i } as CSSProperties} title={h.name}>
                <img src={h.src} alt={h.name} className={"cover" in h ? "is-cover" : ""} loading="lazy" />
              </span>
            ))}
            <span className="fq-host fq-host-more" style={{ "--i": HOSTS.length } as CSSProperties}>+</span>
          </div>

          <div className="fq-help">
            <div className="fq-help-in">
              <h3>Still need help?</h3>
              <p>Our team is on Discord and happy to help.</p>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="fq-btn">Chat on Discord <span>→</span></a>
            </div>
          </div>
        </div>

        {/* ---------- right ---------- */}
        <div className="fq-right">
          <div className="fq-tabs" role="tablist" aria-label="FAQ categories">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`fq-tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => pick(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="fq-list fq-reveal" ref={listRef}>
            <div className="fq-items" key={tab}>
              {shown.map((item, i) => {
                const isOpen = open === item.q;
                const id = `fq-${ITEMS.indexOf(item)}`;
                return (
                  <div className={`fq-item ${isOpen ? "is-open" : ""}`} key={item.q} style={{ "--i": i } as CSSProperties}>
                    <h3>
                      <button
                        type="button"
                        className="fq-trigger"
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel`}
                        id={`${id}-btn`}
                        onClick={() => setOpen(isOpen ? null : item.q)}
                      >
                        <span className="fq-tile">{item.icon}</span>
                        <span className="fq-q">{item.q}</span>
                        <span className="fq-icon" aria-hidden="true"><i /><i /></span>
                      </button>
                    </h3>
                    <div className="fq-panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`}>
                      <div className="fq-panel-in">
                        <p>{item.a}</p>

                        {item.chips && (
                          <ul className="fq-chips">
                            {item.chips.map((c) => (
                              <li key={c.name}>
                                <img src={c.src} alt="" loading="lazy" />
                                {c.name}
                              </li>
                            ))}
                          </ul>
                        )}

                        {(item.tag || item.link) && (
                          <div className="fq-foot">
                            {item.tag && <span className="fq-tag"><i /> {item.tag}</span>}
                            {item.link && (
                              <a
                                href={item.link.href}
                                className="fq-link"
                                {...(item.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              >
                                {item.link.label} <span>→</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}