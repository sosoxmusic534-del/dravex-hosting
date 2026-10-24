import { useEffect, useRef, useState } from "react";
import { DISCORD_URL, SUPPORT_EMAIL } from "../../config/site";
import { MC_PLANS, MC_MAX_GB } from "../../data/minecraftPlans";
import { RUST_PLANS } from "../../data/rustPlans";
import { FIVEM_PLANS } from "../../data/fivemPlans";
import { NODE_PLANS } from "../../data/nodePlans";
import "./Pricing.css";

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

type Plan = {
  name: string;
  big: string; // the big text on the card, e.g. "2 GB"
  price: number; // monthly price in LKR
  gb?: number; // RAM in GB (draws the memory bar)
  note?: string;
  icon?: string;
};

type Tab = {
  id: string;
  label: string;
  icon: string;
  title: string;
  text: string;
  plans: Plan[];
  includes: string[];
  quote?: boolean; // true = no fixed prices, "ask us for a quote"
};

const MAX_GB = MC_MAX_GB;

const TABS: Tab[] = [
  {
    id: "minecraft",
    label: "Minecraft",
    icon: "/games/minecraft.png",
    title: "Minecraft hosting",
    text: "Run Java or Bedrock servers with mods and plugins on AMD EPYC hardware. Pick the amount of RAM your community needs.",
    plans: MC_PLANS.map((p) => ({ name: p.name, big: `${p.gb} GB`, gb: p.gb, price: p.price, icon: p.icon })),
    includes: ["AMD EPYC processors", "DDoS protection", "One-click mods & plugins", "Singapore location", "24/7 support"],
  },
  {
    id: "v2ray",
    label: "V2Ray",
    icon: "",
    title: "V2Ray",
    text: "A fast private connection on our Singapore server. Need a bigger data allowance? Open a ticket on Discord for a custom quote.",
    plans: [
      { name: "Standard", big: "Standard", price: 500, note: "Custom GB allowance on request" },
      { name: "Streamer", big: "Streamer", price: 800, note: "Custom GB allowance on request" },
    ],
    includes: ["Singapore server", "Custom GB allowance via a ticket", "24/7 support"],
  },
  {
    id: "rust",
    label: "Rust",
    icon: "/assets/70f8c6a7bb-rust.webp",
    title: "Rust hosting",
    text: "Rust servers in Budget and Prime plans, priced by the RAM you need.",
    plans: RUST_PLANS.filter((p) => p.price !== null).map((p) => ({
      name: p.tier,
      big: `${p.gb} GB`,
      gb: p.gb,
      price: p.price as number,
      icon: p.icon,
    })),
    includes: ["DDoS protection", "Singapore location", "24/7 support"],
    quote: RUST_PLANS.every((p) => p.price === null),
  },
  {
    id: "fivem",
    label: "FiveM",
    icon: "/assets/76d3233bbb-fivem.webp",
    title: "FiveM hosting",
    text: "FiveM servers sized for your roleplay community, with DDoS protection and a Singapore location.",
    plans: FIVEM_PLANS.filter((p) => p.price !== null).map((p) => ({
      name: p.name,
      big: p.slots ? `${p.slots} slots` : `${p.gb ?? ""} GB`,
      gb: p.gb,
      price: p.price as number,
      note: p.tagline,
    })),
    includes: ["DDoS protection", "Singapore location", "24/7 support"],
    quote: FIVEM_PLANS.every((p) => p.price === null),
  },
  {
    id: "node",
    label: "Node.js & Python",
    icon: "/assets/540bef7b39-nodejs-logo.webp",
    title: "Node.js & Python hosting",
    text: "Run your Discord bot, API or app on always-on hosting. Tell us what you are building.",
    plans: NODE_PLANS.filter((p) => p.price !== null).map((p) => ({
      name: p.name,
      big: p.ram ? `${p.ram} RAM` : "Developer",
      price: p.price as number,
      note: p.vcores !== undefined ? `${p.vcores} vCore${p.vcores === 1 ? "" : "s"} · ${p.storageGb}GB NVMe · ${p.ports} port${p.ports === 1 ? "" : "s"}` : undefined,
    })),
    includes: ["AMD EPYC processors", "NVMe storage", "Node.js & Python support", "Singapore location", "24/7 support"],
    quote: NODE_PLANS.every((p) => p.price === null),
  },
];

const fmt = (n: number) => n.toLocaleString("en-US");

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export default function Pricing() {
  const [tabId, setTabId] = useState("minecraft");
  const headRef = useInView<HTMLDivElement>();
  const gridRef = useInView<HTMLDivElement>();

  const tab = TABS.find((t) => t.id === tabId) ?? TABS[0];

  // if every plan costs the same per GB, show it as a selling point
  const perGbValues = tab.plans.filter((p) => p.gb).map((p) => p.price / (p.gb as number));
  const perGb = perGbValues.length > 1 && perGbValues.every((v) => v === perGbValues[0]) ? perGbValues[0] : null;

  return (
    <section className="pr" id="pricing">
      <div className="pr-bg" aria-hidden="true">
        <i className="pr-slash pr-slash-1" />
        <i className="pr-slash pr-slash-2" />
        <i className="pr-slash pr-slash-3" />
      </div>

      <div className="pr-inner">
        <div className="pr-head pr-reveal" ref={headRef}>
          <span className="pr-eyebrow"><i /> Pricing</span>
          <h2>
            Simple plans,
            <span className="pr-italic"> (priced in <em>LKR</em>)</span>
          </h2>
          <p>Monthly plans with no surprise invoices. Pick a service, choose a plan and order through Discord.</p>

          <div className="pr-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tabId === t.id}
                className={`pr-tab ${tabId === t.id ? "is-active" : ""}`}
                onClick={() => setTabId(t.id)}
              >
                {t.icon ? <img src={t.icon} alt="" /> : <span className="pr-tab-svg"><ShieldIcon /></span>}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pr-panel pr-reveal" ref={gridRef}>
          <div className="pr-intro" key={tab.id + "-intro"}>
            <h3>{tab.title}</h3>
            <p>{tab.text}</p>
            {perGb && (
              <span className="pr-pergb">
                <b>LKR {fmt(perGb)}</b> per GB of RAM, on every plan
              </span>
            )}
          </div>

          {/* ---------- plan cards ---------- */}
          {!tab.quote ? (
            <div className={`pr-grid pr-grid-${tab.plans.length <= 2 ? "2" : tab.plans.length === 4 ? "4" : "3"}`} key={tab.id}>
              {tab.plans.map((p, i) => (
                <article className="pr-wrap" key={p.name} style={{ "--i": i } as React.CSSProperties}>
                  <div className="pr-card">
                    <div className="pr-in">
                      <div className="pr-glow" />
                      {p.icon && <img className="pr-icon" src={p.icon} alt="" />}
                      <div className="pr-name">{p.name}</div>

                      <div className={`pr-big ${p.gb ? "" : "pr-big-text"}`}>
                        {p.gb ? (
                          <>
                            {p.gb}
                            <small>GB RAM</small>
                          </>
                        ) : (
                          p.big
                        )}
                      </div>

                      {p.gb ? (
                        <div className="pr-mem" aria-hidden="true">
                          <i style={{ "--fill": `${(p.gb / MAX_GB) * 100}%` } as React.CSSProperties} />
                        </div>
                      ) : null}
                      {p.note && <p className="pr-note">{p.note}</p>}

                      <div className="pr-price">
                        <small>LKR</small>
                        {fmt(p.price)}
                        <span>/ month</span>
                      </div>

                      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="pr-btn">
                        Order on Discord <span>→</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="pr-grid pr-grid-1" key={tab.id}>
              <article className="pr-wrap" style={{ "--i": 0 } as React.CSSProperties}>
                <div className="pr-card">
                  <div className="pr-in pr-quote">
                    <div className="pr-glow" />
                    <div className="pr-name">Custom quote</div>
                    <div className="pr-big pr-big-text">Tell us what you need</div>
                    <p className="pr-note">
                      Open a ticket on Discord with your game, slots or app details and we will send you a price.
                    </p>
                    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="pr-btn">
                      Get a quote on Discord <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* ---------- what's included ---------- */}
          <ul className="pr-includes" key={tab.id + "-inc"}>
            {tab.includes.map((item) => (
              <li key={item}>
                <Check /> {item}
              </li>
            ))}
          </ul>

          <p className="pr-foot">
            Orders and support run through Discord. Prefer email? Write to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}