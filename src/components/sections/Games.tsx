import { useEffect, useRef, useState } from "react";
import "./Games.css";

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

type Layout = "figure" | "logo" | "stack";

type Game = {
  name: string;
  tag: string;
  status: "available" | "soon"; // <- change this to open / close a game
  href: string; // where "Host now" goes
  layout: Layout;
  art: string[]; // image file names inside public/assets
  c1: string; // gradient top colour
  c2: string; // gradient bottom colour
};

/*
  EDIT THIS LIST:
  - status "available" shows a green tag + "Host now"
  - status "soon" shows an amber tag + "Coming soon"
*/
const GAMES: Game[] = [
  {
    name: "Minecraft",
    tag: "Java + Bedrock · Mods",
    status: "available",
    href: "/games/minecraft",
    layout: "figure",
    art: ["85b35026a3-minecraft-key-art.webp"],
    c1: "#3f8f2f",
    c2: "#1f1409",
  },
  {
    name: "Rust",
    tag: "Survival servers",
    status: "available",
    href: "/games/rust",
    layout: "figure",
    art: ["964e20aeeb-rust.webp"],
    c1: "#c8452a",
    c2: "#1d0a06",
  },
  {
    name: "FiveM",
    tag: "GTA roleplay servers",
    status: "available",
    href: "/games/fivem",
    layout: "figure",
    art: ["6fbe3da36e-fivem.webp"],
    c1: "#ff7a1a",
    c2: "#190c04",
  },
  {
    name: "Node.js & Python",
    tag: "Bots, APIs + apps",
    status: "available",
    href: "/games/nodejs",
    layout: "logo",
    art: ["540bef7b39-nodejs-logo.webp"],
    c1: "#3c873a",
    c2: "#08170a",
  },
  {
    name: "Hytale",
    tag: "Adventure servers",
    status: "soon",
    href: "#",
    layout: "figure",
    art: ["ae3bf84a42-hytale.webp"],
    c1: "#3d8bff",
    c2: "#150c3d",
  },
  {
    name: "Palworld",
    tag: "Co-op survival",
    status: "soon",
    href: "#",
    layout: "figure",
    art: ["4d803b8e9f-palworld.webp"],
    c1: "#2fb6ff",
    c2: "#081a33",
  },
  {
    name: "Vintage Story",
    tag: "Survival sandbox",
    status: "soon",
    href: "#",
    layout: "figure",
    art: ["9d15cd5ddd-vintagestory.webp"],
    c1: "#7bbf4a",
    c2: "#0f1a09",
  },
  {
    name: "Truck Simulators",
    tag: "ATS + Euro Truck 2",
    status: "soon",
    href: "#",
    layout: "stack",
    art: ["1e77c14288-american-truck-simulator.webp", "9d8c538e9f-euro-truck-simulator-2.webp"],
    c1: "#5a6b86",
    c2: "#0c1018",
  },
];

type Filter = "all" | "available" | "soon";
const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All games" },
  { id: "available", label: "Available now" },
  { id: "soon", label: "Coming soon" },
];

export default function Games() {
  const [filter, setFilter] = useState<Filter>("all");
  const headRef = useInView<HTMLDivElement>();
  const gridRef = useInView<HTMLDivElement>();

  const list = GAMES.filter((g) => filter === "all" || g.status === filter);

  return (
    <section className="games" id="games">
      <div className="games-bg" aria-hidden="true">
        <i className="gm-slash gm-slash-1" />
        <i className="gm-slash gm-slash-2" />
        <i className="gm-slash gm-slash-3" />
        <i className="gm-slash gm-slash-4" />
      </div>

      <div className="games-inner">
        <div className="gm-head gm-reveal" ref={headRef}>
          <span className="gm-eyebrow"><i /> Supported games</span>
          <h2>
            Pick your game,
            <span className="gm-italic"> (<em>we'll</em> host it)</span>
          </h2>
          <p>
            Game servers, Discord bots and apps on fast NVMe hardware with DDoS protection. Choose a game to see plans.
          </p>

          <div className="gm-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={filter === t.id}
                className={`gm-tab ${filter === t.id ? "is-active" : ""}`}
                onClick={() => setFilter(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="gm-grid" ref={gridRef}>
          {list.map((g, i) => (
            <article
              className="gm-wrap"
              key={g.name + filter}
              style={{ "--i": i, "--c1": g.c1, "--c2": g.c2 } as React.CSSProperties}
            >
              <a className="gm-card" href={g.href} aria-label={`${g.name} hosting`}>
                <div className="gm-in">
                  <div className="gm-glow" />

                  <div className="gm-top">
                    <div>
                      <h3>{g.name}</h3>
                      <p>{g.tag}</p>
                    </div>
                    <span className={`gm-status gm-status-${g.status}`}>
                      <i />
                      {g.status === "available" ? "Available" : "Coming soon"}
                    </span>
                  </div>

                  <div className={`gm-art gm-art-${g.layout}`}>
                    {g.art.map((file) => (
                      <img key={file} src={`/assets/${file}`} alt="" loading="lazy" />
                    ))}
                  </div>

                  <div className="gm-bottom">
                    <span className="gm-cta">
                      {g.status === "available" ? "Host now" : "Notify me"} <b>→</b>
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="gm-more gm-reveal-soft">
          <div>
            <h4>Don't see your game?</h4>
            <p>Tell us on Discord and we'll look at adding it.</p>
          </div>
          <a href="#" className="gm-more-btn">Request a game</a>
        </div>
      </div>
    </section>
  );
}